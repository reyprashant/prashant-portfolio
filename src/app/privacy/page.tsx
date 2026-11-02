/**
 * Privacy policy. Copy in src/data/privacy.ts.
 */
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { privacyContent } from "@/data/privacy";
import { seoPages } from "@/data/seo";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={{ label: seoPages.privacy.label, href: seoPages.privacy.path }}
        eyebrow={privacyContent.eyebrow}
        lines={privacyContent.headingLines}
        intro={privacyContent.intro}
      />
      <Section surface="white">
        <Container className="max-w-3xl">
          <p className="type-small text-fg-muted">
            Last updated {privacyContent.updated}
          </p>
          <div className="mt-10 flex flex-col gap-10">
            {privacyContent.sections.map((section) => (
              <section key={section.title}>
                <h2 className="type-h3 text-fg">{section.title}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="type-body text-fg-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
