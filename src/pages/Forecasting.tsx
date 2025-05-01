
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from "@/components/ui/use-toast";
import ForecastForm from '@/components/forecasting/ForecastForm';
import ForecastResults from '@/components/forecasting/ForecastResults';
import SampleDataButton from '@/components/forecasting/SampleDataButton';
import { generateForecast } from '@/services/forecastingService';
import { fetchFilterOptions } from '@/services/dataService';

const Forecasting = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("monthly");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [forecastData, setForecastData] = useState<any>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  
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
  
  const handleForecast = async () => {
    try {
      setIsLoadingData(true);
      
      const result = await generateForecast(
        selectedProduct,
        selectedLocation,
        selectedTimeFrame
      );
      
      setForecastData(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error generating forecast:", error);
      toast({
        title: "Forecast Error",
        description: error instanceof Error ? error.message : "Failed to generate forecast",
        variant: "destructive"
      });
    } finally {
      setIsLoadingData(false);
    }
  };
  
  const loadSampleData = async () => {
    try {
      setIsLoadingData(true);
      
      // Set some default values
      if (!selectedProduct && products.length > 0) {
        setSelectedProduct(products[0]);
      }
      
      if (!selectedLocation && locations.length > 0) {
        setSelectedLocation(locations[0]);
      }
      
      // Generate forecast with sample data
      const result = await generateForecast(
        selectedProduct || "Sample Product",
        selectedLocation || "Sample Location",
        selectedTimeFrame
      );
      
      setForecastData(result);
      setShowResults(true);
      
      toast({
        title: "Sample data loaded successfully",
        description: "You can now use the forecasting features with sample data",
      });
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
      <SampleDataButton isLoading={isLoadingData} onClick={loadSampleData} />
      
      <ForecastForm
        onSubmit={handleForecast}
        selectedLocation={selectedLocation}
        selectedProduct={selectedProduct}
        selectedTimeFrame={selectedTimeFrame}
        setSelectedLocation={setSelectedLocation}
        setSelectedProduct={setSelectedProduct}
        setSelectedTimeFrame={setSelectedTimeFrame}
        locations={locations}
        products={products}
        isLoading={isLoadingData}
      />
      
      <ForecastResults 
        showResults={showResults}
        forecastData={forecastData}
        selectedProduct={selectedProduct}
        selectedLocation={selectedLocation}
      />
    </MainLayout>
  );
};

export default Forecasting;
