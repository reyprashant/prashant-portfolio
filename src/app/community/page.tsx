/**
 * Community page. Sections from PORTFOLIO_BRIEF.md 5.4. Events live here
 * at launch; /events redirects to #events.
 */
import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { EventsList } from "@/components/sections/community/EventsList";
import { RoleList } from "@/components/sections/work/RoleList";
import { communityCta, communityHero, currentRoles, pastRoles } from "@/data/community";
import { seoPages } from "@/data/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("community");

export default function CommunityPage() {
  return (
    <>
      <PageHero
        breadcrumb={{ label: seoPages.community.label, href: seoPages.community.path }}
        eyebrow={communityHero.eyebrow}
        lines={communityHero.headingLines}
        accentLine={communityHero.accentLine}
        intro={communityHero.intro}
        image={communityHero.image}
      />
      <RoleList
        id="current"
        surface="white"
        eyebrow={currentRoles.eyebrow}
        lines={currentRoles.headingLines}
        items={currentRoles.items}
      />
      <RoleList
        id="past"
        surface="grey"
        eyebrow={pastRoles.eyebrow}
        lines={pastRoles.headingLines}
        items={pastRoles.items}
      />
      <EventsList />
      <CtaBand {...communityCta} />
    </>
  );
}
