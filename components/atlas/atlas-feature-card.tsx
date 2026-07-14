"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "motion/react";
import { AtlasLogo } from "@/components/atlas/atlas-logo";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import { atlasProject } from "@/content/atlas/project";
import { duration, ease } from "@/lib/motion";

type AtlasFeatureCardProps = {
  className?: string;
  /** Sticky within hero on large viewports only. */
  sticky?: boolean;
};

/**
 * Editorial flagship card for Atlas — balances the homepage hero on desktop.
 * Sticky only when `sticky` is set and the viewport is large enough.
 */
export function AtlasFeatureCard({
  className,
  sticky = false,
}: AtlasFeatureCardProps) {
  const reduced = useReducedMotionPreference();

  return (
    <motion.div
      className={clsx(
        sticky &&
          "lg:sticky lg:top-28 lg:self-start xl:top-32",
        className,
      )}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.slow,
        ease: ease.entrance,
        delay: 0.18,
      }}
    >
      <Link
        href={atlasProject.href}
        aria-label={`Explore ${atlasProject.name}`}
        className={clsx(
          "atlas-feature-card group relative block w-full max-w-none overflow-hidden rounded-sm border bg-canvas-raised p-7 outline-none transition-[border-color,transform,box-shadow] duration-300 md:p-8 lg:max-w-[22.5rem] xl:max-w-[24rem]",
          "hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
        )}
        style={{
          borderColor: "var(--hairline)",
          boxShadow: "var(--shadow-press)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 t-mono text-ink-mute tabular">
            <span className="dot-live" aria-hidden />
            NEW
          </span>
          <span className="t-mono text-ink-faint tabular">
            {atlasProject.version}
          </span>
        </div>

        <div className="mt-8">
          <AtlasLogo compact />
        </div>

        <p className="mt-6 max-w-[22ch] t-heading font-display text-ink leading-snug">
          {atlasProject.tagline}
        </p>

        <p className="mt-5 t-mono text-ink-quiet tabular">
          Built in public using
          <br />
          <span className="text-ink-mute">{atlasProject.builtWithLine}</span>
        </p>

        <p className="mt-6 t-mono text-[0.6875rem] text-ink-faint tabular">
          {atlasProject.metadataLabel}
        </p>

        <span className="mt-8 inline-flex min-h-11 items-center t-mono text-ink tabular transition-colors duration-300 group-hover:text-signal">
          Explore&nbsp;Atlas
          <span
            aria-hidden
            className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
