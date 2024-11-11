// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uxpsgtdilunurhqaasih.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cHNndGRpbHVudXJocWFhc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3NDQ0MDQsImV4cCI6MjA0MzMyMDQwNH0.7ZNzT5zcAvRug8rWM5DMs9MzBeMgv5ifvRZzj9eKyDU'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
