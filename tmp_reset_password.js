import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase env vars missing in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function resetPassword() {
  const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
  if (usersError) {
    console.error("Error listing users:", usersError);
    return;
  }
  
  const adminUser = usersData.users.find(u => u.email === "contact@tsgabrielle.us");
  if (!adminUser) {
    console.log("Admin user not found.");
    return;
  }
  
  const { data, error } = await supabase.auth.admin.updateUserById(adminUser.id, {
    password: "Password123!"
  });
  
  if (error) {
    console.error("Error updating password:", error);
  } else {
    console.log("Successfully updated password for contact@tsgabrielle.us to 'Password123!'");
  }
}

resetPassword().catch(console.error);
