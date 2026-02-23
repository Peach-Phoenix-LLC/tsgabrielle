import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import Reviews from '@/components/Home/Reviews';
import ModernFooter from '@/components/Home/ModernFooter';
import HoloHero from '@/components/Stitch/HoloHero';
import HoloCategories from '@/components/Stitch/HoloCategories';
import HoloPhilosophy from '@/components/Stitch/HoloPhilosophy';
import HoloCollections from '@/components/Stitch/HoloCollections';
import SkillsSection from '@/components/Home/SkillsSection';
import { prisma } from '@/lib/prisma';
import PageAnimations from './PageAnimations'; // We will create this wrapper for client-side animations

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    // Fetch live products from Cloud SQL via Prisma
    const products = await prisma.product.findMany({
      take: 4, // Fetch top 4 core collections
      orderBy: { createdAt: 'asc' },
    });

    console.log(`Page: Fetched ${products?.length || 0} products`);

    // Serialize Decimal to satisfy Next.js Server-to-Client boundaries
    const serializedProducts = products.map((product: any) => ({
      ...product,
      price: Number(product.price)
    }));

    return (
      <main className="min-h-screen bg-background-light selection:bg-accent-purple/30 selection:text-white">
        <ModernNavbar />

        <PageAnimations>
          <HoloHero />
          <HoloCategories />
          <HoloPhilosophy />
          <HoloCollections products={serializedProducts as any} />
          <SkillsSection />
          <Reviews />
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
