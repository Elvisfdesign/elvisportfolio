"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArtifactSurface } from "@/components/primitives/artifact-surface";
import { MetadataStrip } from "@/components/primitives/metadata-strip";
import { PullQuote } from "@/components/primitives/pull-quote";
import { ReadingColumn } from "@/components/primitives/reading-column";
import { FadeRise } from "@/components/motion/fade-rise";
import { MaskUp } from "@/components/motion/mask-up";
import { VisualStub } from "./visual-stub";
import {
  BEAT_LABEL,
  BEAT_ORDER,
  type CaseStudy,
  type ContentBlock,
  type Beat,
} from "@/content/case-studies/types";

/**
 * The nine-beat case study renderer. Same template for every study.
 * Consistency = systems thinking.
 */
export function CaseStudyRenderer({ study }: { study: CaseStudy }) {
  // Group blocks by beat for sectioning
  const grouped = new Map<Beat, ContentBlock[]>();
  for (const b of study.blocks) {
    const arr = grouped.get(b.beat) ?? [];
    arr.push(b);
    grouped.set(b.beat, arr);
  }

  const hasEditorialRefLinks = !!(study.prototypeUrl || study.journalUrl);

  return (
    <article className="pt-32">
      {/* Beat 00 — Editorial Cover */}
      <header
        className="px-[var(--gutter)] py-16 md:py-24"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="t-mono text-ink-quiet tabular">
              {study.index} · CASE&nbsp;STUDY · {study.reading.toUpperCase()}
            </p>
            <h1 className="mt-8 t-display-xl font-display text-ink">
              <MaskUp>{study.title}</MaskUp>
            </h1>
            <FadeRise delay={0.15} className="mt-10 max-w-prose">
              <p className="t-body-l text-ink-mute">{study.thesis}</p>
            </FadeRise>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:pt-8">
            <FadeRise delay={0.25}>
              <MetadataStrip
                className="flex-col items-start gap-y-4"
                items={[
                  { label: "ROLE", value: study.meta.role },
                  { label: "YEAR", value: study.meta.year },
                  { label: "TEAM", value: study.meta.team },
                  { label: "SURFACE", value: study.meta.surface },
                  { label: "STATUS", value: study.meta.status },
                ]}
              />
              {study.prototypeUrl || study.journalUrl ? (
                <EditorialCaseStudyRefLinks
                  study={study}
                  showNote
                  className="mt-8 min-w-0 md:max-w-none"
                />
              ) : null}
            </FadeRise>
          </div>
        </div>

        {/* Shared element — landing card → cover hero ambient */}
        <motion.div
          layoutId={`film:${study.slug}`}
          className="mt-12 md:mt-16 aspect-[3/2] md:aspect-[21/9] overflow-hidden rounded-sm border bg-canvas-raised"
          style={{ borderColor: "var(--hairline)" }}
        >
          <CoverHero study={study} />
        </motion.div>
      </header>

      {/* Beats 01–08 */}
      {BEAT_ORDER.slice(1).map((beat) => {
        const blocks = grouped.get(beat);
        if (!blocks || blocks.length === 0) return null;
        return (
          <BeatSection key={beat} beat={beat}>
            {blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </BeatSection>
        );
      })}

      <footer
        className={
          hasEditorialRefLinks
            ? "hairline-t mt-32 px-[var(--gutter)] pt-14 pb-16"
            : "hairline-t mt-32 px-[var(--gutter)] py-16"
        }
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        {hasEditorialRefLinks ? (
          <div className="hairline-b mb-12 pb-12">
            <FadeRise>
              <EditorialCaseStudyRefLinks study={study} className="max-w-prose" />
            </FadeRise>
          </div>
        ) : null}

        <p className="t-mono text-ink-quiet tabular">NEXT CASE STUDY</p>
        <Link
          href={
            study.next.slug === "ai-for-product-designers"
              ? `/practice/${study.next.slug}`
              : `/work/${study.next.slug}`
          }
          className="group mt-6 flex flex-wrap items-baseline justify-between gap-6"
        >
          <h2 className="t-display-l font-display text-ink transition-colors duration-500 group-hover:text-signal">
            {study.next.title}
          </h2>
          <span className="t-mono link-underline text-ink-mute group-hover:text-ink">
            CONTINUE&nbsp;→
          </span>
        </Link>
      </footer>
    </article>
  );
}

/** Prototype + Design Journal row — hero and footer reuse the same markup. */
function EditorialCaseStudyRefLinks({
  study,
  showNote = false,
  className,
}: {
  study: CaseStudy;
  /** When true, renders `heroLinksNote` below the links (cover hero only). */
  showNote?: boolean;
  className?: string;
}) {
  if (!study.prototypeUrl && !study.journalUrl) return null;

  return (
    <div className={className}>
      <div className="min-w-0 overflow-x-auto overscroll-x-contain pb-0.5 [-webkit-overflow-scrolling:touch]">
        <p className="inline-flex min-w-0 flex-nowrap items-baseline gap-x-3 t-mono text-ink tabular">
          {study.prototypeUrl ? (
            <a
              href={study.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${study.prototypeLabel ?? "View Prototype"} (opens in a new tab)`}
              className="shrink-0 whitespace-nowrap link-underline decoration-from-font underline-offset-[0.15em] transition-colors hover:text-signal touch-manipulation"
            >
              {study.prototypeLabel ?? "View Prototype"}&nbsp;↗
            </a>
          ) : null}
          {study.prototypeUrl && study.journalUrl ? (
            <span aria-hidden className="shrink-0 select-none text-ink-quiet">
              |
            </span>
          ) : null}
          {study.journalUrl ? (
            <a
              href={study.journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${study.journalLabel ?? "Design Journal"} (opens in a new tab)`}
              className="case-study-journal-link shrink-0 whitespace-nowrap link-underline decoration-from-font underline-offset-[0.15em] touch-manipulation"
            >
              {study.journalLabel ?? "Design Journal"}&nbsp;↗
            </a>
          ) : null}
        </p>
      </div>
      {showNote && study.heroLinksNote ? (
        <p className="mt-3 font-mono text-[0.6875rem] leading-snug text-ink-faint">
          {study.heroLinksNote}
        </p>
      ) : null}
    </div>
  );
}

function BeatSection({
  beat,
  children,
}: {
  beat: Beat;
  children: React.ReactNode;
}) {
  return (
    <section
      className="px-[var(--gutter)] py-24 md:py-32"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <header className="hairline-b mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-4">
        <span className="t-mono text-ink-quiet tabular">{BEAT_LABEL[beat]}</span>
      </header>
      <div className="space-y-12">{children}</div>
    </section>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "prose":
      return (
        <FadeRise>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              {block.eyebrow && (
                <p className="t-mono text-ink-quiet tabular">{block.eyebrow}</p>
              )}
              {block.headingFragments && block.headingFragments.length > 0 ? (
                  <h3 className="mt-2 t-heading font-display text-ink">
                    {block.headingFragments.map((part, i) =>
                      part.type === "link" ? (
                        <a
                          key={i}
                          href={part.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${part.text} (opens in a new tab)`}
                          className="link-underline decoration-from-font underline-offset-[0.15em] transition-colors hover:text-signal"
                        >
                          {part.text}
                        </a>
                      ) : (
                        <span key={i}>{part.text}</span>
                      ),
                    )}
                  </h3>
                ) : (
                block.heading && (
                  <h3 className="mt-2 t-heading font-display text-ink">
                    {block.heading}
                  </h3>
                )
                )}
            </div>
            <ReadingColumn className="md:col-span-7 md:col-start-5">
              <div className="space-y-6">
                {block.body.map((p, i) => (
                  <p key={i} className="t-body-l text-ink-mute">
                    {p}
                  </p>
                ))}
              </div>
            </ReadingColumn>
          </div>
        </FadeRise>
      );
    case "artifact":
      return (
        <FadeRise>
          <div className="md:ml-[33%]" style={{ maxWidth: "var(--max-prose)" }}>
            <ArtifactSurface label={block.label} meta={block.meta}>
              {block.lines.join("\n")}
            </ArtifactSurface>
          </div>
        </FadeRise>
      );
    case "pull-quote":
      return (
        <FadeRise>
          <ReadingColumn size="reading">
            <PullQuote attribution={block.attribution}>{block.text}</PullQuote>
          </ReadingColumn>
        </FadeRise>
      );
    case "image":
      return (
        <FadeRise>
          <VisualStub
            kind={block.stub ?? "screen"}
            aspect={block.aspect ?? "16/9"}
            alt={block.alt}
            caption={block.caption}
          />
        </FadeRise>
      );
    case "image-grid":
      return (
        <FadeRise>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {block.images.map((img, i) => (
              <VisualStub
                key={i}
                kind={img.stub ?? "screen"}
                aspect={img.aspect ?? "4/3"}
                alt={img.alt}
                index={String(i + 1).padStart(2, "0")}
              />
            ))}
          </div>
          {block.caption && (
            <p className="mt-3 t-mono text-ink-quiet tabular">
              {block.caption}
            </p>
          )}
        </FadeRise>
      );
    case "metric-row":
      return (
        <FadeRise>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {block.items.map((m, i) => (
              <li
                key={i}
                className="hairline-t pt-4 md:pt-6"
              >
                <span className="block t-display-m font-display text-ink tabular">
                  {m.value}
                </span>
                <span className="mt-2 block t-mono text-ink-mute">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </FadeRise>
      );
    case "cta":
      return (
        <FadeRise>
          <div className="md:ml-[33%]" style={{ maxWidth: "var(--max-prose)" }}>
            <a
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono link-underline text-ink tabular touch-manipulation"
            >
              {block.label}
              &nbsp;→
            </a>
          </div>
        </FadeRise>
      );
    default:
      return null;
  }
}

function CoverHero({ study }: { study: CaseStudy }) {
  // Composite cover — same family as landing AmbientPanel but wider/calmer.
  return (
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
      <div className="absolute left-8 top-8 t-mono text-ink-mute tabular">
        {study.index} · {study.ambient.toUpperCase()}
      </div>
      <div className="absolute right-8 top-8 t-mono text-ink-faint tabular">
        COVER
      </div>
      <div className="absolute inset-x-0 bottom-0 px-8 py-6">
        <p className="t-mono text-ink-mute tabular">
          {study.meta.role.toUpperCase()} · {study.meta.team.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
