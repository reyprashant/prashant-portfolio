/**
 * EventsList: hackathons and programmes Prashant organised. Anchor #events
 * is the target of the /events redirect. Date and location render only when set.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { events } from "@/data/community";

export function EventsList() {
  return (
    <Section surface="black" id="events">
      <Container>
        <Reveal>
          <SectionHead eyebrow={events.eyebrow} lines={events.headingLines} />
        </Reveal>
        <ul className="grid grid-cols-1 gap-(--card-gap) lg:grid-cols-3">
          {events.items.map((event, index) => (
            <Reveal
              as="li"
              key={event.name}
              delay={index * 0.08}
              className="flex flex-col border-t border-line pt-6"
            >
              {event.image && (
                <SmartImage
                  asset={event.image}
                  sizes="(min-width: 1100px) 420px, (min-width: 992px) 33vw, 100vw"
                  className="mb-6 aspect-[3/2]"
                  fill
                />
              )}
              <p className="type-eyebrow text-fg-eyebrow">{event.role}</p>
              <h3 className="type-h3 mt-3 text-fg">{event.name}</h3>
              {(event.date || event.location) && (
                <p className="type-small mt-1 text-fg-muted">
                  {[event.date, event.location].filter(Boolean).join(", ")}
                </p>
              )}
              <p className="type-body mt-3 text-fg-muted">{event.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
