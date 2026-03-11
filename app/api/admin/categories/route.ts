import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

function normalizeTags(rawTags: unknown): string[] {
  if (Array.isArray(rawTags)) {
    return rawTags
      .map((tag) => String(tag).trim())
      .filter(Boolean)
      .slice(0, 25);
  }

  if (typeof rawTags === "string") {
    return rawTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 25);
  }

  return [];
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const supabase = getSupabaseServerClient();
    const payload = await req.json();
    const tags = normalizeTags(payload.tags);
    const { data, error } = await supabase
      .from("categories")
      .insert({
        name: payload.name,
        slug: payload.slug,
        title: payload.title ?? payload.name,
        subtitle: payload.subtitle ?? null,
        description: payload.description ?? null,
        seo_title: payload.seo_title ?? null,
        seo_description: payload.seo_description ?? null,
        tags,
        hero_image_1: payload.hero_image_1 ?? null,
        hero_image_2: payload.hero_image_2 ?? null,
        hero_image_3: payload.hero_image_3 ?? null,
        hero_description_1: payload.hero_description_1 ?? null,
        hero_description_2: payload.hero_description_2 ?? null,
        hero_description_3: payload.hero_description_3 ?? null,
        background_color: payload.background_color ?? null,
        text_color: payload.text_color ?? null,
        product_grid_background_color: payload.product_grid_background_color ?? null,
        product_grid_text_color: payload.product_grid_text_color ?? null,
        product_grid_accent_color: payload.product_grid_accent_color ?? null,
        hero_overlay_color: payload.hero_overlay_color ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const supabase = getSupabaseServerClient();
    const payload = await req.json();
    const tags = normalizeTags(payload.tags);
    const { data, error } = await supabase
      .from("categories")
      .update({
        name: payload.name,
        slug: payload.slug,
        title: payload.title ?? payload.name,
        subtitle: payload.subtitle ?? null,
        description: payload.description ?? null,
        seo_title: payload.seo_title ?? null,
        seo_description: payload.seo_description ?? null,
        tags,
        hero_image_1: payload.hero_image_1 ?? null,
        hero_image_2: payload.hero_image_2 ?? null,
        hero_image_3: payload.hero_image_3 ?? null,
        hero_description_1: payload.hero_description_1 ?? null,
        hero_description_2: payload.hero_description_2 ?? null,
        hero_description_3: payload.hero_description_3 ?? null,
        background_color: payload.background_color ?? null,
        text_color: payload.text_color ?? null,
        product_grid_background_color: payload.product_grid_background_color ?? null,
        product_grid_text_color: payload.product_grid_text_color ?? null,
        product_grid_accent_color: payload.product_grid_accent_color ?? null,
        hero_overlay_color: payload.hero_overlay_color ?? null,
      })
      .eq("id", payload.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
