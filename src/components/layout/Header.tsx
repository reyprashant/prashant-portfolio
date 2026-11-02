"use client";

/**
 * Header: solid black, 76px, sticky. Hides when scrolling down past its own
 * height and returns on scroll up (0.3s, brief 7.5). Always visible while the
 * mobile menu is open or while focus is inside it, so keyboard users never
 * lose the navigation.
 */
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";
import { headerCta } from "@/data/nav";
import { headerTransition } from "@/lib/motion";

export function Header() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    // Ignore tiny jitters so the header does not flicker.
    if (Math.abs(delta) < 4) return;
    setHidden(delta > 0 && y > 76);
    lastY.current = y;
  });

  // Close the menu on route change. State is adjusted during render (the
  // React-recommended pattern) rather than in an effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const shouldHide = hidden && !menuOpen && !focusWithin && !reduced;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.header
        className="surface-black fixed inset-x-0 top-0 z-50 h-(--header-h)"
        animate={{ y: shouldHide ? "-100%" : "0%" }}
        transition={headerTransition}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocusWithin(false);
          }
        }}
      >
        <Container className="flex h-full items-center justify-between gap-4">
          <Monogram />

          {/* Keyed by pathname so open submenus reset on navigation. */}
          <DesktopNav key={pathname} pathname={pathname} />

          <div className="flex items-center gap-3">
            <Button href={headerCta.href} size="sm" className="hidden sm:inline-flex">
              {headerCta.label}
            </Button>
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          </div>
        </Container>
      </m.header>
      {/* Spacer so content starts below the fixed header. */}
      <div aria-hidden="true" className="h-(--header-h) bg-black" />
    </LazyMotion>
  );
}
