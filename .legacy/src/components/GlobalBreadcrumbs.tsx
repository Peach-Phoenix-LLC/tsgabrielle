"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GlobalBreadcrumbs() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Exclude auth, dashboard, and home page
    if (
        pathname === "/" ||
        pathname?.startsWith("/dashboard") ||
        pathname?.startsWith("/auth") ||
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/api")
    ) {
        return null;
    }

    const pathSegments = pathname.split("/").filter((segment) => segment !== "");

    return (
        <div className="w-full absolute top-[90px] left-0 right-0 z-40 flex justify-center pointer-events-none mix-blend-difference text-white/80 drop-shadow-md">
            <nav className="w-full max-w-[1400px] px-8 py-2 pointer-events-auto">
                <ol className="flex items-center space-x-2 text-[11px] uppercase tracking-widest font-light">
                    <li>
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                    </li>
                    {pathSegments.map((segment, index) => {
                        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathSegments.length - 1;
                        const formattedSegment = segment.replace(/-/g, " ");

                        return (
                            <li key={segment} className="flex items-center space-x-2">
                                <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>
                                {isLast ? (
                                    <span className="text-white truncate max-w-[200px]">{formattedSegment}</span>
                                ) : (
                                    <Link href={href} className="hover:text-primary transition-colors">
                                        {formattedSegment}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}
