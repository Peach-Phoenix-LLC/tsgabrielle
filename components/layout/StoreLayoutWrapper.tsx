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

export function StoreLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  const isHomePage = pathname === "/";
  const isCategorySlug = pathname?.startsWith("/categories/") && pathname.length > "/categories/".length;
  const isCollectionSlug = pathname?.startsWith("/collections/") && pathname.length > "/collections/".length;
  
  const hasFullscreenHero = isHomePage || isCategorySlug || isCollectionSlug;

  return (
    <>
      <Header />
      <main className={hasFullscreenHero ? "" : "pt-24"}>
        {!hasFullscreenHero && <Breadcrumbs />}
        {children}
      </main>
      <Footer />
    </>
  );
}
