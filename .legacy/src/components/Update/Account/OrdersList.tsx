'use client';

import React from 'react';

const orders = [
    {
        id: '#UPD-8241',
        date: 'FEB 24, 2024',
        status: 'DELIVERED',
        total: '$245.00',
        items: [
            { name: 'PRISM WOVEN TEE', image: 'https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/1/transparent_bg.png' }
        ]
    },
    {
        id: '#UPD-7920',
        date: 'JAN 12, 2024',
        status: 'SHIPPED',
        total: '$120.00',
        items: [
            { name: 'HOLOGRAPHIC MESH BAG', image: 'https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/2/transparent_bg.png' }
        ]
    }
];

const OrdersList = () => {
    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order.id} className="bg-white border border-[#e7e7e7] rounded-[24px] overflow-hidden group hover:border-[#a932bd]/20 transition-all">
                    <div className="p-8 flex flex-col md:flex-row md:items-center gap-12">
                        {/* Thumbnails */}
                        <div className="flex -space-x-4">
                            {order.items.map((item, i) => (
                                <div key={i} className="w-24 h-32 rounded-xl border-2 border-white bg-[#f7f7f7] overflow-hidden shadow-sm shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Order Info */}
                        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                            <div>
                                <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.2em] mb-1">Order ID</p>
                                <p className="text-[14px] font-light text-[#1a1a1a] tracking-[0.1em]">{order.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.2em] mb-1">Date</p>
                                <p className="text-[14px] font-light text-[#1a1a1a] tracking-[0.1em]">{order.date}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.2em] mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-blue-400'}`} />
                                    <span className={`text-[11px] font-light uppercase tracking-[0.15em] ${order.status === 'DELIVERED' ? 'text-green-600' : 'text-blue-500'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.2em] mb-1">Total</p>
                                <p className="text-[16px] font-light text-[#a932bd] tracking-[0.05em]">{order.total}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-3">
                            <button className="px-6 py-2.5 rounded-full border border-[#e7e7e7] text-[10px] font-light uppercase tracking-[0.2em] hover:bg-[#a932bd] hover:text-white hover:border-[#a932bd] transition-all">
                                Tracking
                            </button>
                            <button className="px-6 py-2.5 rounded-full border border-[#e7e7e7] text-[10px] font-light uppercase tracking-[0.2em] hover:bg-[#a932bd] hover:text-white hover:border-[#a932bd] transition-all">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrdersList;
