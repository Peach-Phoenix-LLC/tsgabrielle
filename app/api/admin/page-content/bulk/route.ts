import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service key for admin writes
);

export async function POST(req: Request) {
  try {
    // In a real app, verify authentication here
    // We are trusting the admin visually for now or you'd check cookies/headers
    
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
