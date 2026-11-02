/**
 * About page copy. Source: PORTFOLIO_BRIEF.md 2.1, 2.2, 3.4 to 3.6, 5.2.
 * First person. Facts are CV-confirmed, with Prashant's corrections of
 * 2 November 2026: Zenox Academy was founded in August 2026, he founded
 * AI Community in Nepal, and his Rapid Khabar role was Manager.
 */
import { images } from "@/data/images";
import type { Cta, Pillar, StoryChapter, TimelineEntry } from "@/types/content";

export const aboutHero = {
  eyebrow: "About",
  headingLines: ["HI, I'M", "PRASHANT."] as const,
  accentLine: 1,
  line: "Project manager, founder and community organiser from Pokhara.",
};

export const chapters: StoryChapter[] = [
  {
    eyebrow: "2019 to 2021",
    title: "Learning to run things early",
    paragraphs: [
      "My first job was managing the operations of Rapid Khabar, a YouTube-based news channel. Daily output, deadlines and a team that depended on a plan. That job taught me something I still use every day: work only counts if it is clear and it arrives on time.",
    ],
    image: images.aboutChapterEarly,
  },
  {
    eyebrow: "2021 to 2025",
    title: "Learning to organise",
    paragraphs: [
      "In 2021 I started my Bachelor of Computer Application at Pokhara University. Somewhere between classes, I kept ending up in the room where events were being planned. I led LA GRANDEE TechTalk, a student IT community that brought students and industry people together. I became President of the Leo Club of Pokhara Abhiyan, where our team took workshops on cybersecurity, oral hygiene and career awareness into schools. Then I led the Pokhara chapter of Code For Change, working with more than 150 members and college representatives.",
      "Alongside that, I learned to run real projects. I led a team of five developers on a TMIS project in VB.NET. I managed an internal automation project at Brandbuilders. I taught Python to beginner and intermediate learners at XAV Technology and guided more than 20 of them through building real applications.",
    ],
    image: images.aboutChapterOrganising,
  },
  {
    id: "zenox",
    eyebrow: "2025 onward",
    title: "Founding things",
    paragraphs: [
      "In November 2025, as I finished my degree, I founded AI Community in Nepal, a community for AI research, collaboration and product building, and I still lead it. A month later I joined Diorite Innovation as Technical Project Manager, running in-house and client projects with a team of 10 to 15 people.",
      "In August 2026 I founded Zenox Academy, a cohort-based technology school in Pokhara where learners build projects instead of collecting certificates. I design the courses and cohorts and run the day-to-day.",
      "What ties all of this together is simple. I like getting the right people in a room, agreeing on a plan, and making sure it happens.",
    ],
    image: images.aboutChapterFounding,
  },
];

export const timeline = {
  eyebrow: "Timeline",
  headingLines: ["YEAR", "BY YEAR."] as const,
  entries: [
    { year: "2019", beats: ["Joins Rapid Khabar as Manager"] },
    { year: "2021", beats: ["Starts BCA at Pokhara University"] },
    {
      year: "2024",
      beats: [
        "Leads LA GRANDEE TechTalk",
        "Becomes President of the Leo Club of Pokhara Abhiyan",
        "Project Lead at Gautam Software Developers",
        "Joins Brandbuilders as Technical Project Manager",
      ],
    },
    {
      year: "2025",
      beats: [
        "Leads Code For Change Pokhara",
        "Python Trainer at XAV Technology",
        "Program Advisor, NIC Student Ambassadors Program (August)",
        "Founds AI Community in Nepal, Community Lead (November)",
        "Graduates BCA, Dean's List (November)",
        "Joins Diorite Innovation as Technical Project Manager (December)",
      ],
    },
    {
      year: "2026",
      beats: [
        "Founds Zenox Academy (August)",
        "Opens the first Zenox cohorts: DevOps and CloudOps, AI/ML Micro Degree",
        "Technical Project Manager at Diorite Innovation",
        "Founder and Community Lead, AI Community in Nepal",
      ],
    },
  ] satisfies TimelineEntry[],
};

/** Tagged SUGGESTED in the brief. Prashant to confirm these reflect how he works. */
export const howIWork = {
  eyebrow: "How I work",
  headingLines: ["THREE", "SIMPLE RULES."] as const,
  pillars: [
    {
      title: "Plan out loud.",
      body: "Everyone should know what we're building, who owns what, and when it's due.",
    },
    {
      title: "Keep it small.",
      body: "Small teams and small cohorts move faster and learn more.",
    },
    { title: "Show the work.", body: "Projects, not promises." },
  ] satisfies Pillar[],
};

export const education = {
  eyebrow: "Education",
  institution: "Pokhara University",
  degree: "Bachelor of Computer Application",
  dates: "March 2021 to November 2025",
  result: "GPA 3.83 / 4.00, Dean's List",
};

export const skills = {
  eyebrow: "Skills and tools",
  groups: [
    {
      title: "Project management",
      items: [
        "Agile",
        "Waterfall",
        "Jira",
        "Notion",
        "MS Excel (Gantt and timelines)",
        "Requirement analysis",
      ],
    },
    { title: "Collaboration", items: ["Figma", "Discord"] },
    {
      title: "Working with people",
      items: [
        "Leadership",
        "Communication",
        "Team collaboration",
        "Stakeholder management",
        "Documentation",
        "Workflow management",
        "Event management",
        "Outreach and public relations",
      ],
    },
    { title: "Languages", items: ["Nepali", "English", "Hindi"] },
  ],
};

/** Third-person bios for press and event use (brief 3.4 to 3.6). */
export const bios = {
  eyebrow: "Short bios",
  intro: "For event listings and press. Copy the length you need.",
  items: [
    {
      label: "Short, about 50 words",
      text: "Prashant Adhikari is a Technical Project Manager and community organiser based in Pokhara, Nepal. He is the founder and CEO of Zenox Academy, a Technical Project Manager at Diorite Innovation, and founder and Community Lead of AI Community in Nepal. He holds a Bachelor of Computer Application from Pokhara University.",
    },
    {
      label: "Medium, about 120 words",
      text: "Prashant Adhikari is a Technical Project Manager and community organiser from Pokhara, Nepal. He founded Zenox Academy in August 2026, a cohort-based technology school offering hands-on, project-based programmes online and in person. He also works as a Technical Project Manager at Diorite Innovation, where he leads a team of 10 to 15 people across in-house and client projects, and is the founder and Community Lead of AI Community in Nepal.\n\nBefore this, he led the Pokhara chapter of Code For Change, the student community LA GRANDEE TechTalk, and the Leo Club of Pokhara Abhiyan. He has organised regional and national hackathons and taught Python to beginner and intermediate learners. He graduated in Computer Application from Pokhara University on the Dean's List.",
    },
    {
      label: "Long, about 250 words",
      text: "Prashant Adhikari is a Technical Project Manager, educator and community organiser based in Pokhara, Nepal.\n\nHe began his career in 2019 as Manager at Rapid Khabar, a YouTube-based news platform, where he ran channel operations. He went on to study for a Bachelor of Computer Application at Pokhara University, graduating in 2025 with a GPA of 3.83 out of 4.00 and a place on the Dean's List.\n\nDuring his studies he moved into project and team leadership. He led a five-person development team on a TMIS project at Gautam Software Developers, managed an internal workflow automation project as Technical Project Manager at Brandbuilders, and trained Python learners as a trainer and mentor at XAV Technology.\n\nIn November 2025 he founded AI Community in Nepal, where he serves as Community Lead, and in December 2025 he joined Diorite Innovation as Technical Project Manager, managing in-house and client-facing projects with Agile methods. In August 2026 he founded Zenox Academy, a cohort-based technology school in Pokhara where learners build real projects with mentors. He leads its course design, cohort structure, planning and operations.\n\nPrashant has spent years building Pokhara's student tech community. He led Code For Change Pokhara, LA GRANDEE TechTalk and the Leo Club of Pokhara Abhiyan, organised the Pokhara Grandest Hackathon and CodeFest 2025, and advises the National Innovation Center's Student Ambassadors Program.\n\nHe works in Nepali, English and Hindi.",
    },
  ],
};

export const aboutCta = {
  heading: "WANT TO WORK TOGETHER?",
  line: "Events, programmes, projects or mentoring. Tell me what you're planning.",
  cta: { label: "Get in touch", href: "/contact" } satisfies Cta,
};
