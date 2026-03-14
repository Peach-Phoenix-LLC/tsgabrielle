import { prisma } from "./prisma";
import { Product } from "@prisma/client";

// Fetch full product for public page render
export async function getProductByPeach(peach: string) {
    const peachInt = parseInt(peach);
    if (isNaN(peachInt)) return null;

    return prisma.product.findUnique({
        where: {
            peach_number: peachInt,
            status: "active"
        },
        include: {
            variants: {
                orderBy: { sort_order: "asc" }
            },
            pillars: {
                orderBy: { sort_order: "asc" }
            },
            gallery_slides: {
                orderBy: { sort_order: "asc" }
            },
            metafields: {
                where: { is_public: true }
            },
        },
    });
}

// Fetch products by collection
export async function getProductsByCollection(collectionName: string) {
    return prisma.product.findMany({
        where: {
            catalogue_collection: {
                contains: collectionName,
                mode: 'insensitive'
            },
            status: "active"
        },
        include: {
            variants: true
        }
    });
}

// Fetch products by category
export async function getProductsByCategory(categoryName: string) {
    return prisma.product.findMany({
        where: {
            catalogue_category: {
                contains: categoryName,
                mode: 'insensitive'
            },
            status: "active"
        },
        include: {
            variants: true
        }
    });
}

// Never expose these fields to client components:
const PRIVATE_FIELDS = [
    "seo_meta_title",
    "seo_meta_description",
    "seo_tags",
    "gs_condition",
    "gs_availability",
    "gs_gender",
    "gs_age_group",
    "gs_size_system",
    "url_amazon",
    "url_etsy",
    "url_tiktok",
    "map_policy",
    "wholesale_price",
    "landed_cost_est",
];

// Strip private fields before passing to client
export function toPublicProduct(product: any) {
    if (!product) return null;
    const pub = { ...product };
    PRIVATE_FIELDS.forEach(f => delete pub[f]);
    return pub;
}
