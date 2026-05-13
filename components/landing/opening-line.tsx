"use client";

import Link from "next/link";
import clsx from "clsx";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";

/** Shared layout overrides `link-underline`’s `inline-block` for aligned touch targets. */
const EDITORIAL_OPENING_LINK_CLASSES =
  "t-mono link-underline !inline-flex min-h-11 items-center touch-manipulation leading-none transition-colors relative";

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
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // First half opacity / morph
  const firstY = useTransform(scrollYProgress, [0, 0.55], [0, -40]);
  const firstOpacity = useTransform(scrollYProgress, [0, 0.45, 0.6], [1, 1, 0]);
  // Second half reveals as the first fades
  const secondY = useTransform(scrollYProgress, [0.35, 0.85], [40, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  // Subtle ambient gradient wash — 4% opacity max
  const washOpacity = useTransform(scrollYProgress, [0, 1], [0.04, 0.0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[158svh] px-[var(--gutter)] md:min-h-[186svh]"
      aria-labelledby="opening-line"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      {/* Sticky stage that holds the type while the section scrolls */}
      <div className="sticky top-0 flex min-h-svh items-center">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: washOpacity,
            background: "var(--ambient-wash)",
          }}
        />
        <div className="relative w-full pt-32 md:pt-40">
          <Eyebrow className="mb-12 md:mb-20">
            PORTFOLIO&nbsp;·&nbsp;2026&nbsp;·&nbsp;V1
          </Eyebrow>

          <div className="relative overflow-visible pb-1 md:pb-2">
            <motion.h1
              id="opening-line"
              className="t-display-xl font-display text-ink"
              style={{ y: firstY, opacity: firstOpacity }}
            >
              I design{" "}
              <span className="italic text-ink-mute">systems</span>,
              <br />
              not screens.
            </motion.h1>

            <motion.p
              aria-hidden
              className="absolute inset-0 t-display-xl font-display text-ink"
              style={{ y: secondY, opacity: secondOpacity }}
            >
              And the systems
              <br />
              are{" "}
              <span className="italic">
                getting smarter
              </span>
              .
            </motion.p>
          </div>

          <p className="mt-16 max-w-prose t-body-l text-ink-mute">
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
        className="t-display-xl font-display text-ink"
      >
        I design <span className="italic text-ink-mute">systems</span>,
        <br />
        not screens.
      </h1>
      <p className="mt-12 t-display-m font-display text-ink-mute">
        And the systems are <span className="italic">getting smarter</span>.
      </p>
      <p className="mt-12 max-w-prose t-body-l text-ink-mute">
        Elvis Fernandes — a Senior Product Designer building intelligent
        systems at the intersection of design, engineering, and AI.
      </p>
      <EditorialOpeningNavActions />
    </section>
  );
}
