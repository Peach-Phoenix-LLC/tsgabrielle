import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAIL = process.env.ADMIN_EMAIL || "yridoutt@gmail.com";

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
            return user.email.toLowerCase() === ALLOWED_EMAIL.toLowerCase();
        },
        async session({ session }) {
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/", // redirect errors silently to homepage
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
};
