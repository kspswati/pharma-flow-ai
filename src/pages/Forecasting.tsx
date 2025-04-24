
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForecastForm from '@/components/forecasting/ForecastForm';
import ForecastMetrics from '@/components/forecasting/ForecastMetrics';
import ForecastChart from '@/components/forecasting/ForecastChart';

const Forecasting = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const handleForecast = () => {
    setShowResults(true);
  };
  
  return (
    <MainLayout title="Demand Forecasting" description="Predict and analyze product demand across markets">
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
            <ForecastChart />
          </TabsContent>
        </Tabs>
      )}
    </MainLayout>
  );
};

export default Forecasting;
