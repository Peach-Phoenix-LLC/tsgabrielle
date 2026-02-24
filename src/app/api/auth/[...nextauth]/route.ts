import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: (process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID)!,
            clientSecret: (process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET)!,
        }),

    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            try {
                const adminEmails = (process.env.ADMIN_EMAIL || '').split(/[;,]/).map(e => e.trim().toLowerCase()).filter(Boolean);
                const userEmail = user.email?.toLowerCase();
                const role = (userEmail && adminEmails.includes(userEmail)) ? 'ADMIN' : 'USER' as const;

                console.log(`[NextAuth] user.email: ${userEmail}, adminEmails: ${adminEmails}, role: ${role}`);

                const existingUser = await prisma.profile.findUnique({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    await prisma.profile.create({
                        data: {
                            email: user.email,
                            full_name: user.name,
                            role: role,
                        },
                    });
                } else if (existingUser.role !== role) {
                    await prisma.profile.update({
                        where: { email: user.email },
                        data: { role: role },
                    });
                }
            } catch (err) {
                console.error('[NextAuth] signIn DB error:', err);
            }

            return true;
        },
        async session({ session }) {
            if (session.user?.email) {
                try {
                    const dbUser = await prisma.profile.findUnique({
                        where: { email: session.user.email },
                    });
                    if (dbUser) {
                        (session.user as { role?: string; id?: string }).role = dbUser.role;
                        (session.user as { role?: string; id?: string }).id = dbUser.id;
                    }
                } catch (err) {
                    console.error('[NextAuth] session DB error:', err);
                }
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
