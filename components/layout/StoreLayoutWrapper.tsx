"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { VisualBuilderProvider } from "../builder/VisualBuilderProvider";

export function StoreLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <VisualBuilderProvider>
        <Header />
        <main className="pt-24">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </VisualBuilderProvider>
    </>
  );
}
