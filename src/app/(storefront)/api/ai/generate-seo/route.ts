import { NextRequest, NextResponse } from 'next/server';
import { generateSEOMetadata } from '@/lib/stitchClient';
import { validateEnv } from '@/lib/env';

export async function POST(req: NextRequest) {
    try {
        validateEnv();

        const { productName, description } = await req.json();

        if (!productName || !description) {
            return NextResponse.json(
                { error: 'Product name and description are required' },
                { status: 400 }
            );
        }

        const seoData = await generateSEOMetadata(productName, description);

        return NextResponse.json({
            success: true,
            data: seoData
        });
    } catch (error: any) {
        console.error('SEO Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate SEO metadata' },
            { status: 500 }
        );
    }
}
