"use client";

import { motion } from "motion/react";

/**
 * The shared-element ambient hero that lives at the top of every case study
 * and practice page. Matches the landing FeaturedFilms card via layoutId.
 */
export function SharedFilmHero({
  slug,
  ambient,
  index,
}: {
  slug: string;
  ambient: string;
  index: string;
}) {
  return (
    <motion.div
      layoutId={`film:${slug}`}
      className="mt-12 md:mt-16 aspect-[3/2] md:aspect-[21/9] overflow-hidden rounded-sm border bg-canvas-raised"
      style={{ borderColor: "var(--hairline)" }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--cover-deep) 0%, var(--cover-base) 100%)",
          }}
        />
        <svg
          aria-hidden
          viewBox="0 0 1200 514"
          className="absolute inset-0 h-full w-full text-ink opacity-[0.16]"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              x2="1200"
              y1={i * 28}
              y2={i * 28}
              stroke="currentColor"
              strokeOpacity="0.5"
            />
          ))}
        </svg>
        <div className="absolute left-4 top-4 md:left-8 md:top-8 t-mono text-ink-mute tabular">
          {index} · {ambient.toUpperCase()}
        </div>
        <div className="absolute right-4 top-4 md:right-8 md:top-8 t-mono text-ink-faint tabular">
          COVER
        </div>
      </div>
    </motion.div>
  );
}
