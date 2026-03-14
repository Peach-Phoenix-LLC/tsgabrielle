import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get("page_id");
    const supabase = getSupabaseServerClient();

    let query = supabase
      .from("builder_sections")
      .select("*")
      .order("sort_order");

    if (pageId) {
      query = query.eq("page_id", pageId);
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
    const { page_id, section_type, props, sort_order, is_visible } = body;

    if (!page_id || !section_type) {
      return NextResponse.json(
        { error: "page_id and section_type are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("builder_sections")
      .insert({
        page_id,
        section_type,
        props: props || {},
        sort_order: sort_order ?? 0,
        is_visible: is_visible ?? true,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const supabase = getSupabaseServerClient();
    const body = await req.json();
    const { id, props, sort_order, is_visible } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (props !== undefined) updates.props = props;
    if (sort_order !== undefined) updates.sort_order = sort_order;
    if (is_visible !== undefined) updates.is_visible = is_visible;

    const { data, error } = await supabase
      .from("builder_sections")
      .update(updates)
      .eq("id", id)
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
    const { error } = await supabase.from("builder_sections").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
