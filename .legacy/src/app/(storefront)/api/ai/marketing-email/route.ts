import { NextRequest, NextResponse } from 'next/server';
import { generateMarketingEmail } from '@/lib/stitchClient';
import { validateEnv } from '@/lib/env';

export async function POST(req: NextRequest) {
    try {
        validateEnv();

        const { campaignType, productName, targetAudience } = await req.json();

        if (!campaignType || !productName) {
            return NextResponse.json(
                { error: 'Campaign type and product name are required' },
                { status: 400 }
            );
        }

        const emailContent = await generateMarketingEmail(campaignType, productName, targetAudience || 'global luxury market');

        return NextResponse.json({
            success: true,
            data: emailContent
        });
    } catch (error: any) {
        console.error('Marketing Email Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate marketing email' },
            { status: 500 }
        );
    }
}
