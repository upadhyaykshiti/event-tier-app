
// backend/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("🟡 Supabase URL:", process.env.SUPABASE_URL);
console.log("🟡 Supabase Key:", process.env.SUPABASE_SERVICE_ROLE_KEY);


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
