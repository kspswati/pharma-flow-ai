
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForecastMetricsProps {
  product?: string;
  location?: string;
  metrics?: {
    mape?: number;
    rmse?: number;
    reliability?: number;
    accuracy?: string;
  };
}

const ForecastMetrics: React.FC<ForecastMetricsProps> = ({ 
  product, 
  location,
  metrics = {}
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {product ? `Forecast Metrics for ${product}` : 'Forecast Metrics'}
            {location ? ` in ${location}` : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Forecast Accuracy</div>
              <div className="text-2xl font-bold">{metrics.accuracy || "Not available"}</div>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">MAPE</div>
              <div className="text-2xl font-bold">{metrics.mape ? `${metrics.mape}%` : "N/A"}</div>
              <div className="text-xs text-muted-foreground">(Mean Absolute Percentage Error)</div>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">RMSE</div>
              <div className="text-2xl font-bold">{metrics.rmse || "N/A"}</div>
              <div className="text-xs text-muted-foreground">(Root Mean Square Error)</div>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Reliability Score</div>
              <div className="text-2xl font-bold">{metrics.reliability ? `${metrics.reliability}%` : "N/A"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Interpretation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {metrics.mape ? 
              `This forecast has a Mean Absolute Percentage Error (MAPE) of ${metrics.mape}%, which indicates ${
                metrics.mape < 10 ? 'excellent' : metrics.mape < 20 ? 'good' : metrics.mape < 30 ? 'moderate' : 'low'
              } forecast accuracy.` :
              "Forecast metrics are not available for interpretation."
            }
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {metrics.reliability ?
              `The forecast reliability score is ${metrics.reliability}%, which suggests ${
                metrics.reliability > 80 ? 'high' : metrics.reliability > 60 ? 'moderate' : 'low'
              } confidence in these predictions.` :
              ""
            }
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Use these metrics to guide inventory planning and resource allocation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastMetrics;
