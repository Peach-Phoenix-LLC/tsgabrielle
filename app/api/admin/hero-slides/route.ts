import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("sort_order");

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseServerClient();
    const body = await req.json();
    const { id, title, subtitle, image_url, link_url, sort_order, active } = body;

    if (id) {
      // Update existing
      const { data, error } = await supabase
        .from("hero_slides")
        .update({
          title,
          subtitle,
          image_url,
          link_url,
          sort_order,
          active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    } else {
      // Create new
      const { data, error } = await supabase
        .from("hero_slides")
        .insert({
          title,
          subtitle,
          image_url,
          link_url,
          sort_order: sort_order || 0,
          active: active !== false,
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    }
  } catch (error: any) {
    console.error("Error saving hero slide:", error);
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
      .from("hero_slides")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
