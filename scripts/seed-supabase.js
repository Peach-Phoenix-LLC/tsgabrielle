import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase env vars missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function seed() {
  // Insert a sample category (if needed)
  const { data: category, error: catErr } = await supabase
    .from("categories")
    .upsert({ name: "Sample Category", slug: "sample-category" }, { onConflict: "slug" })
    .select("id")
    .single();

  if (catErr) {
    console.error("Category upsert error:", catErr);
    return;
  }

  const categoryId = category?.id;

  // Insert a sample product
  const { data: product, error: prodErr } = await supabase
    .from("products")
    .upsert(
      {
        title: "Sample Luxury Handbag",
        slug: "sample-luxury-handbag",
        price_cents: 19999,
        active: true,
        category_id: categoryId,
        description: "A beautifully crafted sample handbag."
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();

  if (prodErr && prodErr.code !== "23505") {
    console.error("Product upsert error:", prodErr);
    return;
  }

  const productId = product?.id;

  // Insert a variant for the product
  await supabase.from("product_variants").upsert(
    {
      product_id: productId,
      sku: "TSG-001",
      stock: 25,
    },
    { onConflict: "sku" }
  );

  console.log("✅ Seed data inserted successfully.");
}

seed().catch((e) => {
  console.error("Unexpected error:", e);
});
