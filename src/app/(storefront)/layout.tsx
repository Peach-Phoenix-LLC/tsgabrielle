import { prisma } from "@/lib/prisma";
import ModernNavbar from "@/components/Home/ModernNavbar";
import ModernFooter from "@/components/Home/ModernFooter";

export const dynamic = 'force-dynamic';

export default async function StorefrontLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const config = await prisma.storeConfig.findUnique({
        where: { id: 1 },
    });

    const siteSettings = (config?.site_settings as any) || {};
    const navData = (config?.navigation as any) || {};
    const footerData = (config?.footer as any) || {};

    return (
        <div className="bg-white min-h-screen text-[#1a1a1a]">
            <ModernNavbar config={navData} siteSettings={siteSettings} />
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    {children}
                </div>
            </div>
            <ModernFooter config={footerData} siteSettings={siteSettings} />
        </div>
    );
}
