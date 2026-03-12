require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log('⚡ Verifying Supabase API connection...');
  const { data, error } = await supabase.from('products').select('count').limit(1);

  if (error) {
    console.error('❌ API Connection Failed:', error.message);
  } else {
    console.log('✅ API Connection Successful! Found products table.');
  }
}

verify();