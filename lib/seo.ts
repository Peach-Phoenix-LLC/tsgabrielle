import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsgabrielle.com";

export function buildMetadata({
  title,
  description,
  path = "/"
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: "tsgabrielle",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
