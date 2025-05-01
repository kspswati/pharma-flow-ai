
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader } from 'lucide-react';
import { insertBulkPharmaRecords } from '@/services/dataService';

const ManualEntryTab = () => {
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
      
      // Use the bulk insert function with a single record
      await insertBulkPharmaRecords([recordToInsert]);
      
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
  );
};

export default ManualEntryTab;
