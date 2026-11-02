/**
 * EducationSkills: degree details and grouped skills, CV-confirmed.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { education, skills } from "@/data/about";

export function EducationSkills() {
  return (
    <Section surface="white" id="education">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <Reveal>
          <Eyebrow className="mb-5">{education.eyebrow}</Eyebrow>
          <h2 className="type-h3 text-fg">{education.institution}</h2>
          <p className="type-body mt-2 text-fg">{education.degree}</p>
          <p className="type-small mt-1 text-fg-muted">{education.dates}</p>
          <p className="type-body mt-4 text-fg">{education.result}</p>
        </Reveal>
        <Reveal>
          <Eyebrow className="mb-5">{skills.eyebrow}</Eyebrow>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {skills.groups.map((group) => (
              <div key={group.title}>
                <dt className="type-h3 text-fg">{group.title}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="type-small border border-line px-3 py-1.5 text-fg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
