
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const locations = ["United States", "India", "Germany", "Japan", "Brazil", "United Kingdom"];
const products = ["Amoxicillin", "Lipitor", "Metformin", "Advil", "Prozac", "Insulin"];
const timeFrames = [
  "Next 2 months",
  "Next 3 months",
  "Q2 2025",
  "Q3 2025",
  "Q4 2025",
  "Full Year 2025"
];

interface ForecastFormProps {
  onSubmit: () => void;
  selectedLocation: string;
  selectedProduct: string;
  selectedTimeFrame: string;
  setSelectedLocation: (location: string) => void;
  setSelectedProduct: (product: string) => void;
  setSelectedTimeFrame: (timeFrame: string) => void;
}

const ForecastForm: React.FC<ForecastFormProps> = ({
  onSubmit,
  selectedLocation,
  selectedProduct,
  selectedTimeFrame,
  setSelectedLocation,
  setSelectedProduct,
  setSelectedTimeFrame,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Forecast Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Frame</label>
            <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
              <SelectTrigger>
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                {timeFrames.map(timeFrame => (
                  <SelectItem key={timeFrame} value={timeFrame}>{timeFrame}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={onSubmit} 
              disabled={!selectedLocation || !selectedProduct || !selectedTimeFrame}
              className="w-full bg-pharma-600 hover:bg-pharma-700"
            >
              Generate Forecast
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastForm;
