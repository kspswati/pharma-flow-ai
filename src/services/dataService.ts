
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches data from the PharmaFlow.AI table with optional filters
 */
export const fetchPharmaData = async (filters?: {
  country?: string[];
  productGroup?: string[];
  vendor?: string[];
  shipmentMode?: string[];
  dateRange?: { from: Date; to: Date };
}) => {
  let query = supabase.from('PharmaFlow.AI').select('*');
  
  // Apply filters if provided
  if (filters) {
    if (filters.country && filters.country.length > 0) {
      query = query.in('country', filters.country);
    }
    
    if (filters.productGroup && filters.productGroup.length > 0) {
      query = query.in('product_group', filters.productGroup);
    }
    
    if (filters.vendor && filters.vendor.length > 0) {
      query = query.in('vendor', filters.vendor);
    }
    
    if (filters.shipmentMode && filters.shipmentMode.length > 0) {
      query = query.in('shipment_mode', filters.shipmentMode);
    }
    
    if (filters.dateRange) {
      query = query.gte('delivered_to_client_date', filters.dateRange.from.toISOString())
                   .lte('delivered_to_client_date', filters.dateRange.to.toISOString());
    }
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching data:', error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
  
  return data;
};

/**
 * Fetches available filter options (unique values for each filter type)
 */
export const fetchFilterOptions = async () => {
  const { data, error } = await supabase.from('PharmaFlow.AI').select('country, product_group, vendor, shipment_mode');
  
  if (error) {
    console.error('Error fetching filter options:', error);
    throw new Error(`Failed to fetch filter options: ${error.message}`);
  }
  
  // Extract unique values for each column
  const countries = [...new Set(data.map(item => item.country).filter(Boolean))].sort();
  const productGroups = [...new Set(data.map(item => item.product_group).filter(Boolean))].sort();
  const vendors = [...new Set(data.map(item => item.vendor).filter(Boolean))].sort();
  const shipmentModes = [...new Set(data.map(item => item.shipment_mode).filter(Boolean))].sort();
  
  return {
    countries,
    productGroups,
    vendors,
    shipmentModes
  };
};

/**
 * Inserts a new record into the PharmaFlow.AI table
 */
export const insertPharmaRecord = async (record: any) => {
  const { data, error } = await supabase.from('PharmaFlow.AI').insert(record).select();
  
  if (error) {
    console.error('Error inserting record:', error);
    throw new Error(`Failed to insert record: ${error.message}`);
  }
  
  return data;
};

/**
 * Inserts multiple records into the PharmaFlow.AI table (for CSV uploads)
 */
export const insertBulkPharmaRecords = async (records: any[]) => {
  const { data, error } = await supabase.from('PharmaFlow.AI').insert(records).select();
  
  if (error) {
    console.error('Error inserting bulk records:', error);
    throw new Error(`Failed to insert bulk records: ${error.message}`);
  }
  
  return data;
};
