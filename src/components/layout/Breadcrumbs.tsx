/**
 * Breadcrumbs: visible trail on inner pages plus BreadcrumbList JSON-LD.
 * Home is always the first item; the current page is marked aria-current.
 */
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import type { Breadcrumb } from "@/types/content";

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const trail: Breadcrumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="type-small">
      <JsonLd data={breadcrumbSchema(trail)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-fg-muted">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-fg">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="underline decoration-fg/40 underline-offset-4 transition-colors duration-(--duration-fast) hover:text-highlight"
                >
                  {item.label}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
