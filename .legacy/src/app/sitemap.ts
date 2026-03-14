import { prisma } from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://tsgabrielle.us";

    // Static routes
    const staticRoutes = [
        "",
        "/about",
        "/shop",
        "/categories",
        "/collections",
        "/contact",
        "/policies",
        "/privacy",
        "/terms",
        "/refund-policy",
        "/shipping-returns",
        "/account",
        "/cart",
        "/checkout",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    // Dynamic products, Categories, and Collections wrapped in try-catch for build-time safety
    try {
        if (!process.env.DATABASE_URL) return staticRoutes;

        const [products, categories, collections] = await Promise.all([
            prisma.product.findMany({ select: { peach_number: true, updated_at: true } }),
            prisma.category.findMany({ select: { slug: true } }),
            prisma.collection.findMany({ select: { slug: true } }),
        ]);

        const productRoutes = products.map((p) => ({
            url: `${baseUrl}/product/${p.peach_number}`,
            lastModified: p.updated_at,
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }));

        const categoryRoutes = categories.map((c) => ({
            url: `${baseUrl}/categories/${c.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        const collectionRoutes = collections.map((c) => ({
            url: `${baseUrl}/collections/${c.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...collectionRoutes];
    } catch (e) {
        console.warn("Sitemap generation failed (likely due to missing DB at build time):", e);
        return staticRoutes;
    }
}
