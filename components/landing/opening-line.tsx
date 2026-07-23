"use client";

import Link from "next/link";
import clsx from "clsx";
import { AtlasFeatureCard } from "@/components/atlas/atlas-feature-card";
import { Eyebrow } from "@/components/primitives/eyebrow";

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
      <Link
        href="/atlas"
        className={clsx(EDITORIAL_OPENING_LINK_CLASSES, "text-ink")}
        aria-label="Explore Atlas UI System"
      >
        EXPLORE&nbsp;ATLAS&nbsp;→
      </Link>
      <OpeningEditorialHairlineMark />
      <a
        href="#films"
        className={clsx(
          EDITORIAL_OPENING_LINK_CLASSES,
          "text-ink-quiet hover:text-ink",
        )}
        aria-label="Jump to selected work"
      >
        VIEW&nbsp;SELECTED&nbsp;WORK&nbsp;↓
      </a>
      <OpeningEditorialHairlineMark className="hidden lg:block" />
      <Link
        href="/about#meet"
        className={clsx(
          EDITORIAL_OPENING_LINK_CLASSES,
          "hidden text-ink-quiet hover:text-ink lg:inline-flex",
        )}
        aria-label="Meet Elvis Fernandes — about who builds this portfolio"
      >
        MEET&nbsp;ELVIS&nbsp;→
      </Link>
    </div>
  );
}

function HeroHeadline() {
  return (
    <h1
      id="opening-line"
      className="max-w-[18ch] t-display-xl font-display text-ink max-md:!leading-[1.08] sm:max-w-[22ch] lg:max-w-[24ch]"
    >
      I design products, systems,
      <br className="hidden sm:block" />
      <span className="sm:hidden"> </span>
      and front-end experiences.
    </h1>
  );
}

function HeroIntro() {
  return (
    <p className="mt-8 max-w-prose t-body-l leading-relaxed text-ink-mute md:mt-10">
      Elvis Fernandes designs and builds thoughtful UX/UI, scalable design
      systems, and front-end experiences.
    </p>
  );
}

/**
 * Movement 01 — Opening Line.
 *
 * Editorial hero: large serif headline, supporting intro, and a full-width
 * flagship Atlas feature card that anchors the movement. The card lives
 * inside the same section so it inherits the opening rhythm without
 * introducing a new movement number.
 */
export function OpeningLine() {
  return (
    <section
      className="relative px-[var(--gutter)] pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-28"
      aria-labelledby="opening-line"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <Eyebrow className="mb-10 md:mb-16">
        PORTFOLIO&nbsp;·&nbsp;2026&nbsp;·&nbsp;V1
      </Eyebrow>

      <div className="max-w-[64rem]">
        <HeroHeadline />
        <HeroIntro />
        <EditorialOpeningNavActions />
      </div>

      <div className="mt-20 md:mt-28 lg:mt-32">
        <AtlasFeatureCard />
      </div>
    </section>
  );
}
