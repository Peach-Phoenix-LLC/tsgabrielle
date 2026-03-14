import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("theme_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    if (!data) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      colors: data.colors,
      typography: data.typography,
      layout: data.layout,
      shadows: data.shadows,
      customCss: data.custom_css,
    });
  } catch (error: any) {
    console.error("Error fetching theme:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const supabase = getSupabaseServerClient();
    const body = await req.json();
    const { colors, typography, layout, shadows, customCss } = body;

    const { data, error } = await supabase
      .from("theme_settings")
      .upsert(
        {
          id: 1,
          colors: colors || null,
          typography: typography || null,
          layout: layout || null,
          shadows: shadows || null,
          custom_css: customCss || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error saving theme:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
