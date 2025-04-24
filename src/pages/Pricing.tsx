
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for demonstration
const locations = ["United States", "India", "Germany", "Japan", "Brazil", "United Kingdom"];
const products = ["Amoxicillin", "Lipitor", "Metformin", "Advil", "Prozac", "Insulin"];

const manufacturersData = [
  { id: 1, name: "Pharma Co. Ltd", price: 42.50, trend: "+2.1%", location: "Germany", leadTime: "12 days" },
  { id: 2, name: "MediGen Inc.", price: 38.75, trend: "-1.3%", location: "United States", leadTime: "14 days" },
  { id: 3, name: "BioHealth", price: 40.20, trend: "+0.8%", location: "India", leadTime: "18 days" },
  { id: 4, name: "PharmaGlobal", price: 43.10, trend: "+3.5%", location: "Switzerland", leadTime: "10 days" },
  { id: 5, name: "RxMakers", price: 37.60, trend: "-2.1%", location: "Japan", leadTime: "15 days" },
];

const priceHistoryData = [
  { month: 'Jan', price: 35.2 },
  { month: 'Feb', price: 36.5 },
  { month: 'Mar', price: 38.1 },
  { month: 'Apr', price: 39.4 },
  { month: 'May', price: 41.2 },
  { month: 'Jun', price: 40.8 },
  { month: 'Jul', price: 42.5 },
  { month: 'Aug', price: 42.1 },
  { month: 'Sep', price: 43.6 },
  { month: 'Oct', price: 44.2 },
  { month: 'Nov', price: 43.8 },
  { month: 'Dec', price: 45.1 },
];

const manufacturerComparisonData = [
  { name: "Pharma Co. Ltd", q1: 41.2, q2: 42.1, q3: 42.5, q4: 43.8 },
  { name: "MediGen Inc.", q1: 39.8, q2: 38.9, q3: 38.7, q4: 39.1 },
  { name: "BioHealth", q1: 40.5, q2: 40.1, q3: 40.2, q4: 41.3 },
  { name: "PharmaGlobal", q1: 42.1, q2: 42.5, q3: 43.1, q4: 43.8 },
  { name: "RxMakers", q1: 38.2, q2: 37.8, q3: 37.6, q4: 38.1 },
];

const Pricing = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const handleSearch = () => {
    // In a real app, this would call an API to get the data
    setShowResults(true);
  };
  
  return (
    <MainLayout title="Price Prediction" description="Analyze and forecast pharmaceutical product pricing">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Parameters</CardTitle>
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
              <label className="text-sm font-medium">&nbsp;</label>
              <Button 
                onClick={handleSearch} 
                disabled={!selectedLocation || !selectedProduct}
                className="w-full bg-pharma-600 hover:bg-pharma-700"
              >
                Search Manufacturers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Manufacturer Pricing for {selectedProduct} in {selectedLocation}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Manufacturer</TableHead>
                    <TableHead>Price (USD)</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Lead Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manufacturersData.sort((a, b) => a.price - b.price).map(manufacturer => (
                    <TableRow key={manufacturer.id}>
                      <TableCell className="font-medium">{manufacturer.name}</TableCell>
                      <TableCell>${manufacturer.price.toFixed(2)}</TableCell>
                      <TableCell className={manufacturer.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {manufacturer.trend}
                      </TableCell>
                      <TableCell>{manufacturer.location}</TableCell>
                      <TableCell>{manufacturer.leadTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
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
                        data={priceHistoryData}
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
                        data={manufacturerComparisonData}
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
        </>
      )}
    </MainLayout>
  );
};

export default Pricing;
