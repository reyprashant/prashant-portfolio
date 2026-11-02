/**
 * RoleList: a section head and a list of RoleCards. Shared by Work and
 * Community pages for ventures, earlier roles, current and past roles.
 */
import { Container } from "@/components/layout/Container";
import { Section, type Surface } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { RoleCard } from "@/components/ui/RoleCard";
import type { Role } from "@/types/content";

type RoleListProps = {
  id?: string;
  surface: Surface;
  eyebrow: string;
  lines: readonly string[];
  intro?: string;
  items: readonly Role[];
};

export function RoleList({ id, surface, eyebrow, lines, intro, items }: RoleListProps) {
  return (
    <Section surface={surface} id={id}>
      <Container>
        <Reveal>
          <SectionHead eyebrow={eyebrow} lines={lines} intro={intro} />
        </Reveal>
        <div className="border-b border-line">
          {items.map((role) => (
            <Reveal key={role.organisation}>
              <RoleCard {...role} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
