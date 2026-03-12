require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase environment variables are missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkActivity() {
  console.log('⚡ Checking recent activity in tsgabrielle database...\n');

  try {
    // 1. Recent Orders
    console.log('--- [orders] Last 5 Entries ---');
    const { data: orders } = await supabase
      .from('orders')
      .select('customer_email, total_amount, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (orders && orders.length > 0) console.table(orders);
    else console.log('No recent orders found.\n');

    // 2. Recent Signups (Profiles)
    console.log('\n--- [profiles] Last 5 Signups ---');
    const { data: profiles } = await supabase
      .from('profiles')
      .select('email, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (profiles && profiles.length > 0) console.table(profiles);
    else console.log('No recent signups found.\n');

    // 3. Recent Content changes
    console.log('\n--- [page_content] Last 5 Updates ---');
    const { data: content } = await supabase
      .from('page_content')
      .select('page_path, content_key, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5);

    if (content && content.length > 0) console.table(content);
    else console.log('No recent content updates found.\n');

  } catch (err) {
    console.error('❌ Error querying activity:', err.message);
  }
}

checkActivity();