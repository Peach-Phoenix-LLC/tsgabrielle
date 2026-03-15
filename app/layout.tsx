import type { Metadata } from "next";
import Script from "next/script";
import { AppProviders } from "@/components/providers/AppProviders";
import { getSiteSettings } from "@/lib/content";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "tsgabrielle | Inclusive Luxury Ecommerce",
  description: "Luxury ecommerce platform with short collection URLs and inclusive products.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via link tag (not next/font) so build works offline */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        {/* PostHog Analytics */}
        <Script id="posthog-js" strategy="afterInteractive">{`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', {
            api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"}',
            defaults: '2026-01-30'
          })
        `}</Script>
      </head>
      <body>
        <AppProviders settings={settings}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
