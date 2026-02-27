import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { CartProvider } from "@/context/CartContext";
import { Lato, Playfair_Display } from 'next/font/google';
import { MaintenanceCheck } from "@/components/MaintenanceCheck";
import GrowthTracker from "@/components/Analytics/GrowthTracker";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import GlobalBreadcrumbs from "@/components/GlobalBreadcrumbs";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;
export async function generateMetadata(): Promise<Metadata> {
  const config = await prisma.storeConfig.findUnique({ where: { id: 1 } });
  const footerData = config?.footer as any;
  const faviconUrl = footerData?.faviconUrl;

  return {
    title: "tsgabrielle® | Luxury Fashion & Artistic Expression",
    description: "Experience the refined elegance of tsgabrielle®. Paris-inspired luxury minimalism.",
    icons: {
      icon: faviconUrl ? [
        { url: faviconUrl, type: faviconUrl.endsWith('.png') ? 'image/png' : 'image/x-icon' }
      ] : [
        { url: '/favicon.png', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
    },
  };
}



const lato = Lato({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-lato'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-playfair'
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await prisma.storeConfig.findUnique({ where: { id: 1 } });
  const gaId = (config?.seo_analytics as any)?.ga4_id || "";

  return (
    <html lang="en" className={`${lato.variable} ${playfair.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..0" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3FPYVZPK13"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3FPYVZPK13');
            `
          }}
        />
      </head>
      <body className="font-sans">
        <GoogleAnalytics ga_id={gaId} />
        <GrowthTracker />
        <AuthProvider>
          <CartProvider>
            <MaintenanceCheck>
              <GlobalBreadcrumbs />
              {children}
            </MaintenanceCheck>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

