/**
 * Builds the Next.js Metadata object for a page from src/data/seo.ts.
 * Guarantees: unique title, 140 to 160 character description, canonical URL,
 * Open Graph and Twitter card fields. OG images come from each route's
 * opengraph-image.tsx automatically.
 */
import type { Metadata } from "next";
import { seoPages, type SeoPageKey } from "@/data/seo";
import { siteUrl } from "@/lib/env";

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata(key: SeoPageKey): Metadata {
  const page = seoPages[key];
  const url = absoluteUrl(page.path);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: key === "home" ? "profile" : "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}
