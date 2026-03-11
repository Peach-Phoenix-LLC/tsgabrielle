import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function check() {
  console.log("Checking for columns in 'collections' table...");
  const { data, error } = await supabase.from("collections").select("*").limit(1);
  
  if (error) {
    console.error("Error fetching collections:", error);
    return;
  }

  const columns = Object.keys(data[0] || {});
  const required = ["seo_title", "seo_description", "slogans"];
  const missing = required.filter(col => !columns.includes(col));

  if (missing.length === 0) {
    console.log("✅ All required columns exist.");
  } else {
    console.log("❌ Missing columns:", missing.join(", "));
    console.log("\nTo fix this, go to Supabase SQL Editor and run:");
    console.log(`
alter table public.collections
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists slogans text[] not null default '{}';
    `);
  }
}

check();
