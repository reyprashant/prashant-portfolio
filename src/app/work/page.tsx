/**
 * Work page. Sections from PORTFOLIO_BRIEF.md 5.3.
 */
import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { RoleList } from "@/components/sections/work/RoleList";
import { seoPages } from "@/data/seo";
import { earlierRoles, ventures, workCta, workHero } from "@/data/work";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("work");

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumb={{ label: seoPages.work.label, href: seoPages.work.path }}
        eyebrow={workHero.eyebrow}
        lines={workHero.headingLines}
        accentLine={workHero.accentLine}
        intro={workHero.intro}
      />
      <RoleList
        surface="white"
        eyebrow="Now"
        lines={["WHERE I", "WORK TODAY."]}
        items={ventures}
      />
      <RoleList
        id="earlier"
        surface="grey"
        eyebrow={earlierRoles.eyebrow}
        lines={earlierRoles.headingLines}
        items={earlierRoles.items}
      />
      <CtaBand {...workCta} />
    </>
  );
}
