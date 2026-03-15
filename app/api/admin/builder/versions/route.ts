import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/builder/versions?path=/
// Returns version history for a given page path
export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();

  const { data: page } = await supabase
    .from("builder_pages")
    .select("id")
    .eq("path", path)
    .single();

  if (!page) {
    return NextResponse.json({ versions: [] });
  }

  const { data: versions, error } = await supabase
    .from("builder_section_versions")
    .select("id, version, published_by, created_at")
    .eq("page_id", page.id)
    .order("version", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ versions: versions ?? [] });
}

// POST /api/admin/builder/versions/restore
// Restores a specific version as the new draft
export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { path, version } = await request.json();

  if (!path || version == null) {
    return NextResponse.json(
      { error: "path and version are required" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServerClient();

  const { data: page } = await supabase
    .from("builder_pages")
    .select("id")
    .eq("path", path)
    .single();

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const { data: snapshot } = await supabase
    .from("builder_section_versions")
    .select("layout_snapshot")
    .eq("page_id", page.id)
    .eq("version", version)
    .single();

  if (!snapshot) {
    return NextResponse.json({ error: "Version not found" }, { status: 404 });
  }

  const { error } = await supabase
    .from("builder_pages")
    .update({
      draft_layout: snapshot.layout_snapshot,
      updated_at: new Date().toISOString(),
    })
    .eq("id", page.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ restored: true, version });
}
