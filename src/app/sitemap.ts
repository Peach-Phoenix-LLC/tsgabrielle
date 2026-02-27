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
        "/profile",
        "/cart",
        "/checkout",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    // Dynamic products
    const products = await prisma.product.findMany({
        select: { peach_number: true, updated_at: true },
    });

    const productRoutes = products.map((p) => ({
        url: `${baseUrl}/${p.peach_number}`,
        lastModified: p.updated_at,
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    // Categories
    const categories = await prisma.category.findMany({
        select: { slug: true },
    });

    const categoryRoutes = categories.map((c) => ({
        url: `${baseUrl}/categories/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Collections
    const collections = await prisma.collection.findMany({
        select: { slug: true },
    });

    const collectionRoutes = collections.map((c) => ({
        url: `${baseUrl}/collections/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...collectionRoutes];
}
