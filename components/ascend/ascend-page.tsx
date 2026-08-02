import { AscendAtAGlance } from "@/components/ascend/ascend-at-a-glance";
import { AscendCallout } from "@/components/ascend/ascend-callout";
import { AscendChapterNav } from "@/components/ascend/ascend-chapter-nav";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { AscendEcosystemStrip } from "@/components/ascend/ascend-ecosystem-strip";
import { AscendExternalLinks } from "@/components/ascend/ascend-external-links";
import { AscendGallery } from "@/components/ascend/ascend-gallery";
import { AscendMark } from "@/components/ascend/ascend-mark";
import { AscendSectionHeader } from "@/components/ascend/ascend-section-header";
import { FadeRise } from "@/components/motion/fade-rise";
import { MaskUp } from "@/components/motion/mask-up";
import { Section } from "@/components/primitives/section";
import {
  ascendAtAGlance,
  ascendChapters,
  ascendCtas,
  ascendEcosystem,
  ascendProject,
  type AscendChapter,
} from "@/content/ascend/project";

/** ASCEND body sections share Atlas' editorial rhythm. */
const ASCEND_SECTION = {
  rhythm: "editorial" as const,
  width: "outer" as const,
  tightHeader: true,
};

/**
 * Placeholder tiles for the cinematic hero stack — stand-ins until real
 * product / marketing screens drop in. Labels stay honest so the layout
 * communicates ecosystem breadth without inventing screenshots.
 */
const HERO_STACK = [
  {
    id: "hero-product",
    label: "Product — Dashboard",
    caption: "Coming soon",
    aspect: "4/3" as const,
  },
  {
    id: "hero-marketing",
    label: "Marketing — Home",
    caption: "Coming soon",
    aspect: "3/4" as const,
  },
  {
    id: "hero-system",
    label: "System — Foundations",
    caption: "Coming soon",
    aspect: "4/3" as const,
  },
] as const;

export function AscendPage() {
  return (
    <article className="ascend-page">
      <AscendHero />

      <Section
        {...ASCEND_SECTION}
        id="at-a-glance"
        number="00"
        eyebrow="AT A GLANCE"
      >
        <FadeRise>
          <AscendAtAGlance items={ascendAtAGlance} />
        </FadeRise>
      </Section>

      {/* Mobile / tablet sticky chapter index */}
      <div className="ascend-chapter-nav-sticky xl:hidden">
        <AscendChapterNav chapters={ascendChapters} variant="strip" />
      </div>

      <div
        className="relative px-[var(--gutter)]"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 gap-0 xl:grid-cols-12 xl:gap-12">
          <div className="min-w-0 xl:col-span-9">
            {ascendChapters.map((chapter) => (
              <AscendChapterSection key={chapter.id} chapter={chapter} />
            ))}

            <Section
              rhythm="editorial"
              width="full"
              tightHeader
              number="—"
              eyebrow="RESOURCES"
              className="!px-0"
            >
              <AscendSectionHeader
                title="Continue exploring."
                description="Jump into the live Figma file now. Prototype, Storybook, GitHub, and the marketing site will land here as each surface ships."
              />
              <div className="mt-10">
                <AscendExternalLinks links={ascendCtas} />
              </div>
            </Section>
          </div>

          <aside className="relative hidden xl:col-span-3 xl:block">
            <div className="ascend-chapter-nav-rail sticky top-28">
              <p className="mb-5 t-mono text-ink-faint tabular">CHAPTERS</p>
              <AscendChapterNav chapters={ascendChapters} variant="rail" />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function AscendHero() {
  const meta = ascendProject.meta;

  return (
    <header className="ascend-hero relative overflow-hidden">
      {/* Soft gold atmosphere — calm, not flashy. Reduced-motion kills the
          subtle drift via the global motion kill-switch in globals.css. */}
      <div
        aria-hidden
        className="ascend-hero-glow pointer-events-none absolute inset-0"
      />

      <div
        className="relative px-[var(--gutter)] pb-20 pt-32 md:pb-28 md:pt-40"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 items-end gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 t-mono text-ink-mute tabular">
              <span className="inline-flex items-center gap-2">
                <span className="dot-live" aria-hidden />
                {ascendProject.statusLabel}
              </span>
              <span className="text-ink-faint">
                &nbsp;·&nbsp;{ascendProject.year}
              </span>
            </p>

            <p className="mt-8 t-mono text-ink-quiet tabular">
              {ascendProject.eyebrow}
            </p>

            <div className="mt-8 flex items-center gap-5 md:gap-6">
              <AscendMark className="h-8 w-auto md:h-10" ariaLabel="ASCEND mark" />
              <h1 className="t-display-xl font-display text-ink leading-none tracking-[-0.03em]">
                <MaskUp>{ascendProject.name}</MaskUp>
              </h1>
            </div>

            <p className="mt-6 max-w-[28ch] t-display-m font-display italic text-ink-mute text-balance leading-tight">
              <MaskUp delay={0.1}>{ascendProject.tagline}</MaskUp>
            </p>

            <p className="mt-8 max-w-[42ch] t-body-l text-ink-mute leading-relaxed">
              {ascendProject.thesis}
            </p>

            <div className="mt-10">
              <AscendEcosystemStrip nodes={ascendEcosystem} />
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {(
                [
                  ["Role", meta.role],
                  ["Scope", meta.scope],
                  ["Platform", meta.platform],
                  ["Status", meta.status],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="t-mono text-ink-quiet tabular">{label}</dt>
                  <dd className="mt-2 t-mono text-ink tabular">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a
                href={ascendProject.heroPrimaryCta.hrefAnchor}
                className="ascend-hero-primary-cta group inline-flex min-h-11 items-center gap-4 rounded-sm border px-5 py-4 md:px-6"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--ascend-gold) 55%, var(--hairline-strong))",
                  background: "var(--ascend-gold-soft)",
                }}
              >
                <span className="t-subhead font-display text-ink leading-none">
                  {ascendProject.heroPrimaryCta.label}
                </span>
                <span
                  aria-hidden
                  className="ascend-hero-cta-arrow t-mono text-[var(--ascend-gold)] tabular"
                >
                  ↓
                </span>
              </a>

              {ascendProject.heroSecondaryCta.href ? (
                <a
                  href={ascendProject.heroSecondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-mono link-underline inline-flex min-h-11 items-center text-ink tabular touch-manipulation"
                  aria-label={`${ascendProject.heroSecondaryCta.label} (opens in a new tab)`}
                >
                  {ascendProject.heroSecondaryCta.label}&nbsp;↗
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative min-w-0 lg:col-span-5">
            <FadeRise delay={0.18}>
              <AscendHeroStack />
            </FadeRise>
          </div>
        </div>

        <p className="ascend-scroll-cue mt-16 flex items-center gap-3 t-mono text-ink-faint tabular md:mt-20">
          <span aria-hidden className="ascend-scroll-cue-line" />
          Scroll to explore
        </p>
      </div>
    </header>
  );
}

/**
 * Layered editorial stack — three offset frames that read as product +
 * marketing + system together. Placeholders until real screens land;
 * aspect-ratio containers keep the composition stable either way.
 */
function AscendHeroStack() {
  return (
    <div
      className="ascend-hero-stack relative mx-auto aspect-[4/5] w-full max-w-[28rem] lg:max-w-none"
      aria-hidden
    >
      <div
        className="ascend-hero-stack-card ascend-hero-stack-card--back absolute inset-[8%_0_0_18%] overflow-hidden rounded-sm border"
        style={{
          borderColor: "var(--hairline)",
          background: "var(--stub-bg-screen)",
        }}
      >
        <HeroTile label={HERO_STACK[2].label} caption={HERO_STACK[2].caption} />
      </div>
      <div
        className="ascend-hero-stack-card ascend-hero-stack-card--mid absolute inset-[4%_10%_12%_4%] overflow-hidden rounded-sm border"
        style={{
          borderColor: "var(--hairline-strong)",
          background: "var(--canvas-raised)",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <HeroTile label={HERO_STACK[1].label} caption={HERO_STACK[1].caption} />
      </div>
      <div
        className="ascend-hero-stack-card ascend-hero-stack-card--front absolute inset-[18%_22%_0_0] overflow-hidden rounded-sm border"
        style={{
          borderColor:
            "color-mix(in oklab, var(--ascend-gold) 40%, var(--hairline))",
          background: "var(--canvas-recessed)",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <HeroTile label={HERO_STACK[0].label} caption={HERO_STACK[0].caption} />
      </div>
    </div>
  );
}

function HeroTile({ label, caption }: { label: string; caption: string }) {
  return (
    <div className="flex h-full flex-col justify-between p-5 md:p-6">
      <span className="t-mono text-[var(--ascend-gold)] tabular">{label}</span>
      <span className="t-mono text-ink-faint tabular">{caption}</span>
    </div>
  );
}

function AscendChapterSection({ chapter }: { chapter: AscendChapter }) {
  const isPlaceholder = chapter.state === "Placeholder";

  return (
    <Section
      {...ASCEND_SECTION}
      id={`chapter-${chapter.slug}`}
      number={chapter.number}
      eyebrow={chapter.eyebrow}
      className="!px-0 scroll-mt-28"
    >
      <AscendSectionHeader
        title={chapter.title}
        description={chapter.summary}
      />

      {isPlaceholder ? (
        <div className="mt-10 space-y-6">
          <AscendGallery
            header="Visuals coming in a later phase"
            columns={2}
            items={[
              {
                id: `${chapter.id}-a`,
                label: `${chapter.navLabel} — Frame A`,
                caption: "Placeholder",
                aspect: "16/9",
              },
              {
                id: `${chapter.id}-b`,
                label: `${chapter.navLabel} — Frame B`,
                caption: "Placeholder",
                aspect: "16/9",
              },
            ]}
          />
          <AscendDetails
            eyebrow="PROCESS"
            summary="Deeper notes for this chapter"
          >
            <p>
              Level-2 process notes, decision records, and documentation links
              for {chapter.navLabel.toLowerCase()} will land here in a later
              phase. The shell is ready — the content is not.
            </p>
          </AscendDetails>
        </div>
      ) : chapter.id === "overview" ? (
        <div className="mt-10 space-y-6">
          <AscendCallout tone="emphasis" eyebrow="THESIS">
            ASCEND is designed as one continuous surface — from the brand system
            that sets the tone, through the marketing site that earns attention,
            into the product that holds daily practice, and out into the design
            system and React library that make the whole thing buildable.
          </AscendCallout>
          <AscendDetails
            eyebrow="SCOPE"
            summary="What this case study covers"
          >
            <ul className="mt-1 list-none space-y-2" role="list">
              <li>Brand foundation and photography direction</li>
              <li>Marketing website narrative (7 pages)</li>
              <li>Product architecture and core experience</li>
              <li>Design system, React library, and Storybook</li>
              <li>Interactive prototype and production-readiness docs</li>
            </ul>
          </AscendDetails>
        </div>
      ) : null}
    </Section>
  );
}
