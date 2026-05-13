"use client";

import { motion, useInView } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { ease } from "@/lib/motion";

type MaskUpProps = {
  children?: ReactNode;
  /** Staggered reveal — pass an array of lines instead of children. */
  lines?: string[];
  delay?: number;
  className?: string;
  /** Stagger between lines, in seconds. */
  stagger?: number;
  /** Single mask block (no stagger) when true. Default false. */
  single?: boolean;
  /** Less padding below each masked line — tighter stacked display type. */
  tightLines?: boolean;
};

/**
 * Padding inside each overflow:hidden mask so Fraunces (and tight display
 * line-heights) do not clip ascenders/descenders during or after reveal.
 */
function lineMaskInsetStyle(tightLines: boolean): CSSProperties {
  return {
    paddingTop: tightLines ? "0.07em" : "0.11em",
    paddingBottom: tightLines ? "0.04em" : "calc(0.055em + 0.02em)",
  };
}

/** Single-block mask inset (inherits parent line-height). */
const SINGLE_MASK_STYLE: CSSProperties = {
  paddingTop: "0.11em",
  paddingBottom: "0.065em",
};

/**
 * Mask-up reveal — type masked from below.
 * Used on the opening line and on display headings throughout the site.
 */
export function MaskUp({
  children,
  lines,
  delay = 0,
  className,
  stagger = 0.04,
  single = false,
  tightLines = false,
}: MaskUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // If given explicit lines, render each as a masked block with stagger.
  if (lines && !single) {
    return (
      <span ref={ref} className={className}>
        {lines.map((line, i) => (
          <span
            key={i}
            className="block overflow-hidden"
            style={lineMaskInsetStyle(tightLines)}
          >
            <motion.span
              className="block pb-[0.015em]"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{
                duration: 0.8,
                delay: delay + i * stagger,
                ease: ease.entrance,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-block align-bottom ${className ?? ""}`}>
      <span className="inline-block overflow-hidden" style={SINGLE_MASK_STYLE}>
        <motion.span
          className="inline-block pb-[0.015em]"
          initial={{ y: "110%" }}
          animate={inView ? { y: "0%" } : undefined}
          transition={{ duration: 0.8, delay, ease: ease.entrance }}
        >
          {children}
        </motion.span>
      </span>
    </span>
  );
}
