import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { syncKlaviyoProfile, trackKlaviyoEvent } from '@/lib/klaviyo';
import { prisma } from '@/lib/prisma';
import { awardAccountCreationPeaches } from './peaches';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: (process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID)!,
            clientSecret: (process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET)!,
        }),
    ],
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            if (user.email) {
                // Upsert Profile
                const existingProfile = await prisma.profile.findUnique({
                    where: { email: user.email }
                });

                if (!existingProfile) {
                    const newProfile = await prisma.profile.create({
                        data: {
                            email: user.email,
                            full_name: user.name,
                        }
                    });

                    // Award 50 Peaches for creating an account
                    await awardAccountCreationPeaches(newProfile.id);

                    await syncKlaviyoProfile(user.email, {
                        first_name: user.name?.split(' ')[0],
                        last_name: user.name?.split(' ').slice(1).join(' ')
                    });
                    await trackKlaviyoEvent('New Customer Registered', user.email, { method: 'OAuth' });
                }
            }
        },
    },
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;
            return true;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.userId;
                (session.user as any).peaches = token.peaches;
                (session.user as any).role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                const profile = await prisma.profile.findUnique({
                    where: { email: user.email! }
                });
                if (profile) {
                    token.userId = profile.id;
                    token.peaches = profile.peaches_balance;
                    token.role = profile.role;
                }
            } else if (token.userId) {
                const profile = await prisma.profile.findUnique({
                    where: { id: token.userId as string }
                });
                if (profile) {
                    token.peaches = profile.peaches_balance;
                    token.role = profile.role;
                }
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/",
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
};
