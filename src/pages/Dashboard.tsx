
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import ForecastChart from '@/components/dashboard/ForecastChart';
import DistributionMap from '@/components/dashboard/DistributionMap';
import EnhancedChatInterface from '@/components/ui/chatbot/EnhancedChatInterface';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Clock, Package, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard" description="Overview of your pharmaceutical supply chain operations">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Products"
          value="128"
          description="Active pharmaceutical products"
          trend={{ value: 12, isPositive: true }}
          icon={<Package className="h-4 w-4" />}
        />
        <StatCard 
          title="Distribution Efficiency"
          value="87%"
          description="Overall network efficiency"
          trend={{ value: 4, isPositive: true }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard 
          title="Avg. Lead Time"
          value="4.2 days"
          description="Order to delivery time"
          trend={{ value: 0.5, isPositive: false }}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard 
          title="Forecasting Accuracy"
          value="92.3%"
          description="Last 30 day average"
          trend={{ value: 1.8, isPositive: true }}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ForecastChart 
          title="Demand Forecast" 
          description="Predicted demand for all products over the next 6 months"
        />
        <DistributionMap />
      </div>
      
      {/* Performance Metrics and Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Inventory Turnover Rate</span>
                  <span className="text-sm font-mono">8.2</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-pharma-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target: 9.0</span>
                  <span className="flex items-center text-amber-500">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    8.9% below target
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Perfect Order Rate</span>
                  <span className="text-sm font-mono">94.6%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-pharma-600 h-2 rounded-full" style={{ width: '94.6%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target: 95%</span>
                  <span className="flex items-center text-amber-500">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    0.4% below target
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Supplier On-Time Delivery</span>
                  <span className="text-sm font-mono">96.8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-pharma-600 h-2 rounded-full" style={{ width: '96.8%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target: 95%</span>
                  <span className="flex items-center text-green-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    1.8% above target
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fulfillment Cycle Time</span>
                  <span className="text-sm font-mono">2.3 days</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-pharma-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target: 2.5 days</span>
                  <span className="flex items-center text-green-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    8% faster than target
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <EnhancedChatInterface />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
