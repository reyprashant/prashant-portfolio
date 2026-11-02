/**
 * Site-wide facts: identity, places, social profiles, contact details.
 * Source: PORTFOLIO_BRIEF.md sections 3, 5.1 (footer), 6 and 9.2.
 * Sensitive contact details come from environment variables (plan 12.1).
 */
import { publicEnv } from "@/lib/env";

export const site = {
  name: "Prashant Adhikari",
  monogram: "PA",
  location: "Pokhara, Nepal",
  locality: "Pokhara",
  country: "Nepal",
  /** Third-person one-liner used in schema and OG fallbacks. */
  jobTitle: "Founder and CEO, Zenox Academy",
  roles: [
    "Founder and CEO, Zenox Academy",
    "Technical Project Manager, Diorite Innovation",
    "Founder and Community Lead, AI Community in Nepal",
  ],
  languages: ["Nepali", "English", "Hindi"],
  alumniOf: "Pokhara University",
  copyright: "2026 Prashant Adhikari",

  /** Confirmed profiles only (CV). Others are added here when Prashant supplies them. */
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/reyprashant",
      external: true,
    },
    { label: "GitHub", href: "https://github.com/reyprashant", external: true },
  ],

  /** Organisations where he works. */
  places: [
    { label: "Zenox Academy", href: "https://zenoxacademy.com", external: true },
    {
      label: "Diorite Innovation",
      href: "https://dioriteinnovation.com",
      external: true,
    },
    {
      label: "AI Community in Nepal",
      href: "https://aicommunitynepal.org",
      external: true,
    },
  ],

  /** Rendered only when set. See .env.example. */
  contact: {
    email: publicEnv.contactEmail || null,
    phone: publicEnv.contactPhone || null,
    linkedin: "https://www.linkedin.com/in/reyprashant",
    linkedinLabel: "linkedin.com/in/reyprashant",
  },
} as const;

export const zenox = {
  name: "Zenox Academy",
  url: "https://zenoxacademy.com",
  description:
    "A cohort-based technology school in Pokhara, Nepal, where small mentor-led groups learn by building real projects, online and in person.",
  /** Corrected by Prashant on 2 November 2026; the CV said August 2025. */
  founded: "2026-08",
} as const;

export const aicn = {
  name: "AI Community in Nepal",
  url: "https://aicommunitynepal.org",
  description:
    "An AI community for research, collaboration and product building, with free, community-run membership.",
  founded: "2025-11",
} as const;
