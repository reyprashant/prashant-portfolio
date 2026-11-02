/**
 * Every image used on the site, in one place.
 *
 * All files live under /public/images, cropped to the aspect ratio of the
 * slot they fill (see the comment above each group) and saved as WebP by
 * sharp. The originals Prashant supplied are kept outside /public in
 * context/source-images so they are never served.
 *
 * To swap a photograph: drop the new WebP at the same path with the same
 * aspect ratio, update `width`, `height` and `alt`. No component changes
 * are needed. `npm run verify:images` confirms every path exists.
 */
import type { ImageAsset } from "@/types/content";

/** A file under /public. */
function local(
  src: string,
  width: number,
  height: number,
  alt: string,
  /** CSS object-position for art direction, for example "50% 30%". */
  position?: string,
): ImageAsset {
  return { src, alt, width, height, position };
}

export const images = {
  /* Home hero. Square crop from 768px up (the hero column is roughly square), 3:4 below.
     Mirrored from the original so the face sits on the right, away from the headline. */
  heroPortraitDesktop: local(
    "/images/home/hero-desktop.webp",
    2000,
    2000,
    "Prashant Adhikari standing outdoors with arms folded, in a white shirt against green foliage",
    "70% 0%",
  ),
  heroPortraitMobile: local(
    "/images/home/hero-mobile.webp",
    1200,
    1600,
    "Prashant Adhikari standing outdoors with arms folded, in a white shirt against green foliage",
    "50% 0%",
  ),

  /* What I do cards (9:10). */
  cardZenox: local(
    "/images/home/card-zenox.webp",
    900,
    1000,
    "Prashant teaching a class, standing beside a projected cloud architecture diagram with students at desks",
  ),
  cardDiorite: local(
    "/images/home/card-diorite.webp",
    900,
    1000,
    "Portrait of Prashant Adhikari in a blue checked blazer and white shirt",
  ),
  cardCommunity: local(
    "/images/home/card-community.webp",
    900,
    1000,
    "Prashant speaking into a microphone on stage at a Leo District Council meeting",
  ),

  /* Home community band (10:7). */
  communityBand: local(
    "/images/home/community-band.webp",
    1600,
    1120,
    "Large group photo of attendees at an AI Community in Nepal gathering in a hall in Pokhara",
  ),

  /* Zenox feature block (5:6). */
  zenoxFeature: local(
    "/images/home/zenox-feature.webp",
    1000,
    1200,
    "Prashant teaching in a classroom, explaining a cloud computing diagram projected on a whiteboard",
  ),

  /* About page chapters (4:5, 3:2, 4:5). */
  aboutChapterEarly: local(
    "/images/about/chapter-early.webp",
    1150,
    1437,
    "Portrait of Prashant Adhikari in a blue checked blazer",
  ),
  aboutChapterOrganising: local(
    "/images/about/chapter-organising.webp",
    1800,
    1200,
    "Prashant receiving an award on stage with fellow Leo members at a district council meeting",
  ),
  aboutChapterFounding: local(
    "/images/about/chapter-founding.webp",
    1250,
    1562,
    "Group photo of attendees at an AI Community in Nepal gathering",
  ),

  /* Community page. Hero is 21:9, event images are 3:2. */
  communityHero: local(
    "/images/community/hero.webp",
    2400,
    1028,
    "Guests and organisers lined up on stage at an AI Community in Nepal event",
    "50% 40%",
  ),
  eventCodefest2024: local(
    "/images/community/codefest-2024.webp",
    1080,
    720,
    "Collage from CodeFest 2024 by Code For Change Pokhara: a team at their laptops and participants on stage",
  ),

  /* Work page (3:2 and 16:9). */
  workZenox: local(
    "/images/work/zenox-class.webp",
    1800,
    1200,
    "Prashant teaching a class in front of a projected cloud architecture diagram",
  ),
  workAiml: local(
    "/images/work/aiml-micro-degree.webp",
    1280,
    720,
    "Poster for the AI/ML Micro Degree by Code For Change Pokhara: five months, university certified, internship and job opportunities",
  ),

  /* Blog covers (16:9) and in-article figures. Both covers are typographic. */
  blogQuantumCover: local(
    "/images/blog/quantum-computing-cover.webp",
    1600,
    900,
    "Cover graphic reading: Quantum computing. The dawn of a new computational era.",
  ),
  blogLeadershipCover: local(
    "/images/blog/in-trying-to-lead-cover.webp",
    1600,
    900,
    "Cover graphic reading: I thought I was building a community. Turns out, it was building me.",
  ),
  /* Pages of CFC Pokhara's Periodical in which the posts first appeared. Credit: Code for Change Pokhara. */
  periodicalQuantum: local(
    "/images/blog/cfc-periodical-2025-03-quantum.webp",
    679,
    960,
    "Front page of CFC Pokhara's Periodical issued 1 March 2025, carrying the article Quantum Computing: The Dawn of a New Computational Era",
  ),
  periodicalLeadership: local(
    "/images/blog/cfc-periodical-2025-06-leadership.webp",
    1080,
    1350,
    "Front page of CFC Pokhara's Periodical issued 1 June 2025, carrying the essay In Trying to Lead, I Learned to Be Led by Community",
  ),
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
