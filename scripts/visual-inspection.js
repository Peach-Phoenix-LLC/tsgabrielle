
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectData() {
  console.log("--- Visual Inspection of Live Data ---");

  const { data: products } = await supabase.from('products').select('slug, title, price_cents, active').limit(3);
  console.log("\n[products] Sample Rows:");
  console.table(products);

  const { data: content } = await supabase.from('page_content').select('page_path, content_key, content_type').limit(3);
  console.log("\n[page_content] Sample Rows:");
  console.table(content);

  const { data: settings } = await supabase.from('site_settings').select('key, value').limit(3);
  console.log("\n[site_settings] Sample Rows:");
  console.table(settings);
}

inspectData();
