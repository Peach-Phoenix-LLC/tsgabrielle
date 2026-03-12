import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  try {
    const authResult = await requireAdmin();
    if (authResult.error) {
      return authResult.error;
    }

    const apiKey = process.env.PRINTFUL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ connected: false, error: "PRINTFUL_API_KEY environment variable is missing" }, { status: 400 });
    }

    const res = await fetch("https://api.printful.com/stores", {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const errorMessage = errorData?.error?.message || (typeof errorData?.result === 'string' ? errorData.result : null) || `Printful API returned status ${res.status}`;
      return NextResponse.json({ 
        connected: false, 
        error: `Printful Error: ${errorMessage}` 
      }, { status: res.status });
    }

    const data = await res.json();
    const store = Array.isArray(data.result) && data.result.length > 0 ? data.result[0] : null;
    return NextResponse.json({ connected: true, store });

  } catch (error: any) {
    console.error("Printful verification error:", error);
    return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
  }
}
