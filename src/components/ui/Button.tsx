/**
 * Button: pill button rendered as a link or a button.
 *
 * Variants (brief 7.5, adjusted per plan 4.2 and 7):
 *   primary  solid accent fill, dark text, hover darkens (no lift, no glow)
 *   outline  1px border, hover fills with the surface accent colour
 *   ghost    text only, for low-emphasis actions
 * External links open in a new tab with rel="noopener noreferrer".
 */
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "sm";

const base =
  "type-button inline-flex items-center justify-center gap-2 rounded-pill px-7 whitespace-nowrap transition-colors duration-(--duration-fast) select-none";

const sizes: Record<Size, string> = {
  md: "h-(--button-h) min-h-(--tap-min)",
  sm: "h-11 px-5",
};

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-dark",
  outline: "border border-line text-fg hover:border-highlight hover:text-highlight",
  ghost:
    "text-fg underline underline-offset-4 decoration-fg/50 hover:text-highlight hover:decoration-highlight px-0",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string; external?: boolean };
type NativeProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkProps | NativeProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Strip presentational props so only native button attributes are spread.
  const {
    href: _href,
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...rest
  } = props as NativeProps;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
