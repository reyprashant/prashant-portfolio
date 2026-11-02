/**
 * sitemap.xml built from src/data/seo.ts plus every published blog post.
 */
import type { MetadataRoute } from "next";
import { seoPages } from "@/data/seo";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/metadata";

const lastModified = new Date("2026-11-01");

const priorities: Record<keyof typeof seoPages, number> = {
  home: 1,
  about: 0.9,
  work: 0.8,
  community: 0.8,
  blog: 0.7,
  contact: 0.7,
  privacy: 0.2,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = (
    Object.keys(seoPages) as Array<keyof typeof seoPages>
  ).map((key) => ({
    url: absoluteUrl(seoPages[key].path),
    lastModified,
    changeFrequency: key === "privacy" ? "yearly" : "monthly",
    priority: priorities[key],
  }));

  const posts: MetadataRoute.Sitemap = (await getAllPosts()).map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
