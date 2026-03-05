import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pagePath = searchParams.get("page_path");

    const supabase = getSupabaseServerClient();

    let query = supabase.from("page_content").select("*").order("sort_order");

    if (pagePath) {
      query = query.eq("page_path", pagePath);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error fetching page content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseServerClient();
    const body = await req.json();
    const { page_path, content_key, content_type, content_value, sort_order } = body;

    if (!page_path || !content_key || !content_type) {
      return NextResponse.json(
        { error: "page_path, content_key, and content_type are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("page_content")
      .upsert(
        {
          page_path,
          content_key,
          content_type,
          content_value,
          sort_order: sort_order || 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "page_path,content_key" }
      )
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error saving page content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("page_content")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting page content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
