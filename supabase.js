import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ykaypexgblikgaxyhmtt.supabase.co'; // Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYXlwZXhnYmxpa2dheHlobXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MjUxNTEsImV4cCI6MjA1MjEwMTE1MX0.3JEa9fHG1rguLWVT1Xar4hpj4-l0MoNUq5dA0LmTn04'; // Supabase veřejný klíč
export const supabase = createClient(supabaseUrl, supabaseKey);
