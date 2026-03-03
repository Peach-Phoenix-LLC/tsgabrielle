import type { Metadata } from "next";
import { Cinzel, Jost } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";
import { buildMetadata } from "@/lib/seo";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = buildMetadata({
  title: "tsgabrielle | Inclusive Luxury Ecommerce",
  description: "Luxury ecommerce platform with short collection URLs and inclusive products."
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${jost.variable}`}>
        <AppProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
