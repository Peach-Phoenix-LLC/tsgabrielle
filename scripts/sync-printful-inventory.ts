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
    const { result: products } = await response.json();

    for (const pfProduct of products) {
      console.log(`📦 Processing Product: ${pfProduct.name} (${pfProduct.id})`);

      // 2. Fetch specific variants for this product
      const variantRes = await fetch(`${PRINTFUL_API_URL}/sync/products/${pfProduct.id}`, { headers: PRINTFUL_HEADERS });
      const { result: productDetail } = await variantRes.json();

      // 3. Upsert into Supabase products table
      const { data: dbProduct, error: prodError } = await supabase
        .from('products')
        .upsert({
          printful_product_id: pfProduct.id.toString(),
          title: pfProduct.name,
          slug: pfProduct.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
          active: true
        }, { onConflict: 'printful_product_id' })
        .select()
        .single();

      if (prodError) throw prodError;

      // 4. Sync Variants
      for (const pfVariant of productDetail.sync_variants) {
        console.log(`   🔹 Syncing Variant: ${pfVariant.name} (SKU: ${pfVariant.external_id})`);
        
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

    console.log('✅ [tsgabrielle™] Autonomous Inventory Sync Completed Successfully.');
  } catch (error) {
    console.error('❌ [tsgabrielle™] Sync Error:', error);
  }
}

syncInventory();
