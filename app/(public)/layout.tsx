import Script from "next/script";
import { getBuilderModeStatus } from "@/lib/builder-mode";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StoreLayoutWrapper } from "@/components/layout/StoreLayoutWrapper";
import CookieConsent from "@/components/layout/CookieConsent";
import { BuilderProvider } from "@/hooks/useBuilder";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, builderEnabled } = await getBuilderModeStatus();

  return (
    <BuilderProvider>
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
      <CookieConsent />
      <StoreLayoutWrapper>
        {children}
      </StoreLayoutWrapper>
      <SpeedInsights />
    </BuilderProvider>
  );
}
