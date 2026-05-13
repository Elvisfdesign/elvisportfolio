"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";

const STAGES = [
  {
    key: "frame",
    label: "01 · FRAME",
    title: "Frame the problem",
    detail:
      "Sketch the real design question. Define system boundaries. Write a one-sentence thesis before any pixel.",
    tools: ["FigJam", "Paper", "Notion"],
  },
  {
    key: "prompt",
    label: "02 · PROMPT",
    title: "Compose the prompt",
    detail:
      "Treat prompts as design specs — explicit about audience, constraints, output shape, and tone.",
    tools: ["Claude", "ChatGPT", "Google AI Studio"],
  },
  {
    key: "generate",
    label: "03 · GENERATE",
    title: "Generate the variants",
    detail:
      "AI as a junior collaborator — not a designer. Generate breadth, then strip ruthlessly.",
    tools: ["Figma Make", "Lovable", "Cursor"],
  },
  {
    key: "critique",
    label: "04 · CRITIQUE",
    title: "Critique with intent",
    detail:
      "Replace 'looks good' with 'why does it work?'. AI helps surface bias and edge cases I'd miss alone.",
    tools: ["Claude", "Self-critique loops"],
  },
  {
    key: "ship",
    label: "05 · SHIP",
    title: "Ship the system",
    detail:
      "Translate to tokens, components, code. Design-to-code is the same continuous loop, not a hand-off.",
    tools: ["Figma", "Cursor", "Webflow", "React"],
  },
];

/**
 * Movement 04 — The Practice Strip.
 *
 * A horizontally scrubbable strip showing the actual AI loop:
 * Frame → Prompt → Generate → Critique → Ship.
 *
 * Scroll-pinned: vertical scroll drives horizontal travel.
 */
export function PracticeStrip() {
  const reduced = useReducedMotionPreference();
  if (reduced) return <PracticeStripStill />;
  return <PracticeStripMotion />;
}

function PracticeStripMotion() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Travel the strip horizontally as the user scrolls vertically through the section.
  // 5 stages × 100vw-ish — but we use percentage of inner track.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  // Progress bar fill
  const fillX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="practice"
      className="relative h-[300vh] md:h-[400vh]"
      aria-labelledby="practice-heading"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Heading bar */}
        <div
          className="absolute inset-x-0 top-0 z-10 hairline-b px-[var(--gutter)] pb-6 pt-8 md:pb-8 md:pt-10"
          style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="t-mono text-ink-quiet tabular">04 / 07 · HOW I WORK WITH AI</p>
              <h2
                id="practice-heading"
                className="mt-2 t-display-m font-display text-ink"
              >
                The loop, not the magic.
              </h2>
            </div>
            <p className="max-w-md t-body text-ink-mute">
              Five named stages. Each one names the human move, the AI move, and the
              tools I reach for. This is what separates a workflow from a vibe.
            </p>
          </div>
        </div>

        {/* Stage track */}
        <motion.div
          className="absolute left-0 top-1/2 flex h-[60vh] -translate-y-1/2 items-stretch"
          style={{
            x,
            paddingInline: "var(--gutter)",
            gap: "var(--gutter)",
          }}
        >
          {STAGES.map((stage, i) => (
            <article
              key={stage.key}
              className="relative flex w-[78vw] max-w-[640px] flex-col justify-between rounded-sm border bg-canvas-raised p-8 md:w-[42vw] md:p-12"
              style={{ borderColor: "var(--hairline)" }}
            >
              <header className="flex items-baseline justify-between">
                <span className="t-mono text-ink-quiet tabular">{stage.label}</span>
                <span className="t-mono text-ink-faint tabular">
                  {String(i + 1).padStart(2, "0")} / 05
                </span>
              </header>

              <div>
                <h3 className="t-display-m font-display text-ink">{stage.title}</h3>
                <p className="mt-6 max-w-prose t-body text-ink-mute">
                  {stage.detail}
                </p>
              </div>

              <footer className="hairline-t pt-6">
                <p className="t-mono text-ink-quiet tabular">TOOLS</p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {stage.tools.map((t) => (
                    <li key={t} className="t-mono text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </footer>
            </article>
          ))}
        </motion.div>

        {/* Bottom progress bar */}
        <div
          className="absolute inset-x-0 bottom-0 px-[var(--gutter)] py-6"
          style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
        >
          <div className="hairline-y py-3">
            <div className="relative h-px w-full bg-hairline">
              <motion.div
                className="absolute inset-y-0 left-0 bg-signal"
                style={{ width: fillX }}
              />
            </div>
          </div>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2 t-mono text-ink-quiet tabular">
            <span className="max-md:hidden">SCROLL&nbsp;→&nbsp;ADVANCE&nbsp;THE&nbsp;LOOP</span>
            <span className="md:hidden">
              VERTICAL&nbsp;SCROLL&nbsp;·&nbsp;HORIZONTAL LOOP
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Reduced-motion variant — the strip becomes a vertical reading list.
 * Same information, different rhythm.
 */
function PracticeStripStill() {
  return (
    <section
      id="practice"
      className="px-[var(--gutter)] py-24 md:py-32"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
      aria-labelledby="practice-heading"
    >
      <header className="hairline-b mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-4">
        <span className="t-mono text-ink-quiet tabular">04 / 07 · HOW I WORK WITH AI</span>
        <span className="t-mono text-ink-quiet tabular">5 STAGES</span>
      </header>
      <h2 id="practice-heading" className="t-display-l font-display text-ink">
        The loop, not the magic.
      </h2>
      <p className="mt-6 max-w-prose t-body-l text-ink-mute">
        Five named stages. Each one names the human move, the AI move, and the
        tools I reach for.
      </p>
      <ol className="mt-16 space-y-12">
        {STAGES.map((stage) => (
          <li key={stage.key} className="hairline-t pt-8">
            <p className="t-mono text-ink-quiet tabular">{stage.label}</p>
            <h3 className="mt-4 t-display-m font-display text-ink">
              {stage.title}
            </h3>
            <p className="mt-4 max-w-prose t-body-l text-ink-mute">
              {stage.detail}
            </p>
            <p className="mt-4 t-mono text-ink-quiet tabular">
              TOOLS · {stage.tools.join(" · ")}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
