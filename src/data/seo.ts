/**
 * Per-page SEO: titles from PORTFOLIO_BRIEF.md 9.2, descriptions written to
 * 140 to 160 characters, each naming Prashant and Pokhara.
 */
import type { PageSeo } from "@/types/content";

export const seoPages = {
  home: {
    title: "Prashant Adhikari | Project Manager and Founder of Zenox Academy, Pokhara",
    description:
      "Prashant Adhikari is a Technical Project Manager, founder of Zenox Academy and community organiser in Pokhara, Nepal. He runs tech programmes, events and teams.",
    path: "/",
    label: "Home",
  },
  about: {
    title: "About Prashant Adhikari",
    description:
      "The story of Prashant Adhikari, from managing a YouTube news channel in 2019 to founding Zenox Academy in Pokhara: timeline, education, skills and bios.",
    path: "/about",
    label: "About",
  },
  work: {
    title: "Work | Prashant Adhikari",
    description:
      "Where Prashant Adhikari does his work in Pokhara: founder of Zenox Academy, Technical Project Manager at Diorite Innovation, and his earlier project roles.",
    path: "/work",
    label: "Work",
  },
  community: {
    title: "Community and Events | Prashant Adhikari",
    description:
      "Communities and events Prashant Adhikari has founded and led in Pokhara: AI Community in Nepal, Code For Change, Leo Club, TechTalk and two hackathons.",
    path: "/community",
    label: "Community",
  },
  blog: {
    title: "Blog | Prashant Adhikari",
    description:
      "Notes from Prashant Adhikari in Pokhara on running programmes, events and teams: what worked, what did not, and what he would do differently next time.",
    path: "/blog",
    label: "Blog",
  },
  contact: {
    title: "Contact Prashant Adhikari",
    description:
      "Get in touch with Prashant Adhikari in Pokhara about organising an event, starting a programme, project management, or advice on getting into tech.",
    path: "/contact",
    label: "Contact",
  },
  privacy: {
    title: "Privacy Policy | Prashant Adhikari",
    description:
      "How Prashant Adhikari's personal website in Pokhara handles contact form messages and analytics data, what is collected, and how to ask about your data.",
    path: "/privacy",
    label: "Privacy",
  },
} as const satisfies Record<string, PageSeo>;

export type SeoPageKey = keyof typeof seoPages;
