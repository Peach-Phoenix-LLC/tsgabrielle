"use client";

import { useEffect } from 'react';
import { trackGA4Event } from '@/components/Analytics/GA4Tracker';

interface GA4ProductInteractionProps {
    product: {
        id: string | number;
        title: string;
        price: string;
        category?: string;
    };
}

export function GA4ProductView({ product }: GA4ProductInteractionProps) {
    useEffect(() => {
        trackGA4Event('view_item', {
            currency: 'USD',
            value: parseFloat(product.price.replace(/[$,]/g, '')) || 0,
            items: [
                {
                    item_id: product.id,
                    item_name: product.title,
                    item_category: product.category,
                    price: parseFloat(product.price.replace(/[$,]/g, '')) || 0,
                    quantity: 1
                }
            ]
        });
    }, [product]);

    return null;
}
