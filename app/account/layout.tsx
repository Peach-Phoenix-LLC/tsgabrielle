import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Account | tsgabrielle",
  description: "Customer account center.",
  path: "/account"
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
