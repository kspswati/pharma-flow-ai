
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader } from 'lucide-react';
import { generateShipmentModeAnalysis } from '@/services/freightService';
import { toast } from '@/components/ui/use-toast';

const ShipmentModeAnalysis = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("monthly");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shipmentData, setShipmentData] = useState<any>(null);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  useEffect(() => {
    const loadShipmentData = async () => {
      try {
        setIsLoading(true);
        
        const result = await generateShipmentModeAnalysis();
        setShipmentData(result);
      } catch (error) {
        console.error("Error loading shipment mode data:", error);
        toast({
          title: "Error",
          description: "Failed to load shipment mode analysis data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadShipmentData();
  }, []);
  
  if (isLoading) {
    return (
      <MainLayout title="Shipment Mode Analysis" description="Analyze pharmaceutical shipments by mode of transport">
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 animate-spin text-pharma-600" />
          <span className="ml-2 text-lg">Loading shipment mode data...</span>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title="Shipment Mode Analysis" description="Analyze pharmaceutical shipments by mode of transport">
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2 w-full md:w-64">
          <label className="text-sm font-medium">Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 w-full md:w-64">
          <label className="text-sm font-medium">Time Frame</label>
          <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
            <SelectTrigger>
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {shipmentData && (
        <>
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipmentData.summary.totalShipments.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">From selected time period</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Air Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipmentData.summary.airPercentage.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {shipmentData.summary.airChange > 0 ? '+' : ''}
                  {shipmentData.summary.airChange}% from last year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ocean Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipmentData.summary.oceanPercentage.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {shipmentData.summary.oceanChange > 0 ? '+' : ''}
                  {shipmentData.summary.oceanChange}% from last year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Truck Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipmentData.summary.truckPercentage.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {shipmentData.summary.truckChange > 0 ? '+' : ''}
                  {shipmentData.summary.truckChange}% from last year
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipmentData.summary.avgDeliveryTime} days</div>
                <p className="text-xs text-muted-foreground">
                  {shipmentData.summary.deliveryTimeChange > 0 ? '+' : ''}
                  {shipmentData.summary.deliveryTimeChange} days from last year
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Shipment Distribution Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Mode Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={shipmentData.distribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {shipmentData.distribution.map((entry: any, index: number) => (
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
            
            <Card>
              <CardHeader>
                <CardTitle>Shipment Trends by Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={shipmentData.monthlyTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="air" stroke="#0088FE" name="Air" />
                      <Line type="monotone" dataKey="ocean" stroke="#00C49F" name="Ocean" />
                      <Line type="monotone" dataKey="truck" stroke="#FFBB28" name="Truck" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Monthly Distribution by Mode */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Monthly Shipment Distribution by Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={shipmentData.monthlyDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="air" name="Air" fill="#0088FE" stackId="a" />
                    <Bar dataKey="ocean" name="Ocean" fill="#00C49F" stackId="a" />
                    <Bar dataKey="truck" name="Truck" fill="#FFBB28" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </MainLayout>
  );
};

export default ShipmentModeAnalysis;
