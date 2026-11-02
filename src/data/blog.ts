/**
 * Blog page copy. Intro from PORTFOLIO_BRIEF.md 5.1 "Notes". Posts themselves
 * live in src/content/blog as MDX files (see src/lib/blog.ts).
 */
import type { Cta } from "@/types/content";

export const blogHero = {
  eyebrow: "Blog",
  headingLines: ["NOTES ON", "RUNNING THINGS."] as const,
  accentLine: 1,
  intro: "Short notes on running programmes, events and teams in Pokhara.",
};

export const blogEmpty = {
  heading: "Nothing published yet.",
  body: "The first posts are being written. In the meantime, the work and community pages cover what I am up to.",
  cta: { label: "See the work", href: "/work" } satisfies Cta,
};

export const latestPosts = {
  eyebrow: "Blog",
  headingLines: ["LATEST", "NOTES."] as const,
  cta: { label: "All posts", href: "/blog" } satisfies Cta,
};

export const postFooter = {
  moreHeading: "More posts",
  aboutLink: { label: "More about me", href: "/about" } satisfies Cta,
  backLink: { label: "All posts", href: "/blog" } satisfies Cta,
};

export const blogCta = {
  heading: "HAVE A TOPIC IN MIND?",
  line: "If there is something about running programmes, events or teams you would like me to write about, send it over.",
  cta: { label: "Get in touch", href: "/contact" } satisfies Cta,
};
