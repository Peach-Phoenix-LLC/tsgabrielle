import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const path = request.nextUrl.pathname;
  if (path.startsWith("/account") && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (path.startsWith("/admin")) {
    const email = session?.user?.email ?? "";
    const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean);
    if (!email || !admins.includes(email)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/account/:path*"]
};
