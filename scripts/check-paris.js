import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function check() {
  const { data, error } = await supabase.from("collections").select("*").eq("slug", "paris").single();
  if (error) {
    console.error("Error fetching Paris collection:", error);
    process.exit(1);
  }
  console.log("Paris Collection current data:");
  console.log("Name:", data.name);
  console.log("Title (Meta):", data.seo_title);
  console.log("Description (Meta):", data.seo_description);
  console.log("Slogans Count:", data.slogans?.length);
  console.log("Tags Count:", data.tags?.length);
}

check();
