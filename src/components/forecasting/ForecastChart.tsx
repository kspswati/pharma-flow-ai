
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ForecastDataPoint {
  month: string;
  actual: number | null;
  forecast: number;
}

interface ForecastChartProps {
  product?: string;
  location?: string;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ForecastChart: React.FC<ForecastChartProps> = ({ product, location }) => {
  const [chartData, setChartData] = useState<ForecastDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch product ID if product name is provided
        let productId = null;
        if (product) {
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('id')
            .eq('name', product)
            .single();
            
          if (productError) throw productError;
          if (productData) productId = productData.id;
        }
        
        // Fetch forecast data
        let query = supabase
          .from('forecast_data')
          .select('date, actual_value, predicted_value')
          .eq('forecast_type', 'demand')
          .order('date');
          
        if (productId) {
          query = query.eq('product_id', productId);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform data for the chart
          const transformedData = data.map(item => {
            const date = new Date(item.date);
            return {
              month: monthNames[date.getMonth()],
              date: item.date, // Keep original date for sorting
              actual: item.actual_value,
              forecast: item.predicted_value
            };
          });
          
          // Sort by original date
          transformedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          // Remove the date property used for sorting
          const finalData = transformedData.map(({ date, ...rest }) => rest);
          
          setChartData(finalData);
        } else {
          // Fallback to default data if no data found
          setChartData([
            { month: 'Jan', actual: 400, forecast: 420 },
            { month: 'Feb', actual: 450, forecast: 460 },
            { month: 'Mar', actual: 520, forecast: 500 },
            { month: 'Apr', actual: 580, forecast: 590 },
            { month: 'May', actual: 600, forecast: 620 },
            { month: 'Jun', actual: 650, forecast: 680 },
            { month: 'Jul', actual: 680, forecast: 700 },
            { month: 'Aug', actual: null, forecast: 730 },
            { month: 'Sep', actual: null, forecast: 760 },
            { month: 'Oct', actual: null, forecast: 800 },
            { month: 'Nov', actual: null, forecast: 820 },
            { month: 'Dec', actual: null, forecast: 840 },
          ]);
        }
      } catch (err) {
        console.error('Error fetching forecast data:', err);
        setError('Failed to load forecast data. Using fallback data instead.');
        // Use fallback data
        setChartData([
          { month: 'Jan', actual: 400, forecast: 420 },
          { month: 'Feb', actual: 450, forecast: 460 },
          { month: 'Mar', actual: 520, forecast: 500 },
          { month: 'Apr', actual: 580, forecast: 590 },
          { month: 'May', actual: 600, forecast: 620 },
          { month: 'Jun', actual: 650, forecast: 680 },
          { month: 'Jul', actual: 680, forecast: 700 },
          { month: 'Aug', actual: null, forecast: 730 },
          { month: 'Sep', actual: null, forecast: 760 },
          { month: 'Oct', actual: null, forecast: 800 },
          { month: 'Nov', actual: null, forecast: 820 },
          { month: 'Dec', actual: null, forecast: 840 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecastData();
  }, [product, location]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {product ? `Demand Forecast for ${product}` : 'Demand Forecast Trend'}
          {location ? ` in ${location}` : ''}
        </CardTitle>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Demand"
                  stroke="#0284c7"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  name="Forecasted Demand"
                  stroke="#0ea5e9"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
