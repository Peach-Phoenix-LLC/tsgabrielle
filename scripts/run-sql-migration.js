import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase env vars missing in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function runMigration() {
  const sql = `
    ALTER TABLE public.collections
    ADD COLUMN IF NOT EXISTS seo_title text,
    ADD COLUMN IF NOT EXISTS seo_description text,
    ADD COLUMN IF NOT EXISTS slogans text[] NOT NULL DEFAULT '{}';
  `;

  console.log("Applying schema update to Supabase...");
  
  // Directly use the provided SQL query
  const { error } = await supabase.rpc('execute_sql', { sql_query: sql });

  if (error) {
    console.error("❌ SQL execution failed. Please run the SQL manually in Supabase Studio:");
    console.log(sql);
    console.error("Error details:", error);
    return;
  }

  console.log("✅ Schema updated successfully!");
}

runMigration().catch(console.error);
