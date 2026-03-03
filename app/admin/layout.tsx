import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin | tsgabrielle",
  description: "Administrative dashboard.",
  path: "/admin"
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
