/**
 * ProofStrip: four CV-stated figures on black. 4 columns desktop, 2 x 2 below.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { stats } from "@/data/home";

export function ProofStrip() {
  return (
    <Section
      surface="black"
      padded={false}
      ariaLabel="Key figures"
      className="pb-(--section-y)"
    >
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <li key={stat.label}>
                <Stat {...stat} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
