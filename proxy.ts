import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Initialize Supabase
  const supabase = createMiddlewareClient({ req: request, res: response });
  const { data: { session } } = await supabase.auth.getSession();

  // Role-based protection: /account (logged in users)
  if (pathname.startsWith("/account") && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Role-based protection: /admin (admin users only)
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const user = session?.user;
    const email = user?.email ?? "";
    const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean);
    
    // Check both by app_metadata role and by email list for safety
    const isAdminRole = (user as any)?.app_metadata?.role === "admin";
    const isAllowedEmail = admins.includes(email);

    if (!session || (!isAdminRole && !isAllowedEmail)) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      // Redirect to sign-in with a redirect back to admin after login
      const signInUrl = new URL("/auth/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Add security headers
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
    // Match account routes
    "/account/:path*",
    // Match all pages for security headers (but skip static files)
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
