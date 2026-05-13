"use client";

import { useReducedMotionPreference } from "./use-reduced-motion";
import type { ReactNode } from "react";

type ReducedMotionBranchProps = {
  motion: ReactNode;
  still: ReactNode;
};

/**
 * Render different content for users who prefer reduced motion.
 * Reduced-motion gets a different, equally considered experience — not a degraded one.
 */
export function ReducedMotionBranch({ motion, still }: ReducedMotionBranchProps) {
  const reduced = useReducedMotionPreference();
  return <>{reduced ? still : motion}</>;
}
