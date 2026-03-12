import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Product, ProductVariant, ProductImage } from "@/lib/types";

function hasSupabaseServerEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function getFeatureFlag3D() {
  if (!hasSupabaseServerEnv()) return false;
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("feature_flags").select("enable_3d_hero").eq("key", "home_hero").single();
  return data?.enable_3d_hero ?? false;
}

function mapProduct(p: any): Product {
  return {
    id: p.id.toString(),
    slug: p.base_sku || p.id.toString(),
    title: p.title,
    description: p.long_description || p.short_description || "",
    category_id: null,
    collection_id: null,
    price_cents: Math.round(parseFloat(p.msrp_display || "0") * 100),
    currency: "USD",
    active: p.status === "active",
    metafields: {},
    ...p
  };
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  if (!hasSupabaseServerEnv()) return [];
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(url)")
    .eq("catalogue_category", slug)
    .eq("status", "active")
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapProduct);
}

export async function getCollectionBySlug(slug: string): Promise<any | null> {
  if (!hasSupabaseServerEnv()) return null;
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("collections").select("*").eq("slug", slug).single();
  return data || null;
}

export async function getProductsByCollectionSlug(slug: string): Promise<Product[]> {
  if (!hasSupabaseServerEnv()) return [];
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(url)")
    .eq("catalogue_collection", slug)
    .eq("status", "active")
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapProduct);
}

export async function getProductsByCollectionId(collectionId: string): Promise<Product[]> {
  return getProductsByCollectionSlug(collectionId); // mapped ID to slug fallback
}

export async function getCategories(): Promise<any[]> {
  if (!hasSupabaseServerEnv()) return [];
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("categories").select("id, name, slug").order("name");
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabaseServerEnv()) return null;
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("products").select("*").eq("base_sku", slug).single();
  
  if (!data) {
    // fallback to ID if it's numeric
    if (!isNaN(Number(slug))) {
      const { data: byId } = await supabase.from("products").select("*").eq("id", Number(slug)).single();
      if (byId) return mapProduct(byId);
    }
    return null;
  }
  return mapProduct(data);
}

export async function getVariantsByProductId(productId: string): Promise<ProductVariant[]> {
  if (!hasSupabaseServerEnv()) return [];
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .order("title", { ascending: true });
  return (data ?? []) as ProductVariant[];
}
export async function getProductImages(productId: string): Promise<ProductImage[]> {
  if (!hasSupabaseServerEnv()) return [];
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });
  return (data ?? []) as ProductImage[];
}

export async function getCategoryBySlug(slug: string): Promise<any | null> {
  if (!hasSupabaseServerEnv()) return null;
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("categories").select("*").eq("slug", slug).single();
  return data || null;
}
