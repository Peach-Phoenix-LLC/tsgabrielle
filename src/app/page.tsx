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
    // Fetch live collections
    const collections = await prisma.collection.findMany({
      where: { is_active: true },
      orderBy: { sort_order: 'asc' },
    });

    // Map to the structure expected by HoloCollections
    const mappedCollections = collections.map((c: any) => ({
      id: c.slug,
      name: c.name,
      image_url: c.image_url,
      category: 'Collection'
    }));

    return (
      <main className="min-h-screen bg-background-light selection:bg-accent-purple/30 selection:text-white">
        <ModernNavbar />

        <PageAnimations>
          <HoloHero />
          <HoloCategories />
          <HoloPhilosophy />
          <HoloCollections products={mappedCollections as any} />
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
