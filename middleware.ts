import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin pages and admin API routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Extract the Supabase auth token from cookies
    const cookieHeader = request.headers.get("cookie") ?? "";
    const supabase = createClient(url, anonKey, {
      global: { headers: { cookie: cookieHeader } },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.app_metadata?.role !== "admin") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      // Redirect non-API requests to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    // Match admin routes
    "/admin/:path*",
    "/api/admin/:path*",
    // Match all pages for security headers (but skip static files)
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
