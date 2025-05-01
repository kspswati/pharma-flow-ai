
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from 'lucide-react';
import { generateFreightAnalysis } from '@/services/freightService';
import { toast } from '@/components/ui/use-toast';
import FreightSummary from '@/components/freight/FreightSummary';
import FreightCharts from '@/components/freight/FreightCharts';

const FreightAnalysis = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("yearly");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [freightData, setFreightData] = useState<any>(null);
  
  // Load data when component mounts or timeframe changes
  useEffect(() => {
    const loadFreightData = async () => {
      try {
        setIsLoading(true);
        
        const result = await generateFreightAnalysis(selectedTimeFrame);
        setFreightData(result);
      } catch (error) {
        console.error("Error loading freight data:", error);
        toast({
          title: "Error",
          description: "Failed to load freight analysis data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFreightData();
  }, [selectedTimeFrame]);
  
  if (isLoading) {
    return (
      <MainLayout title="Freight Cost Analysis" description="Analyze freight costs across different modes of transportation and vendors">
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 animate-spin text-pharma-600" />
          <span className="ml-2 text-lg">Loading freight analysis data...</span>
        </div>
      </MainLayout>
    );
  }
  
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
      
      {freightData && (
        <>
          <FreightSummary summary={freightData.summary} />
          <FreightCharts freightData={freightData} />
        </>
      )}
    </MainLayout>
  );
};

export default FreightAnalysis;
