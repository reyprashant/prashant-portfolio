/**
 * TextLink: underlined inline link. Underline sits at 50% opacity and turns
 * the surface accent colour on hover (brief 7.5). External links are marked.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

const classes =
  "inline-flex items-center gap-1 text-fg underline decoration-fg/50 underline-offset-4 transition-colors duration-(--duration-fast) hover:text-highlight hover:decoration-highlight";

export function TextLink({ href, children, external, className }: TextLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(classes, className)}
      >
        {children}
        <Icon name="external" size={16} />
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cn(classes, className)}>
      {children}
    </Link>
  );
}
