import { prisma } from "./prisma";
import { trackKlaviyoEvent } from "./klaviyo";

export async function addPeaches(userId: string, amount: number, type: 'EARNED' | 'REDEEMED' | 'ADJUSTMENT', description: string) {
    if (amount === 0) return;

    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create transaction record
            const transaction = await tx.peachTransaction.create({
                data: {
                    user_id: userId,
                    amount,
                    type,
                    description,
                },
            });

            // 2. Update user balance
            const profile = await tx.profile.update({
                where: { id: userId },
                data: {
                    peaches_balance: {
                        increment: amount,
                    },
                },
            });

            return { transaction, profile };
        });

        // 3. Send Klaviyo event
        if (result.profile.email) {
            await trackKlaviyoEvent(
                amount > 0 ? "Peaches Earned" : "Peaches Redeemed",
                result.profile.email,
                {
                    amount: Math.abs(amount),
                    type,
                    description,
                    current_balance: result.profile.peaches_balance,
                }
            );
        }

        return result;
    } catch (error) {
        console.error("Failed to add peaches:", error);
        throw error;
    }
}

export async function awardOrderPeaches(userId: string, orderId: string, amountSpent: number) {
    // 1 Peach for every $1 spent
    const peaches = Math.floor(amountSpent);
    if (peaches <= 0) return;

    return await addPeaches(userId, peaches, 'EARNED', `Order #${orderId}`);
}

export async function awardAccountCreationPeaches(userId: string) {
    return await addPeaches(userId, 50, 'EARNED', 'Account Registration');
}

export async function awardReviewPeaches(userId: string, productId: number) {
    return await addPeaches(userId, 25, 'EARNED', `Product Review`);
}

export async function awardReferralPeaches(userId: string, referredFriendEmail: string) {
    return await addPeaches(userId, 100, 'EARNED', `Referred ${referredFriendEmail}`);
}
