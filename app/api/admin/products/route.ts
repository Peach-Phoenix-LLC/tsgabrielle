import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

type VariantInput = {
  id?: string;
  sku: string;
  title?: string;
  stock?: number;
  price_cents?: number;
  currency?: string;
};

type ImageInput = {
  id?: string;
  url: string;
  alt?: string | null;
  sort_order?: number;
};

function normalizeVariants(rawVariants: unknown, defaultPriceCents: number): VariantInput[] {
  if (!Array.isArray(rawVariants)) return [];
  return rawVariants
    .map((variant) => variant as VariantInput)
    .filter((variant) => Boolean(variant?.sku))
    .map((variant) => ({
      id: variant.id,
      sku: String(variant.sku).trim(),
      title: String(variant.title || "Default").trim() || "Default",
      stock: Number.isFinite(Number(variant.stock)) ? Number(variant.stock) : 0,
      price_cents: Number.isFinite(Number(variant.price_cents))
        ? Number(variant.price_cents)
        : defaultPriceCents,
      currency: String(variant.currency || "USD"),
    }));
}

function normalizeImages(rawImages: unknown): ImageInput[] {
  if (!Array.isArray(rawImages)) return [];
  return rawImages
    .map((image, index) => image as ImageInput)
    .filter((image) => Boolean(image?.url))
    .map((image, index) => ({
      id: image.id,
      url: String(image.url).trim(),
      alt: image.alt ? String(image.alt) : null,
      sort_order: Number.isFinite(Number(image.sort_order)) ? Number(image.sort_order) : index,
    }));
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories(name, slug),
        collections(name, slug),
        product_variants(id, sku, title, stock, price_cents, currency),
        product_images(id, url, alt, sort_order)
      `)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const supabase = getSupabaseServerClient();
    const payload = await req.json();

    const {
      title,
      slug,
      description,
      price_cents,
      currency,
      category_id,
      collection_id,
      active,
      metafields,
    } = payload;

    const normalizedPriceCents = Number.isFinite(Number(price_cents)) ? Number(price_cents) : 0;
    const variants = normalizeVariants(payload.variants, normalizedPriceCents);
    const images = normalizeImages(payload.images);

    // 1. Create the product
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        title: String(title || "").trim(),
        slug: String(slug || "").trim(),
        description: String(description || ""),
        price_cents: normalizedPriceCents,
        currency: String(currency || "USD"),
        category_id: category_id || null,
        collection_id: collection_id || null,
        active: active !== false,
        metafields: metafields && typeof metafields === "object" ? metafields : {},
      })
      .select("id")
      .single();

    if (productError) throw new Error(productError.message);

    // 2. Create variants (or default variant)
    const variantsToInsert =
      variants.length > 0
        ? variants
        : [
            {
              sku: `${String(slug || "product").toUpperCase()}-DEFAULT`,
              title: "Default",
              stock: 0,
              price_cents: normalizedPriceCents,
              currency: String(currency || "USD"),
            },
          ];

    const { error: variantsError } = await supabase.from("product_variants").insert(
      variantsToInsert.map((variant) => ({
        product_id: product.id,
        sku: variant.sku,
        title: variant.title || "Default",
        stock: variant.stock || 0,
        price_cents: variant.price_cents ?? normalizedPriceCents,
        currency: variant.currency || "USD",
      }))
    );

    if (variantsError) {
      throw new Error(variantsError.message);
    }

    // 3. Add images
    if (images.length > 0) {
      const { error: imagesError } = await supabase.from("product_images").insert(
        images.map((image) => ({
          product_id: product.id,
          url: image.url,
          alt: image.alt || null,
          sort_order: image.sort_order || 0,
        }))
      );

      if (imagesError) {
        throw new Error(imagesError.message);
      }
    }

    return NextResponse.json({ success: true, id: product.id });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const supabase = getSupabaseServerClient();
    const payload = await req.json();
    const { id } = payload;

    if (!id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const normalizedPriceCents = Number.isFinite(Number(payload.price_cents)) ? Number(payload.price_cents) : 0;
    const variants = normalizeVariants(payload.variants, normalizedPriceCents);
    const images = normalizeImages(payload.images);

    const { error: productError } = await supabase
      .from("products")
      .update({
        title: String(payload.title || "").trim(),
        slug: String(payload.slug || "").trim(),
        description: String(payload.description || ""),
        price_cents: normalizedPriceCents,
        currency: String(payload.currency || "USD"),
        category_id: payload.category_id || null,
        collection_id: payload.collection_id || null,
        active: payload.active !== false,
        metafields: payload.metafields && typeof payload.metafields === "object" ? payload.metafields : {},
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (productError) throw productError;

    const { data: existingVariants, error: existingVariantsError } = await supabase
      .from("product_variants")
      .select("id")
      .eq("product_id", id);

    if (existingVariantsError) throw existingVariantsError;

    const incomingVariantIds = new Set(variants.map((variant) => variant.id).filter(Boolean));
    const variantIdsToDelete = (existingVariants || [])
      .map((variant) => variant.id)
      .filter((variantId) => !incomingVariantIds.has(variantId));

    if (variantIdsToDelete.length > 0) {
      const { error: deleteVariantsError } = await supabase
        .from("product_variants")
        .delete()
        .in("id", variantIdsToDelete);
      if (deleteVariantsError) throw deleteVariantsError;
    }

    for (const variant of variants) {
      const variantPayload = {
        product_id: id,
        sku: variant.sku,
        title: variant.title || "Default",
        stock: variant.stock || 0,
        price_cents: variant.price_cents ?? normalizedPriceCents,
        currency: variant.currency || "USD",
      };

      if (variant.id) {
        const { error: updateVariantError } = await supabase
          .from("product_variants")
          .update(variantPayload)
          .eq("id", variant.id);
        if (updateVariantError) throw updateVariantError;
      } else {
        const { error: insertVariantError } = await supabase
          .from("product_variants")
          .insert(variantPayload);
        if (insertVariantError) throw insertVariantError;
      }
    }

    const { data: existingImages, error: existingImagesError } = await supabase
      .from("product_images")
      .select("id")
      .eq("product_id", id);

    if (existingImagesError) throw existingImagesError;

    const incomingImageIds = new Set(images.map((image) => image.id).filter(Boolean));
    const imageIdsToDelete = (existingImages || [])
      .map((image) => image.id)
      .filter((imageId) => !incomingImageIds.has(imageId));

    if (imageIdsToDelete.length > 0) {
      const { error: deleteImagesError } = await supabase
        .from("product_images")
        .delete()
        .in("id", imageIdsToDelete);
      if (deleteImagesError) throw deleteImagesError;
    }

    for (const image of images) {
      const imagePayload = {
        product_id: id,
        url: image.url,
        alt: image.alt || null,
        sort_order: image.sort_order || 0,
      };

      if (image.id) {
        const { error: updateImageError } = await supabase
          .from("product_images")
          .update(imagePayload)
          .eq("id", image.id);
        if (updateImageError) throw updateImageError;
      } else {
        const { error: insertImageError } = await supabase
          .from("product_images")
          .insert(imagePayload);
        if (insertImageError) throw insertImageError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("products")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
