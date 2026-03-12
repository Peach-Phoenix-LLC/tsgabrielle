
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function verifyConnectivity() {
  console.log("--- Supabase Connection Verification ---");
  console.log(`URL: ${supabaseUrl}`);

  const tables = ['products', 'categories', 'collections', 'orders', 'users', 'page_content'];
  
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error(`❌ Error fetching ${table}:`, error.message);
    } else {
      console.log(`✅ Table '${table}': ${count} records found.`);
    }
  }

  console.log("---------------------------------------");
}

verifyConnectivity();
