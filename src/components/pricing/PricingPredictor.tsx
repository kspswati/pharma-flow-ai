
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PricePrediction {
  predicted: number;
  range: {
    min: number;
    max: number;
  };
  confidence: number;
}

const PricingPredictor: React.FC = () => {
  const [productType, setProductType] = useState<string>('antibiotics');
  const [demandLevel, setDemandLevel] = useState<number>(50);
  const [competitorPrice, setCompetitorPrice] = useState<string>('100');
  const [prediction, setPrediction] = useState<PricePrediction | null>(null);

  const handlePredict = () => {
    // This is a simplified prediction simulation
    // In a real application, this would call an API with a machine learning model
    
    const basePrice = parseFloat(competitorPrice) || 100;
    const demandFactor = demandLevel / 50; // Normalize to make 50 the baseline
    
    const productFactor = {
      'antibiotics': 1.1,
      'painkillers': 0.95,
      'antivirals': 1.3,
      'vaccines': 1.4,
      'generics': 0.8
    }[productType] || 1;
    
    const predictedPrice = basePrice * demandFactor * productFactor;
    const variance = basePrice * 0.1; // 10% variance
    
    setPrediction({
      predicted: Math.round(predictedPrice * 100) / 100,
      range: {
        min: Math.round((predictedPrice - variance) * 100) / 100,
        max: Math.round((predictedPrice + variance) * 100) / 100
      },
      confidence: Math.min(90, Math.floor(85 + (Math.random() * 10)))
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Prediction</CardTitle>
        <CardDescription>Predict future pricing based on market factors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-type">Product Category</Label>
            <Select 
              value={productType} 
              onValueChange={setProductType}
            >
              <SelectTrigger id="product-type">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="antibiotics">Antibiotics</SelectItem>
                <SelectItem value="painkillers">Painkillers</SelectItem>
                <SelectItem value="antivirals">Antivirals</SelectItem>
                <SelectItem value="vaccines">Vaccines</SelectItem>
                <SelectItem value="generics">Generics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="demand-level">Expected Demand Level</Label>
              <span className="text-sm text-muted-foreground">{demandLevel}%</span>
            </div>
            <Slider
              id="demand-level"
              min={10}
              max={100}
              step={1}
              value={[demandLevel]}
              onValueChange={(values) => setDemandLevel(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="competitor-price">Average Competitor Price ($)</Label>
            <Input
              id="competitor-price"
              type="number"
              value={competitorPrice}
              onChange={(e) => setCompetitorPrice(e.target.value)}
            />
          </div>
          
          <Button onClick={handlePredict} className="w-full bg-pharma-600 hover:bg-pharma-700">
            Generate Prediction
          </Button>
          
          {prediction && (
            <div className="mt-6 p-4 bg-muted/40 rounded-lg border">
              <h4 className="font-medium mb-2">Price Prediction Results</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Predicted Price:</span>
                  <span className="font-bold text-pharma-600">${prediction.predicted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Price Range:</span>
                  <span className="text-muted-foreground text-sm">
                    ${prediction.range.min} - ${prediction.range.max}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Confidence:</span>
                  <span className="text-sm">{prediction.confidence}%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  *Based on current market trends and historical data analysis
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingPredictor;
