
import { fetchPharmaData } from './dataService';
import { toast } from "@/components/ui/use-toast";

export interface FreightAnalysisResult {
  monthlyData: Array<{ 
    month: string; 
    air: number; 
    sea: number; 
    land: number;
  }>;
  vendorDistribution: Array<{
    name: string;
    value: number;
  }>;
  countryData: Array<{
    country: string;
    cost: number;
    volume: number;
  }>;
  summary: {
    airFreightAvg: number;
    seaFreightAvg: number;
    landFreightAvg: number;
    airFreightChange: number;
    seaFreightChange: number;
    landFreightChange: number;
  };
}

/**
 * Generate freight cost analysis
 */
export const generateFreightAnalysis = async (
  timeframe: string = 'yearly'
): Promise<FreightAnalysisResult> => {
  try {
    // Fetch data from Supabase
    const data = await fetchPharmaData();
    
    if (!data || data.length === 0) {
      toast({
        title: "Insufficient data",
        description: "Not enough data available for freight analysis",
        variant: "destructive"
      });
      throw new Error("Insufficient data for freight analysis");
    }
    
    // Process freight data
    return processFreightData(data, timeframe);
    
  } catch (error) {
    console.error("Error generating freight analysis:", error);
    toast({
      title: "Freight Analysis Error",
      description: error instanceof Error ? error.message : "Failed to generate freight analysis",
      variant: "destructive"
    });
    throw error;
  }
};

/**
 * Process freight data from raw database records
 */
const processFreightData = (data: any[], timeframe: string): FreightAnalysisResult => {
  // Filter valid freight data
  const validData = data
    .filter(item => item.delivered_to_client_date && item.shipment_mode)
    .map(item => ({
      date: new Date(item.delivered_to_client_date),
      cost: parseFloat(item.freight_cost_usd || "0"),
      mode: item.shipment_mode.toLowerCase(),
      vendor: item.vendor || "Unknown",
      country: item.country || "Unknown"
    }))
    .filter(item => !isNaN(item.cost) && item.cost >= 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  if (validData.length < 3) {
    throw new Error("Insufficient freight data points for analysis");
  }
  
  // Generate monthly freight data by mode
  const monthlyData = generateMonthlyFreightData(validData);
  
  // Generate vendor distribution
  const vendorDistribution = generateVendorDistribution(validData);
  
  // Generate country data
  const countryData = generateCountryData(validData);
  
  // Calculate summary statistics
  const summary = calculateFreightSummary(validData);
  
  return {
    monthlyData,
    vendorDistribution,
    countryData,
    summary
  };
};

/**
 * Generate monthly freight data by shipment mode
 */
const generateMonthlyFreightData = (data: { 
  date: Date; 
  cost: number; 
  mode: string; 
  vendor: string; 
  country: string;
}[]) => {
  const months: Record<string, { air: number[]; sea: number[]; land: number[] }> = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Initialize all months
  monthNames.forEach(month => {
    months[month] = { air: [], sea: [], land: [] };
  });
  
  // Group costs by month and mode
  data.forEach(item => {
    const month = monthNames[item.date.getMonth()];
    let mode: 'air' | 'sea' | 'land' = 'land';
    
    if (item.mode.includes('air')) {
      mode = 'air';
    } else if (item.mode.includes('sea') || item.mode.includes('ocean')) {
      mode = 'sea';
    }
    
    months[month][mode].push(item.cost);
  });
  
  // Calculate average cost per month and mode
  return monthNames.map(month => {
    const modeData = months[month];
    
    return {
      month,
      air: calculateAverage(modeData.air) || 0,
      sea: calculateAverage(modeData.sea) || 0,
      land: calculateAverage(modeData.land) || 0
    };
  });
};

/**
 * Generate vendor distribution for freight costs
 */
const generateVendorDistribution = (data: { 
  date: Date; 
  cost: number; 
  mode: string; 
  vendor: string; 
  country: string;
}[]) => {
  const vendorCosts: Record<string, number> = {};
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
  
  // Sum costs by vendor
  data.forEach(item => {
    if (!vendorCosts[item.vendor]) {
      vendorCosts[item.vendor] = 0;
    }
    vendorCosts[item.vendor] += item.cost;
  });
  
  // Calculate percentages and get top vendors
  const vendorEntries = Object.entries(vendorCosts)
    .map(([name, cost]) => ({
      name,
      value: Math.round((cost / totalCost) * 100)
    }))
    .sort((a, b) => b.value - a.value);
  
  // Get top 4 vendors and group the rest as "Others"
  const topVendors = vendorEntries.slice(0, 4);
  
  if (vendorEntries.length > 4) {
    const othersSum = vendorEntries.slice(4).reduce((sum, vendor) => sum + vendor.value, 0);
    topVendors.push({ name: "Others", value: othersSum });
  }
  
  return topVendors;
};

/**
 * Generate country data for freight costs
 */
const generateCountryData = (data: { 
  date: Date; 
  cost: number; 
  mode: string; 
  vendor: string; 
  country: string;
}[]) => {
  const countryData: Record<string, { costs: number[]; volume: number }> = {};
  
  // Group by country
  data.forEach(item => {
    if (!countryData[item.country]) {
      countryData[item.country] = { costs: [], volume: 0 };
    }
    countryData[item.country].costs.push(item.cost);
    countryData[item.country].volume += 1; // Count shipments as volume
  });
  
  // Calculate averages
  return Object.entries(countryData)
    .map(([country, { costs, volume }]) => ({
      country,
      cost: calculateAverage(costs),
      volume
    }))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 7); // Top 7 countries
};

/**
 * Calculate freight summary statistics
 */
const calculateFreightSummary = (data: { 
  date: Date; 
  cost: number; 
  mode: string; 
  vendor: string; 
  country: string;
}[]) => {
  // Get costs by mode
  const airCosts = data.filter(item => item.mode.includes('air')).map(item => item.cost);
  const seaCosts = data.filter(item => item.mode.includes('sea') || item.mode.includes('ocean')).map(item => item.cost);
  const landCosts = data.filter(item => 
    !item.mode.includes('air') && 
    !item.mode.includes('sea') && 
    !item.mode.includes('ocean')
  ).map(item => item.cost);
  
  // Calculate averages
  const airFreightAvg = calculateAverage(airCosts);
  const seaFreightAvg = calculateAverage(seaCosts);
  const landFreightAvg = calculateAverage(landCosts);
  
  // Simulate period-over-period changes
  // In a real app, this would compare current vs. previous period
  const airFreightChange = generateRandomPercentChange();
  const seaFreightChange = generateRandomPercentChange();
  const landFreightChange = generateRandomPercentChange();
  
  return {
    airFreightAvg,
    seaFreightAvg,
    landFreightAvg,
    airFreightChange,
    seaFreightChange,
    landFreightChange
  };
};

/**
 * Generate shipment mode analysis
 */
export const generateShipmentModeAnalysis = async () => {
  try {
    // Fetch data from Supabase
    const data = await fetchPharmaData();
    
    if (!data || data.length === 0) {
      toast({
        title: "Insufficient data",
        description: "Not enough data available for shipment mode analysis",
        variant: "destructive"
      });
      throw new Error("Insufficient data for shipment mode analysis");
    }
    
    // Process the data for shipment mode analysis
    return processShipmentModeData(data);
  } catch (error) {
    console.error("Error generating shipment mode analysis:", error);
    toast({
      title: "Shipment Mode Analysis Error",
      description: error instanceof Error ? error.message : "Failed to generate analysis",
      variant: "destructive"
    });
    throw error;
  }
};

/**
 * Process shipment mode data from raw database records
 */
const processShipmentModeData = (data: any[]) => {
  // Filter valid shipment data
  const validData = data
    .filter(item => item.delivered_to_client_date && item.shipment_mode)
    .map(item => ({
      date: new Date(item.delivered_to_client_date),
      mode: item.shipment_mode.toLowerCase(),
      cost: parseFloat(item.freight_cost_usd || "0")
    }))
    .filter(item => !isNaN(item.cost) && item.cost >= 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  if (validData.length < 3) {
    throw new Error("Insufficient shipment mode data points for analysis");
  }
  
  // Generate summary statistics
  const summary = calculateShipmentModeSummary(validData);
  
  // Generate distribution data
  const distribution = calculateModeDistribution(validData);
  
  // Generate monthly trend data
  const monthlyTrends = generateMonthlyShipmentTrends(validData);
  
  // Generate stacked monthly data
  const monthlyDistribution = generateMonthlyShipmentDistribution(validData);
  
  return {
    summary,
    distribution,
    monthlyTrends,
    monthlyDistribution
  };
};

/**
 * Calculate shipment mode summary statistics
 */
const calculateShipmentModeSummary = (data: { date: Date; mode: string; cost: number }[]) => {
  const totalShipments = data.length;
  
  // Count shipments by mode
  const modeCount = {
    air: data.filter(item => item.mode.includes('air')).length,
    ocean: data.filter(item => item.mode.includes('sea') || item.mode.includes('ocean')).length,
    truck: data.filter(item => 
      item.mode.includes('truck') || 
      item.mode.includes('land') || 
      (!item.mode.includes('air') && !item.mode.includes('sea') && !item.mode.includes('ocean'))
    ).length
  };
  
  // Calculate percentages
  const airPercentage = (modeCount.air / totalShipments) * 100;
  const oceanPercentage = (modeCount.ocean / totalShipments) * 100;
  const truckPercentage = (modeCount.truck / totalShipments) * 100;
  const unknownPercentage = 100 - (airPercentage + oceanPercentage + truckPercentage);
  
  // Calculate average delivery time (simulate for this example)
  const avgDeliveryTime = 12.5;
  const deliveryTimeChange = -1.2;
  
  return {
    totalShipments,
    airPercentage,
    oceanPercentage,
    truckPercentage,
    unknownPercentage,
    avgDeliveryTime,
    deliveryTimeChange,
    airChange: generateRandomPercentChange(),
    oceanChange: generateRandomPercentChange(),
    truckChange: generateRandomPercentChange()
  };
};

/**
 * Calculate mode distribution for pie chart
 */
const calculateModeDistribution = (data: { date: Date; mode: string; cost: number }[]) => {
  const modeCount = {
    air: data.filter(item => item.mode.includes('air')).length,
    ocean: data.filter(item => item.mode.includes('sea') || item.mode.includes('ocean')).length,
    truck: data.filter(item => 
      !item.mode.includes('air') && 
      !item.mode.includes('sea') && 
      !item.mode.includes('ocean')
    ).length
  };
  
  const total = modeCount.air + modeCount.ocean + modeCount.truck;
  
  return [
    { name: 'Air', value: Math.round((modeCount.air / total) * 100) },
    { name: 'Ocean', value: Math.round((modeCount.ocean / total) * 100) },
    { name: 'Truck', value: Math.round((modeCount.truck / total) * 100) }
  ];
};

/**
 * Generate monthly shipment trends by mode
 */
const generateMonthlyShipmentTrends = (data: { date: Date; mode: string; cost: number }[]) => {
  const months: Record<string, { air: number; ocean: number; truck: number }> = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Initialize all months
  monthNames.forEach(month => {
    months[month] = { air: 0, ocean: 0, truck: 0 };
  });
  
  // Count shipments by month and mode
  data.forEach(item => {
    const month = monthNames[item.date.getMonth()];
    
    if (item.mode.includes('air')) {
      months[month].air += 1;
    } else if (item.mode.includes('sea') || item.mode.includes('ocean')) {
      months[month].ocean += 1;
    } else {
      months[month].truck += 1;
    }
  });
  
  // Convert to array format for charts
  return monthNames.map(month => ({
    month,
    air: months[month].air,
    ocean: months[month].ocean,
    truck: months[month].truck
  }));
};

/**
 * Generate monthly shipment distribution (stacked) by mode
 */
const generateMonthlyShipmentDistribution = (data: { date: Date; mode: string; cost: number }[]) => {
  // This uses the same data as generateMonthlyShipmentTrends
  // but is formatted slightly differently for the stacked bar chart
  return generateMonthlyShipmentTrends(data);
};

/**
 * Calculate average of an array of numbers
 */
const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return parseFloat((values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2));
};

/**
 * Generate a random percentage change for demonstration
 */
const generateRandomPercentChange = (): number => {
  return parseFloat(((Math.random() * 30) - 10).toFixed(1));
};
