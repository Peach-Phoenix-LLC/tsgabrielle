import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Verify the request is from an authenticated admin user.
 * Uses the Supabase anon key + user's auth cookie to check identity,
 * NOT the service role key (which bypasses RLS and has no user context).
 *
 * Returns the user object if admin, or a NextResponse error to return early.
 */
export async function requireAdmin(): Promise<
  | { user: { id: string; email?: string }; error?: never }
  | { user?: never; error: NextResponse }
> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Unhandled cookie settings in RSC
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const email = user.email ?? "";
  const configuredAdmins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const admins = configuredAdmins.length > 0 ? configuredAdmins : ["contact@tsgabrielle.us"];

  const isAdminRole = user.app_metadata?.role === "admin";
  const isAllowedEmail = admins.includes(email);

  if (!isAdminRole && !isAllowedEmail) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user: { id: user.id, email: user.email } };
}
