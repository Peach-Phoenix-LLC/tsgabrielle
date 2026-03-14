import React from 'react';
import Hero from '@/components/Update/Hero';
import OrganicDivider from '@/components/Update/OrganicDivider';
import CategoriesGrid from '@/components/CategoriesGrid/CategoriesGrid';
import CollectionsGrid from '@/components/CollectionsGrid/CollectionsGrid';
import FeaturedCollection from '@/components/Update/FeaturedCollection';
import NewArrivals from '@/components/Update/NewArrivals';
import Newsletter from '@/components/Update/Newsletter';

export const metadata = {
  title: 'tsgabrielle® | Wear the Shift',
  description: 'Holographic essentials for the modern existence. Crafting high-end organic apparel with a transformational perspective.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#a932bd]/10 selection:text-[#a932bd]">
      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: ORGANIC DIVIDER */}
      <OrganicDivider />

      {/* SECTION 3: CATEGORIES GRID */}
      <CategoriesGrid />

      {/* SECTION 4: COLLECTIONS GRID */}
      <CollectionsGrid />

      {/* SECTION 5: FEATURED COLLECTION */}
      <section className="bg-white">
        <FeaturedCollection />
      </section>

      {/* SECTION 4: ORGANIC BLOB EDITORIAL / NEW ARRIVALS */}
      <NewArrivals />

      {/* SECTION 5: NEWSLETTER */}
      <Newsletter />
    </main>
  );
}
