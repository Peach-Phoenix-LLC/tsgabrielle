import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    const supabase = getSupabaseServerClient();

    if (path) {
      const { data, error } = await supabase
        .from("builder_pages")
        .select("*, builder_sections(*)")
        .eq("path", path)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return NextResponse.json(data || null);
    }

    const { data, error } = await supabase
      .from("builder_pages")
      .select("id, path, title, status, version, updated_at")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error fetching builder pages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const supabase = getSupabaseServerClient();
    const body = await req.json();
    const { path, title, draft_layout, seo_title, seo_description } = body;

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    const upsertData: Record<string, any> = {
      path,
      updated_at: new Date().toISOString(),
    };
    if (title) upsertData.title = title;
    if (draft_layout !== undefined) upsertData.draft_layout = draft_layout;
    if (seo_title !== undefined) upsertData.seo_title = seo_title;
    if (seo_description !== undefined) upsertData.seo_description = seo_description;

    const { data, error } = await supabase
      .from("builder_pages")
      .upsert(upsertData, { onConflict: "path" })
      .select()
      .single();

    if (error) throw error;

    // If draft_layout includes sections, sync to builder_sections table
    if (draft_layout?.sections) {
      // Delete existing sections for this page
      await supabase
        .from("builder_sections")
        .delete()
        .eq("page_id", data.id);

      // Insert new sections
      const sections = draft_layout.sections.map((s: any, i: number) => ({
        id: s.id,
        page_id: data.id,
        section_type: s.type,
        props: s.props || {},
        sort_order: i,
        is_visible: s.visible !== false,
      }));

      if (sections.length > 0) {
        const { error: secError } = await supabase
          .from("builder_sections")
          .insert(sections);
        if (secError) console.error("Error syncing sections:", secError);
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error saving builder page:", error);
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
    const { error } = await supabase.from("builder_pages").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
