import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from 'fs';
import path from 'path';

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase env vars missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function applyMigration() {
  const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/20260305205810_add_product_metafields.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log("Applying migration:", migrationPath);

  // Using RPC to execute arbitrary SQL is not ideal, but necessary if direct `db push` fails.
  // This method should only be used for small, controlled schema changes in development.
  // For production, `supabase db push` or direct SQL client is preferred.
  const { error } = await supabase.rpc('execute_sql', { sql_query: sql }); // Assuming an `execute_sql` function exists or can be created

  if (error) {
    console.error("Error applying migration:", error);
    // Fallback if rpc function doesn't exist or fails
    console.warn("Attempting to apply migration via `db push` again. Please ensure Supabase CLI is logged in.");
    console.warn("If `db push` continues to fail, you may need to apply the SQL manually via Supabase Studio.");
    throw error; // Re-throw to indicate failure
  }

  console.log("✅ Migration applied successfully.");
}

applyMigration().catch((e) => {
  console.error("Unexpected error during migration application:", e);
  process.exit(1);
});
