
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from 'lucide-react';

interface ForecastFormProps {
  onSubmit: () => void;
  selectedLocation: string;
  selectedProduct: string;
  selectedTimeFrame: string;
  setSelectedLocation: (location: string) => void;
  setSelectedProduct: (product: string) => void;
  setSelectedTimeFrame: (timeFrame: string) => void;
  locations?: string[];
  products?: string[];
  isLoading?: boolean;
}

const ForecastForm: React.FC<ForecastFormProps> = ({
  onSubmit,
  selectedLocation,
  selectedProduct,
  selectedTimeFrame,
  setSelectedLocation,
  setSelectedProduct,
  setSelectedTimeFrame,
  locations = [],
  products = [],
  isLoading = false
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Select Forecast Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">Location</label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
              disabled={isLoading}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.length > 0 ? (
                  locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="default" disabled>
                    No locations available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">Product</label>
            <Select
              value={selectedProduct}
              onValueChange={setSelectedProduct}
              disabled={isLoading}
            >
              <SelectTrigger id="product">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.length > 0 ? (
                  products.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="default" disabled>
                    No products available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="time-frame" className="text-sm font-medium">Time Frame</label>
            <Select
              value={selectedTimeFrame}
              onValueChange={setSelectedTimeFrame}
              disabled={isLoading}
            >
              <SelectTrigger id="time-frame">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button
          onClick={onSubmit}
          className="w-full mt-6 bg-pharma-600 hover:bg-pharma-700"
          disabled={!selectedLocation || !selectedProduct || isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Generating Forecast...
            </>
          ) : (
            "Generate Forecast"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ForecastForm;
