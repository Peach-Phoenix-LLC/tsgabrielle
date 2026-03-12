import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const supabase = getSupabaseServerClient();

    const body = await req.json();
    const { updates } = body;

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: "Updates must be an array" }, { status: 400 });
    }

    // Upsert the array of updates into page_content
    const { error } = await supabase
      .from("page_content")
      .upsert(updates, { onConflict: "page_path, content_key" });

    if (error) {
      console.error("Bulk update error:", error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error bulk updating page content:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
