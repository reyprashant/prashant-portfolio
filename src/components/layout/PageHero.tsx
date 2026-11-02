/**
 * PageHero: black intro band for inner pages with breadcrumbs, eyebrow,
 * the page's single H1 and an intro line. Optional photo below the text.
 */
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Breadcrumb, ImageAsset } from "@/types/content";

type PageHeroProps = {
  breadcrumb: Breadcrumb;
  eyebrow: string;
  lines: readonly string[];
  accentLine?: number;
  intro: string;
  image?: ImageAsset;
};

export function PageHero({
  breadcrumb,
  eyebrow,
  lines,
  accentLine,
  intro,
  image,
}: PageHeroProps) {
  return (
    <Section surface="black" ariaLabel={`${breadcrumb.label} introduction`}>
      <Container className="flex flex-col gap-10">
        <Breadcrumbs items={[breadcrumb]} />
        <div className="max-w-3xl">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <Heading as="h1" size="display-1" lines={lines} accentLine={accentLine} />
          <p className="type-body-lg mt-7 max-w-2xl text-on-dark">{intro}</p>
        </div>
        {image && (
          <SmartImage
            asset={image}
            sizes="(min-width: 1440px) 1320px, 100vw"
            className="mt-4 aspect-[16/9] md:aspect-[21/9]"
            fill
            preload
            quality={75}
          />
        )}
      </Container>
    </Section>
  );
}
