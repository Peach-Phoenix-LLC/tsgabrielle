"use client";

import { CartProvider } from "@/hooks/useCart";
import { SettingsProvider } from "./SettingsProvider";

export function AppProviders({ 
  children,
  settings = {}
}: { 
  children: React.ReactNode;
  settings?: Record<string, string>;
}) {
  return (
    <SettingsProvider settings={settings}>
      <CartProvider>{children}</CartProvider>
    </SettingsProvider>
  );
}
