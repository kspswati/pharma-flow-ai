
import React, { useState, useCallback } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Database, FileCheck, UploadCloud, Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { insertPharmaRecord, insertBulkPharmaRecords } from '@/services/dataService';
import * as XLSX from 'xlsx';

const DataManagement = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [recordFormData, setRecordFormData] = useState({
    country: '',
    product_group: '',
    vendor: '',
    shipment_mode: '',
    manufacturing_site: '',
    line_item_quantity: '',
    unit_price: '',
    freight_cost_usd: '',
    delivered_to_client_date: ''
  });
  const [isSubmittingRecord, setIsSubmittingRecord] = useState<boolean>(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };
  
  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    
    try {
      // Read the Excel/CSV file
      const fileData = await readFileAsync(uploadedFile);
      
      if (!fileData || !fileData.length) {
        toast({
          title: "Upload Error",
          description: "The file appears to be empty or in an invalid format",
          variant: "destructive"
        });
        setIsUploading(false);
        return;
      }
      
      // Process and validate the data
      const processedData = processFileData(fileData);
      
      // Insert the data into the database
      await insertBulkPharmaRecords(processedData);
      
      setUploadSuccess(true);
      toast({
        title: "Upload Successful",
        description: `${processedData.length} records imported successfully`,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const readFileAsync = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(new Error("Failed to parse the file. Please ensure it's a valid Excel or CSV file."));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Failed to read the file"));
      };
      
      reader.readAsBinaryString(file);
    });
  };
  
  const processFileData = (data: any[]): any[] => {
    // Map the file data to match our database schema
    return data.map(row => {
      const processedRow: any = {};
      
      // Map and standardize column names (handles common variations in column names)
      Object.keys(row).forEach(key => {
        const lowerKey = key.toLowerCase().replace(/\s+/g, '_');
        
        if (lowerKey.includes('country')) processedRow.country = row[key];
        else if (lowerKey.includes('product') && lowerKey.includes('group')) processedRow.product_group = row[key];
        else if (lowerKey.includes('vendor')) processedRow.vendor = row[key];
        else if (lowerKey.includes('shipment') && lowerKey.includes('mode')) processedRow.shipment_mode = row[key];
        else if (lowerKey.includes('manufacturing') && lowerKey.includes('site')) processedRow.manufacturing_site = row[key];
        else if (lowerKey.includes('quantity')) processedRow.line_item_quantity = row[key];
        else if (lowerKey.includes('unit') && lowerKey.includes('price')) processedRow.unit_price = row[key];
        else if (lowerKey.includes('freight') && lowerKey.includes('cost')) processedRow.freight_cost_usd = row[key];
        else if (lowerKey.includes('delivered') && lowerKey.includes('date')) 
          processedRow.delivered_to_client_date = row[key];
        else {
          // Copy other columns as is
          processedRow[lowerKey] = row[key];
        }
      });
      
      return processedRow;
    });
  };
  
  const handleRecordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecordFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmittingRecord(true);
      
      // Validate form data
      const requiredFields = ['country', 'product_group', 'line_item_quantity'];
      for (const field of requiredFields) {
        if (!recordFormData[field as keyof typeof recordFormData]) {
          toast({
            title: "Validation Error",
            description: `${field.replace('_', ' ')} is required`,
            variant: "destructive"
          });
          setIsSubmittingRecord(false);
          return;
        }
      }
      
      // Format data for insertion
      const recordToInsert = {
        ...recordFormData,
        line_item_quantity: parseInt(recordFormData.line_item_quantity, 10),
        unit_price: recordFormData.unit_price ? parseFloat(recordFormData.unit_price) : null,
        freight_cost_usd: recordFormData.freight_cost_usd ? parseFloat(recordFormData.freight_cost_usd) : null
      };
      
      await insertPharmaRecord(recordToInsert);
      
      toast({
        title: "Record Submitted",
        description: "The record has been successfully added to the database",
      });
      
      // Clear form
      setRecordFormData({
        country: '',
        product_group: '',
        vendor: '',
        shipment_mode: '',
        manufacturing_site: '',
        line_item_quantity: '',
        unit_price: '',
        freight_cost_usd: '',
        delivered_to_client_date: ''
      });
    } catch (error) {
      console.error("Error submitting record:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingRecord(false);
    }
  };
  
  return (
    <MainLayout title="Data Management" description="Upload and manage supply chain datasets">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="entry">Manual Entry</TabsTrigger>
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
                      accept=".csv,.xlsx,.xls"
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
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
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
        
        <TabsContent value="entry">
          <Card>
            <CardHeader>
              <CardTitle>Submit Record</CardTitle>
              <CardDescription>
                Manually enter data for a new pharmaceutical record
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRecord} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">Country *</label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="e.g., United States"
                      value={recordFormData.country}
                      onChange={handleRecordInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="product_group" className="text-sm font-medium">Product Group *</label>
                    <Input
                      id="product_group"
                      name="product_group"
                      placeholder="e.g., Antibiotics"
                      value={recordFormData.product_group}
                      onChange={handleRecordInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="vendor" className="text-sm font-medium">Vendor</label>
                    <Input
                      id="vendor"
                      name="vendor"
                      placeholder="e.g., Pharma Co. Ltd"
                      value={recordFormData.vendor}
                      onChange={handleRecordInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="shipment_mode" className="text-sm font-medium">Shipment Mode</label>
                    <Input
                      id="shipment_mode"
                      name="shipment_mode"
                      placeholder="e.g., Air, Ocean, Truck"
                      value={recordFormData.shipment_mode}
                      onChange={handleRecordInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="manufacturing_site" className="text-sm font-medium">Manufacturing Site</label>
                    <Input
                      id="manufacturing_site"
                      name="manufacturing_site"
                      placeholder="e.g., Site A"
                      value={recordFormData.manufacturing_site}
                      onChange={handleRecordInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="line_item_quantity" className="text-sm font-medium">Quantity *</label>
                    <Input
                      id="line_item_quantity"
                      name="line_item_quantity"
                      type="number"
                      placeholder="e.g., 100"
                      value={recordFormData.line_item_quantity}
                      onChange={handleRecordInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="unit_price" className="text-sm font-medium">Unit Price</label>
                    <Input
                      id="unit_price"
                      name="unit_price"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 42.50"
                      value={recordFormData.unit_price}
                      onChange={handleRecordInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="freight_cost_usd" className="text-sm font-medium">Freight Cost (USD)</label>
                    <Input
                      id="freight_cost_usd"
                      name="freight_cost_usd"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 120.75"
                      value={recordFormData.freight_cost_usd}
                      onChange={handleRecordInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="delivered_to_client_date" className="text-sm font-medium">Delivery Date</label>
                    <Input
                      id="delivered_to_client_date"
                      name="delivered_to_client_date"
                      type="date"
                      value={recordFormData.delivered_to_client_date}
                      onChange={handleRecordInputChange}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-pharma-600 hover:bg-pharma-700"
                  disabled={isSubmittingRecord}
                >
                  {isSubmittingRecord ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : 'Submit Record'}
                </Button>
              </form>
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
                  {[
                    { id: 1, name: "Global Manufacturing Locations", records: 156, lastUpdated: "2025-04-15", type: "CSV" },
                    { id: 2, name: "Product Catalog", records: 412, lastUpdated: "2025-04-25", type: "Excel" },
                    { id: 3, name: "Vendor Performance Q1 2025", records: 89, lastUpdated: "2025-04-20", type: "CSV" },
                    { id: 4, name: "Delivery Time Analysis", records: 225, lastUpdated: "2025-04-18", type: "JSON" },
                    { id: 5, name: "Price History 2024-2025", records: 1204, lastUpdated: "2025-04-22", type: "Excel" },
                  ].map((dataset) => (
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
