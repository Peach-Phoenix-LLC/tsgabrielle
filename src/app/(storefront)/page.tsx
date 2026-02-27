import React from 'react';
import HoloHero from '@/components/Stitch/HoloHero';
import HoloCategories from '@/components/Stitch/HoloCategories';
import HoloPhilosophy from '@/components/Stitch/HoloPhilosophy';
import HoloCollections from '@/components/Stitch/HoloCollections';
import { prisma } from '@/lib/prisma';
import PageAnimations from './PageAnimations';

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const config = await prisma.storeConfig.findUnique({
      where: { id: 1 },
    });

    const collections = await prisma.collection.findMany({
      where: { is_active: true },
      orderBy: { sort_order: 'asc' },
    });

    const categories = await prisma.category.findMany({
      where: { is_active: true },
      orderBy: { sort_order: 'asc' },
    });

    const mappedCollections = collections.map((c: any) => ({
      id: c.slug,
      name: c.name,
      image_url: c.image_url,
      category: 'Collection'
    }));

    const heroBanner = (config?.hero_banner as any) || {};

    return (
      <main className="min-h-screen bg-white">
        <PageAnimations>
          <HoloHero config={heroBanner} />
          <HoloCategories categories={categories as any} />
          <HoloPhilosophy />
          <HoloCollections products={mappedCollections as any} />
        </PageAnimations>
      </main>
    );
  } catch (error: any) {
    console.error("PAGE RENDER ERROR:", error);
    throw error;
  }
}

