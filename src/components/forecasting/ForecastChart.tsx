
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  date: string;
  value: number;
}

interface ForecastChartProps {
  product?: string;
  location?: string;
  historical?: DataPoint[];
  forecast?: DataPoint[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ 
  product, 
  location,
  historical = [],
  forecast = []
}) => {
  // Combine historical and forecast data for the chart
  const chartData = [
    ...historical.map(item => ({
      date: item.date,
      actual: item.value,
      forecast: null
    })),
    ...forecast.map(item => ({
      date: item.date,
      actual: null,
      forecast: item.value
    }))
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {product ? `Demand Forecast for ${product}` : 'Demand Forecast Trend'}
          {location ? ` in ${location}` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
