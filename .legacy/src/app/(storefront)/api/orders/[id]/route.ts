import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { trackKlaviyoEvent } from '@/lib/klaviyo';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { status } = body;

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status },
            include: {
                profile: true
            }
        });

        // Track order status changes for Klaviyo
        const customerEmail = updatedOrder.customer_email || updatedOrder.profile?.email;
        if (customerEmail) {
            if (status === 'SHIPPED') {
                await trackKlaviyoEvent("Order Fulfilled", customerEmail, { orderId: updatedOrder.id, status });
            } else if (status === 'CANCELLED') {
                await trackKlaviyoEvent("Order Cancelled", customerEmail, { orderId: updatedOrder.id, status });
            } else if (status === 'DELIVERED') {
                // Send review request email internally or trigger a flow in Klaviyo
                await trackKlaviyoEvent("Order Delivered", customerEmail, { orderId: updatedOrder.id, review_link: `https://tsgabrielle.us/profile` });
            }
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
