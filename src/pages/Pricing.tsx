
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { fetchFilterOptions } from '@/services/dataService';
import { generatePricingAnalysis } from '@/services/pricingService';
import { toast } from '@/components/ui/use-toast';
import PricingSearch from '@/components/pricing/PricingSearch';
import PricingPredictor from '@/components/pricing/PricingPredictor';
import ManufacturerTable from '@/components/pricing/ManufacturerTable';
import PricingCharts from '@/components/pricing/PricingCharts';

const Pricing = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [pricingData, setPricingData] = useState<any>(null);
  
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
  
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      
      const result = await generatePricingAnalysis(
        selectedProduct,
        selectedLocation
      );
      
      setPricingData(result);
      setShowResults(true);
    } catch (error) {
      console.error("Error generating pricing analysis:", error);
      toast({
        title: "Pricing Analysis Error",
        description: error instanceof Error ? error.message : "Failed to generate pricing analysis",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout title="Price Prediction" description="Analyze and forecast pharmaceutical product pricing">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PricingSearch 
          selectedLocation={selectedLocation}
          selectedProduct={selectedProduct}
          setSelectedLocation={setSelectedLocation}
          setSelectedProduct={setSelectedProduct}
          locations={locations}
          products={products}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />
        
        <PricingPredictor />
      </div>
      
      {showResults && pricingData && (
        <>
          <ManufacturerTable 
            selectedProduct={selectedProduct}
            selectedLocation={selectedLocation}
            manufacturers={pricingData.manufacturerList}
          />
          
          <PricingCharts
            selectedProduct={selectedProduct}
            pricingData={pricingData}
          />
        </>
      )}
    </MainLayout>
  );
};

export default Pricing;
