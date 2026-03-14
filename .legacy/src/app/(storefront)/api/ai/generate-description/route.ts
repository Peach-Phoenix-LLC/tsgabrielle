import { NextRequest, NextResponse } from 'next/server';
import { generateProductDescription } from '@/lib/stitchClient';
import { validateEnv } from '@/lib/env';

export async function POST(req: NextRequest) {
    try {
        validateEnv();

        const { productName, features } = await req.json();

        if (!productName || !features || !Array.isArray(features)) {
            return NextResponse.json(
                { error: 'Product name and an array of features are required' },
                { status: 400 }
            );
        }

        const description = await generateProductDescription(productName, features);

        return NextResponse.json({
            success: true,
            data: description
        });
    } catch (error: any) {
        console.error('Description Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate product description' },
            { status: 500 }
        );
    }
}
