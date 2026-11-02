/**
 * Shared Motion for React settings.
 *
 * Only three behaviours use JavaScript motion (plan section 7): section
 * reveal (useInView in components/ui/Reveal.tsx, CSS transition), header
 * hide on scroll, and the mobile menu. Everything else is CSS.
 */
import type { Transition } from "motion/react";

export const easeOutSoft = [0.22, 1, 0.36, 1] as const;

export const headerTransition: Transition = {
  duration: 0.3,
  ease: easeOutSoft,
};

export const menuTransition: Transition = {
  duration: 0.2,
  ease: easeOutSoft,
};
