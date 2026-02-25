import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const ALLOWED_EMAIL = process.env.ADMIN_EMAIL || "yridoutt@gmail.com";

export default withAuth(
    function middleware(req) {
        // If they are authenticated but not the owner, redirect to home
        if (req.nextauth.token?.email?.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/auth/signin",
        }
    }
);

export const config = {
    matcher: ["/dashboard/:path*"],
};
