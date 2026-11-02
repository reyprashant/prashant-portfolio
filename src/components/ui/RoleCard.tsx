/**
 * RoleCard: organisation, role, dates and bullet points, with an optional
 * description line, link and photo. Used on the Work and Community pages.
 * Layout: meta column left, detail right; stacked under 768px.
 */
import { SmartImage } from "@/components/ui/SmartImage";
import { TextLink } from "@/components/ui/TextLink";
import type { Role } from "@/types/content";
import { cn } from "@/lib/cn";

type RoleCardProps = Role & {
  /** Heading level for the organisation name. */
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function RoleCard({
  id,
  organisation,
  role,
  dates,
  about,
  points,
  link,
  image,
  headingLevel: HeadingTag = "h3",
  className,
}: RoleCardProps) {
  return (
    <article
      id={id}
      className={cn(
        "grid scroll-mt-(--header-h) grid-cols-1 gap-6 border-t border-line py-10 md:grid-cols-[1fr_2fr] md:gap-12",
        className,
      )}
    >
      <div>
        <HeadingTag className="type-h3 text-fg">{organisation}</HeadingTag>
        <p className="type-body mt-2 text-fg">{role}</p>
        {dates && <p className="type-small mt-1 text-fg-muted">{dates}</p>}
        {link && (
          <p className="mt-4">
            <TextLink href={link.href} external={link.external}>
              {link.label}
            </TextLink>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {about && <p className="type-body text-fg-muted">{about}</p>}
        <ul className="flex flex-col gap-3">
          {points.map((point) => (
            <li key={point} className="type-body flex gap-3 text-fg">
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-px w-4 shrink-0 bg-highlight"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        {image && (
          <SmartImage
            asset={image}
            sizes="(min-width: 1100px) 800px, (min-width: 768px) 60vw, 100vw"
            className="mt-2"
          />
        )}
      </div>
    </article>
  );
}
