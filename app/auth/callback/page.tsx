"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchange = async () => {
      const code = searchParams.get("code");
      const nextPath = searchParams.get("next");
      
      if (!code) {
        router.replace("/auth/sign-in");
        return;
      }
      
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.exchangeCodeForSession(code);
      
      const { data: { user } } = await supabase.auth.getUser();
      const isAdmin = user?.email?.toLowerCase() === "contact@tsgabrielle.us" || user?.app_metadata?.role === "admin";
      
      if (isAdmin) {
        const adminTarget = nextPath && nextPath.startsWith("/admin") ? nextPath : "/admin";
        router.replace(adminTarget);
      } else {
        router.replace("/my-tsgabrielle");
      }
      
      router.refresh();
    };
    exchange();
  }, [router, searchParams]);

  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Signing you in...</h1>
    </section>
  );
}
