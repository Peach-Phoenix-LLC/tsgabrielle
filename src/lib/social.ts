import Ayrshare from "social-media-api";
import { OpenAI } from "openai";
import { prisma } from "./prisma";

// Ayrshare handles the abstraction of all social platforms
const ayrshare = new Ayrshare(process.env.AYRSHARE_API_KEY || "");

// OpenAI for generating high-end captions
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generates a platform-specific social media caption using AI.
 */
export async function generateSocialCaption(product: any, platform: string) {
    const prompt = `
        You are the Social Media Manager for tsgabrielle®, a premium luxury e-commerce brand.
        Generate a compelling social media caption for the following product:
        
        Product: ${product.title}
        Description: ${product.short_description}
        Category: ${product.catalogue_category}
        Call to Action Link: https://tsgabrielle.us/${product.peach_number}

        Platform for this post: ${platform}
        
        Requirements:
        1. Maintain a luxury, sophisticated, yet engaging tone (Maison style).
        2. Specifically include the product name and the provided link.
        3. Include 10-15 relevant hashtags at the end.
        4. Adjust character count and style for ${platform} (e.g., professional for LinkedIn, punchy for X, visual/story-driven for Instagram).
        5. DO NOT use emojis excessively, keep it elegant.
    `;

    try {
        if (!process.env.OPENAI_API_KEY) throw new Error("Missing OpenAI Key");

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "system", content: "You write luxury brand copy." }, { role: "user", content: prompt }],
            temperature: 0.7,
        });

        return response.choices[0].message.content?.trim() || "";
    } catch (e) {
        console.error("AI Caption Generation Failed:", e);
        // Fallback simple caption
        return `Experience the artisan craftsmanship of the ${product.title}. ${product.short_description} \n\nAcquire yours: https://tsgabrielle.us/${product.peach_number} \n\n#tsgabrielle #luxury #style #atelier`;
    }
}

/**
 * Posts product media to selected social platforms via Ayrshare.
 */
export async function postToSocial(productId: number, selectedPlatforms?: string[]) {
    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (!product || !product.media_primary_url) {
        throw new Error("Product not found or missing primary image.");
    }

    const platforms = selectedPlatforms || product.social_platforms;
    const results = [];

    // We process each platform individually to have precise status logging
    // and platform-specific AI captions.
    for (const platform of platforms) {
        // Map our internal names to Ayrshare platform keys if necessary
        const ayrPlatform = platform.toLowerCase() === 'x' ? 'twitter' : platform.toLowerCase();

        const caption = await generateSocialCaption(product, platform);

        try {
            const response = await ayrshare.post({
                post: caption,
                platforms: [ayrPlatform as any],
                mediaUrls: [product.media_primary_url]
            });

            // Log Success
            await prisma.socialPost.create({
                data: {
                    product_id: productId,
                    platform,
                    status: "SUCCESS",
                    post_id: response.id || response.refId,
                    caption: caption,
                    image_url: product.media_primary_url
                }
            });

            results.push({ platform, status: 'success' });
        } catch (error: any) {
            console.error(`Ayrshare error for ${platform}:`, error);

            // Log Failure
            await prisma.socialPost.create({
                data: {
                    product_id: productId,
                    platform,
                    status: "FAILED",
                    error_log: error.message || JSON.stringify(error),
                    caption: caption,
                    image_url: product.media_primary_url
                }
            });

            results.push({ platform, status: 'failed', error: error.message });
        }
    }

    return results;
}
