"use client";

/**
 * Reveal: 12px fade-up when the element first enters the viewport.
 *
 * Server HTML is always visible (no inline hidden state), so crawlers,
 * no-JS readers and the LCP are never affected. After hydration, elements
 * that are below the fold are marked pending and animate in when Motion's
 * useInView reports them; elements already on screen are left as they are.
 * prefers-reduced-motion disables the effect in CSS (globals.css .reveal).
 */
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds, for grids of cards. */
  delay?: number;
  as?: "div" | "li" | "article";
};

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // First run: only elements outside the viewport start hidden.
    if (el.dataset.reveal === undefined) {
      const rect = el.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
      el.dataset.reveal = onScreen ? "done" : "pending";
    }

    if (inView && el.dataset.reveal === "pending") {
      el.style.transitionDelay = `${delay}s`;
      el.dataset.reveal = "done";
    }
  }, [inView, reduced, delay]);

  // The three allowed tags share one element type for the ref.
  const Element = Tag as "div";
  return (
    <Element ref={ref as RefObject<HTMLDivElement>} className={cn("reveal", className)}>
      {children}
    </Element>
  );
}
