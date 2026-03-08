"use client";

import { Suspense } from "react";
import { CartProvider } from "@/hooks/useCart";
import { SettingsProvider } from "./SettingsProvider";
import { PostHogProvider } from "./PostHogProvider";

export function AppProviders({
  children,
  settings = {}
}: {
  children: React.ReactNode;
  settings?: Record<string, string>;
}) {
  return (
    <SettingsProvider settings={settings}>
      <Suspense fallback={null}>
        <PostHogProvider>
          <CartProvider>{children}</CartProvider>
        </PostHogProvider>
      </Suspense>
    </SettingsProvider>
  );
}
