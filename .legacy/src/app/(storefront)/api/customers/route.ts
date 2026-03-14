import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const customers = await prisma.profile.findMany({
            where: {
                role: 'USER'
            },
            include: {
                orders: {
                    orderBy: {
                        created_at: 'desc'
                    },
                    take: 1
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Format for the admin table
        const formattedCustomers = customers.map((profile: any) => ({
            id: profile.id,
            name: profile.full_name || 'Anonymous',
            email: profile.email,
            lastOrder: profile.orders[0]?.created_at || profile.createdAt,
            totalSpent: 0 // Would require more complex aggregation
        }));

        return NextResponse.json(formattedCustomers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}
