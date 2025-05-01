
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for demonstration
const dataSets = [
  { id: 1, name: "Global Manufacturing Locations", records: 156, lastUpdated: "2025-04-15", type: "CSV" },
  { id: 2, name: "Product Catalog", records: 412, lastUpdated: "2025-04-25", type: "Excel" },
  { id: 3, name: "Vendor Performance Q1 2025", records: 89, lastUpdated: "2025-04-20", type: "CSV" },
  { id: 4, name: "Delivery Time Analysis", records: 225, lastUpdated: "2025-04-18", type: "JSON" },
  { id: 5, name: "Price History 2024-2025", records: 1204, lastUpdated: "2025-04-22", type: "Excel" },
];

const ExistingDatasetsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Datasets</CardTitle>
        <CardDescription>
          Browse and manage existing supply chain datasets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset Name</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSets.map((dataset) => (
              <TableRow key={dataset.id}>
                <TableCell className="font-medium">{dataset.name}</TableCell>
                <TableCell>{dataset.records.toLocaleString()}</TableCell>
                <TableCell>{dataset.type}</TableCell>
                <TableCell>{dataset.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExistingDatasetsTab;
