
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader } from 'lucide-react';
import { fetchFilterOptions } from '@/services/dataService';
import { generatePricingAnalysis } from '@/services/pricingService';
import { toast } from '@/components/ui/use-toast';
import PricingPredictor from '@/components/pricing/PricingPredictor';

const Pricing = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [pricingData, setPricingData] = useState<any>(null);
  
  // Fetch filter options when component mounts
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filterOptions = await fetchFilterOptions();
        setLocations(filterOptions.countries);
        setProducts(filterOptions.productGroups);
      } catch (error) {
        console.error("Error fetching filter options:", error);
        toast({
          title: "Error",
          description: "Failed to load filter options",
          variant: "destructive"
        });
      }
    };
    
    fetchFilters();
  }, []);
  
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      
      const result = await generatePricingAnalysis(
        selectedProduct,
        selectedLocation
      );
      
      setPricingData(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error generating pricing analysis:", error);
      toast({
        title: "Pricing Analysis Error",
        description: error instanceof Error ? error.message : "Failed to generate pricing analysis",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout title="Price Prediction" description="Analyze and forecast pharmaceutical product pricing">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Search Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
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
              
              <Button 
                onClick={handleSearch} 
                disabled={!selectedLocation || !selectedProduct || isLoading}
                className="w-full bg-pharma-600 hover:bg-pharma-700"
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Search Manufacturers"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <PricingPredictor />
      </div>
      
      {showResults && pricingData && (
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
                  {pricingData.manufacturerList.sort((a: any, b: any) => a.price - b.price).map((manufacturer: any) => (
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
        </>
      )}
    </MainLayout>
  );
};

export default Pricing;
