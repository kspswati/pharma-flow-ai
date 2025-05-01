
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Sample data for demonstration
const sampleData = [
  {
    country: "United States",
    product_group: "Antibiotics",
    vendor: "Pharma Co. Ltd",
    shipment_mode: "Air",
    manufacturing_site: "Site A",
    line_item_quantity: 1000,
    unit_price: 42.50,
    freight_cost_usd: 1250,
    delivered_to_client_date: "2025-01-15"
  },
  {
    country: "India",
    product_group: "Painkillers",
    vendor: "MediGen Inc.",
    shipment_mode: "Ocean",
    manufacturing_site: "Site B",
    line_item_quantity: 2500,
    unit_price: 38.75,
    freight_cost_usd: 400,
    delivered_to_client_date: "2025-01-20"
  },
  {
    country: "Germany",
    product_group: "Antibiotics",
    vendor: "BioHealth",
    shipment_mode: "Truck",
    manufacturing_site: "Site C",
    line_item_quantity: 800,
    unit_price: 40.20,
    freight_cost_usd: 650,
    delivered_to_client_date: "2025-01-25"
  },
  {
    country: "United States",
    product_group: "Vaccines",
    vendor: "PharmaGlobal",
    shipment_mode: "Air",
    manufacturing_site: "Site D",
    line_item_quantity: 500,
    unit_price: 43.10,
    freight_cost_usd: 1300,
    delivered_to_client_date: "2025-02-05"
  },
  {
    country: "Japan",
    product_group: "Generics",
    vendor: "RxMakers",
    shipment_mode: "Ocean",
    manufacturing_site: "Site E",
    line_item_quantity: 3000,
    unit_price: 37.60,
    freight_cost_usd: 390,
    delivered_to_client_date: "2025-02-10"
  },
  {
    country: "Brazil",
    product_group: "Antibiotics",
    vendor: "Pharma Co. Ltd",
    shipment_mode: "Air",
    manufacturing_site: "Site A",
    line_item_quantity: 1200,
    unit_price: 41.90,
    freight_cost_usd: 1400,
    delivered_to_client_date: "2025-02-15"
  },
  {
    country: "United Kingdom",
    product_group: "Painkillers",
    vendor: "MediGen Inc.",
    shipment_mode: "Truck",
    manufacturing_site: "Site B",
    line_item_quantity: 1800,
    unit_price: 39.25,
    freight_cost_usd: 680,
    delivered_to_client_date: "2025-02-20"
  },
  {
    country: "Germany",
    product_group: "Vaccines",
    vendor: "BioHealth",
    shipment_mode: "Air",
    manufacturing_site: "Site C",
    line_item_quantity: 600,
    unit_price: 44.75,
    freight_cost_usd: 1350,
    delivered_to_client_date: "2025-03-05"
  }
];

// Generate more data to have a better dataset for analysis
function generateMoreData() {
  const countries = ["United States", "India", "Germany", "Brazil", "Japan", "United Kingdom", "France", "Canada", "Australia", "China"];
  const productGroups = ["Antibiotics", "Painkillers", "Vaccines", "Antivirals", "Generics"];
  const vendors = ["Pharma Co. Ltd", "MediGen Inc.", "BioHealth", "PharmaGlobal", "RxMakers"];
  const shipmentModes = ["Air", "Ocean", "Truck"];
  const manufacturingSites = ["Site A", "Site B", "Site C", "Site D", "Site E"];
  
  const extraData = [];
  
  // Generate data for each month
  for (let month = 1; month <= 12; month++) {
    // For each month, create multiple entries
    for (let i = 0; i < 20; i++) {
      const day = Math.floor(Math.random() * 28) + 1;
      const dateStr = `2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      const country = countries[Math.floor(Math.random() * countries.length)];
      const productGroup = productGroups[Math.floor(Math.random() * productGroups.length)];
      const vendor = vendors[Math.floor(Math.random() * vendors.length)];
      const shipmentMode = shipmentModes[Math.floor(Math.random() * shipmentModes.length)];
      const manufacturingSite = manufacturingSites[Math.floor(Math.random() * manufacturingSites.length)];
      
      // Base price varies by product group
      const basePrice = {
        "Antibiotics": 40,
        "Painkillers": 35,
        "Vaccines": 45,
        "Antivirals": 50,
        "Generics": 30
      }[productGroup];
      
      // Quantity varies by country (market size)
      const baseQuantity = {
        "United States": 2000,
        "China": 3000,
        "India": 2500,
        "Germany": 1500,
        "United Kingdom": 1200,
        "Japan": 1800,
        "France": 1300,
        "Canada": 1000,
        "Australia": 800,
        "Brazil": 1700
      }[country] || 1000;
      
      // Freight cost varies by shipment mode
      const baseFreightCost = {
        "Air": 1200,
        "Ocean": 400,
        "Truck": 600
      }[shipmentMode];
      
      // Add some randomness
      const unitPrice = basePrice * (0.9 + Math.random() * 0.4);
      const quantity = Math.floor(baseQuantity * (0.8 + Math.random() * 0.5));
      const freightCost = baseFreightCost * (0.85 + Math.random() * 0.3);
      
      extraData.push({
        country,
        product_group: productGroup,
        vendor,
        shipment_mode: shipmentMode,
        manufacturing_site: manufacturingSite,
        line_item_quantity: quantity,
        unit_price: parseFloat(unitPrice.toFixed(2)),
        freight_cost_usd: parseFloat(freightCost.toFixed(2)),
        delivered_to_client_date: dateStr
      });
    }
  }
  
  return extraData;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Combine base sample data with generated data
    const allData = [...sampleData, ...generateMoreData()];
    
    // Insert the sample data into the database
    const { data, error } = await supabaseClient
      .from('PharmaFlow.AI')
      .insert(allData)
      .select();
    
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Sample data loaded', count: allData.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
