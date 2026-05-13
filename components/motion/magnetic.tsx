"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotionPreference } from "./use-reduced-motion";

type MagneticProps = {
  children: ReactNode;
  /** Max pixel translation. Default 4. */
  strength?: number;
  className?: string;
};

/**
 * Magnetic hover — interactive elements lightly pull toward the cursor.
 * Max ~4px translation. Bypassed on reduced-motion and coarse pointers.
 */
export function Magnetic({ children, strength = 4, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });
  const reduced = useReducedMotionPreference();
  const [allowMagnetic, setAllowMagnetic] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) {
      setAllowMagnetic(false);
      return;
    }
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setAllowMagnetic(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduced]);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!allowMagnetic || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!allowMagnetic) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
