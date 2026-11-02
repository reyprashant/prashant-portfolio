/**
 * Bios: three third-person bios in native disclosure elements with a
 * copy-to-clipboard control. Headshot download appears only when files exist.
 */
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { bios } from "@/data/about";

export function Bios() {
  return (
    <Section surface="grey" id="bios">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <Reveal>
          <Eyebrow className="mb-5">{bios.eyebrow}</Eyebrow>
          <p className="type-body max-w-prose text-fg-muted">{bios.intro}</p>
        </Reveal>
        <Reveal>
          <div className="flex flex-col border-t border-line">
            {bios.items.map((bio) => (
              <details key={bio.label} className="group border-b border-line">
                <summary className="type-h3 flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-fg [&::-webkit-details-marker]:hidden">
                  {bio.label}
                  <span
                    aria-hidden="true"
                    className="type-small text-fg-muted group-open:hidden"
                  >
                    Show
                  </span>
                  <span
                    aria-hidden="true"
                    className="type-small hidden text-fg-muted group-open:inline"
                  >
                    Hide
                  </span>
                </summary>
                <div className="flex flex-col gap-5 pb-8">
                  {bio.text.split("\n\n").map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="type-body max-w-prose text-fg-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                  <div>
                    <CopyButton text={bio.text} label="Copy this bio" />
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
