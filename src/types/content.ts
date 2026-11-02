/**
 * Shared content types.
 *
 * Every data file in src/data exports objects shaped by these types, and
 * every component accepts them as props. Components never hold prose.
 */

/** A photograph or illustration. See IMPLEMENTATION_PLAN.md section 6.2. */
export type ImageAsset = {
  /** Local path under /public (preferred) or an absolute https URL. */
  src: string;
  /** Meaningful description. Empty string only for purely decorative images. */
  alt: string;
  /** Intrinsic size so next/image can reserve space and avoid layout shift. */
  width: number;
  height: number;
  /** Set only on a temporary stand-in; renders a visible "Placeholder image" label. */
  placeholder?: boolean;
  /** CSS object-position for art direction, for example "70% 30%". */
  position?: string;
};

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

export type Stat = {
  value: string;
  label: string;
};

/** Numbered pillar row: 01 / title / body. */
export type Pillar = {
  title: string;
  body: string;
};

export type Role = {
  /** Used as a URL fragment where the block is deep-linked, for example "zenox". */
  id?: string;
  organisation: string;
  role: string;
  dates: string;
  /** One-line description of the organisation, shown before the bullets. */
  about?: string;
  /** What Prashant did or does there. */
  points: string[];
  link?: Cta;
  image?: ImageAsset;
};

export type EventItem = {
  name: string;
  role: string;
  description: string;
  /** Optional, rendered only when present. */
  date?: string;
  location?: string;
  image?: ImageAsset;
};

export type TimelineEntry = {
  year: string;
  beats: string[];
};

export type StoryChapter = {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: ImageAsset;
};

export type FeatureCardContent = {
  category: string;
  title: string;
  body: string;
  primary: Cta;
  secondary?: Cta;
  image: ImageAsset;
};

export type Breadcrumb = {
  label: string;
  href: string;
};

export type PageSeo = {
  /** Full title tag text. */
  title: string;
  /** 140 to 160 characters, includes the name and Pokhara. */
  description: string;
  /** Path starting with "/" used for the canonical URL. */
  path: string;
  /** Short label used in the OG image and breadcrumbs. */
  label: string;
};

/** Header navigation item. Children render as a dropdown on desktop and an indented list on mobile. */
export type NavItem = NavLink & {
  children?: NavLink[];
};

/** A programme or event with the figure that sums it up. */
export type Programme = {
  /** Short figure in display type, for example "1,500+" or "2025". */
  figure: string;
  /** One or two words under the figure, for example "people". */
  figureLabel: string;
  name: string;
  role: string;
  line: string;
  href: string;
  /** Rendered as the lead row with a white panel. One per list. */
  featured?: boolean;
};

/** An organisation Prashant founded, works for, led or studied at. */
export type Organisation = {
  name: string;
  role: string;
  dates: string;
  kind: "Founded" | "Work" | "Community" | "Education";
  href?: string;
  /** Monochrome SVG logo. Rendered instead of the wordmark when supplied. */
  logo?: ImageAsset;
};

/** A quote from someone Prashant has worked with. */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  organisation?: string;
  /** Square photo of the person, optional. */
  photo?: ImageAsset;
};

/** Front matter exported from each MDX file in src/content/blog. */
export type PostMeta = {
  title: string;
  /** 140 to 160 characters. Used for the meta description and the list card. */
  description: string;
  /** ISO date, for example "2026-11-02". */
  date: string;
  /** ISO date of the last substantive edit. Defaults to `date`. */
  updated?: string;
  tags?: string[];
  /** One category, for example "Technology" or "Personal Stories". */
  category?: string;
  /** Cover photograph, 16:9. Shown under the title and as the list thumbnail. */
  cover?: ImageAsset;
  /** Set when the piece first appeared elsewhere. Rendered as a credit line. */
  originallyPublished?: {
    publication: string;
    organisation?: string;
    url?: string;
    /** For example what was edited for this version. */
    note?: string;
  };
  /** Drafts are hidden in production unless SHOW_DRAFT_POSTS=true. */
  draft?: boolean;
};

export type Post = PostMeta & {
  slug: string;
  /** Whole minutes at about 220 words per minute. */
  readingMinutes: number;
};
