import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const ALLOWED_EMAIL = process.env.ADMIN_EMAIL || "yridoutt@gmail.com";

    if (!session || session.user?.email?.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-black text-white font-serif">
            {/* Minimalist Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col p-6 fixed h-full">
                <div className="mb-10 pt-4">
                    <h2 className="text-xl tracking-[0.2em] font-light">TSGABRIELLE</h2>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">Admin Control</p>
                </div>

                <nav className="flex-1 space-y-6">
                    <Link href="/dashboard" className="block text-sm tracking-widest hover:text-white/60 transition-colors uppercase">Overview</Link>
                    <Link href="/dashboard/products" className="block text-sm tracking-widest hover:text-white/60 transition-colors uppercase">Products</Link>
                    <Link href="/dashboard/orders" className="block text-sm tracking-widest hover:text-white/60 transition-colors uppercase">Orders</Link>
                    <Link href="/dashboard/customers" className="block text-sm tracking-widest hover:text-white/60 transition-colors uppercase">Customers</Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <Link
                        href="/"
                        className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
                    >
                        &larr; Back to site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10 min-h-screen">
                {children}
            </main>
        </div>
    );
}
