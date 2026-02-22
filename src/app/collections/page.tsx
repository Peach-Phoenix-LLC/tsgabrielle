import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import CollectionsGrid from '@/components/CollectionsGrid/CollectionsGrid';

export const metadata = {
    title: 'Collections | tsgabrielle®',
    description: 'Archive of all tsgabrielle® thematic drops and curated collections.',
};

export default function CollectionsPage() {
    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] font-sans">
            <ModernNavbar />
            <div className="pt-20">
                <CollectionsGrid />
            </div>
            <ModernFooter />
        </main>
    );
}
