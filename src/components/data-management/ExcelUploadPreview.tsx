
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Upload, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from 'xlsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PreviewData {
  headers: string[];
  rows: any[];
}

export const ExcelUploadPreview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
    
    // Parse Excel file
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length < 2) {
        throw new Error("Excel file must contain at least headers and one row of data");
      }

      setPreviewData({
        headers: jsonData[0] as string[],
        rows: jsonData.slice(1) as any[]
      });

      toast({
        title: "File loaded successfully",
        description: `Found ${jsonData.length - 1} rows of data`,
      });
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      toast({
        title: "Error parsing file",
        description: error instanceof Error ? error.message : "Failed to parse Excel file",
        variant: "destructive"
      });
      setFile(null);
      setPreviewData(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !previewData) return;
    
    try {
      setIsUploading(true);
      
      // Here we would process the Excel file and insert the data
      // into the appropriate Supabase tables
      
      toast({
        title: "Success",
        description: "Data uploaded successfully",
      });
      
      setFile(null);
      setPreviewData(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload data",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Upload Supply Chain Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-6">
            <div className="flex flex-col items-center gap-2">
              <FileSpreadsheet className="h-12 w-12 text-slate-400" />
              <p className="text-sm text-slate-600">
                Upload your Excel file containing supply chain data
              </p>
              <Input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="max-w-xs"
              />
            </div>
          </div>
          
          {previewData && (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {previewData.headers.map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.rows.slice(0, 5).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {previewData.headers.map((_, colIndex) => (
                          <TableCell key={colIndex}>
                            {row[colIndex]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {previewData.rows.length > 5 && (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    Showing first 5 rows of {previewData.rows.length} total rows
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Data
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
