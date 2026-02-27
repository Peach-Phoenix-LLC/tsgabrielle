import React from 'react';
import ProductGallery from '@/components/Stitch/Product/ProductGallery';
import ProductInfo from '@/components/Stitch/Product/ProductInfo';
import CompleteTheLook from '@/components/Stitch/Product/CompleteTheLook';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage() {
    // For demo purposes, we'll fetch the first Transcendent product
    const product = await prisma.product.findFirst({
        where: {
            catalogue_collection: { contains: 'Paris' },
        }
    });

    if (!product) {
        return <div>Product not found</div>;
    }

    // Serialize Decimal to satisfy Next.js Server-to-Client boundaries
    const serializedProduct = {
        ...product,
        price: parseFloat(product.msrp_display.replace(/[^0-9.]/g, '')) || 0
    };

    // Fetch related items 
    const crossSellsData = await prisma.product.findMany({
        where: {
            NOT: { id: product.id }
        },
        take: 3
    });

    const serializedCrossSells = crossSellsData.map((item: any) => ({
        ...item,
        price: parseFloat(item.msrp_display?.replace(/[^0-9.]/g, '')) || 0
    }));

    // If there's an images array use it, otherwise fallback to standard image_url
    const p = product as any;
    const galleryImages = (p.media_gallery_urls && p.media_gallery_urls.length > 0)
        ? p.media_gallery_urls
        : (p.media_primary_url ? [p.media_primary_url] : []);

    return (
        <main className="min-h-screen bg-white selection:bg-accent-blue/30 selection:text-white font-manrope">
            {/* Global Navbar */}
            <div className="bg-white shadow-sm pb-1 relative z-50">
                
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
                    {/* Left: Interactive Gallery */}
                    <div className="lg:pr-8 border-r-0 lg:border-r border-gray-100">
                        <ProductGallery images={galleryImages} />
                    </div>

                    {/* Right: Product Details, Selection, Actions, Specs */}
                    <div>
                        <ProductInfo product={serializedProduct as any} />
                    </div>
                </div>

                {/* Cross-Sell Section */}
                <CompleteTheLook crossSells={serializedCrossSells as any[]} />

            </div>

            {/* Global Footer */}
            
        </main>
    );
}

