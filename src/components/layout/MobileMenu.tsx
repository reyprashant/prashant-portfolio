"use client";

/**
 * MobileMenu: 40px toggle and a floating dark panel under the header
 * (brief 4.2). Keyboard complete: focus moves into the panel on open,
 * returns to the toggle on close, Escape closes, body scroll is locked.
 * Hidden at the lg breakpoint and above where the full nav shows.
 */
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { headerCta, headerLinks } from "@/data/nav";
import { menuTransition } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const reduced = useReducedMotion();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus management and scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  const motionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: menuTransition,
      };

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => onOpenChange(!open)}
        className="inline-flex h-11 w-11 items-center justify-center border border-line-dark text-white transition-colors duration-(--duration-fast) hover:border-on-dark-muted"
      >
        <Icon name={open ? "close" : "menu"} size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop: click to close. Not focusable; Escape and the toggle serve keyboards. */}
            <m.div
              key="backdrop"
              aria-hidden="true"
              onClick={() => onOpenChange(false)}
              className="fixed inset-x-0 top-(--header-h) bottom-0 z-40 bg-black/60"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                  })}
            />
            <m.nav
              key="panel"
              id={panelId}
              aria-label="Primary"
              className="surface-ink fixed inset-x-(--gutter) top-[calc(var(--header-h)+12px)] z-50 max-h-[calc(100svh-var(--header-h)-24px)] overflow-y-auto border border-line-dark p-6"
              {...motionProps}
            >
              <ul className="flex flex-col">
                {headerLinks.map((link, index) => (
                  <li
                    key={link.href}
                    className="border-b border-line-dark last:border-b-0"
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={() => onOpenChange(false)}
                      className="type-h3 flex min-h-14 items-center text-white transition-colors duration-(--duration-fast) hover:text-accent"
                    >
                      {link.label}
                    </Link>
                    {link.children && link.children.length > 0 && (
                      <ul
                        aria-label={`${link.label} pages`}
                        className="mb-3 flex flex-col border-l border-line-dark pl-4"
                      >
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => onOpenChange(false)}
                              className="type-body flex min-h-11 items-center text-on-dark transition-colors duration-(--duration-fast) hover:text-white"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href={headerCta.href} className="w-full">
                  {headerCta.label}
                </Button>
              </div>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
