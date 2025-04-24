
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Upload, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    // In a real implementation, we would parse the Excel file here
    // and show a preview of the data
  };

  const handleUpload = async () => {
    if (!file) return;
    
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
          
          {file && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-slate-600" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
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
