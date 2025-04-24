
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ExcelUploadPreview } from '@/components/data-management/ExcelUploadPreview';

const DataImport = () => {
  return (
    <MainLayout 
      title="Data Import" 
      description="Upload and manage your supply chain data"
    >
      <div className="space-y-6">
        <ExcelUploadPreview />
      </div>
    </MainLayout>
  );
};

export default DataImport;
