import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase env vars missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  // Insert a sample category (if needed)
  const { data: category, error: catErr } = await supabase
    .from("categories")
    .upsert({ name: "Sample Category" }, { onConflict: "name" })
    .select("id")
    .single();

  if (catErr && catErr.code !== "23505") {
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
        price_cents: 19999,
        active: true,
        category_id: categoryId,
        // other required fields as per your schema
      },
      { onConflict: "title" }
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
