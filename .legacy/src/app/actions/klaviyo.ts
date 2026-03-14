"use server";

import { trackKlaviyoEvent, syncKlaviyoProfile } from "@/lib/klaviyo";

export async function trackStartedCheckoutAction(email: string, cartData: { items: any[], total: number }) {
    if (!email) return { success: false };

    try {
        await syncKlaviyoProfile(email);
        await trackKlaviyoEvent("Started Checkout", email, {
            ...cartData,
            checkout_url: `https://tsgabrielle.us/checkout`
        }, cartData.total);
        return { success: true };
    } catch (error) {
        console.error("Klaviyo Started Checkout Error:", error);
        return { success: false };
    }
}
