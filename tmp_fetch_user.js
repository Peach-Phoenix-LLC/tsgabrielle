import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function getUser() {
  const email = "contact@tsgabrielle.us";
  const { data, error } = await supabase.auth.admin.getUserByEmail(email);
  if (error) {
    console.error("Error fetching user:", error);
    return;
  }
  console.log("User data:", data);
}

getUser().catch(console.error);
