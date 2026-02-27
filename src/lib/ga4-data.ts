import { BetaAnalyticsDataClient } from '@google-analytics/data';

/**
 * tsgabrielle® Analytics Intelligence
 * Integrates with GA4 Data API to surface premium insights in the admin panel.
 */

const propertyId = process.env.GA4_PROPERTY_ID;

// Initializing the Analytics Client
// Note: This expects GOOGLE_APPLICATION_CREDENTIALS to be set or running in a GCP environment.
const analyticsDataClient = new BetaAnalyticsDataClient();

export async function getDashboardStats() {
    if (!propertyId) {
        throw new Error("GA4_PROPERTY_ID is not configured.");
    }

    // 1. Get Visitors and Active Users (Simplified example)
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [
            { name: 'activeUsers' },
            { name: 'sessions' },
            { name: 'conversions' },
            { name: 'totalRevenue' }
        ],
    });

    // 2. Get Top 5 Products
    const [topProducts] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'itemName' }],
        metrics: [{ name: 'screenPageViews' }],
        limit: 5,
    });

    // 3. Real-time users
    let activeUsersNow = 0;
    try {
        const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
            property: `properties/${propertyId}`,
            metrics: [{ name: 'activeUsers' }],
        });
        activeUsersNow = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0');
    } catch (e) {
        console.error("Realtime report failed", e);
    }

    return {
        dailyData: response.rows?.map(row => ({
            date: row.dimensionValues?.[0].value,
            users: row.metricValues?.[0].value,
            revenue: row.metricValues?.[3].value
        })),
        topProducts: topProducts.rows?.map(row => ({
            name: row.dimensionValues?.[0].value,
            views: row.metricValues?.[0].value
        })),
        activeUsersNow
    };
}

/**
 * Sends a purchase event to GA4 via Measurement Protocol.
 */
export async function trackPurchaseServer(orderId: string, value: number, items: any[], clientId: string) {
    const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    const apiSecret = process.env.GA4_API_SECRET;

    if (!measurementId || !apiSecret) return;

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

    await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            client_id: clientId,
            events: [{
                name: 'purchase',
                params: {
                    transaction_id: orderId,
                    value: value,
                    currency: 'USD',
                    items: items.map(item => ({
                        item_id: item.product_id,
                        item_name: item.product_name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }]
        })
    });
}
