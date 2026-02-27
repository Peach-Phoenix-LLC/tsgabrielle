export interface PrintfulOrderRequest {
    recipient: {
        name: string;
        address1: string;
        address2?: string;
        city: string;
        state_code: string;
        country_code: string;
        zip: string;
        email?: string;
    };
    items: {
        sync_variant_id?: number;
        variant_id?: number;
        quantity: number;
        retail_price?: string;
        name?: string;
    }[];
    external_id: string;
}

const PRINTFUL_API_URL = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_API_KEY;

export async function createPrintfulOrder(orderData: PrintfulOrderRequest) {
    if (!PRINTFUL_TOKEN) {
        throw new Error("PRINTFUL_API_KEY is not configured.");
    }

    const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${PRINTFUL_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Printful Error:", data);
        throw new Error(data.error?.message || "Failed to create Printful order");
    }

    return data.result;
}

export async function getPrintfulOrder(id: string | number) {
    if (!PRINTFUL_TOKEN) return null;

    const response = await fetch(`${PRINTFUL_API_URL}/orders/${id}`, {
        headers: {
            "Authorization": `Bearer ${PRINTFUL_TOKEN}`,
        },
    });

    const data = await response.json();
    return data.result;
}

export async function getPrintfulShippingRates(recipient: any, items: any[]) {
    if (!PRINTFUL_TOKEN) return null;

    const response = await fetch(`${PRINTFUL_API_URL}/shipping/rates`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${PRINTFUL_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, items }),
    });

    const data = await response.json();
    return data.result;
}
