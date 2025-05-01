
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader } from 'lucide-react';

interface PricingSearchProps {
  selectedLocation: string;
  selectedProduct: string;
  setSelectedLocation: (location: string) => void;
  setSelectedProduct: (product: string) => void;
  locations: string[];
  products: string[];
  handleSearch: () => void;
  isLoading: boolean;
}

const PricingSearch: React.FC<PricingSearchProps> = ({
  selectedLocation,
  selectedProduct,
  setSelectedLocation,
  setSelectedProduct,
  locations,
  products,
  handleSearch,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Product</label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product} value={product}>{product}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleSearch} 
            disabled={!selectedLocation || !selectedProduct || isLoading}
            className="w-full bg-pharma-600 hover:bg-pharma-700"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Search Manufacturers"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSearch;
