import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    // Verify user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.app_metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const apiKey = process.env.PRINTFUL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ connected: false, error: "PRINTFUL_API_KEY environment variable is missing" }, { status: 400 });
    }

    const res = await fetch("https://api.printful.com/store/info", {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return NextResponse.json({ 
        connected: false, 
        error: errorData?.error?.message || `Printful API returned status ${res.status}` 
      }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ connected: true, store: data.result });

  } catch (error: any) {
    console.error("Printful verification error:", error);
    return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
  }
}
