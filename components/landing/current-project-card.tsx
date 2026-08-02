"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "motion/react";
import { AscendMark } from "@/components/ascend/ascend-mark";
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
 *   2. ASCEND lockup — gold mark + wordmark + subtitle
 *   3. Short description
 *   4. Reveal-on-hover block: status + progress list
 *   5. Primary CTA — case study
 *   6. Secondary CTA — Live Figma (kept; opens in a new tab)
 *
 * The card is a surface with two keyboard-accessible destinations so the
 * case study is the primary path while Figma stays one click away.
 * Reveal content stays in the DOM (screen readers always hear it); only
 * the visual timing changes on hover / focus-within. Touch devices always
 * show the reveal — see `.current-project-*` rules in globals.css.
 */
export function CurrentProjectCard({ className }: CurrentProjectCardProps) {
  const reduced = useReducedMotionPreference();

  return (
    <motion.article
      className={clsx(
        "current-project-card group relative flex w-full flex-col rounded-sm border bg-canvas-raised p-6 md:p-7",
        "transition-[border-color,transform] duration-300",
        "hover:-translate-y-0.5 hover:border-[var(--hairline-strong)]",
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

      <div className="mt-7 grid grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-2">
        <AscendMark className="h-7 w-auto" />
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
                <span aria-hidden className="text-signal">
                  ✓
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start gap-3">
        <Link
          href={currentProject.caseStudyHref}
          className={clsx(
            "inline-flex min-h-11 items-center gap-2 t-mono text-ink tabular touch-manipulation",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
          )}
          aria-label={`${currentProject.caseStudyCtaLabel}: ${currentProject.name}`}
        >
          <span className="current-project-cta-label border-b border-current pb-[2px]">
            {currentProject.caseStudyCtaLabel}
          </span>
          <span aria-hidden className="current-project-cta-arrow inline-block">
            →
          </span>
        </Link>
        <a
          href={currentProject.figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex min-h-11 items-center gap-2 t-mono text-ink-mute tabular touch-manipulation",
            "hover:text-ink",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
          )}
          aria-label={`${currentProject.figmaCtaLabel} (opens in a new tab)`}
        >
          <span className="border-b border-current pb-[2px]">
            {currentProject.figmaCtaLabel}
          </span>
          <span aria-hidden>↗</span>
        </a>
      </div>
    </motion.article>
  );
}
