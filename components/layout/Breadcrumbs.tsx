"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export default function Breadcrumbs({ textColor = "#111111" }: { textColor?: string }) {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  // Build structured data
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://tsgabrielle.us/",
    },
  ];

  let currentLink = "";
  pathSegments.forEach((segment, index) => {
    currentLink += `/${segment}`;
    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name: toTitleCase(segment.replace(/-/g, " ")),
      item: `https://tsgabrielle.us${currentLink}`,
    });
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="container-luxe py-4 mt-6">
        <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest font-medium" style={{ color: textColor, opacity: 0.7 }}>
          <li>
            <Link href="/" className="hover:underline transition-all">
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const title = toTitleCase(segment.replace(/-/g, " "));

            return (
              <React.Fragment key={href}>
                <span className="opacity-50 mx-1">/</span>
                <li aria-current={isLast ? "page" : undefined}>
                  {isLast ? (
                    <span className="opacity-100">{title}</span>
                  ) : (
                    <Link href={href} className="hover:underline transition-all">
                      {title}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
