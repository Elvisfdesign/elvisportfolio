"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

type ScrollScrubProps = {
  children: (progress: MotionValue<number>) => ReactNode;
  /** Scroll offset config — same shape as motion's useScroll. */
  offset?: ["start end" | "start start" | string, "end start" | "end end" | string];
  className?: string;
  /** Render the wrapping element as something other than div. */
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Scroll-linked transform helper. Children receive a 0→1 MotionValue
 * representing the element's progress through the viewport.
 *
 * Most of this site's motion is scroll-linked, not time-triggered.
 */
export function ScrollScrub({
  children,
  offset = ["start end", "end start"],
  className,
}: ScrollScrubProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // motion expects literal types but we widen for ergonomics
    offset: offset as ["start end", "end start"],
  });

  return (
    <div ref={ref} className={className}>
      {children(scrollYProgress)}
    </div>
  );
}

/**
 * Tiny helper to remap a progress motion value to a numeric range.
 */
export function useScrubTransform(
  progress: MotionValue<number>,
  input: number[],
  output: number[]
) {
  return useTransform(progress, input, output);
}

export { motion };
