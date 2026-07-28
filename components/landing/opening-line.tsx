"use client";

import Link from "next/link";
import clsx from "clsx";
import { AtlasFeatureCard } from "@/components/atlas/atlas-feature-card";
import { CurrentProjectCard } from "@/components/landing/current-project-card";
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
 * Editorial hero: large serif headline + supporting intro on the left, a
 * small "currently building" card filling the right-column whitespace on
 * desktop. Below `lg`, the currently-building card drops inline beneath the
 * primary CTA group so nothing competes with the headline. The full-width
 * flagship Atlas feature card follows in the same movement.
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

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-16">
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          <HeroHeadline />
          <HeroIntro />
          <EditorialOpeningNavActions />
          {/* Inline placement below the primary CTA group on tablet + mobile.
              Hidden on lg+ where the card lives in the right column instead. */}
          <div className="mt-14 md:mt-16 lg:hidden">
            <CurrentProjectCard />
          </div>
        </div>

        {/* Desktop-only right column. Rendered as a display: none block below
            lg so screen readers only see the inline instance above. */}
        <div className="hidden lg:col-span-5 lg:block xl:col-span-4">
          <CurrentProjectCard />
        </div>
      </div>

      <div className="mt-20 md:mt-28 lg:mt-32">
        <AtlasFeatureCard />
      </div>
    </section>
  );
}
