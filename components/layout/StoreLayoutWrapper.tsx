"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const BuilderGate = dynamic(() => import("../builder/BuilderGate"), { ssr: false });

interface StoreLayoutWrapperProps {
  children: React.ReactNode;
  isAdmin: boolean;
  builderEnabled: boolean;
}

export function StoreLayoutWrapper({ children, isAdmin, builderEnabled }: StoreLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  const isHomePage = pathname === "/";
  // Exact matches for collection and category indexes don't have heros.
  // We only target specific collection/category items which have a slug.
  const isCategorySlug = pathname?.startsWith("/categories/") && pathname.length > "/categories/".length;
  const isCollectionSlug = pathname?.startsWith("/collections/") && pathname.length > "/collections/".length;
  
  const hasFullscreenHero = isHomePage || isCategorySlug || isCollectionSlug;

  const content = (
    <>
      <Header />
      <main className={hasFullscreenHero ? "" : "pt-24"}>
        {!hasFullscreenHero && <Breadcrumbs />}
        {children}
      </main>
      <Footer />
    </>
  );

  if (!isAdmin) return content;

  return <BuilderGate initialEnabled={builderEnabled}>{content}</BuilderGate>;
}
