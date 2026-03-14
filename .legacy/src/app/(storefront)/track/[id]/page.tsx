import React from 'react';
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getPrintfulOrder } from "@/lib/printful";

export default async function OrderTrackingPage({ params }: { params: { id: string } }) {
    const order = await prisma.order.findUnique({
        where: { id: params.id },
        include: { items: { include: { product: true } } }
    });

    if (!order) notFound();

    let printfulData = null;
    if (order.printful_id) {
        printfulData = await getPrintfulOrder(order.printful_id);
    }

    const steps = [
        { label: 'Order Confirmed', status: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'], date: order.created_at },
        { label: 'In Production', status: ['PROCESSING', 'SHIPPED', 'DELIVERED'], date: order.status === 'PROCESSING' ? new Date() : null },
        { label: 'Shipped', status: ['SHIPPED', 'DELIVERED'], date: order.status === 'SHIPPED' ? new Date() : null },
        { label: 'Delivered', status: ['DELIVERED'], date: order.status === 'DELIVERED' ? new Date() : null },
    ];

    const currentIdx = steps.findLastIndex(s => s.status.includes(order.status)) || 0;

    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] pt-40 pb-32">
            <div className="max-w-4xl mx-auto px-8">
                <div className="mb-16">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold">Maison Logistics</span>
                    <h1 className="text-5xl font-light tracking-tight mt-4">Track Order</h1>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Order ID: #{order.id.substring(0, 8)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Status Column */}
                    <div className="md:col-span-2 space-y-12">
                        <div className="relative">
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-black/5" />
                            <div className="space-y-12">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="relative flex items-center gap-8 group">
                                        <div className={`relative z-10 size-8 rounded-full border-2 flex items-center justify-center transition-all ${idx <= currentIdx ? 'bg-[#a932bd] border-[#a932bd] text-white' : 'bg-white border-black/10 text-black/20'
                                            }`}>
                                            {idx <= currentIdx ? (
                                                <span className="material-symbols-outlined text-sm">check</span>
                                            ) : (
                                                <span className="text-[10px] font-bold">{idx + 1}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className={`text-sm uppercase tracking-widest font-bold ${idx <= currentIdx ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/20'}`}>
                                                {step.label}
                                            </p>
                                            {idx === currentIdx && (
                                                <p className="text-[10px] text-[#a932bd] mt-1 font-serif italic animate-pulse">Current Status</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {order.tracking_number && (
                            <div className="p-8 bg-neutral-50 rounded-2xl border border-black/10 space-y-4">
                                <h3 className="text-[10px] uppercase font-bold tracking-widest">Shipment Details</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[9px] uppercase text-black/40">Carrier</p>
                                        <p className="text-sm font-light mt-1">{order.carrier || 'Standard Courier'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase text-black/40">Tracking Number</p>
                                        <p className="text-sm font-light mt-1">{order.tracking_number}</p>
                                    </div>
                                </div>
                                <a
                                    href={order.tracking_url || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-full py-4 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest text-center rounded-xl hover:bg-[#a932bd] transition-all"
                                >
                                    Track on Carrier Site
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Column */}
                    <div className="space-y-8">
                        <div className="p-8 border border-black/10 rounded-2xl space-y-6">
                            <h3 className="text-[10px] uppercase font-bold tracking-widest">Items</h3>
                            <div className="space-y-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="size-16 bg-neutral-100 rounded-lg overflow-hidden border border-black/5 flex-shrink-0">
                                            <img src={item.product.media_primary_url || '/placeholder.png'} alt={item.product.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase truncate max-w-[120px]">{item.product.title}</p>
                                            <p className="text-[10px] text-black/40 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-black/5">
                                <p className="text-[9px] uppercase text-black/40">Ship to</p>
                                <p className="text-xs font-light mt-2">{order.customer_name}</p>
                                <p className="text-xs font-light opacity-60">
                                    {order.shipping_address1}<br />
                                    {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
