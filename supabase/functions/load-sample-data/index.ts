
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sample product data
const productData = [
  { name: "Amoxicillin", category: "Antibiotics", description: "Broad-spectrum antibiotic" },
  { name: "Lipitor", category: "Statins", description: "Cholesterol-lowering medication" },
  { name: "Metformin", category: "Antidiabetics", description: "Type 2 diabetes medication" },
  { name: "Advil", category: "Anti-inflammatory", description: "Pain relief medication" },
  { name: "Prozac", category: "Antidepressants", description: "Depression and anxiety medication" },
  { name: "Insulin", category: "Diabetes", description: "Diabetes hormone treatment" },
];

// Sample forecast data - past 7 months (actual) and future 5 months (predictions)
const generateForecastData = (productId: string) => {
  const baseValue = Math.floor(Math.random() * 500) + 300;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  
  // Generate past data (with actual values)
  const pastData = Array.from({ length: 7 }, (_, i) => {
    const monthIndex = (currentMonth - 6 + i + 12) % 12;
    const date = new Date();
    date.setMonth(currentMonth - 6 + i);
    
    const actualValue = baseValue + Math.floor(Math.random() * 100) - 50;
    const predictedValue = actualValue + Math.floor(Math.random() * 50) - 25;
    
    return {
      product_id: productId,
      forecast_type: 'demand',
      date: date.toISOString().split('T')[0],
      actual_value: actualValue,
      predicted_value: predictedValue,
      confidence_score: 0.85 + Math.random() * 0.1,
    };
  });
  
  // Generate future data (predictions only)
  const futureData = Array.from({ length: 5 }, (_, i) => {
    const monthIndex = (currentMonth + i + 1) % 12;
    const date = new Date();
    date.setMonth(currentMonth + i + 1);
    
    const predictedValue = baseValue + Math.floor(Math.random() * 150) - 25;
    
    return {
      product_id: productId,
      forecast_type: 'demand',
      date: date.toISOString().split('T')[0],
      actual_value: null,
      predicted_value: predictedValue,
      confidence_score: 0.8 + Math.random() * 0.15,
    };
  });
  
  return [...pastData, ...futureData];
};

// Generate vendor data
const generateVendorData = (productId: string) => {
  const vendors = [
    "Pharma Co. Ltd",
    "MediGen Inc.",
    "BioHealth",
    "PharmaGlobal",
    "RxMakers"
  ];
  
  return vendors.map(vendorName => ({
    vendor_name: vendorName,
    product_id: productId,
    lead_time: Math.floor(Math.random() * 10) + 5,
    reliability_score: 0.7 + Math.random() * 0.3,
    cost_per_unit: Math.floor(Math.random() * 20) + 30,
    last_delivery_date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    const response: { 
      products: any[], 
      forecasts: any[], 
      vendors: any[] 
    } = { 
      products: [], 
      forecasts: [], 
      vendors: [] 
    };
    
    // Clear existing data (optional)
    await supabaseClient.from('vendor_analytics').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('forecast_data').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert product data
    const { data: productInsertData, error: productError } = await supabaseClient
      .from('products')
      .insert(productData)
      .select();
    
    if (productError) throw productError;
    response.products = productInsertData;
    
    // Insert forecast data for each product
    for (const product of productInsertData) {
      const forecastData = generateForecastData(product.id);
      const { data: forecastInsertData, error: forecastError } = await supabaseClient
        .from('forecast_data')
        .insert(forecastData)
        .select();
      
      if (forecastError) throw forecastError;
      response.forecasts = [...response.forecasts, ...forecastInsertData];
      
      // Insert vendor data for each product
      const vendorData = generateVendorData(product.id);
      const { data: vendorInsertData, error: vendorError } = await supabaseClient
        .from('vendor_analytics')
        .insert(vendorData)
        .select();
      
      if (vendorError) throw vendorError;
      response.vendors = [...response.vendors, ...vendorInsertData];
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Sample data loaded successfully",
        data: response
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
