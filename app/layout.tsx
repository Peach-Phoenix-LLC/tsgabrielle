import Script from "next/script";
import type { Metadata } from "next";
import { Lato, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/content";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StoreLayoutWrapper } from "@/components/layout/StoreLayoutWrapper";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-lato" });

export const metadata: Metadata = buildMetadata({
  title: "tsgabrielle | Inclusive Luxury Ecommerce",
  description: "Luxury ecommerce platform with short collection URLs and inclusive products."
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
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
        )}
        {/* Google Analytics - G-02TDH8YYHB */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-02TDH8YYHB`}
        />
        <Script
          id="google-analytics-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-02TDH8YYHB');
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${lato.variable}`}>
        {/* GTM noscript */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        <AppProviders settings={settings}>
          <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
          <SpeedInsights />
        </AppProviders>
      </body>
    </html>
  );
}
