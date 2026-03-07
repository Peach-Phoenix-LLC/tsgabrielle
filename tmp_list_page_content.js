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

async function listPageContent() {
  const { data, error } = await supabase
    .from("page_content")
    .select("*");
  
  if (error) {
    console.error("Error fetching page content:", error);
    return;
  }
  
  console.log("Page Content found:");
  data.forEach(item => {
    console.log(`Path: ${item.page_path}, Key: ${item.content_key}, Value snippet: ${item.content_value?.substring(0, 50)}...`);
  });
}

listPageContent().catch(console.error);
