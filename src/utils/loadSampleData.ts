
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Loads sample data into the database for demonstration purposes
 */
export const loadSampleData = async () => {
  try {
    // Check if sample data already exists
    const { count, error: countError } = await supabase
      .from('PharmaFlow.AI')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw new Error(`Error checking for existing data: ${countError.message}`);
    }
    
    // If we already have data, don't load sample data again
    if (count && count > 0) {
      toast({
        title: "Data already exists",
        description: "Sample data is already loaded in the database",
      });
      return;
    }
    
    // Call the Supabase Edge Function to load sample data
    const { data, error } = await supabase.functions.invoke('load-sample-data');
    
    if (error) {
      throw new Error(`Error loading sample data: ${error.message}`);
    }
    
    toast({
      title: "Sample data loaded",
      description: "Sample pharmaceutical data has been loaded successfully",
    });
    
    return data;
  } catch (error) {
    console.error("Error loading sample data:", error);
    toast({
      title: "Error loading sample data",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive"
    });
  }
};
