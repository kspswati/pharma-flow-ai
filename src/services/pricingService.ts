
import { fetchPharmaData } from './dataService';
import { toast } from "@/components/ui/use-toast";

export interface PricingAnalysisResult {
  trends: Array<{ month: string; price: number }>;
  manufacturerComparison: Array<{ 
    name: string; 
    q1: number; 
    q2: number; 
    q3: number; 
    q4: number;
  }>;
  manufacturerList: Array<{
    id: number;
    name: string;
    price: number;
    trend: string;
    location: string;
    leadTime: string;
  }>;
}

/**
 * Generate pricing analysis for selected product and location
 */
export const generatePricingAnalysis = async (
  product: string,
  location: string
): Promise<PricingAnalysisResult> => {
  try {
    // Fetch filtered data from Supabase
    const data = await fetchPharmaData({
      country: location ? [location] : undefined,
      productGroup: product ? [product] : undefined
    });
    
    if (!data || data.length === 0) {
      toast({
        title: "Insufficient data",
        description: "Not enough data available for pricing analysis",
        variant: "destructive"
      });
      throw new Error("Insufficient data for pricing analysis");
    }
    
    // Process pricing data
    return processPricingData(data, product, location);
    
  } catch (error) {
    console.error("Error generating pricing analysis:", error);
    toast({
      title: "Pricing Analysis Error",
      description: error instanceof Error ? error.message : "Failed to generate pricing analysis",
      variant: "destructive"
    });
    throw error;
  }
};

/**
 * Process pricing data from raw database records
 */
const processPricingData = (data: any[], product: string, location: string): PricingAnalysisResult => {
  // Filter valid price data
  const validData = data
    .filter(item => item.unit_price && item.delivered_to_client_date && item.manufacturing_site)
    .map(item => ({
      date: new Date(item.delivered_to_client_date),
      price: typeof item.unit_price === 'string' ? parseFloat(item.unit_price) : item.unit_price,
      manufacturer: item.manufacturing_site
    }))
    .filter(item => !isNaN(item.price) && item.price > 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  if (validData.length < 3) {
    throw new Error("Insufficient price data points for analysis");
  }
  
  // Generate monthly price trends
  const monthlyTrends = generateMonthlyPriceTrends(validData);
  
  // Generate manufacturer comparison
  const manufacturers = [...new Set(validData.map(item => item.manufacturer))];
  const manufacturerComparison = generateManufacturerComparison(validData, manufacturers);
  
  // Generate manufacturer list with pricing details
  const manufacturerList = generateManufacturerList(validData, manufacturers, location);
  
  return {
    trends: monthlyTrends,
    manufacturerComparison,
    manufacturerList
  };
};

/**
 * Generate monthly price trends
 */
const generateMonthlyPriceTrends = (data: { date: Date; price: number; manufacturer: string }[]) => {
  const months: Record<string, number[]> = {};
  
  // Group prices by month
  data.forEach(item => {
    const monthKey = `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}`;
    if (!months[monthKey]) {
      months[monthKey] = [];
    }
    months[monthKey].push(item.price);
  });
  
  // Calculate average price per month
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return Object.entries(months).map(([monthKey, prices]) => {
    const [year, month] = monthKey.split('-');
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    return {
      month: monthNames[parseInt(month) - 1],
      price: parseFloat(avgPrice.toFixed(2))
    };
  });
};

/**
 * Generate quarterly price comparison by manufacturer
 */
const generateManufacturerComparison = (
  data: { date: Date; price: number; manufacturer: string }[],
  manufacturers: string[]
) => {
  // Group data by manufacturer and quarter
  const manufacturerQuarters: Record<string, Record<number, number[]>> = {};
  
  manufacturers.forEach(mfr => {
    manufacturerQuarters[mfr] = { 1: [], 2: [], 3: [], 4: [] };
  });
  
  data.forEach(item => {
    const quarter = Math.floor(item.date.getMonth() / 3) + 1;
    manufacturerQuarters[item.manufacturer][quarter].push(item.price);
  });
  
  // Calculate average price per manufacturer per quarter
  return manufacturers.map(mfr => {
    const quarters = manufacturerQuarters[mfr];
    
    return {
      name: mfr,
      q1: calcQuarterAvg(quarters[1]),
      q2: calcQuarterAvg(quarters[2]),
      q3: calcQuarterAvg(quarters[3]),
      q4: calcQuarterAvg(quarters[4])
    };
  });
};

/**
 * Calculate quarter average price
 */
const calcQuarterAvg = (prices: number[]) => {
  if (prices.length === 0) return 0;
  return parseFloat((prices.reduce((sum, p) => sum + p, 0) / prices.length).toFixed(2));
};

/**
 * Generate manufacturer list with pricing details
 */
const generateManufacturerList = (
  data: { date: Date; price: number; manufacturer: string }[],
  manufacturers: string[],
  location: string
) => {
  // Group prices by manufacturer
  const manufacturerPrices: Record<string, number[]> = {};
  
  manufacturers.forEach(mfr => {
    manufacturerPrices[mfr] = [];
  });
  
  data.forEach(item => {
    manufacturerPrices[item.manufacturer].push(item.price);
  });
  
  // Calculate average price and trend for each manufacturer
  return manufacturers.map((mfr, index) => {
    const prices = manufacturerPrices[mfr];
    const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    
    // Simulate price trend (in a real app this would use historical data)
    const trendValue = ((Math.random() * 6) - 3).toFixed(1);
    const trend = trendValue.startsWith('-') ? trendValue : `+${trendValue}`;
    
    // Simulate lead time (in a real app this would be calculated from actual data)
    const leadTime = `${Math.floor(Math.random() * 10) + 8} days`;
    
    return {
      id: index + 1,
      name: mfr,
      price: parseFloat(avgPrice.toFixed(2)),
      trend: `${trend}%`,
      location: location || "Global",
      leadTime
    };
  });
};
