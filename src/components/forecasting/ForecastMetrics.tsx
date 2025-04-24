
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ForecastMetricsProps {
  product: string;
  location: string;
}

const ForecastMetrics: React.FC<ForecastMetricsProps> = ({ product, location }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast Metrics for {product} in {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Lead Time</TableCell>
              <TableCell>14 days</TableCell>
              <TableCell className="text-green-600">Normal</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Available Quantity</TableCell>
              <TableCell>8,500 units</TableCell>
              <TableCell className="text-amber-600">Below Forecast</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Manufacturing Location</TableCell>
              <TableCell>Berlin, Germany</TableCell>
              <TableCell>Primary Facility</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Forecast Accuracy (Last Period)</TableCell>
              <TableCell>92%</TableCell>
              <TableCell className="text-green-600">Good</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Safety Stock</TableCell>
              <TableCell>2,000 units</TableCell>
              <TableCell className="text-green-600">Adequate</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ForecastMetrics;
