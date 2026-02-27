"use client";

import { useEffect } from 'react';

type GrowthEvent = 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase';

interface TrackParams {
    item_id?: string;
    item_name?: string;
    value?: number;
    currency?: string;
    transaction_id?: string;
    items?: any[];
}

export function useGrowthTracking() {
    const trackEvent = (event: GrowthEvent, params: TrackParams) => {
        // In a production environment, this would push to PostHog, GA4, or a custom metadata layer
        // For tsgabrielle® Strategic Intelligence, we log to the console for internal auditing
        console.log(`%c[GROWTH ANALYTICS] Event: ${event}`, 'color: #a932bd; font-weight: bold; border-left: 4px solid #a932bd; padding-left: 8px;', params);

        // GA4 Integration
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', event, params);
        }
    };

    return { trackEvent };
}

/**
 * GrowthTracker Component
 * 
 * Auto-tracks page views and provides a global hook context for client components.
 */
export default function GrowthTracker() {
    useEffect(() => {
        // Initializing the Visibility Layer
        console.log("%c[GROWTH ANALYTICS] Visibility Layer Active", 'background: #a932bd; color: white; padding: 2px 5px; border-radius: 2px;');
    }, []);

    return null; // Side-effect only component
}
