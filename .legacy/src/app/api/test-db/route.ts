import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
    try {
        const prisma = new PrismaClient();
        await prisma.$connect();
        const count = await prisma.product.count();
        return NextResponse.json({ success: true, count });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message, stack: e.stack, name: e.name });
    }
}
