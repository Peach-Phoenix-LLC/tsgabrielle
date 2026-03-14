import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const supabase = getSupabaseServerClient();

    let query = supabase
      .from("section_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const supabase = getSupabaseServerClient();
    const body = await req.json();
    const { name, section_type, preview_image, default_props, category, is_global } = body;

    if (!name || !section_type) {
      return NextResponse.json(
        { error: "name and section_type required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("section_templates")
      .insert({
        name,
        section_type,
        preview_image: preview_image || null,
        default_props: default_props || {},
        category: category || "content",
        is_global: is_global ?? true,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("section_templates").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
