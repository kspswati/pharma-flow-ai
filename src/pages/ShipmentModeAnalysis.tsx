
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for shipment mode analysis
const shipmentData = [
  { month: 'Jan', air: 28, ocean: 45, truck: 27 },
  { month: 'Feb', air: 30, ocean: 43, truck: 27 },
  { month: 'Mar', air: 32, ocean: 40, truck: 28 },
  { month: 'Apr', air: 34, ocean: 38, truck: 28 },
  { month: 'May', air: 36, ocean: 35, truck: 29 },
  { month: 'Jun', air: 38, ocean: 33, truck: 29 },
  { month: 'Jul', air: 40, ocean: 30, truck: 30 },
  { month: 'Aug', air: 39, ocean: 31, truck: 30 },
  { month: 'Sep', air: 38, ocean: 32, truck: 30 },
  { month: 'Oct', air: 37, ocean: 33, truck: 30 },
  { month: 'Nov', air: 36, ocean: 34, truck: 30 },
  { month: 'Dec', air: 35, ocean: 35, truck: 30 },
];

const pieData = [
  { name: 'Air', value: 35 },
  { name: 'Ocean', value: 40 },
  { name: 'Truck', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ShipmentModeAnalysis = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("monthly");
  
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
      
      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+8% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Air Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35%</div>
            <p className="text-xs text-muted-foreground">+5% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ocean Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40%</div>
            <p className="text-xs text-muted-foreground">-3% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Truck Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground">-2% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 days</div>
            <p className="text-xs text-muted-foreground">-1.2 days from last year</p>
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
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
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
                  data={shipmentData}
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
                data={shipmentData}
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
    </MainLayout>
  );
};

export default ShipmentModeAnalysis;
