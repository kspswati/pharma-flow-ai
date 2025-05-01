
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PricingChartsProps {
  selectedProduct: string;
  pricingData: {
    trends: any[];
    manufacturerComparison: any[];
  };
}

const PricingCharts: React.FC<PricingChartsProps> = ({
  selectedProduct,
  pricingData
}) => {
  return (
    <Tabs defaultValue="history" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="history">Price History</TabsTrigger>
        <TabsTrigger value="comparison">Manufacturer Comparison</TabsTrigger>
      </TabsList>
      
      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Price Trend for {selectedProduct}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pricingData.trends}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                    formatter={(value) => [`$${value}`, 'Price']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#0ea5e9" 
                    fill="#0ea5e9" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="comparison">
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Price Comparison by Manufacturer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pricingData.manufacturerComparison}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Bar dataKey="q1" name="Q1 Price" fill="#0284c7" />
                  <Bar dataKey="q2" name="Q2 Price" fill="#0ea5e9" />
                  <Bar dataKey="q3" name="Q3 Price" fill="#38bdf8" />
                  <Bar dataKey="q4" name="Q4 Price" fill="#7dd3fc" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PricingCharts;
