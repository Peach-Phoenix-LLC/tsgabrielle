import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "tsgabrielle® | Luxury Fashion & Artistic Expression",
  description: "Experience the refined elegance of tsgabrielle®. Paris-inspired luxury minimalism.",
};

import { Lato, Playfair_Display } from 'next/font/google';
import { MaintenanceCheck } from "@/components/MaintenanceCheck";
import GrowthTracker from "@/components/Analytics/GrowthTracker";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${playfair.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..0" />
      </head>
      <body className="font-sans">
        <GrowthTracker />
        <AuthProvider>
          <CartProvider>
            <MaintenanceCheck>
              {children}
            </MaintenanceCheck>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

