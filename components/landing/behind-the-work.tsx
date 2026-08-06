"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { Section } from "@/components/primitives/section";
import { ThemeAwareImage } from "@/components/theme/theme-aware-image";
import { getCaseStudy } from "@/content/case-studies";

const STUDY_SLUG = "designing-my-design-portfolio";
const HREF = `/work/${STUDY_SLUG}`;
const PREVIEW_LIGHT = "/images/portfolio-process/portfolio-preview-light.png";
const PREVIEW_DARK = "/images/portfolio-process/portfolio-preview-dark.png";

/**
 * Homepage coda after Selected Work — presents the portfolio itself as a
 * process project without inserting it into the Selected Work list.
 */
export function BehindTheWork() {
  const study = getCaseStudy(STUDY_SLUG);
  if (!study) return null;

  return (
    <Section
      rhythm="movementDense"
      width="outer"
      eyebrow="BEHIND THE WORK"
      id="behind-the-work"
      tightHeader
      className="!pt-16 !pb-24 md:!pt-24 md:!pb-36 lg:!pt-28 lg:!pb-40"
    >
      <div className="max-w-2xl">
        <h2 className="font-display text-ink t-display-m md:text-[clamp(2rem,3.2vw,2.75rem)] md:leading-[1.15]">
          The process behind the portfolio.
        </h2>
        <p className="mt-5 max-w-prose t-body text-ink-mute md:mt-6 md:t-body-l">
          This portfolio became a project of its own: an evolving digital
          experience shaped through product thinking, direct-in-code design,
          continuous critique, and repeated refinement.
        </p>
      </div>

      <ProcessCard
        title={study.title}
        positioning={study.positioning}
      />
    </Section>
  );
}

function ProcessCard({
  title,
  positioning,
}: {
  title: string;
  positioning: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0.8],
  );

  return (
    <article
      ref={ref}
      className="mt-14 grid grid-cols-1 gap-10 hairline-t pt-14 md:mt-20 md:grid-cols-12 md:items-center md:gap-12 md:pt-20"
    >
      <div className="md:col-span-6 md:col-start-1">
        <motion.div
          style={{ y, opacity, borderColor: "var(--hairline)" }}
          layoutId={`film:${STUDY_SLUG}`}
          className="relative aspect-[1024/600] overflow-hidden rounded-sm border bg-canvas-raised"
        >
          <ThemeAwareImage
            lightSrc={PREVIEW_LIGHT}
            darkSrc={PREVIEW_DARK}
            alt="Elvis Fernandes portfolio homepage shown in desktop and mobile layouts"
            imageClassName="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
          />
        </motion.div>
      </div>

      <div className="flex min-w-0 flex-col justify-center md:col-span-5 md:col-start-8">
        <p className="t-mono text-ink-quiet tabular">PROCESS PROJECT</p>
        <h3 className="mt-5 font-display text-ink t-heading md:mt-6 md:text-[clamp(1.75rem,2.4vw,2.35rem)] md:leading-tight">
          <Link
            href={HREF}
            className="transition-colors duration-500 hover:text-signal"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-5 max-w-prose t-body text-ink-mute md:mt-6">
          {positioning}
        </p>

        {/* Unified metadata + CTA footer — grid keeps columns from overlapping */}
        <div className="mt-8 hairline-t pt-5 sm:mt-10 sm:pt-6">
          <div
            className="grid w-full grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6"
          >
            <p className="min-w-0 t-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-quiet tabular">
              Independent Project · UX/UI Designer · Front-end ·
              AI-assisted Workflow
            </p>
            <EditorialTextLink
              href={HREF}
              label="Explore the Process"
              arrow="external"
              tone="ink"
              external={false}
              className="justify-self-start sm:justify-self-end"
              ariaLabel={`Explore the process: ${title}`}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
