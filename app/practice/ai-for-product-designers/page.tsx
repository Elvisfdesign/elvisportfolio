import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/primitives/section";
import { ReadingColumn } from "@/components/primitives/reading-column";
import { ArtifactSurface } from "@/components/primitives/artifact-surface";
import { MetadataStrip } from "@/components/primitives/metadata-strip";
import { MaskUp } from "@/components/motion/mask-up";
import { FadeRise } from "@/components/motion/fade-rise";
import { PullQuote } from "@/components/primitives/pull-quote";
import { SharedElementScope } from "@/components/motion/shared-element";
import { PromptLab } from "@/components/prompt-lab/prompt-lab";
import { practicePiece } from "@/content/practice/ai-for-product-designers";
import { SharedFilmHero } from "@/components/case-study/shared-film-hero";
import { getCaseStudy } from "@/content/case-studies";

const nextPracticeCase = getCaseStudy("career-navigator")!;

export const metadata: Metadata = {
  title: practicePiece.title,
  description: practicePiece.thesis,
  openGraph: {
    title: `${practicePiece.title} · Elvis Fernandes`,
    description: practicePiece.thesis,
    url: `/practice/${practicePiece.slug}`,
  },
};

export default function PracticePage() {
  return (
    <SharedElementScope>
      <article className="pt-32">
        {/* Editorial cover */}
        <header
          className="px-[var(--gutter)] py-16 md:py-24"
          style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="t-mono text-ink-quiet tabular">
                {practicePiece.index} · PRACTICE · NOT A CASE STUDY
              </p>
              <h1 className="mt-8 t-display-xl font-display text-ink">
                <MaskUp>{practicePiece.title}</MaskUp>
              </h1>
              <FadeRise delay={0.15} className="mt-10 max-w-prose">
                <p className="t-body-l text-ink-mute">{practicePiece.thesis}</p>
              </FadeRise>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:pt-8">
              <FadeRise delay={0.25}>
                <MetadataStrip
                  className="flex-col items-start gap-y-4"
                  items={[
                    { label: "ROLE", value: practicePiece.meta.role },
                    { label: "YEAR", value: practicePiece.meta.year },
                    { label: "SURFACE", value: practicePiece.meta.surface },
                    { label: "FORMAT", value: "Reflection + Live demo" },
                  ]}
                />
              </FadeRise>
            </div>
          </div>

          <SharedFilmHero slug={practicePiece.slug} ambient={practicePiece.ambient} index={practicePiece.index} />
        </header>

        {/* Opening reflection */}
        <Section rhythm="beat" width="reading">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="t-mono text-ink-quiet tabular">01 · THE SHIFT</p>
              <h2 className="mt-2 t-heading font-display text-ink">
                What changed in two years.
              </h2>
            </div>
            <ReadingColumn className="md:col-span-7 md:col-start-5">
              <div className="space-y-6">
                <p className="t-body-l text-ink-mute">
                  Before Maven&rsquo;s{" "}
                  <span className="text-ink">AI for Product Designers</span>
                  {" "}track, my days still moved in familiar beats: FigJam /
                  Figma for structure, a prototype for proof, Slack threads for writing
                  tweaks, engineering for the sharp edges. Useful, but the handoffs
                  between ideation, copy, scaffolding, and build still ate hours.
                </p>
                <p className="t-body-l text-ink-mute">
                  The coursework pushed me to keep those stages but strip the waits
                  in between — pairing Claude / ChatGPT for language and teardowns,
                  Figma&nbsp;Make for directional layouts fast, Cursor and Lovable
                  when clicking mattered sooner than polish, Google&nbsp;AI Studio
                  whenever a multimodal spike was quicker than mocking it, Webflow when
                  the deliverable truly was publishing. Assignments surfaced where I
                  was over-documenting versus where an outline plus an AI collaborator
                  was enough for the next reviewer.
                </p>
                <p className="t-body-l text-ink-mute">
                  Below is how I catalogue that rhythm now — five pragmatic passes and
                  a live demo so you can run the loop here, not read about it in the
                  abstract.
                </p>
              </div>
            </ReadingColumn>
          </div>
        </Section>

        {/* The loop reference */}
        <Section rhythm="beat" width="outer">
          <header className="hairline-b mb-12 flex flex-col gap-y-3 pb-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
            <span className="t-mono text-ink-quiet tabular shrink-0">02 · THE LOOP</span>
            <span className="t-mono text-ink-quiet tabular max-w-full break-words sm:text-right">
              FRAME → PROMPT → ITERATE → REFINE → SHIP
            </span>
          </header>
          <FadeRise>
            <PullQuote>
              Cheap iteration beats perfect first drafts — the loop just has to stay
              legible across tools.
            </PullQuote>
          </FadeRise>
          <p className="mt-10 max-w-prose t-body-l text-ink-mute">
            I still move from question to artifact like any senior IC: frame constraints,
            ask the model narrow jobs, spike multiple answers, reconcile with accessibility
            and engineering reality, ship into Figma, Webflow, or code. Prompting is not
            a replacement for critique — it buys parallel variants so refinement happens
            on real options instead of hypothetical ones.
          </p>
        </Section>

        {/* A real prompt */}
        <Section rhythm="beat" width="reading">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="t-mono text-ink-quiet tabular">03 · A REAL PROMPT</p>
              <h2 className="mt-2 t-heading font-display text-ink">
                Prompts are design specs.
              </h2>
            </div>
            <ReadingColumn className="md:col-span-7 md:col-start-5">
              <p className="t-body-l text-ink-mute">
                During the Maven sprints — and afterward on dense enterprise surfaces — I started
                treating prompts like mini specs: stakeholders, stakes, typography of the answer.
                Below is a representative excerpt I still reuse when pressure-testing labeling for
                consequential actions inside admin flows (same structure, edited per feature).
              </p>
            </ReadingColumn>
          </div>
          <div className="mt-10 md:ml-[33%]" style={{ maxWidth: "var(--max-prose)" }}>
            <ArtifactSurface
              structuredBody
              label="PROMPT · ANNOTATED"
              meta="WORKING NOTE · MAVEN ASSIGNMENT VARIANT"
            >
              <div className="space-y-2.5">
                <p className="leading-snug">
                  <span className="opacity-[0.62]">Role:</span>{" "}
                  Senior Product Designer improving UX writing for a SaaS dashboard.
                </p>

                <div className="space-y-0.5">
                  <p className="leading-snug opacity-[0.62]">Goal:</p>
                  <p className="leading-snug">
                    Help admins understand a high-risk action before removing user purchase access.
                  </p>
                </div>

                <div className="space-y-0.5">
                  <p className="leading-snug opacity-[0.62]">Constraints:</p>
                  <ul className="list-none space-y-px leading-snug">
                    <li>Maximum 13 words per sentence</li>
                    <li>Clear and direct language only</li>
                    <li>No jargon or overly dramatic wording</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <p className="leading-snug opacity-[0.62]">Task:</p>
                    <p className="leading-snug">
                      Create 4 button label options for the confirmation modal.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="leading-snug opacity-[0.62]">
                      For each option include:
                    </p>
                    <ul className="list-none space-y-px leading-snug">
                      <li>The button label</li>
                      <li>A short explanation of why the wording works</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <p className="leading-snug opacity-[0.62]">
                    Focus on different communication styles:
                  </p>
                  <ul className="list-none space-y-px leading-snug">
                    <li>Direct</li>
                    <li>Reassuring</li>
                    <li>Specific</li>
                    <li>Calm and clear</li>
                  </ul>
                </div>
              </div>
            </ArtifactSurface>
          </div>
        </Section>

        {/* Prompt Lab — the live moment */}
        <PromptLab />

        {/* Tools shelf */}
        <Section rhythm="beat" width="outer">
          <header className="hairline-b mb-12 flex flex-col gap-y-3 pb-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
            <span className="t-mono text-ink-quiet tabular shrink-0">04 · TOOLS</span>
            <span className="t-mono text-ink-quiet tabular max-w-full break-words sm:text-right">
              COURSE + CLIENT WORK · NOVELTY OPTIONAL
            </span>
          </header>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              {
                name: "FigJam · Figma",
                use: "Briefs, journeys, critiques with PM partners — unchanged anchor, quicker annotations.",
              },
              {
                name: "Figma Make",
                use: "Directional comps when I want layout options before consolidating into the canonical file.",
              },
              {
                name: "Claude",
                use: "Longer teardowns and spec drafting when I want a patient second brain with context.",
              },
              {
                name: "ChatGPT",
                use: "Fast variant passes — different biases than Claude — great for ripping apart copy tone.",
              },
              {
                name: "Google AI Studio",
                use: "Cheap multimodal experiments (audio/visual prompts) without standing up tooling.",
              },
              {
                name: "Cursor",
                use: "Where UI intent becomes production-ish code snippets and small Next.js tweaks live.",
              },
              {
                name: "Lovable",
                use: "Clickable shells after FigJam narrows IA — helps me sanity-check rhythm before engineering.",
              },
              {
                name: "Webflow",
                use: "Launch surfaces that ship without tying up eng; still part of weekly maintenance.",
              },
            ].map((tool) => (
              <FadeRise key={tool.name}>
                <div className="hairline-t pt-6">
                  <p className="t-subhead text-ink">{tool.name}</p>
                  <p className="mt-2 t-body text-ink-mute">{tool.use}</p>
                </div>
              </FadeRise>
            ))}
          </div>
        </Section>

        {/* Closing reflection */}
        <Section rhythm="beat" width="reading">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="t-mono text-ink-quiet tabular">05 · REFLECTION</p>
              <h2 className="mt-2 t-heading font-display text-ink">
                What this practice is for.
              </h2>
            </div>
            <ReadingColumn className="md:col-span-7 md:col-start-5">
              <div className="space-y-6">
                <p className="t-body-l text-ink-mute">
                  The{" "}
                  <Link
                    href="https://maven.com/xinran/ai-for-product-designers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink underline-offset-[0.15em]"
                  >
                    Maven
                  </Link>{" "}
                  course helped me stop treating AI like a shortcut and start treating it like part of
                  the workflow. The biggest shift wasn&rsquo;t speed alone — it was learning where AI
                  actually helps, where it creates noise, and where human judgment still matters most.
                </p>
                <p className="t-body-l text-ink-mute">
                  A lot of the assignments pushed me to work more openly and iteratively: testing rough
                  ideas earlier, writing clearer prompts, validating assumptions faster, and tightening
                  the loop between thinking, prototyping, and shipping. That changed how I approach design
                  reviews and even how I structure my files.
                </p>
                <p className="t-body-l text-ink-mute">
                  AI now sits naturally inside my process across research synthesis, UX writing,
                  prototyping, case-study framing, and implementation exploration. Not as a replacement
                  for craft — more like an active collaborator that helps me move through ambiguity
                  faster while staying intentional about decisions.
                </p>
              </div>
            </ReadingColumn>
          </div>
        </Section>

        {/* Continue the film — matches case study footer pattern */}
        <footer
          className="hairline-t mt-32 px-[var(--gutter)] py-16"
          style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
        >
          <p className="t-mono text-ink-quiet tabular">NEXT CASE STUDY</p>
          <Link
            href={`/work/${nextPracticeCase.slug}`}
            className="group mt-6 flex flex-wrap items-baseline justify-between gap-6"
          >
            <h2 className="t-display-l font-display text-ink transition-colors duration-500 group-hover:text-signal">
              {nextPracticeCase.title}
            </h2>
            <span className="t-mono link-underline text-ink-mute group-hover:text-ink">
              CONTINUE&nbsp;→
            </span>
          </Link>
        </footer>
      </article>
    </SharedElementScope>
  );
}
