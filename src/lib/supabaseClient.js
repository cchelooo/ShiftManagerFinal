import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wflcmztopusnkocyseph.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbGNtenRvcHVzbmtvY3lzZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMjk3MDEsImV4cCI6MjA2MTgwNTcwMX0.maOqvP-6-2Ft8Ig05m7jEk_uVO30d2usa1M6WcnDYBg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
