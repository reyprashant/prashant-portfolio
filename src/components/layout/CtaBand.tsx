/**
 * CtaBand: end-of-page call to action. Every page closes with one so the
 * next step is always obvious.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Cta } from "@/types/content";

type CtaBandProps = {
  heading: string;
  line: string;
  cta: Cta;
};

export function CtaBand({ heading, line, cta }: CtaBandProps) {
  return (
    <Section surface="warm" ariaLabel="Call to action">
      <Container>
        <Reveal className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <h2 className="type-display-2 text-fg">{heading}</h2>
          <div className="flex flex-col items-start gap-6">
            <p className="type-body-lg text-fg-muted">{line}</p>
            <Button href={cta.href} external={cta.external}>
              {cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
