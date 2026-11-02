/**
 * WhatIDo: section head plus three equal feature cards in one row
 * (1 column under 992px). Copy from src/data/home.ts.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCard } from "@/components/sections/home/FeatureCard";
import { whatIDo } from "@/data/home";

export function WhatIDo() {
  return (
    <Section surface="white" id="what-i-do">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow={whatIDo.eyebrow}
            lines={whatIDo.headingLines}
            intro={whatIDo.intro}
          />
        </Reveal>
        <ul className="grid grid-cols-1 gap-(--card-gap) lg:grid-cols-3">
          {whatIDo.cards.map((card, index) => (
            <Reveal as="li" key={card.title} delay={index * 0.08}>
              <FeatureCard {...card} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
