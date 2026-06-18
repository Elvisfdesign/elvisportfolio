"use client";

import Link from "next/link";
import clsx from "clsx";
import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";

/** Shared layout overrides `link-underline`’s `inline-block` for aligned touch targets. */
const EDITORIAL_OPENING_LINK_CLASSES =
  "t-mono link-underline !inline-flex min-h-11 items-center touch-manipulation leading-none transition-colors relative";

/** `md` breakpoint — matches Tailwind `md:` (768px). */
const HERO_COMPACT_MEDIA = "(max-width: 767px)";

function subscribeHeroCompactMq(onChange: () => void) {
  const mq = window.matchMedia(HERO_COMPACT_MEDIA);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function heroCompactMqSnapshot() {
  return window.matchMedia(HERO_COMPACT_MEDIA).matches;
}

function OpeningEditorialHairlineMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "pointer-events-none h-[1cap] min-h-[0.8125rem] w-px shrink-0 self-center bg-[var(--hairline)]",
        className,
      )}
    />
  );
}

function EditorialOpeningNavActions() {
  return (
    <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-6 md:flex-nowrap md:gap-x-8">
      <a
        href="#films"
        className={clsx(EDITORIAL_OPENING_LINK_CLASSES, "text-ink")}
        aria-label="Jump to selected work"
      >
        SELECTED&nbsp;WORK&nbsp;↓
      </a>
      <OpeningEditorialHairlineMark />
      <Link
        href="/about#meet"
        className={clsx(
          EDITORIAL_OPENING_LINK_CLASSES,
          "text-ink-quiet hover:text-ink",
        )}
        aria-label="Meet Elvis Fernandes — about who builds this portfolio"
      >
        MEET&nbsp;ELVIS&nbsp;→
      </Link>
      <OpeningEditorialHairlineMark className="hidden md:block" />
      <span className="t-mono tabular text-ink-faint hidden min-h-11 select-none md:inline-flex md:items-center">
        SCROLL&nbsp;TO&nbsp;CONTINUE
      </span>
    </div>
  );
}

/**
 * Movement 01 — Opening Line.
 *
 * A single editorial sentence at hero size, set against generous negative space.
 * No image. No mockup. Type only. The headline scrub-morphs once as the user
 * begins to scroll, revealing the second half of the thought.
 */
export function OpeningLine() {
  const reduced = useReducedMotionPreference();
  if (reduced) return <OpeningLineStill />;
  return <OpeningLineMotion />;
}

function OpeningLineMotion() {
  const compact = useSyncExternalStore(
    subscribeHeroCompactMq,
    heroCompactMqSnapshot,
    () => false,
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /** Faster crossfade — completes earlier in scroll progress. */
  const firstOpacity = useTransform(
    scrollYProgress,
    compact ? [0, 0.04, 0.16] : [0, 0.06, 0.2],
    [1, 1, 0],
  );
  const secondOpacity = useTransform(
    scrollYProgress,
    compact ? [0.12, 0.24, 0.38] : [0.16, 0.28, 0.44],
    [0, 1, 1],
  );

  /** Mobile: opacity-only crossfade. Desktop: lighter drift over a shorter span. */
  const firstY = useTransform(scrollYProgress, [0, 0.26], compact ? [0, 0] : [0, -14]);
  const secondY = useTransform(scrollYProgress, [0.12, 0.3], compact ? [0, 0] : [10, 0]);

  const washOpacity = useTransform(scrollYProgress, [0, 1], [0.04, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[96svh] px-[var(--gutter)] md:min-h-[112svh]"
      aria-labelledby="opening-line"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <div className="sticky top-0 flex min-h-svh items-center">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: washOpacity,
            background: "var(--ambient-wash)",
          }}
        />
        <div className="relative w-full pt-28 pb-10 md:pt-40 md:pb-14">
          <Eyebrow className="mb-10 md:mb-20">
            PORTFOLIO&nbsp;·&nbsp;2026&nbsp;·&nbsp;V1
          </Eyebrow>

          <div
            className={clsx(
              "relative isolate pb-2 md:pb-4",
              "max-md:min-h-[clamp(15rem,52svh,23rem)]",
            )}
          >
            <motion.h1
              id="opening-line"
              className={clsx(
                "t-display-xl font-display text-ink",
                "max-md:!leading-[1.08]",
              )}
              style={{
                zIndex: 1,
                y: firstY,
                opacity: firstOpacity,
              }}
            >
              I design products people can
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              understand,
            </motion.h1>

            <motion.p
              aria-hidden
              className={clsx(
                "absolute inset-0 t-display-xl font-display text-ink",
                "pointer-events-none max-md:!leading-[1.08]",
              )}
              style={{
                zIndex: 2,
                y: secondY,
                opacity: secondOpacity,
              }}
            >
              trust, and actually{" "}
              <span className="italic text-ink-mute">enjoy using</span>.
            </motion.p>
          </div>

          <p
            className={clsx(
              "max-w-prose t-body-l text-ink-mute leading-relaxed",
              "max-md:mt-28 md:mt-16",
            )}
          >
            Elvis Fernandes — a Senior Product Designer building intelligent
            systems at the intersection of design, engineering, and AI.
          </p>

          <EditorialOpeningNavActions />
        </div>
      </div>
    </section>
  );
}

/**
 * Reduced-motion variant — both halves of the thought are shown statically,
 * editorial in pacing rather than scroll-paced. Equally considered, never degraded.
 */
function OpeningLineStill() {
  return (
    <section
      className="relative min-h-svh px-[var(--gutter)] pt-32 pb-16 md:pb-20"
      aria-labelledby="opening-line"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <Eyebrow className="mb-12 md:mb-20">
        PORTFOLIO&nbsp;·&nbsp;2026&nbsp;·&nbsp;V1
      </Eyebrow>
      <h1
        id="opening-line"
        className="max-md:!leading-[1.08] t-display-xl font-display text-ink"
      >
        I design products people can understand, trust, and actually{" "}
        <span className="italic text-ink-mute">enjoy using</span>.
      </h1>
      <p className="mt-12 max-w-prose leading-relaxed t-body-l text-ink-mute">
        Elvis Fernandes — a Senior Product Designer building intelligent
        systems at the intersection of design, engineering, and AI.
      </p>
      <EditorialOpeningNavActions />
    </section>
  );
}
