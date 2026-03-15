"use client";

import { useEffect, useState } from "react";
import { CartProvider } from "@/hooks/useCart";
import { SettingsProvider } from "./SettingsProvider";
import { PostHogProvider } from "./PostHogProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { VisualBuilderProvider } from "@/components/builder/VisualBuilderProvider";

function VisualBuilderWrapper({ 
  children,
  isAdmin 
}: { 
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  const [shouldEdit, setShouldEdit] = useState(false);

  useEffect(() => {
    if (isAdmin && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("builder") === "true") {
        setShouldEdit(true);
      }
    }
  }, [isAdmin]);

  if (!isAdmin) return <>{children}</>;

  return (
    <VisualBuilderProvider initialEditMode={shouldEdit}>
      {children}
    </VisualBuilderProvider>
  );
}

export function AppProviders({
  children,
  settings = {}
}: {
  children: React.ReactNode;
  settings?: Record<string, string>;
}) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const admins = ["contact@tsgabrielle.us"];
        const isAdm = user.app_metadata?.role === "admin" || admins.includes(user.email || "");
        setIsAdmin(isAdm);
      }
    }
    checkAdmin();
  }, []);

  return (
    <SettingsProvider settings={settings}>
      <PostHogProvider>
        <CartProvider>
          <VisualBuilderWrapper isAdmin={isAdmin}>
            {children}
          </VisualBuilderWrapper>
        </CartProvider>
      </PostHogProvider>
    </SettingsProvider>
  );
}
