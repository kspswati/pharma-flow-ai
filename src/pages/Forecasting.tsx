
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader, Database } from "lucide-react";
import ForecastForm from '@/components/forecasting/ForecastForm';
import ForecastMetrics from '@/components/forecasting/ForecastMetrics';
import ForecastChart from '@/components/forecasting/ForecastChart';
import { toast } from "@/components/ui/use-toast";

const Forecasting = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  
  const handleForecast = () => {
    setShowResults(true);
  };
  
  const loadSampleData = async () => {
    try {
      setIsLoadingData(true);
      
      // Simulate loading sample data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Sample data loaded successfully",
        description: "You can now use the forecasting features with sample data",
      });
      
      // Automatically show results with sample data
      setShowResults(true);
    } catch (error) {
      console.error("Error loading sample data:", error);
      toast({
        title: "Error loading sample data",
        description: "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoadingData(false);
    }
  };
  
  return (
    <MainLayout title="Demand Forecasting" description="Predict and analyze product demand across markets">
      <div className="flex justify-end mb-6">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={loadSampleData}
          disabled={isLoadingData}
        >
          {isLoadingData ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          {isLoadingData ? "Loading Sample Data..." : "Load Sample Data"}
        </Button>
      </div>
      
      <ForecastForm
        onSubmit={handleForecast}
        selectedLocation={selectedLocation}
        selectedProduct={selectedProduct}
        selectedTimeFrame={selectedTimeFrame}
        setSelectedLocation={setSelectedLocation}
        setSelectedProduct={setSelectedProduct}
        setSelectedTimeFrame={setSelectedTimeFrame}
      />
      
      {showResults && (
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics">
            <ForecastMetrics product={selectedProduct} location={selectedLocation} />
          </TabsContent>
          
          <TabsContent value="visualization">
            <ForecastChart product={selectedProduct} location={selectedLocation} />
          </TabsContent>
        </Tabs>
      )}
    </MainLayout>
  );
};

export default Forecasting;
