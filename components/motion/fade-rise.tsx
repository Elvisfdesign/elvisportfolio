"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

type FadeRiseProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Trigger when this fraction is in viewport. Default 0.2. */
  amount?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
};

/**
 * Fade + rise on viewport entry. The default motion verb of the site.
 * Below-the-fold sections fade-rise 24px over 700ms when 20% in viewport.
 */
export function FadeRise({
  children,
  delay = 0,
  y = 24,
  amount = 0.2,
  className,
}: FadeRiseProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount, once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: duration.slow, delay, ease: ease.entrance }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
