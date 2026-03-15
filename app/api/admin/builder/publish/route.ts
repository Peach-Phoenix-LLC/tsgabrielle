import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const supabase = getSupabaseServerClient();
    const body = await req.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    // Get the current page with draft layout
    const { data: page, error: fetchError } = await supabase
      .from("builder_pages")
      .select("*")
      .eq("path", path)
      .single();

    if (fetchError || !page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    if (!page.draft_layout) {
      return NextResponse.json(
        { error: "No draft layout to publish" },
        { status: 400 }
      );
    }

    const newVersion = (page.version || 0) + 1;

    // Save version snapshot
    await supabase.from("builder_section_versions").insert({
      page_id: page.id,
      version: newVersion,
      layout_snapshot: page.draft_layout,
      published_by: auth.user?.id || null,
    });

    // Update the page: copy draft to published, increment version
    const { data: updated, error: updateError } = await supabase
      .from("builder_pages")
      .update({
        published_layout: page.draft_layout,
        status: "PUBLISHED",
        version: newVersion,
        published_at: new Date().toISOString(),
      })
      .eq("id", page.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Revalidate the public-facing page so visitors see the new content immediately
    revalidatePath(path);

    return NextResponse.json({
      success: true,
      version: newVersion,
      page: updated,
    });
  } catch (error: any) {
    console.error("Error publishing page:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
