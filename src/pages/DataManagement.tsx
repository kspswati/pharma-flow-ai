
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Database, FileCheck, UploadCloud } from "lucide-react";

// Mock data for demonstration
const dataSets = [
  { id: 1, name: "Global Manufacturing Locations", records: 156, lastUpdated: "2025-03-15", type: "CSV" },
  { id: 2, name: "Product Catalog", records: 412, lastUpdated: "2025-04-01", type: "Excel" },
  { id: 3, name: "Vendor Performance Q1 2025", records: 89, lastUpdated: "2025-04-10", type: "CSV" },
  { id: 4, name: "Delivery Time Analysis", records: 225, lastUpdated: "2025-03-28", type: "JSON" },
  { id: 5, name: "Price History 2024-2025", records: 1204, lastUpdated: "2025-04-05", type: "Excel" },
];

const DataManagement = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };
  
  const handleUpload = () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      // In a real app, this would be an API call to upload the file
    }, 2000);
  };
  
  return (
    <MainLayout title="Data Management" description="Upload and manage supply chain datasets">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="existing">Existing Datasets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Dataset</CardTitle>
              <CardDescription>
                Upload manufacturing data, vendor information, product catalogs, or delivery history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                      <UploadCloud className="h-10 w-10 text-pharma-600" />
                    </div>
                    
                    <h3 className="mb-1 text-xl font-semibold">Drag and drop files or click to browse</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Supported formats: CSV, Excel, JSON (Maximum size: 50MB)
                    </p>
                    
                    <Input
                      id="file-upload"
                      type="file"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                    />
                    
                    {uploadedFile && (
                      <div className="mt-4 w-full">
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">{uploadedFile.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleUpload} 
                      disabled={!uploadedFile || isUploading}
                      className="mt-4 bg-pharma-600 hover:bg-pharma-700"
                    >
                      {isUploading ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span> Uploading...
                        </>
                      ) : 'Upload File'}
                    </Button>
                    
                    {uploadSuccess && (
                      <div className="mt-4 p-2 bg-green-50 text-green-600 rounded-md flex items-center">
                        <FileCheck className="h-5 w-5 mr-2" />
                        <span>File uploaded successfully!</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Processing Options</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 cursor-pointer hover:border-pharma-400 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          <Database className="h-5 w-5 text-pharma-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Import to Database</h4>
                          <p className="text-xs text-muted-foreground">
                            Store data in system database for analysis and queries
                          </p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 cursor-pointer hover:border-pharma-400 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          <FileText className="h-5 w-5 text-pharma-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Process File Only</h4>
                          <p className="text-xs text-muted-foreground">
                            Analyze file contents without permanent storage
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="existing">
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
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataManagement;
