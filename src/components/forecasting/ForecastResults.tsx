
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForecastMetrics from '@/components/forecasting/ForecastMetrics';
import ForecastChart from '@/components/forecasting/ForecastChart';

interface ForecastResultsProps {
  showResults: boolean;
  forecastData: any;
  selectedProduct: string;
  selectedLocation: string;
}

const ForecastResults: React.FC<ForecastResultsProps> = ({
  showResults,
  forecastData,
  selectedProduct,
  selectedLocation
}) => {
  if (!showResults || !forecastData) return null;
  
  return (
    <Tabs defaultValue="metrics" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
      </TabsList>
      
      <TabsContent value="metrics">
        <ForecastMetrics 
          product={selectedProduct} 
          location={selectedLocation} 
          metrics={forecastData.metrics}
        />
      </TabsContent>
      
      <TabsContent value="visualization">
        <ForecastChart 
          product={selectedProduct} 
          location={selectedLocation} 
          historical={forecastData.historical}
          forecast={forecastData.forecast}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ForecastResults;
