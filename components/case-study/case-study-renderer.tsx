"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FadeRise } from "@/components/motion/fade-rise";
import { MaskUp } from "@/components/motion/mask-up";
import { ArtifactSurface } from "@/components/primitives/artifact-surface";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { MetadataStrip } from "@/components/primitives/metadata-strip";
import { PullQuote } from "@/components/primitives/pull-quote";
import { ReadingColumn } from "@/components/primitives/reading-column";
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
  const isEssay = study.layout === "essay";

  return (
    <article className="pt-32">
      {/* Beat 00 — Editorial Cover */}
      <header
        className={
          isEssay
            ? "px-[var(--gutter)] py-12 md:py-16"
            : "px-[var(--gutter)] py-16 md:py-24"
        }
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="t-mono text-ink-quiet tabular">
              {study.index} ·{" "}
              {isEssay ? "PROCESS ESSAY" : "CASE STUDY"} ·{" "}
              {study.reading.toUpperCase()}
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

        {/* Shared element — landing card → cover. Essay studies skip the large media band. */}
        {study.hideCoverMedia ? (
          <motion.div
            layoutId={`film:${study.slug}`}
            className="mt-10 h-px w-full max-w-prose bg-transparent md:mt-12"
            aria-hidden
          />
        ) : (
          <motion.div
            layoutId={`film:${study.slug}`}
            className="mt-12 md:mt-16 aspect-[3/2] md:aspect-[21/9] overflow-hidden rounded-sm border bg-canvas-raised"
            style={{ borderColor: "var(--hairline)" }}
          >
            <CoverHero study={study} />
          </motion.div>
        )}
      </header>

      {/* Beats 01–08 */}
      {BEAT_ORDER.slice(1).map((beat) => {
        const blocks = grouped.get(beat);
        if (!blocks || blocks.length === 0) return null;
        return (
          <BeatSection
            key={beat}
            beat={beat}
            label={study.beatLabels?.[beat]}
            dense={isEssay}
          >
            {blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </BeatSection>
        );
      })}

      <footer
        className={
          hasEditorialRefLinks
            ? `hairline-t px-[var(--gutter)] pt-14 pb-16 ${isEssay ? "mt-16 md:mt-20" : "mt-32"}`
            : `hairline-t px-[var(--gutter)] py-16 ${isEssay ? "mt-16 md:mt-20" : "mt-32"}`
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
            <EditorialTextLink
              href={study.prototypeUrl}
              label={study.prototypeLabel ?? "View Prototype"}
              arrow="external"
              tone="ink"
              ariaLabel={`${study.prototypeLabel ?? "View Prototype"} (opens in a new tab)`}
              className="shrink-0 whitespace-nowrap"
            />
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
  label,
  dense = false,
  children,
}: {
  beat: Beat;
  label?: string;
  dense?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        dense
          ? "px-[var(--gutter)] py-14 md:py-20"
          : "px-[var(--gutter)] py-24 md:py-32"
      }
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <header
        className={
          dense
            ? "hairline-b mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-3"
            : "hairline-b mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-4"
        }
      >
        <span className="t-mono text-ink-quiet tabular">
          {label ?? BEAT_LABEL[beat]}
        </span>
      </header>
      <div className={dense ? "space-y-8" : "space-y-12"}>{children}</div>
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
          {block.src ? (
            <CaseStudyPhoto
              src={block.src}
              alt={block.alt}
              aspect={block.aspect ?? "16/9"}
              caption={block.caption}
            />
          ) : (
            <VisualStub
              kind={block.stub ?? "screen"}
              aspect={block.aspect ?? "16/9"}
              alt={block.alt}
              caption={block.caption}
            />
          )}
        </FadeRise>
      );
    case "image-grid":
      return (
        <FadeRise>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {block.images.map((img, i) =>
              img.src ? (
                <CaseStudyPhoto
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  aspect={img.aspect ?? "4/3"}
                />
              ) : (
                <VisualStub
                  key={i}
                  kind={img.stub ?? "screen"}
                  aspect={img.aspect ?? "4/3"}
                  alt={img.alt}
                  index={String(i + 1).padStart(2, "0")}
                />
              ),
            )}
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
    case "cta": {
      const isHttp =
        block.href.startsWith("http://") || block.href.startsWith("https://");
      return (
        <FadeRise>
          <div className="md:ml-[33%]" style={{ maxWidth: "var(--max-prose)" }}>
            <EditorialTextLink
              href={block.href}
              label={block.label}
              arrow={isHttp ? "external" : "forward"}
              tone="ink"
              external={isHttp}
            />
          </div>
        </FadeRise>
      );
    }
    case "checklist":
      return (
        <FadeRise>
          <ol className="md:ml-[33%] grid list-none grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-10"
            style={{ maxWidth: "calc(var(--max-prose) + 8rem)" }}
          >
            {block.items.map((item, i) => (
              <li key={i} className="hairline-t flex gap-4 py-4">
                <span className="t-mono text-ink-quiet tabular shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-body text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </FadeRise>
      );
    case "principle-grid":
      return (
        <FadeRise>
          <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item) => (
              <li
                key={item.title}
                className="hairline-t flex flex-col py-5 md:py-6"
              >
                <p className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {item.title}
                </p>
                <p className="mt-2 t-body text-ink-mute">{item.body}</p>
              </li>
            ))}
          </ul>
        </FadeRise>
      );
    case "timeline":
      return (
        <FadeRise>
          <ol className="relative md:ml-[33%]" style={{ maxWidth: "var(--max-prose)" }}>
            {block.steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                <div className="flex w-6 shrink-0 flex-col items-center">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ink"
                    aria-hidden
                  />
                  {i < block.steps.length - 1 ? (
                    <span
                      className="mt-2 w-px flex-1 bg-[var(--hairline)]"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div className="min-w-0 pb-1">
                  <p className="t-mono text-ink-quiet tabular">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-sans text-[1.0625rem] font-semibold leading-snug text-ink">
                    {step.title}
                  </p>
                  <p className="mt-1.5 t-body text-ink-mute">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </FadeRise>
      );
    case "comparison":
      return (
        <FadeRise>
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 md:ml-[16.66%]">
            {block.pairs.map((pair) => (
              <li
                key={`${pair.before}-${pair.after}`}
                className="hairline-t grid grid-cols-[1fr_auto_1fr] items-baseline gap-3 py-5 md:py-6"
              >
                <div>
                  <p className="t-mono text-[0.6875rem] text-ink-faint tabular">
                    BEFORE
                  </p>
                  <p className="mt-1 t-body text-ink-mute">{pair.before}</p>
                </div>
                <span
                  aria-hidden
                  className="t-mono text-ink-faint tabular self-center"
                >
                  →
                </span>
                <div>
                  <p className="t-mono text-[0.6875rem] text-ink-quiet tabular">
                    AFTER
                  </p>
                  <p className="mt-1 t-body text-ink">{pair.after}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeRise>
      );
    case "cycle":
      return (
        <FadeRise>
          <div className="md:ml-[33%]" style={{ maxWidth: "var(--max-prose)" }}>
            <ol
              role="list"
              aria-label="Feedback loop"
              className="flex flex-wrap items-center gap-x-2.5 gap-y-2"
            >
              {block.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-x-2.5">
                  <span className="rounded-sm border px-2.5 py-1.5 t-mono text-[0.8125rem] text-ink tabular"
                    style={{ borderColor: "var(--hairline)" }}
                  >
                    {step}
                  </span>
                  {i < block.steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="t-mono text-ink-faint tabular"
                    >
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            {block.note ? (
              <p className="mt-4 t-mono text-[0.75rem] leading-relaxed text-ink-faint">
                {block.note}
              </p>
            ) : null}
          </div>
        </FadeRise>
      );
    default:
      return null;
  }
}

function CaseStudyPhoto({
  src,
  alt,
  aspect = "16/9",
  caption,
}: {
  src: string;
  alt: string;
  aspect?: "16/9" | "21/9" | "4/3" | "1/1" | "3/4";
  caption?: string;
}) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-sm border bg-canvas-raised"
        style={{
          borderColor: "var(--hairline)",
          aspectRatio: aspect.replace("/", " / "),
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, min(1100px, 92vw)"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 t-mono text-ink-quiet tabular">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function CoverHero({ study }: { study: CaseStudy }) {
  if (study.coverImage) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={study.coverImage}
          alt={
            study.coverImageAlt ??
            `${study.title} cover — portfolio homepage preview`
          }
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, min(1440px, 100vw)"
          priority
        />
      </div>
    );
  }

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
