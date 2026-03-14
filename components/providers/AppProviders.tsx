"use client";

import { Suspense, useEffect, useState } from "react";
import { CartProvider } from "@/hooks/useCart";
import { SettingsProvider } from "./SettingsProvider";
import { PostHogProvider } from "./PostHogProvider";
import { PeachChat } from "@/components/builder/PeachChat";
import { VisualBuilderToolbar } from "@/components/builder/VisualBuilderToolbar";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { VisualBuilderProvider } from "@/components/builder/VisualBuilderProvider";

export function AppProviders({
  children,
  settings = {}
}: {
  children: React.ReactNode;
  settings?: Record<string, string>;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const admins = ["contact@tsgabrielle.us"];
        setIsAdmin(user.app_metadata?.role === "admin" || admins.includes(user.email || ""));
      }
    }
    checkAdmin();
  }, [supabase]);

  return (
    <SettingsProvider settings={settings}>
      <Suspense fallback={null}>
        <PostHogProvider>
          <CartProvider>
            {isAdmin ? (
              <VisualBuilderProvider initialEditMode={false}>
                {children}
              </VisualBuilderProvider>
            ) : (
              children
            )}
          </CartProvider>
        </PostHogProvider>
      </Suspense>
    </SettingsProvider>
  );
}
