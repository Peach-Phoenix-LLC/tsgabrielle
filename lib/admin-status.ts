import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export interface AdminStatus {
  isAdmin: boolean;
  email?: string;
}

export async function getAdminStatus(): Promise<AdminStatus> {
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
            // Ignore cookie write errors during RSC rendering
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { isAdmin: false };

  const email = user.email ?? "";
  const configuredAdmins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const admins = configuredAdmins.length > 0 ? configuredAdmins : ["contact@tsgabrielle.us"];

  const isAdminRole = user.app_metadata?.role === "admin";
  const isAllowedEmail = admins.includes(email);

  return { isAdmin: isAdminRole || isAllowedEmail, email };
}
