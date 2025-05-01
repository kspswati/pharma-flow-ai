
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ShipmentModeSummaryProps {
  summary: {
    totalShipments: number;
    airPercentage: number;
    airChange: number;
    oceanPercentage: number;
    oceanChange: number;
    truckPercentage: number;
    truckChange: number;
    avgDeliveryTime: number;
    deliveryTimeChange: number;
  };
}

const ShipmentModeSummary: React.FC<ShipmentModeSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalShipments.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">From selected time period</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Air Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.airPercentage.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {summary.airChange > 0 ? '+' : ''}
            {summary.airChange}% from last year
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Ocean Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.oceanPercentage.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {summary.oceanChange > 0 ? '+' : ''}
            {summary.oceanChange}% from last year
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Truck Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.truckPercentage.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {summary.truckChange > 0 ? '+' : ''}
            {summary.truckChange}% from last year
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.avgDeliveryTime} days</div>
          <p className="text-xs text-muted-foreground">
            {summary.deliveryTimeChange > 0 ? '+' : ''}
            {summary.deliveryTimeChange} days from last year
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentModeSummary;
