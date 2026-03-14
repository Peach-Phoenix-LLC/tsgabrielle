import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import OrganicDivider from '@/components/Update/OrganicDivider';
import ProductClient from '@/app/(storefront)/product/[slug]/ProductClient';
import Product3DViewer from '@/components/Update/Product3DViewer';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { slug: string } }) {
    // Find by slug or ID
    const product = await prisma.product.findFirst({
        where: {
            OR: [
                { peach_number: parseInt(params.slug) || -1 },
                { title: params.slug?.replace(/-/g, ' ').toUpperCase() }
            ]
        },
        include: {
            variants: true,
            pillars: true,
            metafields: true
        }
    });

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pt-32 pb-24 overflow-hidden">
            {/* Organic Background Blobs */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 w-[800px] h-[800px] fill-[#a932bd] blur-3xl">
                    <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.4,-0.5Z" />
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-4 text-[11px] font-light text-[#888888] uppercase tracking-[0.3em] mb-16">
                    <Link href="/" className="hover:text-[#a932bd] transition-colors">Surface</Link>
                    <span className="opacity-30">/</span>
                    <Link href="/shop" className="hover:text-[#a932bd] transition-colors">Collection</Link>
                    <span className="opacity-30">/</span>
                    <span className="text-[#a932bd]">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    {/* Left: 3D Visualization */}
                    <div className="lg:col-span-7 sticky top-32">
                        <Product3DViewer primaryImageUrl={product.media_primary_url || ''} />

                        {/* Gallery Thumbnails */}
                        <div className="mt-8 grid grid-cols-5 gap-4">
                            {product.media_gallery_urls.slice(0, 5).map((url, i) => (
                                <div key={i} className="aspect-[4/5] rounded-[16px] overflow-hidden bg-[#f7f7f7] cursor-pointer hover:border-[#a932bd] border border-transparent transition-all group">
                                    <img src={url} alt={`${product.title} detail ${i}`} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Interaction (Client Side) */}
                    <div className="lg:col-span-5">
                        <ProductClient product={product} />
                    </div>
                </div>

                {/* Below Fold: Narrative & Details */}
                <div className="mt-40 border-t border-[#e7e7e7] pt-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-1">
                            <div className="w-[1px] h-32 bg-[#a932bd] mx-auto hidden lg:block" />
                        </div>
                        <div className="lg:col-span-6">
                            <h3 className="text-[12px] font-light text-[#a932bd] uppercase tracking-[0.4em] mb-12">The Shift Narrative</h3>
                            <div
                                className="text-[clamp(18px,2vw,22px)] font-light text-[#1a1a1a] leading-relaxed max-w-2xl prose prose-neutral max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.long_description }}
                            />
                        </div>
                        <div className="lg:col-span-5 space-y-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                {product.pillars.map((pillar) => (
                                    <div key={pillar.id} className="p-8 bg-[#f7f7f7] rounded-[24px] border border-[#e7e7e7] group hover:border-[#a932bd]/30 transition-all">
                                        <h4 className="text-[11px] font-light text-[#a932bd] uppercase tracking-[0.2em] mb-4">{pillar.title}</h4>
                                        <div
                                            className="text-[14px] font-light text-[#888888] leading-relaxed prose prose-sm prose-neutral"
                                            dangerouslySetInnerHTML={{ __html: pillar.body }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 bg-[#1a1a1a] text-white rounded-[32px] overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#a932bd]/20 to-transparent group-hover:opacity-60 transition-opacity" />
                                <div className="relative z-10">
                                    <p className="text-[10px] font-light uppercase tracking-[0.4em] mb-6 text-[#a932bd]">Composition & Origin</p>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[13px] font-light">
                                        <span className="opacity-50">Fabrication</span>
                                        <span>{product.composition}</span>
                                        <span className="opacity-50">Artistry</span>
                                        <span>{product.finish}</span>
                                        <span className="opacity-50">Care</span>
                                        <div
                                            className="prose prose-xs prose-invert"
                                            dangerouslySetInnerHTML={{ __html: product.care_instructions }}
                                        />
                                        <span className="opacity-50">Origin</span>
                                        <span>{product.country_of_origin}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32">
                    <OrganicDivider />
                </div>
            </div>
        </main>
    );
}
