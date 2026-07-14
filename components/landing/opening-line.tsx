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
      className="max-w-[18ch] t-display-xl font-display text-ink max-md:!leading-[1.08] sm:max-w-[20ch] lg:max-w-[16ch]"
    >
      I design products, systems,
      <br className="hidden sm:block" />
      <span className="sm:hidden"> </span>
      and the AI workflows
      <br className="hidden md:block" />
      <span className="md:hidden"> </span>
      behind them.
    </h1>
  );
}

function HeroIntro() {
  return (
    <p className="mt-8 max-w-prose t-body-l leading-relaxed text-ink-mute md:mt-10">
      Elvis Fernandes is a Senior Product Designer creating intelligent products
      at the intersection of design, systems, engineering, and AI.
    </p>
  );
}

/**
 * Movement 01 — Opening Line.
 *
 * Editorial hero: large serif headline, supporting intro, flagship Atlas card
 * balancing the right column on desktop (sticky within the hero only).
 */
export function OpeningLine() {
  return (
    <section
      className="relative px-[var(--gutter)] pt-28 pb-16 md:pt-36 md:pb-24 lg:min-h-[min(100svh,56rem)] lg:pb-28"
      aria-labelledby="opening-line"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <Eyebrow className="mb-10 md:mb-16">
        PORTFOLIO&nbsp;·&nbsp;2026&nbsp;·&nbsp;V1
      </Eyebrow>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-16">
        <div className="lg:col-span-7 xl:col-span-8">
          <HeroHeadline />
          <HeroIntro />
          <EditorialOpeningNavActions />
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <AtlasFeatureCard sticky className="max-lg:max-w-lg" />
        </div>
      </div>
    </section>
  );
}
