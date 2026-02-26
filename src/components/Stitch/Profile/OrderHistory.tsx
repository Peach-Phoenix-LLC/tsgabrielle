import React from 'react';
import Link from 'next/link';

interface OrderHistoryProps {
    orders: Array<{
        id: string;
        total_amount: any;
        status: string;
        created_at: Date;
        items: Array<{
            quantity: number;
            price: any;
            product: {
                name?: string;
                title?: string;
                category?: string;
                catalogue_category?: string;
                imageUrl?: string | null;
                media_primary_url?: string | null;
            }
        }>
    }>;
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
    if (!orders || orders.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4">inventory_2</span>
                <h2 className="text-xl font-bold text-gray-900">No Orders Yet</h2>
                <p className="text-gray-500 mt-2 mb-6">Discover our latest collections and find something extraordinary.</p>
                <Link href="/collections" className="inline-flex px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Order History</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your recent luxury acquisitions and track shipments.</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-medium text-accent-blue bg-accent-blue/5 hover:bg-accent-blue/10 px-4 py-2 rounded-lg transition-colors border border-accent-blue/10">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    Filter Orders
                </button>
            </div>

            <div className="divide-y divide-gray-100">
                {orders.map((order) => {
                    // Pull the primary product info from the first item to represent the whole order
                    const leadingItem = order.items[0];
                    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                    return (
                        <div key={order.id} className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 hover:bg-gray-50/50 transition-colors">

                            {/* Image */}
                            <div className="w-full lg:w-32 h-32 lg:h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                {(leadingItem?.product?.media_primary_url || leadingItem?.product?.imageUrl) ? (
                                    <img src={leadingItem.product.media_primary_url || leadingItem.product.imageUrl || ''} alt={leadingItem.product.title || leadingItem.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <span className="material-symbols-outlined text-gray-400">image</span>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {leadingItem?.product?.title || leadingItem?.product?.name || 'Assorted Items'}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {itemCount > 1 ? `+ ${itemCount - 1} other item(s)` : (leadingItem?.product?.catalogue_category || leadingItem?.product?.category || 'General')}
                                        </p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-lg font-semibold text-gray-900">${Number(order.total_amount)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                                        }`}>
                                        <span className="material-symbols-outlined text-[14px]">
                                            {order.status === 'DELIVERED' ? 'check_circle' : order.status === 'SHIPPED' ? 'local_shipping' : 'pending_actions'}
                                        </span>
                                        {order.status}
                                    </div>
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px] text-gray-400">calendar_month</span>
                                        {new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col justify-end gap-3 lg:w-40 flex-shrink-0 pt-2 lg:pt-0">
                                <button className="flex-1 lg:flex-none px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors shadow-sm text-center">
                                    View Details
                                </button>
                                {order.status === 'DELIVERED' && (
                                    <button className="flex-1 lg:flex-none px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl border border-gray-200 transition-colors text-center">
                                        Buy Again
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
