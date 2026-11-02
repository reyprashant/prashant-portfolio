/**
 * Header and footer navigation. Source: PORTFOLIO_BRIEF.md 4.2 and 5.1 footer.
 * Work and Community carry dropdown children that deep-link to the matching
 * role blocks (the ids live on the Role entries in work.ts and community.ts).
 */
import type { Cta, NavItem, NavLink } from "@/types/content";

export const headerLinks: NavItem[] = [
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Zenox Academy", href: "/work#zenox" },
      { label: "Diorite Innovation", href: "/work#diorite" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Code For Change", href: "/community#code-for-change" },
      { label: "AI Community in Nepal", href: "/community#aicn" },
      { label: "NIC Student Ambassadors Program", href: "/community#nic" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const headerCta: Cta = { label: "Get in touch", href: "/contact" };

export const footerPages: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerLegal: NavLink[] = [{ label: "Privacy", href: "/privacy" }];
