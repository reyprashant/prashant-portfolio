/**
 * Next.js configuration.
 *
 * Covers image optimisation (AVIF/WebP, remote placeholder host), permanent
 * redirects for merged or hidden routes, MDX for blog posts and a small set
 * of security headers. See IMPLEMENTATION_PLAN.md sections 6.5 and 9.6.
 */
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Blog posts are MDX files under src/content/blog, imported by the /blog routes.
  pageExtensions: ["ts", "tsx", "mdx"],

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    // AVIF first, WebP fallback. Browsers without either get the original.
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    // Every image is a local file under /public, so no remote host is allowed.
  },

  async redirects() {
    return [
      // Events live inside the Community page at launch (brief 4.1).
      { source: "/events", destination: "/community#events", permanent: true },
      // The writing section is called Blog; "notes" was its working name.
      { source: "/notes", destination: "/blog", permanent: true },
      { source: "/notes/:slug", destination: "/blog/:slug", permanent: true },
      // Common legacy paths.
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// No remark or rehype plugins are configured. Turbopack accepts plugins by
// package name (string) only; add them here if posts need tables or footnotes.
const withMDX = createMDX({});

export default withMDX(nextConfig);
