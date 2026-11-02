/**
 * Testimonials. Source: PORTFOLIO_BRIEF.md 5.1 "In their words".
 *
 * Names and roles were supplied by Prashant (3 November 2026). The quote
 * text is a draft written for the launch build; confirm the wording with
 * each person before the site goes public and edit here if they ask.
 * `organisation` is optional; `photo` takes a square image from images.ts.
 */
import type { Testimonial } from "@/types/content";

export const testimonials = {
  eyebrow: "In their words",
  headingLines: ["WHAT PEOPLE", "SAY."] as const,
  intro: "From the partners, clients and teammates I have worked with in Pokhara.",
  items: [
    {
      quote:
        "Prashant is the person we call when a programme needs to actually happen. He brought the AI/ML Micro Degree to our lab with a clear plan, kept every partner informed, and the students got a course that was run properly from the first session to the last.",
      name: "Indra Bahadur Oli",
      role: "Technical Manager",
      organisation: "NIC ICT Lab Pokhara",
    },
    {
      quote:
        "I came in with a rough idea and a tight budget. Prashant turned it into a scoped plan, told me honestly what would and would not fit, and delivered on the dates he gave me. I always knew where the project stood.",
      name: "Ramesh Magar",
      role: "Client",
    },
    {
      quote:
        "Working under Prashant taught me how to run my own work. He sets clear priorities, trusts you with real responsibility, and makes time to review the details with you. I grew more in that year than in any role before it.",
      name: "Akriti Dhakal",
      role: "Marketing Lead",
    },
  ] satisfies Testimonial[],
};
