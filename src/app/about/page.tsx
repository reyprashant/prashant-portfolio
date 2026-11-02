/**
 * About page. Sections from PORTFOLIO_BRIEF.md 5.2.
 */
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { CtaBand } from "@/components/layout/CtaBand";
import { Section } from "@/components/layout/Section";
import { Bios } from "@/components/sections/about/Bios";
import { EducationSkills } from "@/components/sections/about/EducationSkills";
import { HowIWork } from "@/components/sections/about/HowIWork";
import { StoryChapters } from "@/components/sections/about/StoryChapters";
import { Timeline } from "@/components/sections/about/Timeline";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { aboutCta, aboutHero } from "@/data/about";
import { seoPages } from "@/data/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("about");

export default function AboutPage() {
  return (
    <>
      <Section surface="black" ariaLabel="About introduction">
        <Container className="flex flex-col gap-10">
          <Breadcrumbs
            items={[{ label: seoPages.about.label, href: seoPages.about.path }]}
          />
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">{aboutHero.eyebrow}</Eyebrow>
            <Heading
              as="h1"
              size="display-1"
              lines={aboutHero.headingLines}
              accentLine={aboutHero.accentLine}
            />
            <p className="type-body-lg mt-7 text-on-dark">{aboutHero.line}</p>
          </div>
        </Container>
      </Section>
      <StoryChapters />
      <Timeline />
      <HowIWork />
      <EducationSkills />
      <Bios />
      <CtaBand {...aboutCta} />
    </>
  );
}
