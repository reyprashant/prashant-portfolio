/**
 * Footer: closing call to action, three link columns and the legal line.
 * Source copy: PORTFOLIO_BRIEF.md 5.1 footer.
 */
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { TextLink } from "@/components/ui/TextLink";
import { footerCta } from "@/data/home";
import { footerLegal, footerPages } from "@/data/nav";
import { site } from "@/data/site";
import type { NavLink } from "@/types/content";

function LinkColumn({ title, links }: { title: string; links: readonly NavLink[] }) {
  return (
    <div>
      <h3 className="type-eyebrow mb-5 text-on-dark-muted">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <TextLink
                href={link.href}
                external
                className="no-underline hover:underline"
              >
                {link.label}
              </TextLink>
            ) : (
              <Link
                href={link.href}
                className="inline-flex min-h-(--tap-min) items-center text-on-dark transition-colors duration-(--duration-fast) hover:text-white hover:underline hover:underline-offset-4 md:min-h-0"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="surface-black">
      <Container className="section-y">
        {/* Closing CTA */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-line-dark pb-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <h2 className="type-display-2 text-white">{footerCta.heading}</h2>
          <div className="flex flex-col items-start gap-6">
            <p className="type-body-lg text-on-dark">{footerCta.line}</p>
            <Button href={footerCta.cta.href}>{footerCta.cta.label}</Button>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoMark size={44} />
            <p className="type-small mt-3 max-w-xs text-on-dark-muted">
              {site.name}. {site.roles[0]}. {site.location}.
            </p>
          </div>
          <LinkColumn title="Pages" links={footerPages} />
          <LinkColumn title="Elsewhere" links={site.social} />
          <LinkColumn title="Places" links={site.places} />
        </div>

        {/* Bottom line */}
        <div className="type-small flex flex-col gap-3 border-t border-line-dark pt-6 text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {site.copyright} &middot; {site.location}
          </p>
          <ul className="flex gap-5">
            {footerLegal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline decoration-on-dark-muted/50 underline-offset-4 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </Container>
    </footer>
  );
}
