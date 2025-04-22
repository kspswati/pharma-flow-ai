
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/dashboard/StatCard';
import ForecastChart from '@/components/dashboard/ForecastChart';
import DistributionMap from '@/components/dashboard/DistributionMap';
import PricingPredictor from '@/components/pricing/PricingPredictor';
import ChatInterface from '@/components/ui/chatbot/ChatInterface';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your pharmaceutical operations</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Products"
              value="128"
              description="Active pharmaceutical products"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title="Distribution Efficiency"
              value="87%"
              description="Overall network efficiency"
              trend={{ value: 4, isPositive: true }}
            />
            <StatCard 
              title="Avg. Lead Time"
              value="4.2 days"
              description="Order to delivery time"
              trend={{ value: 0.5, isPositive: false }}
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
          
          {/* Pricing Predictor and Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PricingPredictor />
            <div>
              <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
              <ChatInterface />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
