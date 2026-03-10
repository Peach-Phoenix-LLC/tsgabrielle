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
      'Content-Type': 'application/json'
    };

    // 1. Fetch Sync Products
    const response = await fetch(`${PRINTFUL_API_URL}/sync/products`, { headers: PRINTFUL_HEADERS });
    if (!response.ok) {
      throw new Error(`Failed to fetch from Printful: ${response.statusText}`);
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
          slug: pfProduct.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + pfProduct.id.toString(),
          active: true,
          category_id: category_id || null,
          collection_id: collection_id || null
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
                sku: pfVariant.external_id || `PF-${pfVariant.id}`,
                title: pfVariant.name,
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
