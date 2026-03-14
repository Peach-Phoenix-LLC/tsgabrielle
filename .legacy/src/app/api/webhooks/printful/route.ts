import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trackKlaviyoEvent } from "@/lib/klaviyo";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, data } = body;

        

        // Handle Package Shipped
        if (type === 'package_shipped') {
            const externalId = data.order.external_id;
            const shipment = data.shipment;
            const trackingNumber = shipment.tracking_number;
            const trackingUrl = shipment.tracking_url;
            const carrier = shipment.carrier;

            if (externalId) {
                const order = await prisma.order.update({
                    where: { id: externalId },
                    data: {
                        status: 'SHIPPED',
                        tracking_number: trackingNumber,
                        tracking_url: trackingUrl,
                        carrier: carrier
                    }
                });

                if (order.customer_email) {
                    await trackKlaviyoEvent("Order Shipped", order.customer_email, {
                        orderId: order.id,
                        tracking_number: trackingNumber,
                        tracking_url: trackingUrl,
                        carrier: carrier
                    });
                }
            }
        }

        // Handle Package Delivered
        if (type === 'package_delivered') {
            const externalId = data.order.external_id;
            if (externalId) {
                const order = await prisma.order.update({
                    where: { id: externalId },
                    data: { status: 'DELIVERED' }
                });

                if (order.customer_email) {
                    await trackKlaviyoEvent("Order Delivered", order.customer_email, {
                        orderId: order.id
                    });
                }
            }
        }

        // Handle Order Status Changes
        if (type === 'order_updated') {
            const externalId = data.order.external_id;
            const printfulStatus = data.order.status;

            if (externalId) {
                let internalStatus: any = undefined;
                if (printfulStatus === 'processed') internalStatus = 'PROCESSING';
                if (printfulStatus === 'canceled') internalStatus = 'CANCELLED';
                if (printfulStatus === 'failed') internalStatus = 'FAILED';

                if (internalStatus) {
                    await prisma.order.update({
                        where: { id: externalId },
                        data: { status: internalStatus }
                    });
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Printful Webhook Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
