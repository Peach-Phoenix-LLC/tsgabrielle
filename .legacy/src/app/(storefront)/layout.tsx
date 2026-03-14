import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function StorefrontLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const config = await prisma.storeConfig.findUnique({
        where: { id: 1 }
    });

    return (
        <div className="bg-white min-h-screen text-[#1a1a1a]">
            <Navigation config={config?.navigation} />
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    {children}
                </div>
            </div>
            <Footer config={config?.footer} />
        </div>
    );
}
