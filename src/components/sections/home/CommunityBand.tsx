/**
 * CommunityBand: black band, photo left and numbered pillars right on
 * desktop; heading, photo, pillars stacked below 1100px (brief 9.3).
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Pillar } from "@/components/ui/Pillar";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { communityBand } from "@/data/home";

export function CommunityBand() {
  return (
    <Section surface="black" id="community">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow className="mb-5">{communityBand.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            lines={communityBand.headingLines}
            accentLine={communityBand.accentLine}
          />
          <p className="type-body-lg mt-7 text-on-dark">{communityBand.intro}</p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-12 xl:grid-cols-[45fr_55fr] xl:gap-20">
          <Reveal>
            <SmartImage
              asset={communityBand.image}
              sizes="(min-width: 1100px) 600px, 100vw"
              quality={75}
            />
          </Reveal>
          <Reveal className="flex flex-col items-start">
            <ol className="w-full">
              {communityBand.pillars.map((pillar, index) => (
                <Pillar key={pillar.title} index={index} {...pillar} />
              ))}
            </ol>
            <Button href={communityBand.cta.href} variant="outline" className="mt-6">
              {communityBand.cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
