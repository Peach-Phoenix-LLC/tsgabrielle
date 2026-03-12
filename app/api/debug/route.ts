import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("products").select("title").eq("status", "active").ilike("title", "%paris%");
  return NextResponse.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    count: data ? data.length : 0,
    error: error ? error.message : null,
    data
  });
}