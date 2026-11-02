/**
 * ZenoxFeature: light card on the warm surface, text left 42%, photo right
 * 58% (brief 7.5 "Light card"); stacked with the photo first on mobile.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { TextLink } from "@/components/ui/TextLink";
import { zenoxFeature } from "@/data/home";

export function ZenoxFeature() {
  return (
    <Section surface="warm" id="zenox">
      <Container>
        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-[42fr_58fr] md:items-center md:gap-16">
          <div className="order-2 flex flex-col items-start md:order-1">
            <Eyebrow className="mb-5">{zenoxFeature.eyebrow}</Eyebrow>
            <Heading as="h2" lines={zenoxFeature.headingLines} />
            <p className="type-body mt-7 max-w-prose text-fg-muted">
              {zenoxFeature.body}
            </p>
            <p className="type-small mt-4 max-w-prose text-fg-muted">
              {zenoxFeature.programmesLine}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button
                href={zenoxFeature.primary.href}
                external={zenoxFeature.primary.external}
              >
                {zenoxFeature.primary.label}
              </Button>
              <TextLink href={zenoxFeature.secondary.href}>
                {zenoxFeature.secondary.label}
              </TextLink>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SmartImage
              asset={zenoxFeature.image}
              sizes="(min-width: 1100px) 760px, (min-width: 768px) 58vw, 100vw"
              className="aspect-[4/3] md:aspect-[5/6]"
              fill
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
