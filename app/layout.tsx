import type { Metadata } from "next";
import { Lato, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { buildMetadata } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-lato" });

export const metadata: Metadata = buildMetadata({
  title: "tsgabrielle | Inclusive Luxury Ecommerce",
  description: "Luxury ecommerce platform with short collection URLs and inclusive products."
});

import { SpeedInsights } from "@vercel/speed-insights/next";

import { StoreLayoutWrapper } from "@/components/layout/StoreLayoutWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${lato.variable}`}>
        <AppProviders>
          <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
          <SpeedInsights />
        </AppProviders>
      </body>
    </html>
  );
}
