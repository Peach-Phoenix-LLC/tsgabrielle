import React from 'react';

export default function EliteDataSheet({ product }: { product: any }) {
    if (!product) return null;

    // Standard calculations
    const parentSku = `TSG${product.peach_number}`;
    const standardUrl = `https://tsgabrielle.us/products/${product.peach_number}`;
    const shortUrl = `https://tsgabrielle.us/${product.peach_number}`;

    return (
        <div className="max-w-6xl mx-auto px-6 py-24 font-sans bg-white text-[#1a1a1a]">
            {/* Header */}
            <div className="text-center mb-16 border-b border-black/10 pb-8">
                <h2 className="text-2xl font-light uppercase tracking-widest text-[#1a1a1a]">
                    {`$$ \\text{${product.title}} $$`} | Technical Data Sheet
                </h2>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mt-4">
                    Brand Standard: Lato Light | INTERNAL ID (Peach Number): {`$$ \\text{${product.peach_number}} $$`}
                </span>
            </div>

            <div className="space-y-16 text-sm leading-relaxed text-[#1a1a1a]/80">

                {/* 1. Global Identifiers */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">1. Global Identifiers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>Peach Number:</strong> {product.peach_number}</p>
                        <p><strong>Handle:</strong> {product.peach_number}</p>
                        <p><strong>Parent SKU:</strong> {parentSku}</p>
                        <p><strong>Parent MPN:</strong> {product.base_mpn || parentSku}</p>
                        <p><strong>Child SKU/MPN Base:</strong> {parentSku}-X</p>
                        <p><strong>g:brand:</strong> {product.brand}</p>
                        <p><strong>g:gtin:</strong> {product.base_gtin || 'N/A'}</p>
                    </div>
                </div>

                {/* 2. Categorization & Metafields (Catalogue US) */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">2. Categorization & Metafields (Catalogue US)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>Product Type:</strong> {product.product_type}</p>
                        <p><strong>Internal Category:</strong> {product.catalogue_category}</p>
                        <p><strong>Collection:</strong> {product.catalogue_collection}</p>
                        <p><strong>g:google_product_category:</strong> {product.google_category_id} - {product.google_category_name}</p>
                    </div>
                </div>

                {/* 3. Google Shopping & Metafield Architecture */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">3. Google Shopping & Metafield Architecture</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>g:id:</strong> {parentSku}</p>
                        <p><strong>g:title:</strong> {product.title}</p>
                        <p><strong>g:link:</strong> {standardUrl}</p>
                        <p><strong>g:condition:</strong> {product.gs_condition}</p>
                        <p><strong>g:availability:</strong> {product.gs_availability}</p>
                        <p><strong>g:gender:</strong> {product.gs_gender || 'Unisex'}</p>
                        <p><strong>g:age_group:</strong> {product.gs_age_group || 'Adult'}</p>
                        <p><strong>g:size_system:</strong> {product.gs_size_system || 'US'}</p>
                        <p><strong>g:identifier_exists:</strong> {product.base_gtin ? 'yes' : 'no'}</p>
                    </div>
                </div>

                {/* 4. Product Variations & Matrix Architecture */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">4. Product Variations & Matrix Architecture</h3>
                    <div className="bg-neutral-50 rounded-xl border border-black/5 overflow-hidden">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-[#1a1a1a] text-white">
                                <tr>
                                    <th className="px-4 py-3 font-medium uppercase tracking-widest text-[9px]">Color</th>
                                    <th className="px-4 py-3 font-medium uppercase tracking-widest text-[9px]">Size</th>
                                    <th className="px-4 py-3 font-medium uppercase tracking-widest text-[9px]">Variant SKU</th>
                                    <th className="px-4 py-3 font-medium uppercase tracking-widest text-[9px]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.variants && product.variants.length > 0 ? product.variants.map((v: any, idx: number) => (
                                    <tr key={v.id} className="border-b border-black/5 last:border-0 hover:bg-black/5">
                                        <td className="px-4 py-3">{v.color}</td>
                                        <td className="px-4 py-3">{v.size_label}</td>
                                        <td className="px-4 py-3 font-mono">{parentSku}-{idx + 1}</td>
                                        <td className="px-4 py-3">{v.inventory}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-3 text-center opacity-40">No variations mapped.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 5. Product Copywriting */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">5. Product Copywriting</h3>
                    <div className="space-y-6 bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <div>
                            <h4 className="text-[10px] uppercase font-bold tracking-widest mb-1 text-[#a932bd]">Short Hook</h4>
                            <p className="text-sm">{product.short_description}</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase font-bold tracking-widest mb-1 text-[#a932bd]">Artisanal Narrative</h4>
                            <p className="text-sm whitespace-pre-wrap">{product.long_description}</p>
                        </div>
                    </div>
                </div>

                {/* 6. Premium Details (The 5 Pillars) */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">6. Premium Details (The 5 Pillars of Excellence)</h3>
                    <div className="bg-neutral-50 p-6 rounded-xl border border-black/5">
                        {product.pillars && product.pillars.length > 0 ? (
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                {product.pillars.slice(0, 5).map((p: any) => (
                                    <li key={p.id}><strong>{p.title}:</strong> {p.body}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs opacity-40">Pillars pending synchronization.</p>
                        )}
                    </div>
                </div>

                {/* 7. SEO & Discoverability */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">7. SEO & Discoverability</h3>
                    <div className="space-y-4 bg-neutral-50 p-6 rounded-xl border border-black/5 text-xs">
                        <p><strong>Meta Title:</strong> {product.seo_meta_title}</p>
                        <p><strong>Meta Description:</strong> {product.seo_meta_description}</p>
                        <div>
                            <strong>Tags ({product.seo_tags?.length || 0}/50):</strong>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.seo_tags?.map((t: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-black/5 rounded-md text-[10px]">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. Media & Assets */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">8. Media & Assets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>Primary Image:</strong> <a href={product.media_primary_url} className="text-[#a932bd] hover:underline" target="_blank" rel="noreferrer">View Asset</a></p>
                        <p><strong>Gallery Assets:</strong> {product.media_gallery_urls?.length || 0} mapped</p>
                    </div>
                </div>

                {/* 9. Global Logistics & Fulfillment */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">9. Global Logistics & Fulfillment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>HS Code:</strong> {product.hs_code_primary} {product.hs_code_alt ? `(${product.hs_code_alt})` : ''}</p>
                        <p><strong>Shipping Tier:</strong> {product.shipping_tier}</p>
                        <p><strong>Lead Time:</strong> {product.lead_time}</p>
                        <p><strong>Warehouse Zone:</strong> {product.warehouse_zone}</p>
                    </div>
                </div>

                {/* 10. Sustainability & Transparency */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">10. Sustainability & Transparency</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>Traceability:</strong> {product.traceability}</p>
                        <p><strong>Ethical Audit:</strong> {product.ethical_audit}</p>
                        <p><strong>Carbon Footprint:</strong> {product.carbon_footprint}</p>
                        <p><strong>Certifications:</strong> {product.certifications?.join(', ') || 'None'}</p>
                    </div>
                </div>

                {/* 11. Customer Care & Concierge Data */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">11. Customer Care & Concierge Data</h3>
                    <div className="text-xs bg-neutral-50 p-6 rounded-xl border border-black/5 space-y-2">
                        <p><strong>Care Instructions:</strong> {product.care_instructions}</p>
                        <p><strong>Composition:</strong> {product.composition}</p>
                    </div>
                </div>

                {/* 12. Commercial & Internal Finance */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">12. Commercial & Internal Finance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>MSRP:</strong> {product.msrp_display}</p>
                        <p><strong>MAP Policy:</strong> {product.map_policy || 'Strict'}</p>
                        <p><strong>Wholesale Price:</strong> {product.wholesale_price || 'Classified'}</p>
                        <p><strong>Seasonality Code:</strong> {product.seasonality_code || 'Core Collection'}</p>
                    </div>
                </div>

                {/* 13. Marketplace & Omnichannel Distribution */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">13. Marketplace & Omnichannel Distribution</h3>
                    <div className="text-xs bg-neutral-50 p-6 rounded-xl border border-black/5 space-y-4">
                        <div className="space-y-1">
                            <p><strong>Standard Web URL:</strong> <a className="text-[#a932bd]" href={standardUrl}>{standardUrl}</a></p>
                            <p><strong>Short Web URL (Redirect):</strong> <a className="text-[#a932bd]" href={shortUrl}>{shortUrl}</a></p>
                        </div>
                        <table className="w-full text-left bg-white border border-black/5">
                            <thead className="bg-[#1a1a1a] text-white">
                                <tr>
                                    <th className="px-4 py-2 text-[9px] uppercase tracking-widest">Avenue</th>
                                    <th className="px-4 py-2 text-[9px] uppercase tracking-widest">Status / Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-black/5">
                                    <td className="px-4 py-2">Flagship Website</td>
                                    <td className="px-4 py-2 text-green-600">Active</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                    <td className="px-4 py-2">Amazon US</td>
                                    <td className="px-4 py-2">{product.url_amazon ? <a href={product.url_amazon} className="text-[#a932bd]">Synced</a> : 'Pending Integration'}</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                    <td className="px-4 py-2">Etsy US</td>
                                    <td className="px-4 py-2">{product.url_etsy ? <a href={product.url_etsy} className="text-[#a932bd]">Synced</a> : 'Pending Integration'}</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                    <td className="px-4 py-2">TikTok Shop US</td>
                                    <td className="px-4 py-2">{product.url_tiktok ? <a href={product.url_tiktok} className="text-[#a932bd]">Synced</a> : 'Pending Integration'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 14. Advanced Technical Specifications */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">14. Advanced Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5">
                        <p><strong>Hardware Finish:</strong> {product.finish}</p>
                        <p><strong>Country Of Origin:</strong> {product.country_of_origin}</p>
                    </div>
                </div>

                {/* 15. Compliance & Legal */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-2">15. Compliance & Legal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-6 rounded-xl border border-black/5 text-[#1a1a1a]">
                        <p><strong>Prop 65 Status:</strong> {product.prop65_status}</p>
                        <p><strong>Trademark Notes:</strong> {product.trademark_notes}</p>
                        <p><strong>Safety Testing:</strong> {product.safety_testing}</p>
                        <p><strong>Contact Info:</strong> {product.contact_info}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
