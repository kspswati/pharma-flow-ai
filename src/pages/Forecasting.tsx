import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const locations = ["United States", "India", "Germany", "Japan", "Brazil", "United Kingdom"];
const products = ["Amoxicillin", "Lipitor", "Metformin", "Advil", "Prozac", "Insulin"];
const timeFrames = [
  "Next 2 months",
  "Next 3 months",
  "Q2 2025",
  "Q3 2025",
  "Q4 2025",
  "Full Year 2025"
];

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

const Forecasting = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const handleForecast = () => {
    setShowResults(true);
  };
  
  return (
    <MainLayout title="Demand Forecasting" description="Predict and analyze product demand across markets">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Forecast Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Product</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Frame</label>
              <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  {timeFrames.map(timeFrame => (
                    <SelectItem key={timeFrame} value={timeFrame}>{timeFrame}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleForecast} 
                disabled={!selectedLocation || !selectedProduct || !selectedTimeFrame}
                className="w-full bg-pharma-600 hover:bg-pharma-700"
              >
                Generate Forecast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <>
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle>Forecast Metrics for {selectedProduct} in {selectedLocation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Lead Time</TableCell>
                        <TableCell>14 days</TableCell>
                        <TableCell className="text-green-600">Normal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Available Quantity</TableCell>
                        <TableCell>8,500 units</TableCell>
                        <TableCell className="text-amber-600">Below Forecast</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Manufacturing Location</TableCell>
                        <TableCell>Berlin, Germany</TableCell>
                        <TableCell>Primary Facility</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Forecast Accuracy (Last Period)</TableCell>
                        <TableCell>92%</TableCell>
                        <TableCell className="text-green-600">Good</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Safety Stock</TableCell>
                        <TableCell>2,000 units</TableCell>
                        <TableCell className="text-green-600">Adequate</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="visualization">
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
            </TabsContent>
          </Tabs>
        </>
      )}
    </MainLayout>
  );
};

export default Forecasting;
