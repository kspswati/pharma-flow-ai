
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FreightSummaryProps {
  summary: {
    airFreightAvg: number;
    airFreightChange: number;
    seaFreightAvg: number;
    seaFreightChange: number;
    landFreightAvg: number;
    landFreightChange: number;
  };
}

const FreightSummary: React.FC<FreightSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Air Freight Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summary.airFreightAvg.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {summary.airFreightChange > 0 ? '+' : ''}
            {summary.airFreightChange}% from previous period
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Sea Freight Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summary.seaFreightAvg.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {summary.seaFreightChange > 0 ? '+' : ''}
            {summary.seaFreightChange}% from previous period
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Land Freight Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summary.landFreightAvg.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {summary.landFreightChange > 0 ? '+' : ''}
            {summary.landFreightChange}% from previous period
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreightSummary;
