const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function listUsers() {
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("Error listing users:", error);
    return;
  }
  console.log(JSON.stringify(users.map(u => ({
    email: u.email,
    id: u.id,
    role: u.app_metadata?.role,
    last_sign_in: u.last_sign_in_at
  })), null, 2));
}

listUsers();
