/**
 * FeatureCard: full-bleed photo with a dark scrim, category and title at the
 * bottom. The one-line summary and links stay collapsed until the card is
 * hovered or holds keyboard focus (see .feature-card in globals.css). On
 * devices without hover they are always shown, so nothing is unreachable.
 * No hover zoom (plan section 2, constraint 4).
 */
import { SmartImage } from "@/components/ui/SmartImage";
import { TextLink } from "@/components/ui/TextLink";
import type { FeatureCardContent } from "@/types/content";

export function FeatureCard({
  category,
  title,
  body,
  primary,
  secondary,
  image,
}: FeatureCardContent) {
  return (
    <article className="feature-card surface-black relative flex aspect-[4/5] flex-col justify-end overflow-hidden lg:aspect-[9/10]">
      <div className="absolute inset-0">
        <SmartImage
          asset={image}
          fill
          sizes="(min-width: 1100px) 420px, (min-width: 992px) 33vw, 100vw"
        />
        <div className="photo-scrim absolute inset-0" aria-hidden="true" />
      </div>
      <div className="relative p-(--card-pad)">
        <p className="type-eyebrow text-on-dark-muted">{category}</p>
        <h3 className="type-h3 mt-3 text-white">{title}</h3>
        <div className="feature-card-more">
          <div className="min-h-0 overflow-hidden">
            <p className="type-body pt-3 text-on-dark">{body}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6">
              <TextLink href={primary.href} external={primary.external}>
                {primary.label}
              </TextLink>
              {secondary && (
                <TextLink href={secondary.href} external={secondary.external}>
                  {secondary.label}
                </TextLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
