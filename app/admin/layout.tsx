import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";


export const metadata: Metadata = buildMetadata({
  title: "Admin | tsgabrielle",
  description: "Administrative dashboard.",
  path: "/admin"
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    redirect("/my-tsgabrielle");
  }
  return <>{children}</>;
}
