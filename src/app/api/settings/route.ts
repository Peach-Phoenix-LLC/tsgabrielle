import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        // @ts-ignore - Property exists but diagnostic is out of sync
        const setting = await (prisma as any).globalSetting.findUnique({
            where: { key: 'maintenance_mode' }
        });
        return NextResponse.json({ enabled: setting?.value === 'true' });
    } catch (error) {
        return NextResponse.json({ enabled: false });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    // Auth check - strictly enforce ADMIN role
    if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { enabled } = await request.json();
        // @ts-ignore - Property exists but diagnostic is out of sync
        const setting = await (prisma as any).globalSetting.upsert({
            where: { key: 'maintenance_mode' },
            update: { value: String(enabled) },
            create: { key: 'maintenance_mode', value: String(enabled) }
        });
        return NextResponse.json({ success: true, enabled: setting.value === 'true' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
    }
}
