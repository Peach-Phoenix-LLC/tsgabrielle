import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from 'fs';
import path from 'path';

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase env vars missing.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function run() {
  const sql = `
-- 1. Ensure updated_at trigger exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_orders') THEN
        CREATE TRIGGER set_updated_at_orders
        BEFORE UPDATE ON orders
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
END $$;

-- 2. Add automation-specific columns
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS automation_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS external_metadata jsonb DEFAULT '{}';

-- 3. Add index
CREATE INDEX IF NOT EXISTS idx_orders_automation_status ON orders(automation_status);
  `;

  console.log("Applying automation fields to orders table...");
  
  // Try to use execute_sql RPC
  const { data, error } = await supabase.rpc('execute_sql', { sql_query: sql });

  if (error) {
    if (error.message.includes("function public.execute_sql(text) does not exist")) {
        console.error("❌ The 'execute_sql' helper function does not exist in your Supabase project.");
        console.log("Please run the SQL manually in the Supabase SQL Editor:");
        console.log(sql);
    } else {
        console.error("❌ Migration failed:", error.message);
    }
    process.exit(1);
  }

  console.log("✅ Database schema updated successfully!");
}

run();
