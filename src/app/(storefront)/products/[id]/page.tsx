import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import './pdp.css';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productId = parseInt(id);
    if (isNaN(productId)) {
        notFound();
    }

    // Fetch product by peach_number
    const product = await prisma.product.findUnique({
        where: { peach_number: productId }
    });

    if (!product) {
        notFound();
    }

    // Fetch cross-sells
    const crossSellsData = await prisma.product.findMany({
        where: {
            NOT: { id: product.id },
            status: 'active'
        },
        take: 4
    });

    return <ProductDetailClient product={product} crossSells={crossSellsData} />;
}
