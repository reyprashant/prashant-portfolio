/**
 * Contact page. Form left, direct contact right. The form is hidden in
 * production until email delivery is configured (plan 8.4).
 */
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { DirectContact } from "@/components/sections/contact/DirectContact";
import { contactForm, contactHero, formUnavailable } from "@/data/contact";
import { seoPages } from "@/data/seo";
import {
  isContactLogMode,
  isTurnstileEnabled,
  publicEnv,
  shouldRenderContactForm,
} from "@/lib/env";
import { issueFormToken } from "@/lib/form-token";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("contact");

/**
 * The signed timestamp must be minted per request, not at build time, or the
 * minimum-fill-time check would be meaningless. `connection()` defers this
 * subtree to request time while the rest of the page stays prerendered.
 */
async function RequestTimeContactForm() {
  await connection();
  // Decided per request so runtime environment variables are respected,
  // not the ones present when the page was prerendered.
  if (!shouldRenderContactForm()) {
    return <p className="type-body max-w-prose text-fg-muted">{formUnavailable.body}</p>;
  }
  return (
    <ContactForm
      formToken={issueFormToken()}
      deliveryDisabled={isContactLogMode()}
      turnstileSiteKey={isTurnstileEnabled() ? publicEnv.turnstileSiteKey : undefined}
    />
  );
}

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-20 bg-line/40" />
        <div className="h-20 bg-line/40" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-20 bg-line/40" />
        <div className="h-20 bg-line/40" />
      </div>
      <div className="h-48 bg-line/40" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={{ label: seoPages.contact.label, href: seoPages.contact.path }}
        eyebrow={contactHero.eyebrow}
        lines={contactHero.headingLines}
        accentLine={contactHero.accentLine}
        intro={contactHero.intro}
      />
      <Section surface="white">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <div>
            <h2 className="type-h3 mb-8 text-fg">{contactForm.heading}</h2>
            <Suspense fallback={<FormSkeleton />}>
              <RequestTimeContactForm />
            </Suspense>
          </div>
          <DirectContact />
        </Container>
      </Section>
    </>
  );
}
