/**
 * Every organisation Prashant has founded, worked for, led or studied at,
 * with his role at each. Source: CV via PORTFOLIO_BRIEF.md 6.1 to 6.4, with
 * the corrections of 2 November 2026. Logos are rendered when supplied
 * (brief section 8 lists them as needed); until then the name is set as a
 * wordmark in the display face.
 */
import type { Organisation } from "@/types/content";

export const organisations = {
  eyebrow: "Organisations",
  headingLines: ["WHERE I'VE WORKED", "AND LED."] as const,
  intro:
    "The companies, communities and institutions behind the work on this site, and what I do or did at each.",
  items: [
    {
      name: "Zenox Academy",
      role: "Founder and CEO",
      dates: "2026 to present",
      kind: "Founded",
      href: "https://zenoxacademy.com",
    },
    {
      name: "AI Community in Nepal",
      role: "Founder and Community Lead",
      dates: "2025 to present",
      kind: "Founded",
      href: "https://aicommunitynepal.org",
    },
    {
      name: "Diorite Innovation",
      role: "Technical Project Manager",
      dates: "2025 to present",
      kind: "Work",
      href: "https://dioriteinnovation.com",
    },
    {
      name: "National Innovation Center",
      role: "Program Advisor, Student Ambassadors Program",
      dates: "2025 to present",
      kind: "Community",
      href: "https://nicnepal.org/",
    },
    {
      name: "Code For Change Pokhara",
      role: "Project Lead",
      dates: "2025",
      kind: "Community",
      href: "https://codeforchangenepal.com/",
    },
    {
      name: "LA GRANDEE TechTalk",
      role: "Project Lead",
      dates: "2024 to 2025",
      kind: "Community",
      href: "https://lagrandee.edu.np",
    },
    {
      name: "Leo Club of Pokhara Abhiyan",
      role: "President",
      dates: "2024 to 2025",
      kind: "Community",
      href: "https://www.facebook.com/share/p/1LKLgLMK5Y/",
    },
    {
      name: "Leo District Council 325I Nepal",
      role: "Public Relations Officer",
      dates: "",
      kind: "Community",
      href: "https://ldc325inepal.org/",
    },
    {
      name: "Brandbuilders Pvt. Ltd",
      role: "Technical Project Manager",
      dates: "2024 to 2025",
      kind: "Work",
      href: "https://brandbuilder.com.np/prashant-adhikari/",
    },
    {
      name: "XAV Technology",
      role: "Python Trainer and Mentor",
      dates: "2025",
      kind: "Work",
      href: "https://xavtechnology.com.np/",
    },
    {
      name: "Gautam Software Developers",
      role: "Project Lead",
      dates: "2024 to 2025",
      kind: "Work",
    },
    {
      name: "Rapid Khabar",
      role: "Manager",
      dates: "2019 to 2021",
      kind: "Work",
    },
    {
      name: "Pokhara University",
      role: "Bachelor of Computer Application, Dean's List",
      dates: "2021 to 2025",
      kind: "Education",
      href: "https://pu.edu.np/",
    },
  ] satisfies Organisation[],
};
