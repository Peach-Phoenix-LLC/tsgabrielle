"use client";

import { CartProvider } from "@/hooks/useCart";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
