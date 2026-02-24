"use client";

import React from 'react';
import { useCartStore } from '@/lib/store';
import { useGrowthTracking } from '@/components/Analytics/GrowthTracker';

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const { trackEvent } = useGrowthTracking();

    const [added, setAdded] = React.useState(false);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });

        trackEvent('add_to_cart', {
            item_id: product.id,
            item_name: product.name,
            value: product.price,
            currency: 'USD'
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full ${added ? 'bg-green-600' : 'bg-[#a932bd]'} text-white h-14 font-bold text-[11px] tracking-[0.3em] uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded-sm shadow-[0_0_15px_rgba(169,50,189,0.3)]`}
        >
            <span>{added ? 'Added to Bag!' : 'Acquire for Collection'}</span>
        </button>

    );
}
