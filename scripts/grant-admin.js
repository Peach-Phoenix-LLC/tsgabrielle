const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function grantAdmin(email) {
  if (!email) {
    console.error("Please provide an email as an argument.");
    return;
  }

  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error("Error listing users:", listError);
    return;
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    console.error(`User with email ${email} not found.`);
    return;
  }

  console.log(`Found user: ${user.id} (${user.email})`);

  const { data, error: updateError } = await supabase.auth.admin.updateUserById(
    user.id,
    { app_metadata: { role: 'admin' } }
  );

  if (updateError) {
    console.error("Error updating user metadata:", updateError);
    return;
  }

  console.log(`Successfully granted admin role to ${email}`);
  console.log("Updated metadata:", data.user.app_metadata);
}

const targetEmail = process.argv[2] || "contact@tsgabrielle.us";
grantAdmin(targetEmail);
