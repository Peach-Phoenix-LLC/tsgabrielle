import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const authResult = await requireAdmin();
    if (authResult.error) {
      return authResult.error;
    }

    const supabase = getSupabaseServerClient();
    
    const { category_id, collection_id } = await req.json();

    const apiKey = process.env.PRINTFUL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "PRINTFUL_API_KEY is not set" }, { status: 400 });
    }

    const PRINTFUL_API_URL = 'https://api.printful.com';
    const PRINTFUL_HEADERS = {
      'Authorization': `Bearer ${apiKey}`,
      'X-PF-Store-Id': '17780588',
      'Content-Type': 'application/json'
    };

    // 1. Fetch Sync Products
    const response = await fetch(`${PRINTFUL_API_URL}/sync/products`, { headers: PRINTFUL_HEADERS });
    if (!response.ok) {
      const errBody = await response.json().catch(() => null);
      const errMsg = errBody?.error?.message || (typeof errBody?.result === 'string' ? errBody.result : null) || response.statusText;
      throw new Error(`Failed to fetch from Printful: ${errMsg}`);
    }
    const jsonData = await response.json() as { result: any[] };
    const products = jsonData.result;

    let importedCount = 0;

    for (const pfProduct of products) {
      // 2. Fetch specific variants for this product
      const variantRes = await fetch(`${PRINTFUL_API_URL}/sync/products/${pfProduct.id}`, { headers: PRINTFUL_HEADERS });
      if (!variantRes.ok) continue;
      
      const variantData = await variantRes.json() as { result: any };
      const productDetail = variantData.result;

      // Extract primary thumbnail image
      const primaryImage = pfProduct.thumbnail_url || "";

      // 3. Upsert into Supabase products table
      const { data: dbProduct, error: prodError } = await supabase
        .from('products')
        .upsert({
          printful_product_id: pfProduct.id.toString(),
          title: pfProduct.name,
          subtitle: pfProduct.name,
          tagline: "tsgabrielle® Luxury",
          brand: "tsgabrielle®",
          short_description: pfProduct.name,
          long_description: pfProduct.name,
          base_sku: pfProduct.external_id || `PF-${pfProduct.id}`,
          base_mpn: pfProduct.external_id || `PF-${pfProduct.id}`,
          product_type: "Luxury",
          catalogue_category: "Collection",
          catalogue_collection: "Printful",
          google_category_id: "0",
          google_category_name: "Uncategorized",
          hs_code_primary: "0",
          shipping_tier: "Standard",
          lead_time: "3-5 days",
          warehouse_zone: "Global",
          country_of_origin: "USA",
          traceability: "Full",
          ethical_audit: "Passed",
          carbon_footprint: "Neutral",
          msrp_display: "0",
          composition: "Mixed",
          finish: "Standard",
          care_instructions: "Wash cold",
          prop65_status: "Safe",
          trademark_notes: "None",
          safety_testing: "Passed",
          warranty_info: "Standard",
          contact_info: "contact@tsgabrielle.us",
          active: true,
          status: "active",
          seo_meta_title: pfProduct.name,
          seo_meta_description: pfProduct.name
        }, { onConflict: 'printful_product_id' })
        .select()
        .single();

      if (prodError) {
         console.error("Product Insert Error:", prodError);
         continue;
      }

      // Add main product image if we have one and the product is newly inserted or doesn't have images
      if (primaryImage) {
          // just upsert it as sort_order 0
          await supabase.from('product_images').upsert({
              product_id: dbProduct.id,
              url: primaryImage,
              sort_order: 0,
              alt: pfProduct.name
          }, { onConflict: 'product_id, sort_order' });
      }

      // 4. Sync Variants
      if (productDetail.sync_variants && Array.isArray(productDetail.sync_variants)) {
          for (const pfVariant of productDetail.sync_variants) {
            await supabase
              .from('product_variants')
              .upsert({
                product_id: dbProduct.id,
                variant_sku: pfVariant.external_id || `PFV-${pfVariant.id}`,
                variant_mpn: pfVariant.external_id || `PFV-${pfVariant.id}`,
                size_label: pfVariant.name,
                color: "Standard",
                height: "0",
                diameter: "0",
                msrp: pfVariant.retail_price || "0",
                inventory: "In Stock",
                printful_variant_id: pfVariant.id.toString(),
                price_cents: Math.round(parseFloat(pfVariant.retail_price) * 100),
                currency: 'USD'
              }, { onConflict: 'printful_variant_id' });
          }
      }
      importedCount++;
    }

    return NextResponse.json({ success: true, count: importedCount });
  } catch (error: any) {
    console.error("Printful import error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
