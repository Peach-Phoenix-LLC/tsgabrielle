require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const keyword = 'paris';
  const { data, error } = await supabase.from('products').select('*').eq('status', 'active').ilike('title', `%${keyword}%`);
  console.log('Matches:', data ? data.length : 0);
  if (error) console.error(error);
}
run();