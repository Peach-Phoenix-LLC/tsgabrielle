import React from 'react';
import CollectionsGrid from '@/components/CollectionsGrid/CollectionsGrid';

export const metadata = {
    title: 'Collections | tsgabrielle®',
    description: 'Archive of all tsgabrielle® thematic drops and curated collections.',
};

export default function CollectionsPage() {
    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] font-sans">
            <div className="pt-32">
                <header className="max-w-7xl mx-auto px-8 mb-20 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#a932bd] font-bold block mb-6">Archives & Curation</span>
                    <h1 className="text-7xl font-extralight tracking-tighter text-[#1a1a1a]">Maison Collections</h1>
                </header>
                <CollectionsGrid />
            </div>
        </main>
    );
}

