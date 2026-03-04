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

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  if (!hasSupabaseServerEnv()) return [];
  const supabase = getSupabaseServerClient();
  const { data: category } = await supabase.from("categories").select("id").eq("slug", slug).single();
  if (!category?.id) return [];
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("active", true)
    .order("created_at", { ascending: false });
  return (data ?? []) as Product[];
}

export async function getProductsByCollectionSlug(slug: string): Promise<Product[]> {
  if (!hasSupabaseServerEnv()) return [];
  const supabase = getSupabaseServerClient();
  const { data: collection } = await supabase.from("collections").select("id").eq("slug", slug).single();
  if (!collection?.id) return [];
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("collection_id", collection.id)
    .eq("active", true)
    .order("created_at", { ascending: false });
  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabaseServerEnv()) return null;
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("products").select("*").eq("slug", slug).single();
  return (data as Product | null) ?? null;
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
