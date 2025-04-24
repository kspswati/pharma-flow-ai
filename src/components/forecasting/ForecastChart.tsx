
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const forecastData = [
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
];

const ForecastChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demand Forecast Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={forecastData}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
