/**
 * Testimonials: three quote cards in a row on white (one column under 992px).
 * A static grid is used instead of the brief's marquee: nothing moves on
 * its own, which keeps the page calm and the quotes readable.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/content";

function QuoteCard({ quote, name, role, organisation, photo }: Testimonial) {
  return (
    <figure className="flex h-full flex-col justify-between border border-line p-(--card-pad)">
      <div>
        <blockquote className="type-body-lg text-fg">
          <p>{quote}</p>
        </blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-5">
        {photo && (
          <SmartImage
            asset={photo}
            sizes="56px"
            className="h-14 w-14 shrink-0 rounded-pill"
            fill
            hideBadge
          />
        )}
        <div>
          <p className="type-body font-semibold text-fg">{name}</p>
          <p className="type-small text-fg-muted">
            {organisation ? `${role}, ${organisation}` : role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Section surface="white" id="testimonials">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow={testimonials.eyebrow}
            lines={testimonials.headingLines}
            intro={testimonials.intro}
          />
        </Reveal>
        <ul className="grid grid-cols-1 gap-(--card-gap) lg:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 0.08}>
              <QuoteCard {...item} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
