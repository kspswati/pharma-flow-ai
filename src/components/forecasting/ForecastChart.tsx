
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        
        // Instead of querying Supabase database tables that aren't yet defined in types,
        // we're using fallback sample data for now
        
        // Generate sample data based on product name to give variety
        const baseValue = product ? 
          (product.length * 100) + 300 : 
          500;
        
        // Mock data that simulates past actual and future forecast data
        const mockData = [
          { month: 'Jan', actual: baseValue, forecast: baseValue + 20 },
          { month: 'Feb', actual: baseValue + 50, forecast: baseValue + 60 },
          { month: 'Mar', actual: baseValue + 120, forecast: baseValue + 100 },
          { month: 'Apr', actual: baseValue + 180, forecast: baseValue + 190 },
          { month: 'May', actual: baseValue + 200, forecast: baseValue + 220 },
          { month: 'Jun', actual: baseValue + 250, forecast: baseValue + 280 },
          { month: 'Jul', actual: baseValue + 280, forecast: baseValue + 300 },
          // Future months (no actual data, only forecast)
          { month: 'Aug', actual: null, forecast: baseValue + 330 },
          { month: 'Sep', actual: null, forecast: baseValue + 360 },
          { month: 'Oct', actual: null, forecast: baseValue + 400 },
          { month: 'Nov', actual: null, forecast: baseValue + 420 },
          { month: 'Dec', actual: null, forecast: baseValue + 440 },
        ];
        
        setChartData(mockData);
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
