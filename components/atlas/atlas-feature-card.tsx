"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AtlasLogo } from "@/components/atlas/atlas-logo";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import {
  atlasProject,
  resolveScreenAssets,
} from "@/content/atlas/project";
import { duration, ease } from "@/lib/motion";

type AtlasFeatureCardProps = {
  className?: string;
};

const LIVE_DEMO_URL =
  atlasProject.urls.prototypeUrl ??
  "https://atlas-ui-atlas-intelligence.vercel.app/";
const STORYBOOK_URL =
  atlasProject.urls.storybookUrl ?? "https://atlas-ui-alpha.vercel.app/";
const GITHUB_URL =
  atlasProject.urls.githubUrl ?? "https://github.com/Elvisfdesign/atlas-ui";
const FIGMA_PRODUCT_URL = atlasProject.urls.figmaProductUrl;
const FIGMA_SYSTEM_URL = atlasProject.urls.figmaSystemUrl;

/** Short chips used in the left column — restrained, portfolio-native. */
const TECH_TAGS = [
  "Product Design",
  "Design Systems",
  "React",
  "Storybook",
  "AI-Assisted",
] as const;

type Capability = {
  id: string;
  title: string;
  copy: string;
};

const CAPABILITIES: readonly Capability[] = [
  {
    id: "design-system",
    title: "Design System",
    copy: "Scalable tokens and patterns.",
  },
  {
    id: "react-library",
    title: "React Library",
    copy: "Reusable, accessible components.",
  },
  {
    id: "storybook",
    title: "Storybook",
    copy: "Documented component system.",
  },
  {
    id: "live-product",
    title: "Live Product",
    copy: "Interactive enterprise experience.",
  },
] as const;

/**
 * Small geometric mark rendered inside each capability cell — kept minimal
 * so the strip reads as editorial numbering rather than iconography.
 */
function CapabilityMark({ index }: { index: number }) {
  return (
    <span
      aria-hidden
      className="t-mono text-signal tabular"
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function TechChip({ children }: { children: ReactNode }) {
  return (
    <li>
      <span
        className="inline-flex items-center rounded-sm border px-2.5 py-1 t-mono text-[0.6875rem] text-ink-mute tabular"
        style={{ borderColor: "var(--hairline)" }}
      >
        {children}
      </span>
    </li>
  );
}

/**
 * Editorial flagship card for Atlas — a full-width homepage feature.
 *
 * Structure:
 *   1. Top status row — LIVE pill + version.
 *   2. Eyebrow.
 *   3. Two-column hero: text (mark, title, description, tech tags) + product
 *      preview (theme-aware Atlas Intelligence dashboard).
 *   4. Capability strip — four-column grid of what Atlas covers.
 *   5. CTA footer — dominant Launch Live Demo + compact secondary links.
 *   6. Active-development note.
 */
export function AtlasFeatureCard({ className }: AtlasFeatureCardProps) {
  const reduced = useReducedMotionPreference();

  return (
    <motion.article
      className={clsx(
        "atlas-feature-card relative overflow-hidden rounded-sm border bg-canvas-raised",
        "transition-[border-color] duration-300",
        className,
      )}
      style={{
        borderColor: "var(--hairline)",
        boxShadow: "var(--shadow-press)",
      }}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration.slow,
        ease: ease.entrance,
        delay: 0.05,
      }}
      aria-labelledby="atlas-feature-title"
    >
      {/* 1. Top status row --------------------------------------------- */}
      <header
        className="hairline-b flex items-center justify-between gap-4 px-6 py-4 md:px-10 md:py-5"
      >
        <span
          className={clsx(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1",
            "t-mono text-[0.6875rem] text-signal tabular",
          )}
          style={{
            borderColor: "color-mix(in oklab, var(--signal) 40%, transparent)",
            background: "var(--signal-soft)",
          }}
          aria-label={`Status: ${atlasProject.libraryStatus}`}
        >
          <span className="dot-live" aria-hidden />
          LIVE
        </span>
        <span className="t-mono text-ink-faint tabular">
          v{atlasProject.version}
        </span>
      </header>

      {/* Body ---------------------------------------------------------- */}
      <div className="px-6 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8 lg:px-12 lg:pt-12">
        {/* 2. Eyebrow */}
        <p className="t-mono text-[0.6875rem] text-ink-quiet tabular">
          FLAGSHIP&nbsp;PRODUCT&nbsp;ECOSYSTEM
        </p>

        {/* 3. Main hero — text + preview */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex flex-col justify-center lg:col-span-5">
            <AtlasLogo />

            <h2
              id="atlas-feature-title"
              className="mt-8 t-display-l font-display text-ink text-balance leading-[1.08]"
            >
              Atlas UI System
            </h2>

            <p className="mt-6 max-w-[34ch] t-body-l text-ink-mute leading-relaxed">
              An enterprise product ecosystem spanning UX/UI, design systems,
              reusable React components, Storybook, and a live interactive
              product.
            </p>

            <ul
              className="mt-8 flex flex-wrap gap-2"
              role="list"
              aria-label="Atlas focus areas"
            >
              {TECH_TAGS.map((tag) => (
                <TechChip key={tag}>{tag}</TechChip>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <AtlasProductPreview />
          </div>
        </div>
      </div>

      {/* 4. Capability strip ------------------------------------------- */}
      <div
        className="hairline-t hairline-b bg-canvas-recessed"
        style={{ borderColor: "var(--hairline)" }}
      >
        <ul
          className="grid grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="What Atlas covers"
        >
          {CAPABILITIES.map((cap, index) => (
            <li
              key={cap.id}
              className={clsx(
                "flex flex-col gap-3 px-6 py-6 md:px-8 md:py-7",
                /* Below 1024 (2 cols): vertical rule between cols 1↔2, horizontal rule between rows */
                "max-lg:border-r max-lg:[&:nth-child(2n)]:border-r-0",
                "max-lg:[&:nth-child(n+3)]:border-t",
                /* 1024+ (4 cols): vertical rules only, reset at last column */
                "lg:border-r lg:[&:nth-child(4n)]:border-r-0",
              )}
              style={{ borderColor: "var(--hairline)" }}
            >
              <CapabilityMark index={index} />
              <div>
                <p className="t-mono text-ink tabular">{cap.title}</p>
                <p className="mt-1.5 t-mono text-[0.6875rem] text-ink-quiet tabular">
                  {cap.copy}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. CTA footer ------------------------------------------------- */}
      <footer
        className={clsx(
          /* Below lg: CTA on top, resources below, left-aligned.
           * lg+: CTA on the left, resources immediately to the right,
           * vertically centered. Resources size to their own content — no
           * justify-between / ml-auto / w-full stretching them across the
           * remaining space. */
          "flex flex-col items-start gap-6 px-6 py-8 md:px-10 md:py-10",
          "lg:flex-row lg:items-center lg:gap-12",
        )}
      >
        <a
          href={LIVE_DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Launch ${atlasProject.name} live demo (opens in a new tab)`}
          className={clsx(
            "atlas-feature-primary-cta group relative inline-flex items-center gap-6 rounded-sm border px-5 py-5 md:px-6 md:py-6",
            "transition-[background-color,border-color,transform,box-shadow] duration-300",
            "hover:-translate-y-0.5 hover:border-[var(--signal)] hover:bg-canvas",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
          )}
          style={{
            borderColor: "color-mix(in oklab, var(--signal) 50%, var(--hairline-strong))",
            background: "var(--signal-soft)",
          }}
        >
          <div className="min-w-0">
            <p className="t-subhead font-display text-ink leading-none">
              Launch&nbsp;Live&nbsp;Demo
            </p>
            <p className="mt-2 t-mono text-[0.6875rem] text-ink-mute tabular">
              Explore the live interactive product
            </p>
          </div>
          <span
            aria-hidden
            className="atlas-feature-primary-cta-arrow shrink-0 t-mono text-signal tabular"
          >
            ↗
          </span>
        </a>

        <nav
          aria-label="Additional Atlas resources"
          className={clsx(
            /* Two-row resource block, left-aligned. Sits alongside the CTA
             * at lg+, beneath it below lg. Content-sized in both cases —
             * no justify-between, no ml-auto, no w-full.
             *   • Container: flex-col, items-start, ~14px between rows.
             *   • Each row: flex, items-center, 28px between links.
             *   • Rows wrap only on very narrow phones (<md); nowrap
             *     everywhere the resources block fits horizontally. */
            "flex flex-col items-start gap-3.5",
          )}
        >
          <div className="flex flex-wrap items-center justify-start gap-x-7 gap-y-1 md:flex-nowrap">
            <Link
              href={atlasProject.href}
              className="t-mono link-underline !inline-flex min-h-11 items-center whitespace-nowrap text-ink tabular touch-manipulation leading-none"
              aria-label={`Read ${atlasProject.name} case study`}
            >
              Case&nbsp;Study&nbsp;→
            </Link>
            <a
              href={STORYBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono link-underline !inline-flex min-h-11 items-center whitespace-nowrap text-ink-mute tabular touch-manipulation leading-none hover:text-ink"
              aria-label="View Atlas UI Storybook (opens in a new tab)"
            >
              Storybook&nbsp;↗
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono link-underline !inline-flex min-h-11 items-center whitespace-nowrap text-ink-mute tabular touch-manipulation leading-none hover:text-ink"
              aria-label="View Atlas UI GitHub repository (opens in a new tab)"
            >
              GitHub&nbsp;↗
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-x-7 gap-y-1 md:flex-nowrap">
            <a
              href={FIGMA_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono link-underline !inline-flex min-h-11 items-center whitespace-nowrap text-ink-mute tabular touch-manipulation leading-none hover:text-ink"
              aria-label="Open Atlas Product UI in Figma (opens in a new tab)"
            >
              Product&nbsp;UI&nbsp;(Figma)&nbsp;↗
            </a>
            <a
              href={FIGMA_SYSTEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono link-underline !inline-flex min-h-11 items-center whitespace-nowrap text-ink-mute tabular touch-manipulation leading-none hover:text-ink"
              aria-label="Open Atlas Design System in Figma (opens in a new tab)"
            >
              Design&nbsp;System&nbsp;(Figma)&nbsp;↗
            </a>
          </div>
        </nav>
      </footer>

      {/* 6. Active development note ------------------------------------ */}
      <p
        className="hairline-t flex items-center gap-2 px-6 py-4 t-mono text-[0.6875rem] text-ink-quiet tabular md:px-10"
        style={{ borderColor: "var(--hairline)" }}
      >
        <span className="dot-live" aria-hidden />
        This product continues to evolve through new workflows, accessibility
        improvements, and design system refinements.
      </p>
    </motion.article>
  );
}

/**
 * Theme-aware Atlas Intelligence preview. Sources come from
 * `atlasProject.screens` (single source of truth) via `resolveScreenAssets`
 * so the preview stays in sync with the case-study gallery.
 *
 * - Light theme → `light/thumb/dashboard.jpg` (real light-mode Figma export)
 * - Dark theme → `dark/full/dashboard.png` (real dark-mode export)
 *
 * Both images are always rendered so the swap is CSS-only (no layout shift,
 * no hydration flash). Visibility is toggled via `[data-theme]` selectors on
 * `<html>` in globals.css.
 */
function AtlasProductPreview() {
  const dashboard = atlasProject.screens.find((s) => s.id === "dashboard");
  if (!dashboard) return null;

  const light = resolveScreenAssets(dashboard, "light");
  const dark = resolveScreenAssets(dashboard, "dark");
  if (!light || !dark) return null;

  const previewSizes =
    "(max-width: 1024px) 92vw, (max-width: 1440px) 55vw, 780px";
  const lightAlt = `${dashboard.alt} (Light theme.)`;
  const darkAlt = `${dashboard.alt} (Dark theme.)`;

  return (
    <div
      className={clsx(
        "atlas-feature-preview relative overflow-hidden rounded-sm border",
        "aspect-[16/10] bg-canvas-recessed",
      )}
      style={{
        borderColor: "var(--hairline)",
        boxShadow: "var(--shadow-lift)",
      }}
    >
      {/* Light-theme dashboard */}
      <Image
        src={light.thumbnailSrc}
        alt={lightAlt}
        width={light.width}
        height={light.height}
        loading="eager"
        sizes={previewSizes}
        className="atlas-feature-preview-light absolute inset-0 h-full w-full object-cover object-top"
      />
      {/* Dark-theme dashboard */}
      <Image
        src={dark.thumbnailSrc}
        alt={darkAlt}
        width={dark.width}
        height={dark.height}
        loading="eager"
        sizes={previewSizes}
        className="atlas-feature-preview-dark absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Micro-label ensuring the preview reads as a product, not decor */}
      <span
        className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 backdrop-blur-sm t-mono text-[0.6875rem] text-ink-quiet tabular"
        style={{
          borderColor: "var(--hairline)",
          background:
            "color-mix(in oklab, var(--canvas-raised) 82%, transparent)",
        }}
      >
        <span className="dot-live" aria-hidden />
        ATLAS&nbsp;INTELLIGENCE
      </span>
    </div>
  );
}
