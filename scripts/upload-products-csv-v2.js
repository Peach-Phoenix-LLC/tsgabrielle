import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import { parse } from "csv-parse/sync";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseMoneyToCents(value) {
  const numeric = String(value || "")
    .replace(/[^0-9.-]/g, "")
    .trim();
  if (!numeric) return null;
  const amount = Number(numeric);
  if (!Number.isFinite(amount)) return null;
  return Math.round(amount * 100);
}

function boolFromStatus(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return true;
  if (["active", "published", "true", "1"].includes(normalized)) return true;
  if (["draft", "inactive", "archived", "false", "0"].includes(normalized)) return false;
  return true;
}

function findCsvPath() {
  const preferred = process.argv[2];
  if (preferred && fs.existsSync(preferred)) return preferred;

  const candidates = [
    "images/Products/Product Catalog.csv",
    "images/Products Product Catalog.csv",
  ];

  for (const candidate of candidates) {
    const absolute = path.resolve(process.cwd(), candidate);
    if (fs.existsSync(absolute)) return absolute;
  }

  return null;
}

function parseCsvWithUniqueHeaders(fileContent) {
  const rows = parse(fileContent, { skip_empty_lines: true, relax_column_count: true });
  if (rows.length < 2) return [];

  const headers = rows[0].map((header, index) => {
    const raw = String(header || "").trim() || `column_${index}`;
    return raw;
  });

  const headerCounts = new Map();
  const uniqueHeaders = headers.map((header) => {
    const count = (headerCounts.get(header) || 0) + 1;
    headerCounts.set(header, count);
    return count === 1 ? header : `${header}_${count}`;
  });

  return rows.slice(1).map((row) => {
    const record = {};
    uniqueHeaders.forEach((header, idx) => {
      record[header] = row[idx] ?? "";
    });
    return record;
  });
}

async function getOrCreateCategoryId(name) {
  if (!name) return null;
  const slug = slugify(name);
  if (!slug) return null;

  const { data, error } = await supabase
    .from("categories")
    .upsert({ name, slug }, { onConflict: "slug" })
    .select("id")
    .single();

  if (error) throw error;
  return data?.id ?? null;
}

async function getOrCreateCollectionId(name) {
  if (!name) return null;
  const slug = slugify(name);
  if (!slug) return null;

  const { data, error } = await supabase
    .from("collections")
    .upsert({ name, slug, title: name }, { onConflict: "slug" })
    .select("id")
    .single();

  if (error) throw error;
  return data?.id ?? null;
}

function splitPipeOrComma(value) {
  return String(value || "")
    .split(/[|,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildVariantTitle(record) {
  const parts = [
    record["Color"],
    record["Size"],
    record["Style/Pattern"],
    record["Material"],
  ]
    .map((part) => String(part || "").trim())
    .filter(Boolean);

  return parts.join(" / ");
}

function buildMetafields(record, tags) {
  const metafields = {};
  const mappedKeys = [
    "Peach Number",
    "SEO Title",
    "SEO Description",
    "g:gtin",
    "g:mpn",
    "g:brand",
    "g:Custom_Label_0",
    "g:Condition",
    "g:identifier_exists",
    "g:google_product_category",
    "Product Type",
    "Weight (g/oz)",
    "Color",
    "Material",
    "Warranty/Return Policy (30 Days)",
    "Capacity/Volume",
    "Capacity/Volume_2",
    "Dimensions",
    "Dimensions_2",
    "Size",
    "Style/Pattern",
    "Finish",
    "Sustainability Score",
    "Direct_Web_URL",
  ];

  for (const key of mappedKeys) {
    const value = String(record[key] || "").trim();
    if (value) metafields[key] = value;
  }

  if (tags.length > 0) metafields.tags = tags.slice(0, 25);
  return metafields;
}

async function upsertProductImage(productId, imageUrl, sortOrder, title) {
  if (!imageUrl) return;
  const { error } = await supabase
    .from("product_images")
    .upsert(
      {
        product_id: productId,
        url: imageUrl,
        alt: title,
        sort_order: sortOrder,
      },
      { onConflict: "product_id,url" }
    );

  if (error && error.code !== "42P10") {
    // 42P10 would happen if unique constraint for onConflict doesn't exist.
    throw error;
  }

  if (error && error.code === "42P10") {
    await supabase
      .from("product_images")
      .insert({
        product_id: productId,
        url: imageUrl,
        alt: title,
        sort_order: sortOrder,
      });
  }
}

async function run() {
  const csvPath = findCsvPath();
  if (!csvPath) {
    console.error("CSV not found. Pass full path as arg or place at images/Products/Product Catalog.csv");
    process.exit(1);
  }

  const fileContent = fs.readFileSync(csvPath, "utf8");
  const records = parseCsvWithUniqueHeaders(fileContent);

  if (records.length === 0) {
    console.log("No rows found in CSV.");
    return;
  }

  const rejected = [];
  const productCache = new Map();

  for (let index = 0; index < records.length; index += 1) {
    const rowNumber = index + 2;
    const record = records[index];

    const title = String(record["Title"] || "").trim();
    const sku = String(record["SKU"] || "").trim();
    const handle = slugify(String(record["Handle"] || "").trim() || title);
    const priceCents = parseMoneyToCents(record["Price $"]);

    if (!title || !sku || !handle || priceCents === null) {
      rejected.push({
        row: rowNumber,
        reason: "Missing required fields (Title, SKU, Handle/Title, Price $)",
        title,
        sku,
      });
      continue;
    }

    try {
      let productId = productCache.get(handle);
      const categoryName = splitPipeOrComma(record["Categories"])[0] || null;
      const collectionName = splitPipeOrComma(record["Collection"])[0] || null;
      const tagList = splitPipeOrComma(record["Tag 13"]).concat(splitPipeOrComma(record["Tag 50"]));

      if (!productId) {
        const [categoryId, collectionId] = await Promise.all([
          getOrCreateCategoryId(categoryName),
          getOrCreateCollectionId(collectionName),
        ]);

        const longDescription = String(record["Long Description"] || "").trim();
        const shortDescription = String(record["Short Description"] || "").trim();
        const metafields = buildMetafields(record, tagList);

        const { data: product, error: productError } = await supabase
          .from("products")
          .upsert(
            {
              slug: handle,
              title,
              description: longDescription || shortDescription || "",
              category_id: categoryId,
              collection_id: collectionId,
              price_cents: priceCents,
              currency: "USD",
              active: boolFromStatus(record["Status"]),
              metafields,
            },
            { onConflict: "slug" }
          )
          .select("id")
          .single();

        if (productError) throw productError;
        productId = product?.id;
        productCache.set(handle, productId);

        const imageUrls = [
          String(record["Image URL 1"] || "").trim(),
          String(record["Image URL 2"] || "").trim(),
          String(record["Image URL 3"] || "").trim(),
        ].filter(Boolean);

        for (let sortOrder = 0; sortOrder < imageUrls.length; sortOrder += 1) {
          await upsertProductImage(productId, imageUrls[sortOrder], sortOrder, title);
        }
      }

      const stockRaw = String(record["Stock"] || record["Inventory"] || "").trim();
      const parsedStock = Number(stockRaw);
      const stock = Number.isFinite(parsedStock) ? parsedStock : 0;
      const variantTitle = buildVariantTitle(record) || title;

      const { error: variantError } = await supabase
        .from("product_variants")
        .upsert(
          {
            product_id: productId,
            sku,
            title: variantTitle,
            stock,
            price_cents: priceCents,
            currency: "USD",
          },
          { onConflict: "sku" }
        );

      if (variantError) throw variantError;
      console.log(`Imported variant row ${rowNumber}: ${sku} -> ${handle}`);
    } catch (error) {
      rejected.push({
        row: rowNumber,
        reason: (error && error.message) || "Unknown import error",
        title,
        sku,
      });
    }
  }

  if (rejected.length > 0) {
    const rejectedCsv = [
      "row,reason,title,sku",
      ...rejected.map((r) => `${r.row},"${String(r.reason).replace(/"/g, '""')}","${String(r.title).replace(/"/g, '""')}","${String(r.sku).replace(/"/g, '""')}"`),
    ].join("\n");
    const rejectedPath = path.resolve(process.cwd(), "scripts/rejected_rows_products_v2.csv");
    fs.writeFileSync(rejectedPath, rejectedCsv, "utf8");
    console.log(`Rejected rows report: ${rejectedPath} (${rejected.length} rows)`);
  }

  console.log(`Done. Processed ${records.length} rows.`);
}

run().catch((error) => {
  console.error("Import failed:", error);
  process.exit(1);
});
