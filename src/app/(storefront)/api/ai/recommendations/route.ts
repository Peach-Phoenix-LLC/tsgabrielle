import { NextRequest, NextResponse } from 'next/server';
import { getProductRecommendations } from '@/lib/stitchClient';
import { validateEnv } from '@/lib/env';

export async function POST(req: NextRequest) {
    try {
        validateEnv();

        const { currentProductId, category } = await req.json();

        // category is optional, but currentProductId is helpful
        const recommendations = await getProductRecommendations(currentProductId || 'latest', category || 'all');

        return NextResponse.json({
            success: true,
            data: recommendations
        });
    } catch (error: any) {
        console.error('Recommendation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch recommendations' },
            { status: 500 }
        );
    }
}
