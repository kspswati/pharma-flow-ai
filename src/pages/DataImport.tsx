
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileText, Upload, Database, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<any[] | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      productGroup: "",
      vendor: "",
      site: "",
      country: "",
      shipmentMode: "",
      quantity: "",
      unitPrice: "",
      freightCost: "",
      scheduledDate: "",
      deliveredDate: "",
      recordId: "",
      asnDn: "",
      dosageForm: "",
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      // For demo purposes, show a mock preview
      if (e.target.files[0].type === "text/csv") {
        const mockPreview = [
          { productGroup: "Antibiotics", vendor: "PharmaCorp", country: "USA", quantity: 5000 },
          { productGroup: "Vaccines", vendor: "BioTech Inc.", country: "Germany", quantity: 10000 },
          { productGroup: "Painkillers", vendor: "MediPharm", country: "France", quantity: 8000 },
        ];
        setPreview(mockPreview);
      }
    }
  };
  
  const onSubmit = (data: any) => {
    setUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      setSubmitStatus('success');
      
      toast({
        title: "Record submitted successfully",
        description: "Your data has been added to the database.",
      });
      
      form.reset();
    }, 2000);
  };
  
  const handleFileUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      setSubmitStatus('success');
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed and records added to the database.`,
      });
      
      setFile(null);
      setPreview(null);
    }, 2000);
  };
  
  return (
    <MainLayout title="Data Import" description="Import pharmaceutical supply chain data">
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="file">File Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Record</CardTitle>
              <CardDescription>
                Manually enter a new pharmaceutical supply chain record
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="productGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Group</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Antibiotics" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="vendor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vendor</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. PharmaCorp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="site"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manufacturing Site</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Berlin Plant" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Germany" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="shipmentMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipment Mode</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Air">Air</SelectItem>
                              <SelectItem value="Air charter">Air Charter</SelectItem>
                              <SelectItem value="Ocean">Ocean</SelectItem>
                              <SelectItem value="Truck">Truck</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 5000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="unitPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit Price (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="e.g. 12.50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="freightCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Freight Cost (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="e.g. 1500.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scheduled Delivery Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="deliveredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivered to Client Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="recordId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Record ID</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. PO-2025-00142" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="asnDn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ASN/DN #</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ASN-12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="dosageForm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage Form</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Tablet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-pharma-600 hover:bg-pharma-700"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span> Submitting...
                        </>
                      ) : 'Submit Record'}
                    </Button>
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="rounded-md bg-green-50 p-4 mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">Record submitted successfully</h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>Your record has been added to the database.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="rounded-md bg-red-50 p-4 mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Error submitting record</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>Please try again or contact support if the issue persists.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data File</CardTitle>
              <CardDescription>
                Upload CSV files containing pharmaceutical supply chain data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                      <Upload className="h-10 w-10 text-pharma-600" />
                    </div>
                    
                    <h3 className="mb-1 text-xl font-semibold">Drag and drop or click to browse</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Upload CSV files containing pharmaceutical supply chain data
                    </p>
                    
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                    />
                    
                    {file && (
                      <div className="mt-4 w-full">
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">{file.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {preview && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">File Preview</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                          <tr>
                            {Object.keys(preview[0]).map((key) => (
                              <th key={key} className="py-2 px-4 border-b text-left">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {preview.map((row, index) => (
                            <tr key={index}>
                              {Object.values(row).map((value: any, i) => (
                                <td key={i} className="py-2 px-4 border-b">
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleFileUpload} 
                    disabled={!file || uploading}
                    className="bg-pharma-600 hover:bg-pharma-700"
                  >
                    {uploading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Uploading...
                      </>
                    ) : 'Upload and Process'}
                  </Button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="rounded-md bg-green-50 p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">File uploaded successfully</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your file has been processed and records added to the database.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataImport;
