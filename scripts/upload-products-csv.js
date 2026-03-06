import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase env vars missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function uploadProducts() {
  const csvFilePath = path.resolve(process.cwd(), "images/Products/Product Catalog.csv");
  const fileContent = fs.readFileSync(csvFilePath, "utf8");

  let records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Filter out records that are genuinely empty or lack essential fields (Title, SKU)
  records = records.filter(record => record.Title && record.SKU);

  if (records.length === 0) {
    console.log("No valid product records found in the CSV. Exiting.");
    return;
  }

  for (const record of records) {

    console.log(`Processing product: ${record.Title} (SKU: ${record.SKU})`);

    // Handle Category
    let categoryId = null;
    if (record.Categories) {
      const slug = record.Categories.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      let { data: category, error } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .single();

      if (error && error.code === "PGRST116") { // Not found
        console.log(`Creating new category: ${record.Categories}`);
        const { data: newCategory, error: createError } = await supabase
          .from("categories")
          .upsert({ name: record.Categories, slug: slug }, { onConflict: "slug" })
          .select("id")
          .single();
        if (createError) console.error("Error creating category:", createError);
        categoryId = newCategory?.id;
      } else if (error) {
        console.error("Error fetching category:", error);
      } else {
        categoryId = category?.id;
      }
    }

    // Handle Collection
    let collectionId = null;
    if (record.Collection) {
      const slug = record.Collection.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      let { data: collection, error } = await supabase
        .from("collections")
        .select("id")
        .eq("slug", slug)
        .single();

      if (error && error.code === "PGRST116") { // Not found
        console.log(`Creating new collection: ${record.Collection}`);
        const { data: newCollection, error: createError } = await supabase
          .from("collections")
          .upsert({ name: record.Collection, slug: slug }, { onConflict: "slug" })
          .select("id")
          .single();
        if (createError) console.error("Error creating collection:", createError);
        collectionId = newCollection?.id;
      } else if (error) {
        console.error("Error fetching collection:", error);
      } else {
        collectionId = collection?.id;
      }
    }

    // Prepare Metafields
    const metafields = {};
    if (record["g:gtin"]) metafields["g:gtin"] = record["g:gtin"];
    if (record["g:mpn"]) metafields["g:mpn"] = record["g:mpn"];
    if (record["g:brand"]) metafields["g:brand"] = record["g:brand"];
    if (record["g:Custom_Label_0"]) metafields["g:Custom_Label_0"] = record["g:Custom_Label_0"];
    if (record["g:Condition"]) metafields["g:Condition"] = record["g:Condition"];
    if (record["g:identifier_exists"]) metafields["g:identifier_exists"] = record["g:identifier_exists"];
    if (record["g:google_product_category"]) metafields["g:google_product_category"] = record["g:google_product_category"];
    if (record["Product Type"]) metafields["Product Type"] = record["Product Type"];
    if (record["Warranty/Return Policy (30 Days)"]) metafields["Warranty/Return Policy (30 Days)"] = record["Warranty/Return Policy (30 Days)"];
    if (record["Capacity/Volume"]) metafields["Capacity/Volume"] = record["Capacity/Volume"];
    if (record["Dimensions"]) metafields["Dimensions"] = record["Dimensions"];
    if (record["Finish"]) metafields["Finish"] = record["Finish"];
    if (record["Sustainability Score"]) metafields["Sustainability Score"] = record["Sustainability Score"];
    // Add more custom metafields as needed

    const productSlug = record.Title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const priceInCents = Math.round(parseFloat(record["Price $"]) * 100);

    // Upsert Product
    const { data: product, error: productError } = await supabase
      .from("products")
      .upsert(
        {
          slug: productSlug,
          title: record.Title,
          description: record["Short Description"] || "",
          category_id: categoryId,
          collection_id: collectionId,
          price_cents: priceInCents,
          currency: "USD", // Assuming USD from CSV
          active: record.Status === "Active" || true, // Default to true if not specified
          metafields: Object.keys(metafields).length > 0 ? metafields : null, // Store metafields as JSONB
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (productError) {
      console.error(`Error upserting product ${record.Title}:`, productError);
      continue;
    }

    // Upsert Product Variant
    const { data: variant, error: variantError } = await supabase
      .from("product_variants")
      .upsert(
        {
          product_id: product?.id,
          sku: record.SKU,
          title: record.Title, // Using product title for variant title for simplicity
          stock: 999, // Placeholder, as stock is not in CSV
          price_cents: priceInCents,
          currency: "USD",
        },
        { onConflict: "sku" }
      )
      .select("id")
      .single();

    if (variantError) {
      console.error(`Error upserting variant ${record.SKU}:`, variantError);
    }
  }

  console.log("✅ Product data upload complete.");
}

uploadProducts().catch((e) => {
  console.error("Unexpected error during product upload:", e);
  process.exit(1);
});
