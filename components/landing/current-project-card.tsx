"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion } from "motion/react";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import { currentProject } from "@/content/current-project";
import { duration, ease } from "@/lib/motion";

type CurrentProjectCardProps = {
  className?: string;
};

/**
 * Editorial "currently building" card for the hero side column.
 *
 * Structure (top → bottom):
 *   1. Eyebrow
 *   2. ASCEND lockup — gold triangle mark + wordmark + subtitle
 *   3. Short description
 *   4. Reveal-on-hover block: status + progress list
 *   5. CTA — "View Live Figma →"
 *
 * The entire card is a single external link so it is one clean keyboard target
 * with a visible focus ring. Reveal content stays in the DOM (screen readers
 * always hear it); only the visual timing changes on hover / focus-within.
 * Touch devices always show the reveal because there is no hover to trigger
 * it — see `.current-project-*` rules in globals.css.
 */
export function CurrentProjectCard({ className }: CurrentProjectCardProps) {
  const reduced = useReducedMotionPreference();

  return (
    <motion.a
      href={currentProject.figmaUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${currentProject.name} — ${currentProject.subtitle}. ${currentProject.ctaLabel} (opens in a new tab).`}
      className={clsx(
        "current-project-card group relative flex w-full flex-col rounded-sm border bg-canvas-raised p-6 md:p-7",
        "transition-[border-color,transform] duration-300",
        "hover:-translate-y-0.5 hover:border-[var(--hairline-strong)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
        className,
      )}
      style={{
        borderColor: "var(--hairline)",
        boxShadow: "var(--shadow-press)",
      }}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: duration.slow,
        ease: ease.entrance,
        delay: 0.35,
      }}
    >
      <p className="t-mono text-[0.6875rem] text-ink-quiet tabular">
        {currentProject.eyebrow}
      </p>

      {/* Brand lockup — icon and wordmark share row 1 with items-center so
           their optical centers align (a single cohesive mark, not two
           stacked elements). Subtitle drops into row 2, col 2 so it stays
           directly beneath the wordmark, aligned to its left edge, no
           matter what size the icon becomes. Gap sits inside 12–16 px. */}
      <div className="mt-7 grid grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-2">
        <Image
          src={currentProject.logo.src}
          alt=""
          width={currentProject.logo.width}
          height={currentProject.logo.height}
          priority={false}
          unoptimized
          className="h-7 w-auto shrink-0 select-none"
        />
        <p className="min-w-0 t-heading font-display text-ink leading-none tracking-[-0.01em]">
          {currentProject.name}
        </p>
        <p className="col-start-2 min-w-0 t-mono text-[0.6875rem] text-ink-quiet tabular">
          {currentProject.subtitle}
        </p>
      </div>

      <p className="mt-6 t-body text-ink-mute leading-relaxed">
        {currentProject.description}
      </p>

      <div className="current-project-reveal mt-6">
        <div
          className="hairline-t pt-5"
          style={{ borderColor: "var(--hairline)" }}
        >
          <p className="inline-flex items-center gap-2 t-mono text-[0.6875rem] text-signal tabular">
            <span className="dot-live" aria-hidden />
            {currentProject.status}
          </p>
          <p className="mt-5 t-mono text-[0.6875rem] text-ink-quiet tabular">
            CURRENT&nbsp;PROGRESS
          </p>
          <ul
            className="mt-2.5 flex flex-col gap-1.5"
            role="list"
            aria-label={`${currentProject.name} recent progress`}
          >
            {currentProject.progress.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-2 t-mono text-[0.75rem] text-ink-mute tabular"
              >
                <span aria-hidden className="text-ink-faint">
                  •
                </span>
                <span className="flex-1">{item}</span>
                <span aria-label="Complete" className="text-signal">
                  ✓
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-7 flex items-center gap-2 t-mono text-ink tabular">
        <span className="current-project-cta-label border-b border-current pb-[2px]">
          {currentProject.ctaLabel}
        </span>
        <span aria-hidden className="current-project-cta-arrow inline-block">
          →
        </span>
      </p>
    </motion.a>
  );
}
