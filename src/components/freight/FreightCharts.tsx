
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FreightChartsProps {
  freightData: {
    monthlyData: any[];
    vendorDistribution: any[];
    countryData: any[];
  };
}

const FreightCharts: React.FC<FreightChartsProps> = ({ freightData }) => {
  // Colors for pie chart
  const COLORS = ['#0ea5e9', '#8b5cf6', '#f97316', '#10b981', '#a855f7'];
  
  return (
    <Tabs defaultValue="trends" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="trends">Cost Trends</TabsTrigger>
        <TabsTrigger value="comparison">Mode Comparison</TabsTrigger>
        <TabsTrigger value="vendors">Vendor Analysis</TabsTrigger>
        <TabsTrigger value="countries">Country Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="trends">
        <Card>
          <CardHeader>
            <CardTitle>Freight Cost Trends by Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={freightData.monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="air" name="Air Freight" stroke="#0ea5e9" strokeWidth={2} />
                  <Line type="monotone" dataKey="sea" name="Sea Freight" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="land" name="Land Freight" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="comparison">
        <Card>
          <CardHeader>
            <CardTitle>Freight Cost Comparison by Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={freightData.monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Bar dataKey="air" name="Air Freight" fill="#0ea5e9" />
                  <Bar dataKey="sea" name="Sea Freight" fill="#8b5cf6" />
                  <Bar dataKey="land" name="Land Freight" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="vendors">
        <Card>
          <CardHeader>
            <CardTitle>Freight Cost Distribution by Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={freightData.vendorDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${percent}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {freightData.vendorDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="countries">
        <Card>
          <CardHeader>
            <CardTitle>Freight Costs by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={freightData.countryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="country" type="category" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Bar dataKey="cost" name="Average Cost (USD)" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default FreightCharts;
