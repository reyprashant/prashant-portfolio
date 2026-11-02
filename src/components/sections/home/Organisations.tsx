/**
 * Organisations: a tile per organisation with the name as a wordmark (or a
 * monochrome logo when one is supplied), Prashant's role and the years.
 * Four columns on desktop, two on tablet and phone.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { organisations } from "@/data/organisations";
import type { Organisation } from "@/types/content";

function Tile({ name, role, dates, kind, href, logo }: Organisation) {
  const body = (
    <>
      <p className="type-eyebrow text-fg-eyebrow">{kind}</p>
      {logo ? (
        <SmartImage
          asset={logo}
          sizes="200px"
          className="mt-4 h-10 w-auto bg-transparent"
          hideBadge
        />
      ) : (
        <p className="font-display mt-4 text-[26px] leading-none tracking-[-0.01em] text-fg uppercase md:text-[30px]">
          {name}
        </p>
      )}
      <p className="type-small mt-3 text-fg">{role}</p>
      {dates && <p className="type-small mt-1 text-fg-muted">{dates}</p>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col border-t border-line pt-5 transition-colors duration-(--duration-fast) hover:border-highlight"
      >
        {body}
        <span className="type-small mt-auto inline-flex items-center gap-1 pt-4 text-fg-muted group-hover:text-highlight">
          Visit site
          <Icon name="external" size={14} />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </span>
      </a>
    );
  }
  return <div className="flex h-full flex-col border-t border-line pt-5">{body}</div>;
}

export function Organisations() {
  return (
    <Section surface="white" id="organisations">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow={organisations.eyebrow}
            lines={organisations.headingLines}
            intro={organisations.intro}
          />
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-8 lg:grid-cols-4">
          {organisations.items.map((org, index) => (
            <Reveal as="li" key={org.name} delay={(index % 4) * 0.06}>
              <Tile {...org} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
