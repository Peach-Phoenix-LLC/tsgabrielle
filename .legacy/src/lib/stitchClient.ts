/**
 * /lib/stitchClient.ts
 * 
 * Secure server-side client for Google Stitch MCP.
 * This client provides utility functions for AI tasks like product description generation,
 * SEO metadata, and recommendations.
 */

if (typeof window !== 'undefined') {
    throw new Error('Stitch client must only be used on the server.');
}

const STITCH_API_KEY = process.env.STITCH_API_KEY;
const STITCH_SERVER_URL = process.env.STITCH_SERVER_URL;

if (!STITCH_API_KEY || !STITCH_SERVER_URL) {
    console.warn('Stitch API Key or Server URL is missing. AI features may be disabled.');
}

/**
 * Generic function to call Stitch MCP tools via HTTP.
 * Since Stitch is an MCP server, we communicate with it using the MCP protocol.
 */
async function callStitchTool(toolName: string, args: any) {
    if (!STITCH_API_KEY || !STITCH_SERVER_URL) {
        throw new Error('Stitch configuration missing.');
    }

    try {
        const response = await fetch(STITCH_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': STITCH_API_KEY,
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'call_tool',
                params: {
                    name: toolName,
                    arguments: args,
                },
                id: Date.now(),
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Stitch API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(`Stitch RPC error: ${data.error.message || JSON.stringify(data.error)}`);
        }

        return data.result;
    } catch (error) {
        console.error(`Error calling Stitch tool ${toolName}:`, error);
        throw error;
    }
}

/**
 * AI Product Description Generation
 */
export async function generateProductDescription(productName: string, features: string[]) {
    return callStitchTool('generate_screen_from_text', {
        prompt: `Write a luxury fashion description for a product named "${productName}". Key features: ${features.join(', ')}. Style: Minimalist, refined, Parisian elegance.`,
    });
}

/**
 * AI SEO Metadata Generation
 */
export async function generateSEOMetadata(productName: string, description: string) {
    return callStitchTool('generate_screen_from_text', {
        prompt: `Generate a high-converting SEO title and meta description for a luxury product: "${productName}". Description context: ${description}. Focus on exclusivity and premium quality.`,
    });
}

/**
 * AI Product Recommendations
 */
export async function getProductRecommendations(currentProductId: string, category: string) {
    return callStitchTool('generate_variants', {
        prompt: `Suggest complementary luxury fashion items for product ID: ${currentProductId} in category: ${category}.`,
        projectId: 'tsgabrielle-ai-recs',
        selectedScreenIds: [currentProductId],
        variantOptions: { count: 3 }
    });
}

/**
 * AI Marketing Email Generation
 */
export async function generateMarketingEmail(campaignType: string, productName: string, targetAudience: string) {
    return callStitchTool('generate_screen_from_text', {
        prompt: `Write a luxury marketing email for a "${campaignType}" campaign featuring "${productName}". Target audience: ${targetAudience}. Tone: Elegant, exclusive, Parisian.`,
    });
}
