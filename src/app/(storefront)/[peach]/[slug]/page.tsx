import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function CustomPage({ params }: { params: { slug: string } }) {
    const page = await prisma.cMSPage.findUnique({
        where: { slug: params.slug },
    });

    if (!page || !page.is_visible) {
        notFound();
    }

    let blocks = [];
    try {
        blocks = JSON.parse(page.body);
    } catch (e) {
        // Fallback for legacy text body
        blocks = [{ type: 'text', content: { text: page.body } }];
    }

    const layout = page.layout || 'standard';

    return (
        <main className={`min-h-screen bg-white text-[#1a1a1a] ${layout === 'minimal' ? 'pt-24' : ''}`}>
            {/* Conditional Header based on layout */}
            {layout !== 'full' && (
                <div className={`max-w-7xl mx-auto px-8 py-24 ${layout === 'split' ? 'grid grid-cols-1 md:grid-cols-2 gap-16 items-center' : 'text-center'}`}>
                    <div className="space-y-6">
                        <Link href="/" className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold">Maison tsgabrielle®</Link>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tight">{page.title}</h1>
                        <div className={`w-24 h-0.5 bg-[#a932bd] ${layout === 'split' ? '' : 'mx-auto'}`} />
                    </div>
                </div>
            )}

            <div className={`max-w-5xl mx-auto px-8 pb-32 space-y-20`}>
                {blocks.map((block: any, idx: number) => (
                    <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        {block.type === 'text' && (
                            <div className="max-w-3xl mx-auto">
                                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-[#1a1a1a]/80 whitespace-pre-wrap">
                                    {block.content.text}
                                </p>
                            </div>
                        )}

                        {block.type === 'image' && (
                            <div className="space-y-4">
                                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
                                    <Image
                                        src={block.content.url}
                                        alt={block.content.caption || page.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {block.content.caption && (
                                    <p className="text-center text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">{block.content.caption}</p>
                                )}
                            </div>
                        )}

                        {block.type === 'dual_column' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                                <div className="text-lg leading-relaxed text-[#1a1a1a]/70 whitespace-pre-wrap">{block.content.left}</div>
                                <div className="text-lg leading-relaxed text-[#1a1a1a]/70 whitespace-pre-wrap">{block.content.right}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Premium Footer Accent */}
            <div className="py-20 border-t border-black/5 text-center">
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#1a1a1a]/20">Designed by Maison Intelligence</p>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    const pages = await prisma.cMSPage.findMany({
        where: { is_visible: true },
        select: { slug: true }
    });

    return pages.map((page) => ({
        slug: page.slug,
    }));
}
