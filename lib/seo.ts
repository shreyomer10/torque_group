import type { Metadata } from "next";
import { seo, seoKeywordsGlobal, brand } from "@/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://torquegroup.com";

export function buildMetadata(route: string): Metadata {
  const entry = seo[route] ?? seo["/"];
  const url = `${SITE_URL}${route === "/" ? "" : route}`;
  return {
    title: entry.title,
    description: entry.description,
    keywords: seoKeywordsGlobal,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      siteName: brand.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
    robots: { index: true, follow: true },
  };
}

export const siteUrl = SITE_URL;
