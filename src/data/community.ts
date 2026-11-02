/**
 * Community page copy. Source: PORTFOLIO_BRIEF.md 5.4, 6.3, 6.4. AICN role
 * corrected to Founder and Community Lead on 2 November 2026. The ids are
 * the targets of the header dropdown links (src/data/nav.ts).
 * Event date and location fields are omitted until Prashant supplies them.
 */
import { images } from "@/data/images";
import type { Cta, EventItem, Role } from "@/types/content";

export const communityHero = {
  eyebrow: "Community",
  headingLines: ["COMMUNITY", "FIRST."] as const,
  accentLine: 1,
  intro:
    "I've spent years organising with students and volunteers in Pokhara. These are the groups I've led and the events I've helped run.",
  image: images.communityHero,
};

export const currentRoles = {
  eyebrow: "Current",
  headingLines: ["WHERE I", "SHOW UP NOW."] as const,
  items: [
    {
      id: "aicn",
      organisation: "AI Community in Nepal (AICN)",
      role: "Founder and Community Lead",
      dates: "November 2025 to present",
      about:
        "AICN describes itself as an AI community for research, collaboration and product building, with free, community-run membership.",
      points: [
        "Founded the community in November 2025.",
        "Lead community initiatives for an AI-focused organisation working across product, research and community development.",
      ],
      link: {
        label: "aicommunitynepal.org",
        href: "https://aicommunitynepal.org",
        external: true,
      },
    },
    {
      id: "nic",
      organisation: "National Innovation Center, Student Ambassadors Program",
      role: "Program Advisor",
      dates: "August 2025 to present",
      points: ["Guide and mentor student ambassadors in planning and running events."],
      link: { label: "nicnepal.org", href: "https://nicnepal.org/", external: true },
    },
  ] satisfies Role[],
};

export const pastRoles = {
  eyebrow: "Past",
  headingLines: ["GROUPS", "I'VE LED."] as const,
  items: [
    {
      id: "code-for-change",
      organisation: "Code For Change Pokhara",
      role: "Project Lead",
      dates: "January 2025 to December 2025",
      points: [
        "Led a community of 150+ members and college representatives.",
        'Drove the chapter\'s "Ignite Bold Innovation" theme through campaigns, events and workshops.',
        "Mentored student leaders across colleges.",
        "Initiated the AI/ML Micro Degree Program, Nepal's first university-certified AI/ML Micro Degree, with AI Community in Nepal, NIC ICT Lab Pokhara and Gandaki University.",
      ],
      link: {
        label: "codeforchangenepal.com",
        href: "https://codeforchangenepal.com/",
        external: true,
      },
    },
    {
      organisation: "LA GRANDEE TechTalk",
      role: "Project Lead",
      dates: "April 2024 to December 2025",
      points: [
        "Ran an IT community organising tech events and discussions connecting students with industry professionals.",
      ],
      link: { label: "lagrandee.edu.np", href: "https://lagrandee.edu.np", external: true },
    },
    {
      organisation: "Leo Club of Pokhara Abhiyan",
      role: "President",
      dates: "July 2024 to June 2025",
      points: [
        "Directed Mission Abhiyan across multiple schools, reaching 500+ students with workshops on cybersecurity, oral hygiene and career awareness.",
      ],
      link: {
        label: "Leo Club of Pokhara Abhiyan on Facebook",
        href: "https://www.facebook.com/share/p/1LKLgLMK5Y/",
        external: true,
      },
    },
    {
      id: "leo-district",
      organisation: "Leo District Council 325I Nepal",
      role: "Public Relations Officer",
      dates: "",
      points: ["Public relations for the Leo district council covering Nepal."],
      link: { label: "ldc325inepal.org", href: "https://ldc325inepal.org/", external: true },
    },
  ] satisfies Role[],
};

const eventItems: EventItem[] = [
  {
    name: "Pokhara Grandest Hackathon",
    role: "Regional Lead Organizer",
    description:
      "3-day regional hackathon and project showcase with 1,500+ audience and participants. Led planning, operations, volunteers, scheduling, partnerships, challenges, judging and showcase sessions.",
    image: images.eventCodefest2024,
  },
  {
    name: "CodeFest 2025",
    role: "Organizer",
    description:
      "National-level hackathon. Coordinated participants, mentors and partners; oversaw logistics, registration, team coordination and event flow.",
  },
  {
    name: "Community events and workshops",
    role: "Event Manager",
    description:
      "Planned 150+ programmes including panel discussions, workshops and social initiatives such as tree plantation campaigns and leadership workshops. Trained and mentored 8,000+ participants.",
  },
];

export const events = {
  eyebrow: "Events I organised",
  headingLines: ["RUNNING", "THE ROOM."] as const,
  items: eventItems,
};

export const communityCta = {
  heading: "RUNNING AN EVENT OR COMMUNITY?",
  line: "Let's talk about how to make it happen.",
  cta: { label: "Get in touch", href: "/contact" } satisfies Cta,
};
