import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function check() {
  const { data, error } = await supabase.auth.admin.getUserByEmail("contact@tsgabrielle.us");
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("User data:", data);
}

check();
