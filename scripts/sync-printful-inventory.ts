import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_HEADERS = {
  'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
  'Content-Type': 'application/json'
};

async function syncInventory() {
  console.log('🚀 [tsgabrielle™] Starting Autonomous Inventory Sync...');

  try {
    // 1. Fetch Sync Products from Printful
    const response = await fetch(`${PRINTFUL_API_URL}/sync/products`, { headers: PRINTFUL_HEADERS });
    const jsonData = await response.json() as { result: any[] };
    
    if (!jsonData.result) {
      console.error('❌ Failed to fetch from Printful. Invalid token or no products found.', jsonData);
      return;
    }
    
    const products = jsonData.result;

    for (const pfProduct of products) {
      console.log(`📦 Processing Product: ${pfProduct.name} (${pfProduct.id})`);

      // 2. Fetch specific variants for this product
      const variantRes = await fetch(`${PRINTFUL_API_URL}/sync/products/${pfProduct.id}`, { headers: PRINTFUL_HEADERS });
      const variantData = await variantRes.json() as { result: any };
      const productDetail = variantData.result;

      if (!productDetail) continue;

      // Generate a unique peach number based on printful id
      const uniqueNum = parseInt(pfProduct.id.toString().slice(-8), 10) || Math.floor(Math.random() * 1000000);

      // Extract some logic for categorizing based on titles
      const nameLower = pfProduct.name.toLowerCase();
      let productType = "Apparel";
      if (nameLower.includes("mug") || nameLower.includes("tumbler") || nameLower.includes("bottle") || nameLower.includes("backpack") || nameLower.includes("bag")) {
        productType = "Accessories";
      } else if (nameLower.includes("hat") || nameLower.includes("cap") || nameLower.includes("beanie")) {
        productType = "Headwear";
      }

      const dbPayload = {
        peach_number: uniqueNum,
        title: pfProduct.name,
        subtitle: "Luxury Essential",
        tagline: "The French Trans Touch™",
        brand: "tsgabrielle®",
        short_description: "Premium curated piece.",
        long_description: "Experience the ultimate expression of identity and style with this premium piece from tsgabrielle®.",
        base_sku: pfProduct.external_id || `PF-${pfProduct.id}`,
        base_mpn: `MPN-${pfProduct.id}`,
        product_type: productType,
        catalogue_category: "Catalog",
        catalogue_collection: "Merch",
        google_category_id: "1",
        google_category_name: "Apparel & Accessories",
        status: "active",
        gs_condition: "New",
        gs_availability: "In Stock",
        seo_meta_title: `${pfProduct.name} | tsgabrielle®`,
        seo_meta_description: "Shop this premium piece from tsgabrielle®.",
        seo_tags: ["tsgabrielle", "premium"],
        hs_code_primary: "610910",
        shipping_tier: "Standard",
        lead_time: "2-5 Business Days",
        warehouse_zone: "US-East",
        country_of_origin: "US",
        traceability: "Standard",
        ethical_audit: "Standard",
        carbon_footprint: "Standard",
        msrp_display: "0.00",
        map_policy: "None",
        wholesale_price: "0.00",
        seasonality_code: "Core",
        landed_cost_est: "0.00",
        url_amazon: "",
        url_etsy: "",
        url_tiktok: "",
        composition: "Premium Blend",
        finish: "Standard",
        care_instructions: "Follow tag instructions",
        prop65_status: "Exempt",
        trademark_notes: "tsgabrielle®",
        safety_testing: "Passed",
        warranty_info: "Standard",
        contact_info: "contact@tsgabrielle.us",
        media_primary_url: pfProduct.thumbnail_url || "",
        media_primary_alt: pfProduct.name,
        updated_at: new Date().toISOString()
      };

      // 3. Upsert into Supabase products table
      const { data: dbProduct, error: prodError } = await supabase
        .from('products')
        .upsert(dbPayload, { onConflict: 'base_sku' })
        .select()
        .single();

      if (prodError) {
        console.error(`Failed to upsert product ${pfProduct.name}:`, prodError);
        continue;
      }

      // 4. Sync Variants
      let lowestPrice = Infinity;

      for (const pfVariant of productDetail.sync_variants) {
        console.log(`   🔹 Syncing Variant: ${pfVariant.name} (SKU: ${pfVariant.external_id})`);
        
        const price = parseFloat(pfVariant.retail_price);
        if (price < lowestPrice) lowestPrice = price;

        await supabase
          .from('product_variants')
          .upsert({
            product_id: dbProduct.id,
            size_label: pfVariant.name.split(' - ')[1] || "One Size",
            color: pfVariant.name.split(' - ')[2] || "Standard",
            variant_sku: pfVariant.external_id || `PFV-${pfVariant.id}`,
            variant_mpn: `MPN-V-${pfVariant.id}`,
            height: "0",
            diameter: "0",
            msrp: pfVariant.retail_price,
            inventory: "In Stock",
            image_url: pfVariant.files && pfVariant.files.length > 0 ? pfVariant.files[pfVariant.files.length - 1].preview_url : "",
            image_alt: pfVariant.name,
            printful_variant_id: pfVariant.id
          }, { onConflict: 'variant_sku' });
      }
      
      // Update MSRP display based on lowest variant price
      if (lowestPrice !== Infinity) {
        await supabase.from('products').update({ msrp_display: lowestPrice.toString() }).eq('id', dbProduct.id);
      }
    }

    console.log('✅ [tsgabrielle™] Autonomous Inventory Sync Completed Successfully.');
  } catch (error) {
    console.error('❌ [tsgabrielle™] Sync Error:', error);
  }
}

syncInventory();
