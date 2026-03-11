import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ enabled: false });
  }
  const url = new URL(request.url);
  const flag = url.searchParams.get("flag");
  if (!flag) return NextResponse.json({ enabled: false }, { status: 400 });

  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("feature_flags").select("enable_3d_hero").eq("key", flag).single();
  return NextResponse.json({ enabled: data?.enable_3d_hero ?? false });
}
