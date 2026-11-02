/**
 * Home. Section order from PORTFOLIO_BRIEF.md 4.3, with the programmes,
 * organisations and testimonials blocks added on 2 November 2026 and the
 * latest blog posts closing the page when any are published.
 */
import type { Metadata } from "next";
import { CommunityBand } from "@/components/sections/home/CommunityBand";
import { Hero } from "@/components/sections/home/Hero";
import { LatestPosts } from "@/components/sections/home/LatestPosts";
import { Organisations } from "@/components/sections/home/Organisations";
import { Programmes } from "@/components/sections/home/Programmes";
import { ProofStrip } from "@/components/sections/home/ProofStrip";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { WhatIDo } from "@/components/sections/home/WhatIDo";
import { ZenoxFeature } from "@/components/sections/home/ZenoxFeature";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <WhatIDo />
      <Programmes />
      <Organisations />
      <CommunityBand />
      <Testimonials />
      <ZenoxFeature />
      <LatestPosts />
    </>
  );
}
