"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

/**
 * Wraps a region in a MotionConfig that adopts the site's editorial easing
 * defaults for layout transitions and shared-element continuity.
 *
 * Use `layoutId="case-study:<slug>"` on matching elements across routes for
 * a continuous element transition (Motion's layout animation + the browser's
 * View Transitions API where supported).
 */
export function SharedElementScope({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      transition={{ duration: duration.slow, ease: ease.entrance }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}

export { motion };
