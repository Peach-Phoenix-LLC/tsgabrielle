import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic';

export default async function StorefrontLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white min-h-screen text-[#1a1a1a]">
            <Navigation />
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
