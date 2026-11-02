/**
 * Hero: black, full-bleed portrait, text bottom-left (brief 4.3 and 9.3).
 *
 * Desktop: the portrait fills the right 60% behind a left-to-right black
 * fade. Mobile: the portrait crop fills the top 66% with a heavy bottom
 * fade and the text sits below. One art-directed image (HeroImage) serves
 * both, so each viewport downloads exactly one file.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { HeroImage } from "@/components/sections/home/HeroImage";
import { TextLink } from "@/components/ui/TextLink";
import { hero } from "@/data/home";

export function Hero() {
  return (
    <Section
      surface="black"
      padded={false}
      className="relative overflow-hidden"
      ariaLabel="Introduction"
    >
      {/* Image frame: top 66svh on mobile, right 60% on tablet and up. */}
      <div className="relative h-[66svh] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[60%]">
        <HeroImage desktop={hero.imageDesktop} mobile={hero.imageMobile} />
        {/* Mobile: fade into the text below. Desktop: fade from the text side and the base. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent md:h-1/3" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/55 to-black/10 md:block" />
      </div>

      <Container className="relative flex min-h-0 flex-col justify-end pt-10 pb-12 md:min-h-[min(100svh-var(--header-h),920px)] md:pt-24 md:pb-20">
        <div className="max-w-2xl">
          <Eyebrow className="mb-6">{hero.eyebrow}</Eyebrow>
          <Heading
            as="h1"
            size="display-1"
            lines={hero.headingLines}
            accentLine={hero.accentLine}
          />
          <p className="type-body-lg mt-7 max-w-xl text-on-dark">{hero.subline}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <TextLink href={hero.secondary.href}>{hero.secondary.label}</TextLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
