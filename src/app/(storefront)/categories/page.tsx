import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CategoriesGrid from '@/components/CategoriesGrid/CategoriesGrid';

export const metadata = {
    title: 'Categories | tsgabrielle®',
    description: 'Explore the curated product categories of tsgabrielle®.',
};

export default function CategoriesPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px', background: '#000' }}>
                <CategoriesGrid />
            </div>
            <Footer />
        </main>
    );
}

