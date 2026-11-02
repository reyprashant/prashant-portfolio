/**
 * JSON-LD builders. Facts come from src/data/site.ts only.
 * Person and Organization share stable @id values so Google links them.
 */
import { aicn, site, zenox } from "@/data/site";
import type { Post } from "@/types/content";
import { absoluteUrl } from "@/lib/metadata";
import type { Breadcrumb } from "@/types/content";

const personId = () => absoluteUrl("/#person");
const zenoxId = () => absoluteUrl("/#zenox-academy");
const aicnId = () => absoluteUrl("/#ai-community-in-nepal");
const websiteId = () => absoluteUrl("/#website");

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(),
    name: site.name,
    url: absoluteUrl("/"),
    jobTitle: site.jobTitle,
    worksFor: [
      { "@type": "Organization", "@id": zenoxId(), name: zenox.name, url: zenox.url },
      {
        "@type": "Organization",
        name: "Diorite Innovation",
        url: "https://dioriteinnovation.com",
      },
      { "@type": "Organization", "@id": aicnId(), name: aicn.name, url: aicn.url },
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: site.alumniOf },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressCountry: "NP",
    },
    knowsLanguage: site.languages,
    sameAs: site.social.map((s) => s.href),
    ...(site.contact.email ? { email: site.contact.email } : {}),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": zenoxId(),
    name: zenox.name,
    url: zenox.url,
    description: zenox.description,
    foundingDate: zenox.founded,
    founder: { "@id": personId() },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressCountry: "NP",
    },
  };
}

/** AI Community in Nepal, founded by Prashant in November 2025. */
export function aicnSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": aicnId(),
    name: aicn.name,
    url: aicn.url,
    description: aicn.description,
    foundingDate: aicn.founded,
    founder: { "@id": personId() },
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    name: site.name,
    url: absoluteUrl("/"),
    author: { "@id": personId() },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

/** Article schema for a blog post. The OG image route doubles as the image. */
export function articleSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@id": personId() },
    publisher: { "@id": personId() },
    mainEntityOfPage: url,
    image: post.cover
      ? post.cover.src.startsWith("/")
        ? absoluteUrl(post.cover.src)
        : post.cover.src
      : `${url}/opengraph-image`,
    inLanguage: "en",
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.tags && post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
  };
}
