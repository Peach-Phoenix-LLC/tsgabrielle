import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const totalSales = await prisma.order.aggregate({
            _sum: {
                total_amount: true
            }
        });

        const totalOrders = await prisma.order.count();
        const totalCustomers = await prisma.profile.count({
            where: {
                role: 'USER'
            }
        });

        // Get sales from last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentSales = await prisma.order.aggregate({
            where: {
                created_at: {
                    gte: thirtyDaysAgo
                }
            },
            _sum: {
                total_amount: true
            }
        });

        return NextResponse.json({
            totalSales: totalSales._sum.total_amount ? Number(totalSales._sum.total_amount) : 0,
            totalOrders,
            totalCustomers,
            recentSales: recentSales._sum.total_amount ? Number(recentSales._sum.total_amount) : 0,
            growth: 12.5 // Mock growth for now
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
