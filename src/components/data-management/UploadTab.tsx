
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { FileText, Upload, Database, Loader, FileCheck, UploadCloud } from 'lucide-react';
import * as XLSX from 'xlsx';
import { insertBulkPharmaRecords } from '@/services/dataService';

const UploadTab = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  
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

  return (
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
  );
};

export default UploadTab;
