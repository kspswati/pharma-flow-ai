// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jmtbapnwjlwluqkzurnj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdGJhcG53amx3bHVxa3p1cm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQ1NjEsImV4cCI6MjA2MTA0MDU2MX0.QPjLwVZLNbWFTld80692iMqxJm6Vu_PC4s64tDMvIIw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);