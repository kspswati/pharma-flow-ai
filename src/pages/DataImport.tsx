
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import UploadTab from '@/components/data-management/UploadTab';
import ManualEntryTab from '@/components/data-management/ManualEntryTab';
import ExistingDatasetsTab from '@/components/data-management/ExistingDatasetsTab';
import SampleDataButton from '@/components/data-management/SampleDataButton';
import { loadSampleData } from '@/utils/loadSampleData';

const DataManagement = () => {
  const [isLoadingSample, setIsLoadingSample] = useState<boolean>(false);
  
  const handleLoadSampleData = async () => {
    try {
      setIsLoadingSample(true);
      await loadSampleData();
      toast({
        title: "Sample Data Loaded",
        description: "Sample data has been successfully loaded into the database",
      });
    } catch (error) {
      console.error("Error loading sample data:", error);
      toast({
        title: "Failed to Load Sample Data",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoadingSample(false);
    }
  };
  
  return (
    <MainLayout title="Data Management" description="Upload and manage supply chain datasets">
      <SampleDataButton 
        isLoading={isLoadingSample} 
        onClick={handleLoadSampleData} 
      />
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="entry">Manual Entry</TabsTrigger>
          <TabsTrigger value="existing">Existing Datasets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <UploadTab />
        </TabsContent>
        
        <TabsContent value="entry">
          <ManualEntryTab />
        </TabsContent>
        
        <TabsContent value="existing">
          <ExistingDatasetsTab />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataManagement;
