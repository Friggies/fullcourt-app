import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://crbswbfgtbkjinzagblg.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyYnN3YmZndGJramluemFnYmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTcwMjUsImV4cCI6MjA2MTY5MzAyNX0.py2tmOWNzgt22FZyHveDam9o53G-wfNcZ8kHXq939W0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
