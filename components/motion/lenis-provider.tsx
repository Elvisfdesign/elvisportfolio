"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** Reset scroll position — used by specific nav links when Lenis is active. */
export function scrollToTop(options?: { immediate?: boolean }) {
  if (typeof window === "undefined") return;

  const immediate =
    options?.immediate ??
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate, force: true });
  }

  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Inertial smooth scroll — the single piece of buttery that's allowed.
 * Bypassed automatically when the user prefers reduced motion.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: coarsePointer ? 0.95 : 1.15,
    });
    lenisRef.current = lenis;
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
