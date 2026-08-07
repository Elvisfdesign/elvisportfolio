import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AboutPortraitLightbox } from "@/components/about/about-portrait-lightbox";
import { Section } from "@/components/primitives/section";
import { MetadataStrip } from "@/components/primitives/metadata-strip";
import { MaskUp } from "@/components/motion/mask-up";
import { FadeRise } from "@/components/motion/fade-rise";

export const metadata: Metadata = {
  title: "About",
  description:
    "Elvis Fernandes designs and builds thoughtful UX/UI, scalable design systems, and front-end experiences.",
};

const FOCUS = [
  {
    title: "AI-assisted product workflows",
    detail:
      "Shortening the distance between idea, design, and implementation.",
  },
  {
    title: "Operational AI products",
    detail:
      "Complex AI signals that become clear, timely human decisions.",
  },
  {
    title: "Flexible design systems",
    detail:
      "Structural consistency that still leaves room to adapt.",
  },
  {
    title: "Data-informed dashboards",
    detail:
      "Surfaces that support operators, managers, and executives.",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Systems before screens",
    body: "I begin with structure, states, constraints, and reusable patterns so individual screens belong to a coherent product.",
  },
  {
    title: "Design and implementation inform each other",
    body: "Frontend fluency helps me evaluate what is practical to build and gives design and engineering a shared language for tradeoffs.",
  },
  {
    title: "AI supports the process, not the judgment",
    body: "I use AI for critique, exploration, documentation, and implementation support. It accelerates the workflow, but it does not make the final product decisions.",
  },
  {
    title: "Feedback improves the work",
    body: "I refine ideas through repeated reviews, cross-functional collaboration, and feedback from experienced designers and former colleagues.",
  },
] as const;

const CORE_TOOLS = [
  {
    name: "Figma",
    note: "Product design, systems, flows, and interface exploration.",
  },
  {
    name: "Cursor",
    note: "Frontend implementation, component refinement, debugging, and responsive iteration.",
  },
  {
    name: "React / Frontend",
    note: "The environment where design decisions are tested against real behavior and constraints.",
  },
  {
    name: "ChatGPT",
    note: "Product thinking, UX critique, content refinement, and iteration support.",
  },
  {
    name: "Claude",
    note: "Architecture, implementation planning, critique, and documentation.",
  },
] as const;

const SUPPORTING_TOOLS = [
  "FigJam",
  "Figma Make",
  "Gemini",
  "Google AI Studio",
  "Lovable",
  "Magic Patterns",
  "UX Pilot",
  "Stitch",
  "Subframe",
] as const;

const WORKFLOW_STEPS = [
  "Understand",
  "Structure",
  "Explore",
  "Design",
  "Build",
  "Review",
  "Refine",
] as const;

/**
 * Shared About section shell — outer width, beat rhythm, and a consistent
 * left label/title · right content editorial grid across the page.
 */
function AboutSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Section rhythm="beat" width="outer">
      <div className="about-section-grid grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-[clamp(3rem,6vw,7rem)]">
        <div className="md:col-span-4 lg:col-span-3">
          <p className="t-mono text-ink-quiet tabular">{number}</p>
          <h2 className="mt-2 t-heading font-display text-ink">{title}</h2>
        </div>
        <div className="min-w-0 md:col-span-8 lg:col-span-8 lg:col-start-5">
          {children}
        </div>
      </div>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <article className="pt-32">
      {/* Editorial cover */}
      <header
        className="px-[var(--gutter)] py-16 md:py-24"
        style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="t-mono text-ink-quiet tabular">
              ABOUT · NOT A BIO PAGE · A PRACTICE PAGE
            </p>
            <h1 className="mt-8 t-display-xl font-display text-ink">
              <MaskUp>I make complex things</MaskUp>
              <br />
              <MaskUp delay={0.2}>
                <span className="italic text-ink-mute">feel inevitable.</span>
              </MaskUp>
            </h1>
          </div>
          <div
            id="meet"
            tabIndex={-1}
            className="scroll-mt-28 flex flex-col gap-10 outline-none md:col-span-4 md:gap-12 md:self-start md:pt-12 focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--canvas)]"
          >
            <figure className="mx-auto w-[7rem] shrink-0 md:mx-0 md:w-[7.25rem]">
              <AboutPortraitLightbox
                thumbSizes="(max-width: 768px) 7rem, 7.25rem"
              />
              <figcaption className="sr-only">
                Portrait thumbnail beside practice details — select to view a
                larger version. Asset: public/images/elvis-portrait.png
                (crop ~4:5 suggested).
              </figcaption>
            </figure>
            <FadeRise delay={0.2}>
              <MetadataStrip
                stacked
                className="flex-col items-start"
                items={[
                  { label: "BASED", value: "Boston, MA" },
                  {
                    label: "ROLE",
                    value: "Senior Product Designer · UX/UI · Front-End",
                  },
                  {
                    label: "SPECIALIZATION",
                    value: "Enterprise SaaS · AI Products · Design Systems",
                  },
                  {
                    label: "WORKFLOW",
                    value:
                      "Research → Strategy → UX/UI → Prototype → React → Iterate",
                  },
                  {
                    label: "CURRENT FOCUS",
                    value:
                      "Building AI-assisted product experiences, interactive prototypes, and scalable design systems.",
                  },
                ]}
              />
            </FadeRise>
          </div>
        </div>
      </header>

      {/* 01 · Bio */}
      <AboutSection number="01 · BIO" title="The short version.">
        <div
          className="space-y-7"
          style={{ maxWidth: "var(--max-prose)" }}
        >
          <p className="t-body-l text-ink-mute">
            I began exploring design and frontend development during my
            studies in Cape Verde, and continued through my bachelor&rsquo;s
            degree in Massachusetts. My professional product and UX career
            developed through frontend work and later product design roles —
            learning how design behaves under real engineering and business
            constraints.
          </p>
          <p className="t-body-l text-ink-mute">
            Most recently I led design initiatives at Modulate across
            enterprise UX for AI and trust-and-safety products: operational
            tools, dashboards, and the shared design system underneath. The
            work meant dense surfaces, cross-functional review, and close
            collaboration with product, engineering, QA, and business
            stakeholders — including frontend implementation where it
            shortened the loop.
          </p>
          <p className="t-body-l text-ink-mute">
            I design and build in the same loop. My work connects product
            strategy, UX/UI, systems, and frontend implementation. AI is a
            professional tool for critique, acceleration, and exploration;
            final decisions remain mine.
          </p>
        </div>
      </AboutSection>

      {/* 02 · Current Focus */}
      <AboutSection number="02 · NOW" title="Current focus.">
        <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {FOCUS.map((item, i) => (
            <FadeRise key={item.title} delay={i * 0.05}>
              <li className="hairline-t py-5 md:py-6">
                <span className="t-mono text-ink-quiet tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 t-subhead text-ink">{item.title}</p>
                <p className="mt-1.5 t-body text-ink-mute">{item.detail}</p>
              </li>
            </FadeRise>
          ))}
        </ul>
      </AboutSection>

      {/* 03 · How I Work */}
      <AboutSection number="03 · APPROACH" title="How I work.">
        <ul className="space-y-0" style={{ maxWidth: "var(--max-prose)" }}>
          {PRINCIPLES.map((principle, i) => (
            <FadeRise key={principle.title} delay={i * 0.04}>
              <li className="hairline-t py-5 md:py-6">
                <p className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {principle.title}
                </p>
                <p className="mt-2 t-body text-ink-mute">{principle.body}</p>
              </li>
            </FadeRise>
          ))}
        </ul>
      </AboutSection>

      {/* 04 · Tools and Workflow */}
      <AboutSection number="04 · WORKFLOW" title="Tools in the loop.">
        <div className="space-y-12 md:space-y-14">
          <div>
            <p className="t-mono text-ink-quiet tabular">CORE TOOLS</p>
            <ul className="mt-5 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {CORE_TOOLS.map((tool, i) => (
                <FadeRise key={tool.name} delay={i * 0.04}>
                  <li className="hairline-t py-5 md:py-6">
                    <p className="t-subhead text-ink">{tool.name}</p>
                    <p className="mt-1.5 t-body text-ink-mute">{tool.note}</p>
                  </li>
                </FadeRise>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-mono text-ink-quiet tabular">SUPPORTING TOOLS</p>
            <p className="mt-3 max-w-prose t-body text-ink-mute">
              Used selectively for rapid exploration, alternative concepts,
              and early-stage prototyping.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-1 gap-y-2">
              {SUPPORTING_TOOLS.map((tool, i) => (
                <li
                  key={tool}
                  className="t-mono text-[0.75rem] text-ink-quiet tabular"
                >
                  {tool}
                  {i < SUPPORTING_TOOLS.length - 1 ? (
                    <span className="mx-2.5 text-ink-faint" aria-hidden>
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-mono text-ink-quiet tabular">WORKFLOW</p>
            <ol
              role="list"
              aria-label="Design workflow stages"
              className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2"
            >
              {WORKFLOW_STEPS.map((step, i) => (
                <li
                  key={step}
                  className="flex items-center gap-x-2.5"
                >
                  <span className="t-mono text-[0.8125rem] text-ink tabular">
                    {step}
                  </span>
                  {i < WORKFLOW_STEPS.length - 1 ? (
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
            <p className="mt-4 t-mono text-[0.75rem] leading-relaxed text-ink-faint">
              The tools change by project. The decision-making process stays
              consistent.
            </p>
          </div>
        </div>
      </AboutSection>

      {/* Closing statement — not a numbered section */}
      <Section rhythm="beat" width="outer" className="!pt-0">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-[clamp(3rem,6vw,7rem)]">
          <div className="md:col-span-8 md:col-start-5 lg:col-span-8 lg:col-start-5">
            <FadeRise>
              <p
                className="hairline-t max-w-[40rem] pt-10 t-body-l italic text-ink-mute leading-relaxed md:pt-12"
              >
                Great products come from thoughtful iteration, continuous
                learning, and combining the right tools with human judgment.
              </p>
            </FadeRise>
          </div>
        </div>
      </Section>
    </article>
  );
}
