
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Loader } from 'lucide-react';
import { generateShipmentModeAnalysis } from '@/services/freightService';
import { toast } from '@/components/ui/use-toast';
import ShipmentModeFilters from '@/components/shipment/ShipmentModeFilters';
import ShipmentModeSummary from '@/components/shipment/ShipmentModeSummary';
import ShipmentModeCharts from '@/components/shipment/ShipmentModeCharts';

const ShipmentModeAnalysis = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("monthly");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shipmentData, setShipmentData] = useState<any>(null);
  
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
      <ShipmentModeFilters
        selectedYear={selectedYear}
        selectedTimeFrame={selectedTimeFrame}
        setSelectedYear={setSelectedYear}
        setSelectedTimeFrame={setSelectedTimeFrame}
      />
      
      {shipmentData && (
        <>
          <ShipmentModeSummary summary={shipmentData.summary} />
          
          <ShipmentModeCharts
            distribution={shipmentData.distribution}
            monthlyTrends={shipmentData.monthlyTrends}
            monthlyDistribution={shipmentData.monthlyDistribution}
          />
        </>
      )}
    </MainLayout>
  );
};

export default ShipmentModeAnalysis;
