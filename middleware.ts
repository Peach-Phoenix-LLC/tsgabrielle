import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fast path: only routes that need auth checks hit Supabase.
  // All other routes get security headers only (no network call → no timeout).
  const needsAuth =
    pathname.startsWith("/account") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin");

  if (needsAuth) {
    let response = NextResponse.next({ request: { headers: request.headers } });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // /account — must be logged in
    if (pathname.startsWith("/account") && !session) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    // /admin and /api/admin — must be admin
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      const user = session?.user;
      const email = user?.email ?? "";
      const admins = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      const isAdminRole = (user as any)?.app_metadata?.role === "admin";
      const isAllowedEmail = admins.includes(email);

      if (!session || (!isAdminRole && !isAllowedEmail)) {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const signInUrl = new URL("/auth/sign-in", request.url);
        signInUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(signInUrl);
      }
    }

    // Add security headers and return
    addSecurityHeaders(response);
    return response;
  }

  // Non-auth routes: add security headers only (synchronous, no Supabase call)
  const response = NextResponse.next({ request: { headers: request.headers } });
  addSecurityHeaders(response);
  return response;
}

function addSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
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
