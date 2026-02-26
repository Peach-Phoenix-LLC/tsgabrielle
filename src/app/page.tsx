import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import HoloHero from '@/components/Stitch/HoloHero';
import HoloCategories from '@/components/Stitch/HoloCategories';
import HoloPhilosophy from '@/components/Stitch/HoloPhilosophy';
import HoloCollections from '@/components/Stitch/HoloCollections';
import { prisma } from '@/lib/prisma';
import PageAnimations from './PageAnimations'; // We will create this wrapper for client-side animations

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    // Fetch live products
    const products = await prisma.product.findMany({
      where: { status: 'active' },
      take: 4,
      orderBy: { created_at: 'asc' },
    });

    // Map to the structure expected by HoloCollections
    const mappedProducts = products.map((p: any) => ({
      id: p.peach_number.toString(),
      name: p.title,
      image_url: p.media_primary_url,
      seo_description: p.short_description,
      category: p.catalogue_category
    }));

    return (
      <main className="min-h-screen bg-background-light selection:bg-accent-purple/30 selection:text-white">
        <ModernNavbar />

        <PageAnimations>
          <HoloHero />
          <HoloCategories />
          <HoloPhilosophy />
          <HoloCollections products={mappedProducts as any} />
          <div className="h-64 bg-white" />
        </PageAnimations>

        <ModernFooter />
      </main>
    );
  } catch (error: any) {
    console.error("PAGE RENDER ERROR:", error);
    // Re-throw to show error page but we've logged it now
    throw error;
  }
}
