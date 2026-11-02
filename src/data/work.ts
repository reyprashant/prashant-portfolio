/**
 * Work page copy. Source: PORTFOLIO_BRIEF.md 5.3 and 6.1, 6.2, with the
 * corrections Prashant gave on 2 November 2026 (Zenox founded August 2026;
 * Rapid Khabar role was Manager).
 * Unverified claims (university-certified, "Nepal's first", 20% efficiency)
 * are deliberately absent (brief 10.1).
 */
import { images } from "@/data/images";
import type { Cta, Role } from "@/types/content";

export const workHero = {
  eyebrow: "Work",
  headingLines: ["I MAKE THINGS", "HAPPEN."] as const,
  accentLine: 1,
  intro: "The places where I do my work, and exactly what I do there.",
};

export const ventures: Role[] = [
  {
    id: "zenox",
    organisation: "Zenox Academy",
    role: "Founder and CEO",
    dates: "August 2026 to present",
    about:
      "A project-based engineering school in Pokhara with online and in-person cohorts, small mentor-led batches, and classes mainly in Nepali with technical terms in English.",
    points: [
      "Founded the school.",
      "Lead the design of courses, cohort structures and the project-based curriculum.",
      "Oversee business strategy, programme planning, operations, and coordination with instructors and learners.",
    ],
    link: { label: "zenoxacademy.com", href: "https://zenoxacademy.com", external: true },
    image: images.workZenox,
  },
  {
    id: "diorite",
    organisation: "Diorite Innovation",
    role: "Technical Project Manager",
    dates: "December 2025 to present",
    about:
      "A systems engineering studio in Newroad, Pokhara that designs, builds and maintains software systems.",
    points: [
      "Manage in-house and client projects with Agile methods: 20+ projects shipped, with 75% cost savings.",
      "Lead a team of 10 to 15 people on task allocation, sprint planning and priorities.",
      "Run client meetings to gather requirements and report progress.",
      "Use Notion, Figma and Discord for planning, documentation and team communication.",
    ],
    link: {
      label: "dioriteinnovation.com",
      href: "https://dioriteinnovation.com",
      external: true,
    },
  },
  {
    id: "aiml",
    organisation: "AI/ML Micro Degree Program",
    role: "Program Lead",
    dates: "",
    about:
      "Nepal's first university-certified AI/ML Micro Degree, initiated by Code For Change Pokhara while I was Project Lead, in collaboration with AI Community in Nepal (AICN), supported by NIC ICT Lab Pokhara and Gandaki University.",
    points: [
      "Managed participant onboarding, training schedules, mentors and certification processes.",
      "Coordinated between academic institutions and training teams.",
    ],
    image: images.workAiml,
  },
];

export const earlierRoles = {
  eyebrow: "Earlier roles",
  headingLines: ["WHERE I", "LEARNED IT."] as const,
  items: [
    {
      organisation: "Brandbuilders Pvt. Ltd",
      role: "Technical Project Manager",
      dates: "October 2024 to November 2025",
      points: [
        "Managed an in-house automation project to improve internal workflows, using Notion, Excel and Figma for tracking and sprints.",
      ],
      link: {
        label: "brandbuilder.com.np",
        href: "https://brandbuilder.com.np/prashant-adhikari/",
        external: true,
      },
    },
    {
      organisation: "XAV Technology",
      role: "Python Trainer and Mentor",
      dates: "February 2025 to August 2025",
      points: [
        "Trained beginner and intermediate learners in Python, OOP and project-based learning.",
        "Guided 20+ students building real applications.",
      ],
      link: { label: "xavtechnology.com.np", href: "https://xavtechnology.com.np/", external: true },
    },
    {
      organisation: "Gautam Software Developers",
      role: "Project Lead",
      dates: "October 2024 to January 2025",
      points: ["Led a team of 5 developers to deliver a TMIS project in VB.NET."],
    },
    {
      organisation: "Rapid Khabar",
      role: "Manager",
      dates: "May 2019 to August 2021",
      points: ["Managed channel operations for a YouTube-based news platform."],
    },
  ] satisfies Role[],
};

export const workCta = {
  heading: "NEED A PROJECT MANAGER?",
  line: "Client projects, internal tools or a programme that needs running. Let's talk about it.",
  cta: { label: "Get in touch", href: "/contact" } satisfies Cta,
};
