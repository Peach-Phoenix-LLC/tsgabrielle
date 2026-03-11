import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsgabrielle.us";

export function buildMetadata({
  title,
  description,
  keywords,
  path = "/",
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: "tsgabrielle",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}
