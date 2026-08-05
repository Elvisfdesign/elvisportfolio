import { AscendArchitectureChapter } from "@/components/ascend/ascend-architecture-chapter";
import { AscendAtAGlance } from "@/components/ascend/ascend-at-a-glance";
import { AscendBrandChapter } from "@/components/ascend/ascend-brand-chapter";
import { AscendCallout } from "@/components/ascend/ascend-callout";
import { AscendChapterNav } from "@/components/ascend/ascend-chapter-nav";
import { AscendCodeChapter } from "@/components/ascend/ascend-code-chapter";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { AscendEcosystemStrip } from "@/components/ascend/ascend-ecosystem-strip";
import { AscendExternalLinks } from "@/components/ascend/ascend-external-links";
import { AscendGallery } from "@/components/ascend/ascend-gallery";
import { AscendHeroStack } from "@/components/ascend/ascend-hero-stack";
import { AscendMark } from "@/components/ascend/ascend-mark";
import { AscendOpportunityChapter } from "@/components/ascend/ascend-opportunity-chapter";
import { AscendMarketingChapter } from "@/components/ascend/ascend-marketing-chapter";
import { AscendOutcomeChapter } from "@/components/ascend/ascend-outcome-chapter";
import { AscendProductChapter } from "@/components/ascend/ascend-product-chapter";
import { AscendPrototypeChapter } from "@/components/ascend/ascend-prototype-chapter";
import { AscendSectionHeader } from "@/components/ascend/ascend-section-header";
import { AscendSystemChapter } from "@/components/ascend/ascend-system-chapter";
import { AscendVisionChapter } from "@/components/ascend/ascend-vision-chapter";
import { FadeRise } from "@/components/motion/fade-rise";
import { MaskUp } from "@/components/motion/mask-up";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { Section } from "@/components/primitives/section";
import {
  ascendAtAGlance,
  ascendChapters,
  ascendCtas,
  ascendEcosystem,
  ascendProject,
  type AscendChapter,
} from "@/content/ascend/project";

/**
 * ASCEND body sections share one chapter-transition rhythm.
 * Vertical padding comes from `--ascend-section-y*` (see tokens.css).
 */
const ASCEND_SECTION = {
  rhythm: "ascend" as const,
  width: "outer" as const,
  tightHeader: true,
};

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
              {...ASCEND_SECTION}
              width="full"
              number="—"
              eyebrow="RESOURCES"
              className="!px-0"
            >
              <AscendSectionHeader
                title="Project Resources"
                description="Live destinations for the ASCEND design system, component library, and source code. The interactive prototype will join this list when it ships."
              />
              <div className="mt-10">
                <AscendExternalLinks links={ascendCtas} variant="resources" />
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
      <div
        aria-hidden
        className="ascend-hero-glow pointer-events-none absolute inset-0"
      />

      <div
        className="relative px-[var(--gutter)] pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        {/*
          Desktop: items-start so the preview group aligns with the status
          / wordmark band rather than dropping to the bottom of a tall column.
        */}
        <div className="grid grid-cols-1 items-start gap-12 md:gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-14">
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

            <p className="mt-6 t-mono text-ink-quiet tabular md:mt-7">
              {ascendProject.eyebrow}
            </p>

            {/* Mark + wordmark share one optical baseline */}
            <div className="mt-6 flex items-center gap-3.5 md:mt-7 md:gap-4">
              <AscendMark
                className="h-7 w-auto md:h-8"
                ariaLabel="ASCEND mark"
              />
              <h1 className="t-display-xl font-display text-ink leading-none tracking-[-0.03em]">
                <MaskUp>{ascendProject.name}</MaskUp>
              </h1>
            </div>

            <p className="mt-5 max-w-[30ch] t-display-m font-display italic text-ink-mute text-balance leading-tight md:mt-6">
              <MaskUp delay={0.1}>{ascendProject.tagline}</MaskUp>
            </p>

            <p className="mt-6 max-w-[44ch] t-body-l text-ink-mute leading-relaxed md:mt-7">
              {ascendProject.thesis}
            </p>

            <div className="mt-8 md:mt-9">
              <AscendEcosystemStrip nodes={ascendEcosystem} />
            </div>

            <dl className="mt-9 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 md:mt-10">
              {(
                [
                  ["Role", meta.role],
                  ["Scope", meta.scope],
                  ["Platform", meta.platform],
                  ["Status", meta.status],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="t-mono text-ink-quiet tabular">{label}</dt>
                  <dd className="mt-1.5 t-mono text-ink tabular">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-w-0 lg:col-span-5 lg:pt-2 xl:pt-0">
            <FadeRise delay={0.18}>
              <AscendHeroStack />
            </FadeRise>
          </div>
        </div>

        {/*
          Actions live outside the 7/5 copy/preview grid so the row can span
          the full hero content width. Desktop: all five actions on one line.
        */}
        <nav
          className="ascend-hero-actions"
          aria-label="ASCEND case study actions and resources"
        >
          <div className="ascend-hero-actions-row">
            <div className="ascend-hero-actions-cta">
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
            </div>

            {ascendProject.heroPrototypeCta.href ? (
              <div className="ascend-hero-prototype">
                <EditorialTextLink
                  href={ascendProject.heroPrototypeCta.href}
                  label={ascendProject.heroPrototypeCta.label}
                  ariaLabel={ascendProject.heroPrototypeCta.ariaLabel}
                  arrow="external"
                  tone="ink"
                />
                <p className="ascend-hero-prototype-status">
                  <span
                    className="ascend-hero-prototype-status-dot"
                    aria-hidden
                  />
                  <span className="ascend-hero-prototype-status-label">
                    {ascendProject.heroPrototypeCta.statusLabel}
                  </span>
                </p>
              </div>
            ) : null}

            {ascendProject.heroSecondaryCta.href ? (
              <div className="ascend-hero-actions-link">
                <EditorialTextLink
                  href={ascendProject.heroSecondaryCta.href}
                  label={ascendProject.heroSecondaryCta.label}
                  ariaLabel={ascendProject.heroSecondaryCta.ariaLabel}
                  arrow="external"
                  tone="mute"
                />
              </div>
            ) : null}

            {ascendProject.heroSupportingLinks.map((link) => (
              <div key={link.id} className="ascend-hero-actions-link">
                <EditorialTextLink
                  href={link.href}
                  label={link.label}
                  ariaLabel={link.ariaLabel}
                  arrow="external"
                  tone="mute"
                />
              </div>
            ))}
          </div>
        </nav>

        <p className="ascend-scroll-cue flex items-center gap-3 t-mono text-ink-faint tabular">
          <span aria-hidden className="ascend-scroll-cue-line" />
          Scroll to explore
        </p>
      </div>
    </header>
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

      {chapter.id === "opportunity" ? (
        <AscendOpportunityChapter />
      ) : chapter.id === "vision" ? (
        <AscendVisionChapter />
      ) : chapter.id === "brand" ? (
        <AscendBrandChapter />
      ) : chapter.id === "architecture" ? (
        <AscendArchitectureChapter />
      ) : chapter.id === "product" ? (
        <AscendProductChapter />
      ) : chapter.id === "marketing" ? (
        <AscendMarketingChapter />
      ) : chapter.id === "system" ? (
        <AscendSystemChapter />
      ) : chapter.id === "code" ? (
        <AscendCodeChapter />
      ) : chapter.id === "prototype" ? (
        <AscendPrototypeChapter />
      ) : chapter.id === "outcome" ? (
        <AscendOutcomeChapter />
      ) : chapter.id === "overview" ? (
        <div className="mt-10 space-y-6">
          <AscendCallout tone="emphasis" eyebrow="THESIS">
            I designed ASCEND as one continuous surface — from the brand system
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
      ) : isPlaceholder ? (
        <div className="mt-10 space-y-6">
          <AscendGallery
            galleryId={chapter.id}
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
      ) : null}
    </Section>
  );
}
