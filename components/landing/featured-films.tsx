"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ExtendedPortfolioArchive } from "@/components/landing/extended-portfolio-archive";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { Section } from "@/components/primitives/section";
import { getCaseStudy, type CaseStudy } from "@/content/case-studies";
import { ascendProject } from "@/content/ascend/project";
import { atlasProject } from "@/content/atlas/project";
import { practicePiece } from "@/content/practice/ai-for-product-designers";

type Film = {
  href: string;
  index: string;
  title: string;
  positioning: string;
  ambient: string;
  meta: string;
  kind: "case-study" | "practice" | "atlas" | "ascend";
  layoutId: string;
  /** Optional restrained type marker, e.g. "Professional Work". */
  projectType?: string;
};

function caseStudyFilm(c: CaseStudy): Film {
  return {
    href: `/work/${c.slug}`,
    index: c.index,
    title: c.title,
    positioning: c.positioning,
    ambient: c.ambient,
    meta: `${c.meta.role} · ${c.meta.year}`,
    kind: "case-study",
    layoutId: `film:${c.slug}`,
    projectType: c.projectType,
  };
}

function requireStudy(slug: string): CaseStudy {
  const c = getCaseStudy(slug);
  if (!c) throw new Error(`Missing case study: ${slug}`);
  return c;
}

const practiceFilm: Film = {
  href: "/practice/ai-for-product-designers",
  index: practicePiece.index,
  title: practicePiece.title,
  positioning: practicePiece.positioning,
  ambient: practicePiece.ambient,
  meta: `${practicePiece.meta.role} · ${practicePiece.meta.year}`,
  kind: "practice",
  layoutId: `film:${practicePiece.slug}`,
};

const atlasFilm: Film = {
  href: atlasProject.href,
  index: "01",
  title: atlasProject.name,
  positioning: atlasProject.description,
  ambient: atlasProject.eyebrow,
  meta: atlasProject.libraryStatus,
  kind: "atlas",
  layoutId: "film:atlas",
};

const ascendFilm: Film = {
  href: ascendProject.href,
  index: "02",
  title: ascendProject.name,
  positioning: ascendProject.description,
  ambient: ascendProject.eyebrow,
  meta: ascendProject.statusLabel,
  kind: "ascend",
  layoutId: "film:ascend",
};

/** Homepage order · flagships first, then existing case studies + practice. */
const films: Film[] = [
  { ...ascendFilm, index: "01" },
  { ...atlasFilm, index: "02" },
  { ...caseStudyFilm(requireStudy("voice-moderation")), index: "03" },
  { ...practiceFilm, index: "04" },
  { ...caseStudyFilm(requireStudy("career-navigator")), index: "05" },
  { ...caseStudyFilm(requireStudy("signal")), index: "06" },
];

export function FeaturedFilms() {
  return (
    <Section
      rhythm="movementDense"
      width="outer"
      eyebrow="SELECTED WORK"
      number="02 / 07"
      id="films"
      tightHeader
      className="!pt-10 !pb-24 md:!pt-16 md:!pb-36 lg:!pt-20 lg:!pb-44"
    >
      <div className="space-y-24 md:space-y-40 lg:space-y-48">
        {films.map((film, i) => (
          <FilmSpread key={film.href} film={film} reverse={i % 2 === 1} />
        ))}
        <ExtendedPortfolioArchive />
      </div>
    </Section>
  );
}

function FilmSpread({ film, reverse }: { film: Film; reverse: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Faint parallax on the ambient panel — narrative-driven, not decoration.
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);
  const isFlagship = film.kind === "atlas" || film.kind === "ascend";

  return (
    <article ref={ref} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
      <div
        className={
          isFlagship
            ? reverse
              ? "md:col-span-6 md:col-start-7 md:order-2"
              : "md:col-span-6 md:col-start-1"
            : reverse
              ? "md:col-span-5 md:col-start-8 md:order-2"
              : "md:col-span-5 md:col-start-1"
        }
      >
        <motion.div
          style={{ y, opacity }}
          layoutId={film.layoutId}
          className="relative aspect-[4/5] overflow-hidden rounded-sm bg-canvas-raised"
        >
          <AmbientPanel index={film.index} ambient={film.ambient} kind={film.kind} />
        </motion.div>
      </div>

      <div
        className={
          isFlagship
            ? reverse
              ? "md:col-span-5 md:col-start-1 md:order-1 md:pt-10"
              : "md:col-span-5 md:col-start-8 md:pt-10"
            : reverse
              ? "md:col-span-6 md:col-start-1 md:order-1 md:pt-12"
              : "md:col-span-6 md:col-start-7 md:pt-12"
        }
      >
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="t-mono text-ink-quiet tabular">{film.index}</span>
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 t-mono text-ink-quiet tabular">
            <span>
              {film.kind === "practice"
                ? "PRACTICE"
                : isFlagship
                  ? "FLAGSHIP"
                  : "CASE STUDY"}
            </span>
            {film.projectType ? (
              <>
                <span aria-hidden className="text-ink-faint">
                  ·
                </span>
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                  />
                  <span>{film.projectType.toUpperCase()}</span>
                </span>
              </>
            ) : null}
          </span>
        </div>

        <h3 className="mt-6 t-display-l font-display text-ink">
          <Link href={film.href} className="hover:text-signal transition-colors duration-500">
            {film.title}
          </Link>
        </h3>

        <p className="mt-6 max-w-prose t-body-l text-ink-mute">
          {film.positioning}
        </p>

        <div className="mt-10 flex items-center gap-8 hairline-t pt-6">
          <span className="t-mono text-ink-quiet tabular">{film.meta}</span>
          <EditorialTextLink
            href={film.href}
            label={isFlagship ? "EXPLORE" : "ENTER"}
            arrow="forward"
            tone="ink"
            className="shrink-0"
            ariaLabel={
              isFlagship
                ? `Explore ${film.title}`
                : `Enter case study: ${film.title}`
            }
          />
        </div>
      </div>
    </article>
  );
}

/**
 * AmbientPanel — a designed stand-in for the looping video preview.
 * Each kind gets a different abstract treatment that hints at the case study.
 * These are real visual artifacts, not placeholders. When real footage exists,
 * this component swaps to <video> seamlessly.
 */
function AmbientPanel({
  index,
  ambient,
  kind,
}: {
  index: string;
  ambient: string;
  kind: Film["kind"];
}) {
  return (
    <div className="relative h-full w-full">
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, var(--cover-deep) 0%, var(--cover-base) 100%)`,
        }}
      />
      {/* Hairline grid — system-thinker signature */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
        viewBox="0 0 400 500"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            x2="400"
            y1={i * 32}
            y2={i * 32}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-ink"
          />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={`v${i}`}
            y1="0"
            y2="500"
            x1={i * 32}
            x2={i * 32}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-ink"
          />
        ))}
      </svg>

      {/* Signal mark — a single live dot in the corner */}
      <div className="absolute left-6 top-6 flex items-center gap-2">
        <span className="dot-live" aria-hidden />
        <span className="t-mono text-ink-mute tabular">{index}</span>
      </div>

      {/* Glyph — kind-specific abstract */}
      <div className="absolute inset-0 flex items-center justify-center">
        <KindGlyph kind={kind} index={index} />
      </div>

      {/* Caption strip at bottom */}
      <div className="absolute inset-x-0 bottom-0 px-6 py-4">
        <p className="t-mono text-ink-mute tabular">{ambient.toUpperCase()}</p>
      </div>
    </div>
  );
}

function KindGlyph({
  kind,
  index,
}: {
  kind: Film["kind"];
  index: string;
}) {
  // Each kind gets a different abstract — same family, distinct character.
  if (kind === "atlas") {
    return (
      <svg viewBox="0 0 200 200" className="h-1/2 w-1/2 text-signal" aria-hidden>
        <path d="M100 28 L172 172 H28 Z" fill="currentColor" opacity="0.9" />
      </svg>
    );
  }
  if (kind === "ascend") {
    return (
      <svg
        viewBox="0 0 32 20"
        className="h-[28%] w-[44%]"
        fill="var(--ascend-gold)"
        aria-hidden
      >
        <path d="M12.1053 4.73684L15.7895 0L19.4737 4.73684L15.7895 8.94737L12.1053 4.73684Z" />
        <path d="M0 20L11.0526 5.78947L14.7368 10.5263L7.89474 20H0Z" />
        <path d="M20.5263 5.78947L16.8421 10L23.6842 20H31.0526L20.5263 5.78947Z" />
        <path d="M9.47368 20L15.7895 11.5789L21.5789 20H9.47368Z" />
      </svg>
    );
  }
  if (kind === "practice") {
    return (
      <svg viewBox="0 0 200 200" className="h-2/3 w-2/3 text-ink-mute" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={20 + i * 7}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity={1 - i * 0.07}
          />
        ))}
        <circle cx="100" cy="100" r="4" fill="var(--signal)" />
      </svg>
    );
  }
  const n = parseInt(index, 10) || 0;
  return (
    <svg viewBox="0 0 200 200" className="h-2/3 w-2/3 text-ink-mute" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={20 + i * 4}
          y={20 + i * 4}
          width={160 - i * 8}
          height={160 - i * 8}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity={0.8 - i * 0.08}
          transform={`rotate(${n * 6 + i * 2} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="3" fill="var(--signal)" />
    </svg>
  );
}
