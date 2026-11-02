"use client";

/**
 * DesktopNav: the primary navigation at the lg breakpoint and above.
 *
 * Items with children follow the WAI disclosure navigation pattern. The
 * label stays a normal link to the section page; a separate button with
 * aria-expanded opens the submenu. Pointer users also get the submenu on
 * hover. Escape closes it and returns focus to the button, arrow keys move
 * through the items, and focus leaving the item closes it. The component is
 * keyed by pathname in Header so every submenu closes on navigation.
 */
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { headerLinks } from "@/data/nav";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types/content";

const linkClasses =
  "type-button inline-flex min-h-(--tap-min) items-center text-on-dark transition-colors duration-(--duration-fast) hover:text-white";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Dropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const children = item.children ?? [];

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // A short grace period stops the panel flickering when the pointer
  // crosses the gap between the label and the panel.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  const focusItem = (index: number) => {
    const links = rootRef.current?.querySelectorAll<HTMLAnchorElement>("[data-submenu-link]");
    if (!links || links.length === 0) return;
    const bounded = (index + links.length) % links.length;
    links[bounded]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
      return;
    }
    const target = event.target as HTMLElement;
    const inPanel = target.hasAttribute("data-submenu-link");
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) setOpen(true);
      if (inPanel) {
        const index = Number(target.dataset.index ?? 0);
        focusItem(index + 1);
      } else {
        // Wait for the panel to render before moving focus into it.
        window.requestAnimationFrame(() => focusItem(0));
      }
    }
    if (event.key === "ArrowUp" && inPanel) {
      event.preventDefault();
      const index = Number(target.dataset.index ?? 0);
      if (index === 0) buttonRef.current?.focus();
      else focusItem(index - 1);
    }
  };

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            linkClasses,
            active && "text-white underline decoration-accent underline-offset-8",
          )}
        >
          {item.label}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${item.label} submenu`}
          onClick={() => setOpen((value) => !value)}
          className="ml-1 inline-flex h-8 w-8 items-center justify-center text-on-dark-muted transition-colors duration-(--duration-fast) hover:text-white"
        >
          <Icon name={open ? "chevron-up" : "chevron-down"} size={16} />
        </button>
      </div>

      <ul
        id={panelId}
        hidden={!open}
        className="surface-ink absolute top-full left-0 z-50 mt-3 min-w-64 border border-line-dark py-2"
      >
        {children.map((child, index) => (
          <li key={child.href}>
            <Link
              href={child.href}
              data-submenu-link=""
              data-index={index}
              onClick={() => setOpen(false)}
              className="type-small block px-5 py-3 text-on-dark transition-colors duration-(--duration-fast) hover:bg-white/5 hover:text-white focus-visible:text-white"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-6">
        {headerLinks.map((item) => {
          const active = isActive(pathname, item.href);
          if (item.children && item.children.length > 0) {
            return <Dropdown key={item.href} item={item} active={active} />;
          }
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  linkClasses,
                  active && "text-white underline decoration-accent underline-offset-8",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
