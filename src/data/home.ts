/**
 * Homepage copy. Source: PORTFOLIO_BRIEF.md 5.1.
 * Facts are CV-confirmed; wording is tagged SUGGESTED in the brief and may be edited.
 * The "What I do" section uses three cards (plan section 2, constraint 2).
 * Dates corrected 2 November 2026: Zenox Academy was founded in August 2026.
 */
import { images } from "@/data/images";
import type { Cta, FeatureCardContent, Pillar, Programme, Stat } from "@/types/content";

export const hero = {
  eyebrow: "Founder, Project Manager, Community Organiser",
  headingLines: ["BUILDING POKHARA'S", "NEXT BUILDERS."] as const,
  /** Index of the line rendered in the accent colour. */
  accentLine: 1,
  subline:
    "I'm Prashant Adhikari. I run tech programmes, events and teams in Pokhara, and I founded Zenox Academy to help learners build skills that get them hired.",
  primary: { label: "Work with me", href: "/contact" } satisfies Cta,
  secondary: { label: "Read my story", href: "/about" } satisfies Cta,
  imageDesktop: images.heroPortraitDesktop,
  imageMobile: images.heroPortraitMobile,
};

/**
 * Proof strip. All four figures are stated in the CV. Evidence for the first
 * three is still to be filed (brief 10.1). To switch, swap `stats` for
 * `statsAlternative` below.
 */
export const stats: Stat[] = [
  { value: "150+", label: "events organised and planned" },
  { value: "8,000+", label: "students mentored, directly or through dedicated programmes" },
  { value: "20+", label: "projects shipped as Technical Project Manager" },
  { value: "50+", label: "job and internship placements created in Pokhara" },
];

export const statsAlternative: Stat[] = [
  { value: "2026", label: "Founded Zenox Academy" },
  { value: "3.83", label: "GPA, Dean's List, Pokhara University" },
  { value: "10 to 15", label: "people in the team I lead today" },
  { value: "5", label: "developers led on my first project team" },
];

export const whatIDo = {
  eyebrow: "What I do",
  headingLines: ["THREE KINDS", "OF WORK."] as const,
  intro:
    "Most weeks I'm doing some mix of these. Hover over a card, or tap it, for the short version of each.",
  cards: [
    {
      category: "Founder and CEO · Since August 2026",
      title: "Teaching tech by building it.",
      body: "Zenox Academy, the cohort-based school I founded in Pokhara. Small mentor-led groups, real projects.",
      primary: { label: "My role", href: "/work#zenox" },
      secondary: {
        label: "Visit Zenox Academy",
        href: "https://zenoxacademy.com",
        external: true,
      },
      image: images.cardZenox,
    },
    {
      category: "Technical Project Manager · Since December 2025",
      title: "Shipping client projects.",
      body: "Technical Project Manager at Diorite Innovation. 20+ projects shipped with a team of 10 to 15 people.",
      primary: { label: "See the work", href: "/work#diorite" },
      image: images.cardDiorite,
    },
    {
      category: "Founder and Community Lead · AI Community in Nepal",
      title: "Growing the people around tech.",
      body: "Founder of AI Community in Nepal, adviser to NIC student ambassadors, and organiser of hackathons and 150+ events.",
      primary: { label: "My community work", href: "/community" },
      secondary: { label: "See events", href: "/community#events" },
      image: images.cardCommunity,
    },
  ] satisfies FeatureCardContent[],
};

/**
 * Programmes and the figures behind them. Replaces the newsroom story on the
 * home page (Prashant, 2 November 2026: lead with numbers and programmes).
 * Every figure is stated in the CV or on zenoxacademy.com.
 */
export const programmes = {
  eyebrow: "Track record",
  headingLines: ["THE NUMBERS AND", "THE PROGRAMMES."] as const,
  intro:
    "Most of what I do can be counted. These are the programmes I have run and the figures behind each one, starting with the one I am proudest of.",
  items: [
    {
      figure: "1st",
      figureLabel: "in Nepal",
      name: "AI/ML Micro Degree Program",
      role: "Program Lead",
      line: "Nepal's first university-certified AI/ML Micro Degree. Initiated by Code For Change Pokhara while I was Project Lead, in collaboration with AI Community in Nepal (AICN), supported by NIC ICT Lab Pokhara and Gandaki University.",
      href: "/work#aiml",
      featured: true,
    },
    {
      figure: "150+",
      figureLabel: "events",
      name: "Events and workshops",
      role: "Event Manager and Organiser",
      line: "150+ programmes organised and planned: panel discussions, workshops, hackathons and social initiatives. 8,000+ students mentored, directly or through programmes built for them.",
      href: "/community#events",
    },
    {
      figure: "20+",
      figureLabel: "projects",
      name: "Client and in-house projects",
      role: "Technical Project Manager, Diorite Innovation",
      line: "20+ projects shipped with a team of 10 to 15 people, with 75% cost savings through Agile planning and delivery.",
      href: "/work#diorite",
    },
    {
      figure: "50+",
      figureLabel: "placements",
      name: "Jobs and internships",
      role: "Community",
      line: "Job and internship placement opportunities created for 50+ people from the community in the Pokhara market.",
      href: "/community",
    },
    {
      figure: "1,500+",
      figureLabel: "people",
      name: "Pokhara Grandest Hackathon",
      role: "Regional Lead Organizer",
      line: "A 3-day regional hackathon and project showcase: planning, operations, volunteers, partnerships, judging and the showcase itself.",
      href: "/community#events",
    },
    {
      figure: "500+",
      figureLabel: "students",
      name: "Mission Abhiyan",
      role: "President, Leo Club of Pokhara Abhiyan",
      line: "Workshops on cybersecurity, oral hygiene and career awareness, taken into schools across Pokhara.",
      href: "/community#past",
    },
    {
      figure: "150+",
      figureLabel: "members",
      name: "Code For Change Pokhara",
      role: "Project Lead",
      line: "A chapter of members and college representatives running campaigns, events and workshops under the theme Ignite Bold Innovation.",
      href: "/community#code-for-change",
    },
    {
      figure: "2",
      figureLabel: "cohorts",
      name: "Zenox Academy cohorts",
      role: "Founder and CEO",
      line: "DevOps and CloudOps, and the AI/ML Micro Degree, opening in December 2026 and January 2027.",
      href: "/work#zenox",
    },
  ] satisfies Programme[],
  cta: { label: "Read my story", href: "/about" } satisfies Cta,
};

export const communityBand = {
  eyebrow: "Community",
  headingLines: ["GOOD THINGS HAPPEN", "WHEN PEOPLE SHOW UP."] as const,
  accentLine: 1,
  intro:
    "A lot of what I've learned came from organising with students and volunteers in Pokhara. These are the groups and events I've led.",
  pillars: [
    {
      title: "Hackathons.",
      body: "Regional Lead Organizer of the Pokhara Grandest Hackathon, a 3-day hackathon and project showcase. Organizer of CodeFest 2025, a national-level hackathon.",
    },
    {
      title: "Communities.",
      body: "Founder and Community Lead at AI Community in Nepal. Project Lead of Code For Change Pokhara (2025) and LA GRANDEE TechTalk (2024 to 2025).",
    },
    {
      title: "Schools and service.",
      body: "As President of the Leo Club of Pokhara Abhiyan, I directed Mission Abhiyan, workshops for students across multiple schools.",
    },
  ] satisfies Pillar[],
  cta: { label: "See all community work", href: "/community" } satisfies Cta,
  image: images.communityBand,
};

export const zenoxFeature = {
  eyebrow: "What I'm building",
  headingLines: ["ZENOX", "ACADEMY."] as const,
  body: "Zenox Academy is the cohort-based technology school I founded in Pokhara. Small, mentor-led groups learn by building real projects, online and in person.",
  /** Confirmed on zenoxacademy.com, 31 Oct 2026. Update when dates change. */
  programmesLine:
    "Current cohorts include DevOps and CloudOps (starts 22 December 2026) and the AI/ML Micro Degree (starts 12 January 2027).",
  primary: {
    label: "Explore Zenox Academy",
    href: "https://zenoxacademy.com",
    external: true,
  } satisfies Cta,
  secondary: { label: "Why I started it", href: "/about#zenox" } satisfies Cta,
  image: images.zenoxFeature,
};

/** Shared by the footer on every page. */
export const footerCta = {
  heading: "LET'S BUILD SOMETHING.",
  line: "Organising an event, starting a programme, or need a project manager? Send me a message.",
  cta: { label: "Get in touch", href: "/contact" } satisfies Cta,
};
