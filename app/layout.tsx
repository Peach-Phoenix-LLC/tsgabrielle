import type { Metadata } from "next";
import { Lato, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { AppProviders } from "@/components/providers/AppProviders";
import { BuilderProvider } from "@/hooks/useBuilder";
import { StoreLayoutWrapper } from "@/components/layout/StoreLayoutWrapper";
import CookieConsent from "@/components/layout/CookieConsent";
import { AIShoppingAssistant } from "@/components/AIShoppingAssistant";
import { getSiteSettings } from "@/lib/content";
import { getBuilderModeStatus } from "@/lib/builder-mode";
import "@/app/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "tsgabrielle® | The French Trans Touch™",
  description:
    "tsgabrielle® — Inclusive luxury fashion. The French Trans Touch™. Shop collections, products, and more.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, { isAdmin, builderEnabled }] = await Promise.all([
    getSiteSettings(),
    getBuilderModeStatus(),
  ]);

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${lato.variable}`}>
      <body>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />

        <AppProviders settings={settings}>
          <BuilderProvider>
            <CookieConsent />
            <StoreLayoutWrapper isAdmin={isAdmin} builderEnabled={builderEnabled}>
              {children}
            </StoreLayoutWrapper>
            <AIShoppingAssistant />
            <SpeedInsights />
          </BuilderProvider>
        </AppProviders>
      </body>
    </html>
  );
}
