import Link from "next/link";
import { AtlasExternalLinks } from "@/components/atlas/atlas-external-links";
import { AtlasLogo } from "@/components/atlas/atlas-logo";
import { AtlasProcessFlow, AtlasProcessFlowDesktop } from "@/components/atlas/atlas-process-flow";
import { AtlasScreenGallery } from "@/components/atlas/atlas-screen-gallery";
import { AtlasSectionHeader } from "@/components/atlas/atlas-section-header";
import { AtlasStatus } from "@/components/atlas/atlas-status";
import { AtlasUpdateList } from "@/components/atlas/atlas-update-list";
import { FadeRise } from "@/components/motion/fade-rise";
import { MaskUp } from "@/components/motion/mask-up";
import { Section } from "@/components/primitives/section";
import { atlasProject } from "@/content/atlas/project";

export function AtlasPage() {
  return (
    <article>
      <header
        className="px-[var(--gutter)] pb-20 pt-32 md:pb-28 md:pt-40"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 t-mono text-ink-mute tabular">
              <span className="dot-live" aria-hidden />
              {atlasProject.statusLabel}
            </p>

            <div className="mt-10">
              <AtlasLogo />
            </div>

            <h1 className="mt-10 t-display-xl font-display text-ink">
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
              <AtlasExternalLinks
                links={atlasProject.links.filter(
                  (l) => l.id === "product" || l.id === "system",
                )}
              />
            </FadeRise>
          </div>
        </div>
      </header>

      <Section rhythm="movementDense" width="outer" number="01" eyebrow="THESIS">
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
          description="Atlas explores how a designer can use Figma as the visual source of truth and Claude Code as an implementation partner to move from product interface to reusable system and production code."
        />
      </Section>

      <Section rhythm="movementDense" width="outer" number="02" eyebrow="PRODUCT">
        <AtlasSectionHeader
          title="The product came first."
          description="Atlas Intelligence was designed as a complete enterprise AI workspace. Repeated product patterns were then identified, standardized, and extracted into a reusable UI system."
        />
        <div className="mt-14">
          <AtlasScreenGallery screens={atlasProject.screens} />
        </div>
      </Section>

      <Section
        rhythm="movementDense"
        width="outer"
        number="03"
        eyebrow="DESIGN SYSTEM"
      >
        <AtlasSectionHeader
          title="Extracted from real product decisions."
          description="Categories mapped from Atlas Intelligence — ready for Figma documentation and future React translation."
        />
        <ul
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
          role="list"
        >
          {atlasProject.foundations.map((item) => (
            <li
              key={item.id}
              className="rounded-sm border px-4 py-5"
              style={{ borderColor: "var(--hairline)" }}
            >
              <span className="t-mono text-ink-mute tabular">{item.label}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section rhythm="movementDense" width="outer" number="04" eyebrow="WORKFLOW">
        <AtlasSectionHeader
          title="Product → Design System → Code"
          description="A design-to-code loop where Figma remains the visual source of truth and implementation is a disciplined partnership with Claude Code."
        />
        <div className="mt-14 space-y-0">
          <AtlasProcessFlow steps={atlasProject.workflow} />
          <AtlasProcessFlowDesktop steps={atlasProject.workflow} />
        </div>
      </Section>

      <Section
        rhythm="movementDense"
        width="outer"
        number="05"
        eyebrow="COMPONENTS"
      >
        <AtlasSectionHeader
          title="A future-ready component map."
          description="Structure for screenshots and interactive examples as the React library lands. Nothing here is finished decoration."
        />
        <ul
          className="mt-12 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {atlasProject.componentCategories.map((cat) => (
            <li
              key={cat.id}
              className="hairline-t flex min-h-28 flex-col justify-between py-6 pr-6 sm:px-6"
            >
              <span className="t-mono text-ink-quiet tabular">
                {cat.label.toUpperCase()}
              </span>
              <span className="mt-6 t-body text-ink-faint">
                Screenshots forthcoming
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        rhythm="movementDense"
        width="outer"
        number="06"
        eyebrow="PLAYGROUND"
      >
        <div
          className="rounded-sm border bg-canvas-raised px-6 py-12 md:px-10 md:py-16"
          style={{ borderColor: "var(--hairline)" }}
        >
          <p className="t-mono text-ink-quiet tabular">COMING NEXT</p>
          <h2 className="mt-6 max-w-[22ch] t-display-m font-display text-ink">
            Interactive component playground coming next.
          </h2>
          <p className="mt-6 max-w-prose t-body-l text-ink-mute">
            The next phase translates the approved Figma system into reusable
            React and TypeScript components.
          </p>
        </div>
      </Section>

      <Section
        rhythm="movementDense"
        width="outer"
        number="07"
        eyebrow="CASE STUDY"
      >
        <AtlasSectionHeader
          title="The narrative in progress."
          description="A modular outline that stays readable while sections are still being written."
        />
        <ol className="mt-12 space-y-0" role="list">
          {atlasProject.caseBeats.map((beat, i) => (
            <li
              key={beat.id}
              className="hairline-t grid grid-cols-12 gap-4 py-5"
            >
              <span className="col-span-2 t-mono text-ink-quiet tabular md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 t-subhead font-display text-ink md:col-span-11">
                {beat.label}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        rhythm="movementDense"
        width="outer"
        number="08"
        eyebrow="BUILDING IN PUBLIC"
        id="status"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <AtlasSectionHeader title="Where Atlas stands today." />
            <div className="mt-10">
              <AtlasStatus
                items={atlasProject.statuses}
                lastUpdated={atlasProject.lastUpdated}
                statusLabel={atlasProject.statusLabel}
              />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <h3 className="t-mono text-ink-quiet tabular">UPDATES</h3>
            <div className="mt-6">
              <AtlasUpdateList updates={atlasProject.updates} />
            </div>
          </div>
        </div>
      </Section>

      <Section rhythm="movement" width="outer" number="09" eyebrow="NEXT">
        <AtlasSectionHeader
          title="Continue with the source files."
          description="Open the product and system Figma files. Repository and playground links appear when those surfaces ship."
        />
        <div className="mt-12">
          <AtlasExternalLinks links={atlasProject.links} />
        </div>
        <p className="mt-16">
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
