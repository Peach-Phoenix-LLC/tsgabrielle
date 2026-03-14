import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        // Security check: only allow ADMIN role
        if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Fetch orders sorted by most recent
        const orders = await prisma.order.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                profile: true,
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        // Map them into a flattened format friendly for the Admin UI Table
        const formattedOrders = orders.map((o: any) => {
            const leadingItem = o.items[0];
            const itemCount = o.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

            return {
                id: o.id,
                total: o.total_amount,
                status: o.status,
                createdAt: o.created_at,
                firstName: o.profile?.full_name?.split(' ')[0] || null,
                lastName: o.profile?.full_name?.split(' ')[1] || null,
                guestEmail: o.profile?.email || 'Unknown',

                // For the "Product" column in the table
                mainProductId: leadingItem?.product?.id,
                mainProductName: itemCount > 1
                    ? `${leadingItem?.product?.title} +${itemCount - 1} more`
                    : leadingItem?.product?.title || 'Multiple Items',

                // Fulfillment details
                printfulId: o.printful_id,
                trackingNumber: o.tracking_number,
                trackingUrl: o.tracking_url,
                carrier: o.carrier
            };
        });

        return NextResponse.json(formattedOrders);

    } catch (error) {
        console.error('[API_ORDERS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
