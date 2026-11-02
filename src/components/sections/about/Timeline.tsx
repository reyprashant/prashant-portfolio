/**
 * Timeline: numbered year rows on a dark band (brief 5.2 item 3).
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { TimelineRow } from "@/components/ui/TimelineRow";
import { timeline } from "@/data/about";

export function Timeline() {
  return (
    <Section surface="black" id="timeline">
      <Container>
        <Reveal>
          <SectionHead eyebrow={timeline.eyebrow} lines={timeline.headingLines} />
        </Reveal>
        <Reveal>
          <ol className="border-b border-line">
            {timeline.entries.map((entry) => (
              <TimelineRow key={entry.year} {...entry} />
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
