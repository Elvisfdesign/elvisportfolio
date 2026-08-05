"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { Section } from "@/components/primitives/section";
import { getCaseStudy } from "@/content/case-studies";

const STUDY_SLUG = "designing-my-design-portfolio";
const HREF = `/work/${STUDY_SLUG}`;
const PREVIEW_DESKTOP = "/images/portfolio-process/homepage-desktop.png";
const PREVIEW_MOBILE = "/images/portfolio-process/homepage-mobile.png";

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
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0.75],
  );

  return (
    <article
      ref={ref}
      className="mt-14 grid grid-cols-1 gap-10 hairline-t pt-14 md:mt-20 md:grid-cols-12 md:gap-12 md:pt-20"
    >
      <div className="md:col-span-6 md:col-start-1">
        <motion.div
          style={{ y, opacity, borderColor: "var(--hairline)" }}
          layoutId={`film:${STUDY_SLUG}`}
          className="relative aspect-[16/10] overflow-hidden rounded-sm border bg-canvas-raised md:aspect-[4/3]"
        >
          <Image
            src={PREVIEW_DESKTOP}
            alt="Desktop screenshot of the current portfolio homepage hero and navigation"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute bottom-4 right-4 w-[28%] overflow-hidden rounded-sm border sm:bottom-5 sm:right-5 sm:w-[26%] md:bottom-6 md:right-6"
            style={{
              borderColor: "var(--hairline)",
              boxShadow: "var(--shadow-press)",
              aspectRatio: "9 / 16",
            }}
          >
            <Image
              src={PREVIEW_MOBILE}
              alt="Mobile screenshot of the portfolio homepage"
              fill
              className="object-cover object-top"
              sizes="120px"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center md:col-span-5 md:col-start-8 md:pt-4">
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
        <div className="mt-8 flex flex-col gap-5 hairline-t pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pt-6">
          <span className="t-mono text-ink-quiet tabular">
            Independent Project · UX/UI · Frontend · AI-Assisted Workflow
          </span>
          <EditorialTextLink
            href={HREF}
            label="EXPLORE THE PROCESS"
            arrow="external"
            tone="ink"
            external={false}
            className="shrink-0"
            ariaLabel={`Explore the process: ${title}`}
          />
        </div>
      </div>
    </article>
  );
}
