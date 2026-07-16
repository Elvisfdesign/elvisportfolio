import Link from "next/link";
import { AtlasArchitecture } from "@/components/atlas/atlas-architecture";
import { AtlasComponentMap } from "@/components/atlas/atlas-component-map";
import { AtlasExternalLinks } from "@/components/atlas/atlas-external-links";
import { AtlasLogo } from "@/components/atlas/atlas-logo";
import { AtlasProcessFlow } from "@/components/atlas/atlas-process-flow";
import { AtlasReactProgress } from "@/components/atlas/atlas-react-progress";
import { AtlasScreenGallery } from "@/components/atlas/atlas-screen-gallery";
import { AtlasSectionHeader } from "@/components/atlas/atlas-section-header";
import { AtlasStatus } from "@/components/atlas/atlas-status";
import { AtlasStatusBadge } from "@/components/atlas/atlas-status-badge";
import { AtlasStorybookGallery } from "@/components/atlas/atlas-storybook-gallery";
import { AtlasUpdateList } from "@/components/atlas/atlas-update-list";
import { FadeRise } from "@/components/motion/fade-rise";
import { MaskUp } from "@/components/motion/mask-up";
import { Section } from "@/components/primitives/section";
import { atlasProject, getAtlasLinks } from "@/content/atlas/project";

/** Atlas body sections share one editorial rhythm (not landing cinematic padding). */
const ATLAS_SECTION = {
  rhythm: "editorial" as const,
  width: "outer" as const,
  tightHeader: true,
};

export function AtlasPage() {
  const links = getAtlasLinks();
  const storybookVisible = atlasProject.storybookShots.some((s) =>
    Boolean(s.imageSrc),
  );

  return (
    <article>
      <header
        className="px-[var(--gutter)] pb-16 pt-32 md:pb-20 md:pt-40"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <p className="inline-flex items-center gap-2 t-mono text-ink-mute tabular">
              <span className="dot-live" aria-hidden />
              {atlasProject.statusLabel}
            </p>

            <div className="mt-10">
              <AtlasLogo />
            </div>

            <h1 className="mt-10 max-w-full t-display-xl font-display text-ink text-balance">
              <MaskUp>A Modern Enterprise</MaskUp>
              <br />
              <MaskUp delay={0.12}>
                <span className="italic text-ink-mute">Design Language</span>
              </MaskUp>
            </h1>

            <p className="mt-10 max-w-[28ch] t-display-m font-display text-ink leading-snug">
              From Product
              <br />
              to Design System
              <br />
              to Production Code
            </p>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:pt-16">
            <FadeRise delay={0.1}>
              <p className="t-mono text-ink-quiet tabular">Built through</p>
              <ul className="mt-4 space-y-2" role="list">
                {atlasProject.tools.map((tool) => (
                  <li key={tool} className="t-subhead font-display text-ink">
                    {tool}
                  </li>
                ))}
              </ul>
            </FadeRise>

            <FadeRise delay={0.2}>
              <AtlasExternalLinks links={links} />
            </FadeRise>
          </div>
        </div>
      </header>

      <Section {...ATLAS_SECTION} number="01" eyebrow="THESIS">
        <AtlasSectionHeader
          title={
            <>
              One product.
              <br />
              One design language.
              <br />
              One shared source of truth.
            </>
          }
          description="Atlas explores how a designer can move from product interface to Figma system to reusable React components — with Claude Code as an implementation partner, not a replacement for design judgment."
        />
      </Section>

      <Section {...ATLAS_SECTION} number="02" eyebrow="PRODUCT">
        <AtlasSectionHeader
          title="The product came first."
          description="Atlas Intelligence was designed as a complete enterprise AI workspace. Repeated product patterns were then identified, standardized, and extracted into a reusable UI system."
        />
        <div className="mt-10 md:mt-12">
          <AtlasScreenGallery screens={atlasProject.screens} />
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number="03" eyebrow="DESIGN SYSTEM">
        <AtlasSectionHeader
          title="From visual system to working components."
          description="Atlas UI is now being translated into a reusable React and TypeScript component library. The same semantic tokens power Light and Dark themes across Figma, Storybook, and future Atlas products."
        />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <AtlasArchitecture steps={atlasProject.architecture} />
          </div>
          <ul
            className="grid grid-cols-2 gap-3 content-start sm:grid-cols-3 lg:col-span-7"
            role="list"
          >
            {atlasProject.foundations.map((item) => (
              <li
                key={item.id}
                className="rounded-sm border px-4 py-4 md:py-5"
                style={{ borderColor: "var(--hairline)" }}
              >
                <span className="t-mono text-ink-mute tabular">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number="04" eyebrow="WORKFLOW">
        <AtlasSectionHeader
          title="Product → Design System → Code"
          description="A design-to-code loop where Figma remains the visual source of truth and implementation is a disciplined partnership with Claude Code."
        />
        <div className="mt-10 md:mt-12">
          <AtlasProcessFlow
            steps={atlasProject.workflow}
            activeId={atlasProject.activeWorkflowStage}
          />
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number="05" eyebrow="COMPONENTS">
        <AtlasSectionHeader
          title="An honest implementation map."
          description="Categories shared with Figma and Storybook. Status reflects the React library — not every component is finished."
        />
        <div className="mt-10 md:mt-12">
          <AtlasComponentMap categories={atlasProject.componentCategories} />
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number="06" eyebrow="ATLAS UI">
        <AtlasSectionHeader
          title="The system is becoming code."
          description="Atlas UI is the production React implementation of the Atlas Design System. Tokens, themes, components, accessibility behavior, tests, and Storybook documentation are being developed from the approved Figma system."
        />
        <div className="mt-10 md:mt-12">
          <AtlasReactProgress progress={atlasProject.reactProgress} />
        </div>
      </Section>

      {storybookVisible ? (
        <Section {...ATLAS_SECTION} number="07" eyebrow="STORYBOOK">
          <AtlasSectionHeader
            title="A live system, not a component inventory."
            description="Screenshots from the Storybook documentation as the public deployment approaches."
          />
          <div className="mt-10 md:mt-12">
            <AtlasStorybookGallery shots={atlasProject.storybookShots} />
          </div>
        </Section>
      ) : null}

      <Section
        {...ATLAS_SECTION}
        number={storybookVisible ? "08" : "07"}
        eyebrow="CASE STUDY"
      >
        <AtlasSectionHeader
          title="The narrative in progress."
          description="A modular outline. Completed sections carry real content; unfinished ones stay marked honestly."
        />
        <ol className="mt-10 space-y-0 md:mt-12" role="list">
          {atlasProject.caseBeats.map((beat, i) => (
            <li
              key={beat.id}
              className="hairline-t grid grid-cols-12 gap-4 py-5 md:py-6"
            >
              <span className="col-span-2 t-mono text-ink-quiet tabular md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10 md:col-span-11">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="t-subhead font-display text-ink">
                    {beat.label}
                  </span>
                  {beat.state !== "Complete" ? (
                    <AtlasStatusBadge state={beat.state} />
                  ) : null}
                </div>
                {beat.body ? (
                  <p className="mt-3 max-w-prose t-body text-ink-mute">
                    {beat.body}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        {...ATLAS_SECTION}
        number={storybookVisible ? "09" : "08"}
        eyebrow="BUILDING IN PUBLIC"
        id="status"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <AtlasSectionHeader title="Where Atlas stands today." />
            <div className="mt-8 md:mt-10">
              <AtlasStatus
                items={atlasProject.statuses}
                lastUpdatedDisplay={atlasProject.lastUpdatedDisplay}
                statusLabel={atlasProject.statusLabel}
              />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <h3 className="t-mono text-ink-quiet tabular">UPDATES</h3>
            <div className="mt-6">
              <AtlasUpdateList updates={atlasProject.updates} />
            </div>
          </div>
        </div>
      </Section>

      <Section
        {...ATLAS_SECTION}
        number={storybookVisible ? "10" : "09"}
        eyebrow="NEXT"
      >
        <AtlasSectionHeader
          title="Continue with the source files."
          description="Open the product and system Figma files. Repository and Storybook links appear when those surfaces ship."
        />
        <div className="mt-10 md:mt-12">
          <AtlasExternalLinks links={links} />
        </div>
        <p className="mt-12 md:mt-14">
          <Link
            href="/#films"
            className="t-mono link-underline text-ink-mute tabular hover:text-ink"
          >
            Return to selected work&nbsp;↑
          </Link>
        </p>
      </Section>
    </article>
  );
}
