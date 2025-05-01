
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for freight cost analysis
const freightData = [
  { month: 'Jan', air: 1250, sea: 400, land: 650 },
  { month: 'Feb', air: 1300, sea: 390, land: 680 },
  { month: 'Mar', air: 1400, sea: 420, land: 700 },
  { month: 'Apr', air: 1350, sea: 450, land: 710 },
  { month: 'May', air: 1500, sea: 470, land: 690 },
  { month: 'Jun', air: 1600, sea: 480, land: 730 },
  { month: 'Jul', air: 1750, sea: 460, land: 750 },
  { month: 'Aug', air: 1850, sea: 450, land: 780 },
  { month: 'Sep', air: 1700, sea: 440, land: 770 },
  { month: 'Oct', air: 1600, sea: 430, land: 760 },
  { month: 'Nov', air: 1550, sea: 460, land: 740 },
  { month: 'Dec', air: 1450, sea: 490, land: 720 },
];

const vendorData = [
  { name: 'Vendor A', value: 35 },
  { name: 'Vendor B', value: 25 },
  { name: 'Vendor C', value: 20 },
  { name: 'Vendor D', value: 15 },
  { name: 'Others', value: 5 },
];

const countryData = [
  { country: 'USA', cost: 1500, volume: 450 },
  { country: 'Germany', cost: 1200, volume: 380 },
  { country: 'India', cost: 800, volume: 520 },
  { country: 'China', cost: 950, volume: 600 },
  { country: 'Brazil', cost: 1100, volume: 320 },
  { country: 'UK', cost: 1300, volume: 280 },
  { country: 'Japan', cost: 1400, volume: 240 },
];

const FreightAnalysis = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("yearly");
  
  return (
    <MainLayout title="Freight Cost Analysis" description="Analyze freight costs across different modes of transportation and vendors">
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2 w-full md:w-64">
          <label className="text-sm font-medium">Time Period</label>
          <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
            <SelectTrigger>
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Air Freight Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,525.00</div>
            <p className="text-xs text-muted-foreground">+15% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sea Freight Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$445.00</div>
            <p className="text-xs text-muted-foreground">+5% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Land Freight Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$723.33</div>
            <p className="text-xs text-muted-foreground">+8% from previous period</p>
          </CardContent>
        </Card>
      </div>
      
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
                    data={freightData}
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
                    data={freightData}
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
                      data={vendorData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {vendorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0ea5e9', '#8b5cf6', '#f97316', '#10b981', '#a855f7'][index % 5]} />
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
                    data={countryData}
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
    </MainLayout>
  );
};

export default FreightAnalysis;
