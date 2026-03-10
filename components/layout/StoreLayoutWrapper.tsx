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

  const isHomePage = pathname === "/";
  // Exact matches for collection and category indexes don't have heros.
  // We only target specific collection/category items which have a slug.
  const isCategorySlug = pathname?.startsWith("/categories/") && pathname.length > "/categories/".length;
  const isCollectionSlug = pathname?.startsWith("/collections/") && pathname.length > "/collections/".length;
  
  const hasFullscreenHero = isHomePage || isCategorySlug || isCollectionSlug;

  return (
    <>
      <VisualBuilderProvider>
        <Header />
        <main className={hasFullscreenHero ? "" : "pt-24"}>
          {!hasFullscreenHero && <Breadcrumbs />}
          {children}
        </main>
        <Footer />
      </VisualBuilderProvider>
    </>
  );
}
