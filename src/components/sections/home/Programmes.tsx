/**
 * Programmes: the figures and the programmes behind them, on light grey.
 * Heading and intro left, a list of figure rows right on desktop; stacked
 * below 992px. Replaces the earlier newsroom story block.
 */
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { programmes } from "@/data/home";
import { cn } from "@/lib/cn";

export function Programmes() {
  return (
    <Section surface="grey" id="programmes">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <Reveal className="flex flex-col items-start lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
            <Eyebrow className="mb-5">{programmes.eyebrow}</Eyebrow>
            <Heading as="h2" lines={programmes.headingLines} />
            <p className="type-body-lg mt-7 max-w-prose text-fg-muted">{programmes.intro}</p>
            <Button href={programmes.cta.href} variant="outline" className="mt-9">
              {programmes.cta.label}
            </Button>
          </Reveal>
          <ul className="border-b border-line">
            {programmes.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.name}
                delay={Math.min(index, 3) * 0.06}
                className={cn(
                  "grid grid-cols-[96px_1fr] gap-5 border-t border-line py-7 md:grid-cols-[140px_1fr] md:gap-10",
                  item.featured && "surface-white -mx-5 mb-4 border-t-0 px-5 py-8 md:-mx-8 md:px-8",
                )}
              >
                <div className="flex flex-col gap-1">
                  <span className="type-stat text-highlight">{item.figure}</span>
                  <span className="type-eyebrow text-fg-eyebrow">{item.figureLabel}</span>
                </div>
                <div>
                  <h3 className="type-h3 text-fg">
                    <Link
                      href={item.href}
                      className="transition-colors duration-(--duration-fast) hover:text-highlight"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <p className="type-small mt-1 text-fg-muted">{item.role}</p>
                  <p className="type-body mt-3 max-w-prose text-fg-muted">{item.line}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
