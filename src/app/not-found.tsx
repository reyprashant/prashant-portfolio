/**
 * Custom 404. Copy from PORTFOLIO_BRIEF.md 5.6. Returns HTTP 404 and noindex.
 */
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { notFoundContent } from "@/data/notFound";

export const metadata: Metadata = {
  title: notFoundContent.title,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section
      surface="black"
      className="flex min-h-[calc(100svh-var(--header-h))] items-center"
    >
      <Container className="flex max-w-3xl flex-col items-start gap-8">
        <Heading
          as="h1"
          size="display-1"
          lines={notFoundContent.headingLines}
          accentLine={notFoundContent.accentLine}
        />
        <p className="type-body-lg text-fg-muted">{notFoundContent.body}</p>
        <Button href={notFoundContent.cta.href}>{notFoundContent.cta.label}</Button>
      </Container>
    </Section>
  );
}
