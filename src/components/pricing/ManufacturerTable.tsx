
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Manufacturer {
  id: string;
  name: string;
  price: number;
  trend: string;
  location: string;
  leadTime: string;
}

interface ManufacturerTableProps {
  selectedProduct: string;
  selectedLocation: string;
  manufacturers: Manufacturer[];
}

const ManufacturerTable: React.FC<ManufacturerTableProps> = ({
  selectedProduct,
  selectedLocation,
  manufacturers
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Manufacturer Pricing for {selectedProduct} in {selectedLocation}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Price (USD)</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Lead Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers.sort((a, b) => a.price - b.price).map((manufacturer) => (
              <TableRow key={manufacturer.id}>
                <TableCell className="font-medium">{manufacturer.name}</TableCell>
                <TableCell>${manufacturer.price.toFixed(2)}</TableCell>
                <TableCell className={manufacturer.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {manufacturer.trend}
                </TableCell>
                <TableCell>{manufacturer.location}</TableCell>
                <TableCell>{manufacturer.leadTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManufacturerTable;
