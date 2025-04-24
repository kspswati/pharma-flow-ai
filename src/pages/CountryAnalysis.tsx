
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const countries = ["United States", "India", "Germany", "Japan", "Brazil", "United Kingdom", "China", "France", "Italy", "Canada"];
const products = ["Amoxicillin", "Lipitor", "Metformin", "Advil", "Prozac", "Insulin"];

const countryDemandData = [
  { product: "Amoxicillin", demand: 125000, growth: "+8.2%", trend: "Increasing" },
  { product: "Lipitor", demand: 89000, growth: "+3.5%", trend: "Stable" },
  { product: "Metformin", demand: 152000, growth: "+12.1%", trend: "Rapidly Increasing" },
  { product: "Advil", demand: 98000, growth: "-1.2%", trend: "Slight Decline" },
  { product: "Prozac", demand: 45000, growth: "+2.3%", trend: "Stable" },
  { product: "Insulin", demand: 76000, growth: "+5.7%", trend: "Increasing" },
];

const manufacturingSources = [
  { id: 1, product: "Amoxicillin", location: "Berlin, Germany", capacity: "250,000 units", utilization: "82%" },
  { id: 2, product: "Lipitor", location: "New Jersey, USA", capacity: "180,000 units", utilization: "74%" },
  { id: 3, product: "Metformin", location: "Hyderabad, India", capacity: "320,000 units", utilization: "91%" },
  { id: 4, product: "Advil", location: "Ontario, Canada", capacity: "210,000 units", utilization: "68%" },
  { id: 5, product: "Prozac", location: "Lyon, France", capacity: "120,000 units", utilization: "79%" },
  { id: 6, product: "Insulin", location: "Shanghai, China", capacity: "190,000 units", utilization: "86%" },
];

const deliveryTimeData = [
  { source: "Berlin, Germany", time: 14, express: 7 },
  { source: "New Jersey, USA", time: 12, express: 5 },
  { source: "Hyderabad, India", time: 18, express: 9 },
  { source: "Ontario, Canada", time: 13, express: 6 },
  { source: "Lyon, France", time: 15, express: 7 },
  { source: "Shanghai, China", time: 20, express: 10 },
];

const CountryAnalysis = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const handleAnalyze = () => {
    // In a real app, this would call an API to get the data
    setShowResults(true);
  };
  
  // Find manufacturing source for selected product
  const getManufacturingSource = () => {
    return manufacturingSources.find(source => source.product === selectedProduct);
  };
  
  // Graph data for delivery times
  const getDeliveryTimeData = () => {
    const source = getManufacturingSource();
    if (!source) return [];
    
    return deliveryTimeData.filter(item => item.source === source.location);
  };
  
  return (
    <MainLayout title="Country-Specific Analysis" description="Analyze demand and logistics by country">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analysis Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
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
                onClick={handleAnalyze} 
                disabled={!selectedCountry || !selectedProduct}
                className="w-full bg-pharma-600 hover:bg-pharma-700"
              >
                Analyze
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Demand in {selectedCountry}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Monthly Demand (Units)</TableHead>
                    <TableHead>YoY Growth</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countryDemandData.filter(item => item.product === selectedProduct).map(item => (
                    <TableRow key={item.product}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.demand.toLocaleString()}</TableCell>
                      <TableCell className={item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {item.growth}
                      </TableCell>
                      <TableCell>{item.trend}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Manufacturing Source</h3>
                {getManufacturingSource() && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead>Production Capacity</TableHead>
                        <TableHead>Utilization</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">{getManufacturingSource()?.location}</TableCell>
                        <TableCell>{getManufacturingSource()?.capacity}</TableCell>
                        <TableCell>{getManufacturingSource()?.utilization}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Time to {selectedCountry}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getDeliveryTimeData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="time" name="Standard Shipping (days)" fill="#0284c7" />
                    <Bar dataKey="express" name="Express Shipping (days)" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-2 p-4 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium">Delivery Notes</h3>
                <p className="text-sm">
                  Shipping from {getManufacturingSource()?.location} to {selectedCountry} typically takes {getDeliveryTimeData()[0]?.time} days via standard shipping.
                </p>
                <p className="text-sm">
                  Express shipping options are available at premium rates, reducing delivery time to {getDeliveryTimeData()[0]?.express} days.
                </p>
                <p className="text-sm text-amber-600">
                  Note: Delivery times may be affected by customs clearance procedures and local regulations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </MainLayout>
  );
};

export default CountryAnalysis;
