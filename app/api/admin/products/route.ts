import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseServerClient();
    const data = await req.json();

    const {
      title,
      slug,
      description,
      price_cents,
      category_id,
      collection_id,
      active,
      sku,
      image_url,
    } = data;

    // 1. Create the product
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        title,
        slug,
        description,
        price_cents,
        category_id,
        collection_id,
        active,
      })
      .select("id")
      .single();

    if (productError) throw new Error(productError.message);

    // 2. Create the primary variant
    if (sku) {
      const { error: variantError } = await supabase
        .from("product_variants")
        .insert({
          product_id: product.id,
          sku,
          title: "Default",
          price_cents,
          stock: 10, // Default stock for now
        });
      
      if (variantError) throw new Error(variantError.message);
    }

    // 3. Add primary image if provided
    if (image_url) {
      const { error: imageError } = await supabase
        .from("product_images")
        .insert({
          product_id: product.id,
          url: image_url,
          sort_order: 0,
        });

      if (imageError) throw new Error(imageError.message);
    }

    return NextResponse.json({ success: true, id: product.id });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
