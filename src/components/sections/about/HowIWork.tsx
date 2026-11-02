/**
 * HowIWork: three numbered principles. Tagged SUGGESTED in the brief.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { Pillar } from "@/components/ui/Pillar";
import { Reveal } from "@/components/ui/Reveal";
import { howIWork } from "@/data/about";

export function HowIWork() {
  return (
    <Section surface="grey" id="how-i-work">
      <Container>
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <SectionHead
            eyebrow={howIWork.eyebrow}
            lines={howIWork.headingLines}
            className="mb-0 lg:block"
          />
          <ol>
            {howIWork.pillars.map((pillar, index) => (
              <Pillar key={pillar.title} index={index} {...pillar} />
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
