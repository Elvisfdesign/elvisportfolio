import Link from "next/link";
import { AtlasArchitecture } from "@/components/atlas/atlas-architecture";
import { AtlasComponentMap } from "@/components/atlas/atlas-component-map";
import { AtlasExternalLinks } from "@/components/atlas/atlas-external-links";
import { AtlasLogo } from "@/components/atlas/atlas-logo";
import { AtlasProcessFlow } from "@/components/atlas/atlas-process-flow";
import { AtlasProductFlow } from "@/components/atlas/atlas-product-flow";
import { AtlasPrototypeCapabilities } from "@/components/atlas/atlas-prototype-capabilities";
import { AtlasReactProgress } from "@/components/atlas/atlas-react-progress";
import { AtlasScreenGallery } from "@/components/atlas/atlas-screen-gallery";
import { AtlasSectionHeader } from "@/components/atlas/atlas-section-header";
import { AtlasStatus } from "@/components/atlas/atlas-status";
import { AtlasStatusBadge } from "@/components/atlas/atlas-status-badge";
import { AtlasStorybookGallery } from "@/components/atlas/atlas-storybook-gallery";
import { AtlasUpdateList } from "@/components/atlas/atlas-update-list";
import { AtlasWorkspace } from "@/components/atlas/atlas-workspace";
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

  /** Continuous section numbering — folds Storybook in-place when present. */
  const num = (() => {
    let i = 0;
    return () => String(++i).padStart(2, "0");
  })();

  return (
    <article>
      <header
        className="px-[var(--gutter)] pb-16 pt-32 md:pb-20 md:pt-40"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <p className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 t-mono text-ink-mute tabular">
              <span className="inline-flex items-center gap-2">
                <span className="dot-live" aria-hidden />
                {atlasProject.statusLabel}
              </span>
              <span className="text-ink-faint">
                &nbsp;·&nbsp;{atlasProject.statusDetail}
              </span>
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

            <p className="mt-10 max-w-[36ch] t-body-l text-ink-mute leading-relaxed">
              {atlasProject.thesis}
            </p>
            <p className="mt-8 t-mono text-ink-quiet tabular">
              {atlasProject.metadataLabel}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:pt-16">
            <FadeRise delay={0.08}>
              <p className="t-mono text-ink-quiet tabular">Role</p>
              <ul className="mt-4 space-y-2" role="list">
                {atlasProject.roles.map((role) => (
                  <li
                    key={role.id}
                    className="t-subhead font-display text-ink"
                  >
                    {role.label}
                  </li>
                ))}
              </ul>
            </FadeRise>

            <FadeRise delay={0.14}>
              <p className="t-mono text-ink-quiet tabular">Focus</p>
              <p className="mt-4 t-mono text-ink tabular">
                {atlasProject.focus.join(" · ")}
              </p>
              <p className="mt-6 t-mono text-ink-quiet tabular">Built through</p>
              <p className="mt-3 t-mono text-ink tabular">
                {atlasProject.builtWithLine}
              </p>
            </FadeRise>

            <FadeRise delay={0.22}>
              <AtlasExternalLinks links={links} />
            </FadeRise>
          </div>
        </div>
      </header>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="THESIS">
        <AtlasSectionHeader
          title={
            <>
              One product.
              <br />
              One design language.
              <br />
              One live experience.
            </>
          }
          description="Atlas explores how a designer can move from product interface to Figma system to reusable React components to a live interactive product — with Claude Code and Cursor as implementation partners, never a replacement for design judgment."
        />
      </Section>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="PRODUCT UI">
        <AtlasSectionHeader
          title="The product came first."
          description="Atlas Intelligence was designed as a complete enterprise AI workspace. These are the Product UI mockups in Figma — repeated patterns were then identified, standardized, and extracted into a reusable UI system."
        />
        <div className="mt-6 flex items-baseline gap-3">
          <span className="dot-live" aria-hidden />
          <span className="t-mono text-ink-mute tabular">
            PRODUCT&nbsp;UI&nbsp;IN&nbsp;FIGMA
          </span>
        </div>
        <div className="mt-10 md:mt-12">
          <AtlasScreenGallery screens={atlasProject.screens} />
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="SYSTEM ARCHITECTURE">
        <AtlasSectionHeader
          title="From design system to product."
          description="Atlas UI remains an app-agnostic design-system package, while Atlas Intelligence is a separate product application that consumes the library. Figma is the visual source of truth; the React library is the code source of truth."
        />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <AtlasArchitecture steps={atlasProject.architecture} />
          </div>
          <div className="lg:col-span-7 space-y-10">
            <AtlasWorkspace entries={atlasProject.workspace} />
            <ul
              className="grid grid-cols-2 gap-3 content-start sm:grid-cols-3"
              role="list"
              aria-label="Foundations covered by Atlas UI"
            >
              {atlasProject.foundations.map((item) => (
                <li
                  key={item.id}
                  className="rounded-sm border px-4 py-4 md:py-5"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <span className="t-mono text-ink-mute tabular">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="WORKFLOW">
        <AtlasSectionHeader
          title="Product → System → Code → Prototype"
          description="A design-to-code loop where Figma remains the visual source of truth, the React library is the code source of truth, and the product prototype is where the system proves itself under real interaction."
        />
        <div className="mt-10 md:mt-12">
          <AtlasProcessFlow
            steps={atlasProject.workflow}
            activeId={atlasProject.activeWorkflowStage}
          />
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="COMPONENTS">
        <AtlasSectionHeader
          title="An honest implementation map."
          description="Categories shared with Figma and Storybook. Status reflects the React library today, live at atlas-ui-alpha.vercel.app."
        />
        <div className="mt-10 md:mt-12">
          <AtlasComponentMap categories={atlasProject.componentCategories} />
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="ATLAS UI">
        <AtlasSectionHeader
          title="A production React component library."
          description="Atlas UI is the React implementation of the Atlas Design System — tokens, themes, accessible components, tests, and Storybook. Built from the approved Figma system and now consumed by Atlas Intelligence."
        />
        <div className="mt-10 md:mt-12">
          <AtlasReactProgress progress={atlasProject.reactProgress} />
        </div>
      </Section>

      {storybookVisible ? (
        <Section {...ATLAS_SECTION} number={num()} eyebrow="STORYBOOK">
          <AtlasSectionHeader
            title="A live system, not a component inventory."
            description="Storybook documents foundations and shipped components with controls, themes, and accessibility checks."
          />
          <div className="mt-10 md:mt-12">
            <AtlasStorybookGallery shots={atlasProject.storybookShots} />
          </div>
        </Section>
      ) : null}

      <Section {...ATLAS_SECTION} number={num()} eyebrow="LIVE PRODUCT">
        <AtlasSectionHeader
          title="Live Product Experience"
          description="Atlas Intelligence extends the Atlas UI design system into a fully interactive enterprise application. Visitors can explore responsive workflows, document review, analytics, workflow management, Light and Dark themes, and the complete review experience through the live demo."
        />

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={atlasProject.urls.prototypeUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Launch Live Demo (opens in a new tab)"
            className={
              "atlas-live-cta group inline-flex min-h-11 max-w-max items-center gap-3 rounded-sm border px-5 py-3 " +
              "t-mono text-ink tabular transition-[transform,border-color,background-color] duration-300 " +
              "hover:-translate-y-0.5 hover:bg-canvas-raised " +
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            }
            style={{ borderColor: "var(--hairline-strong)" }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="dot-live" aria-hidden />
              LIVE
            </span>
            <span className="text-ink-faint">·</span>
            <span>
              Launch&nbsp;Live&nbsp;Demo
              <span
                aria-hidden
                className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </span>
          </a>
          <p className="max-w-prose t-mono text-[0.6875rem] text-ink-faint tabular">
            {atlasProject.liveDemoCaption}
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <AtlasPrototypeCapabilities
            items={atlasProject.prototypeCapabilities}
          />
        </div>

        <div className="mt-16 md:mt-20">
          <AtlasSectionHeader
            title="End-to-end review workflow."
            description="The live product uses shared state, so decisions made in one surface are reflected across the experience — approving a document updates the queue, and the dashboard metrics follow."
          />
          <div className="mt-8 md:mt-10">
            <AtlasProductFlow steps={atlasProject.productFlow} />
          </div>
        </div>
      </Section>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="AI-ASSISTED">
        <AtlasSectionHeader
          title="Design direction. AI implementation."
          description="Claude Code and Cursor accelerated implementation, testing, and iteration. I directed the product architecture, UX decisions, component reuse, visual review, and design-system governance throughout the process — AI was a partner, not the designer."
        />
      </Section>

      <Section {...ATLAS_SECTION} number={num()} eyebrow="CASE STUDY">
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
        number={num()}
        eyebrow="ACTIVE DEVELOPMENT"
        id="status"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <AtlasSectionHeader
              title="Live Interactive Demo"
              description={atlasProject.activeSummary}
            />
            <div className="mt-8 md:mt-10">
              <AtlasStatus
                items={atlasProject.statuses}
                lastUpdatedDisplay={atlasProject.lastUpdatedDisplay}
                statusLabel={`${atlasProject.statusLabel} · ${atlasProject.statusDetail}`}
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

      <Section {...ATLAS_SECTION} number={num()} eyebrow="RESOURCES">
        <AtlasSectionHeader
          title="Continue with the live product."
          description="Launch the live application, browse the React library on Storybook, clone the repository, or explore the Product UI and Design System in Figma."
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
