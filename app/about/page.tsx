import type { Metadata } from "next";
import { AboutPortraitLightbox } from "@/components/about/about-portrait-lightbox";
import { Section } from "@/components/primitives/section";
import { ReadingColumn } from "@/components/primitives/reading-column";
import { MetadataStrip } from "@/components/primitives/metadata-strip";
import { MaskUp } from "@/components/motion/mask-up";
import { FadeRise } from "@/components/motion/fade-rise";

export const metadata: Metadata = {
  title: "About",
  description:
    "Elvis Fernandes — Product Design + Front-End. Systems thinking, enterprise UX, AI-assisted workflows.",
};

const NOW = [
  "Operational tools where AI signal becomes a human decision in under a second.",
  "Data-informed dashboards that hold up across moderator, manager, and exec roles.",
  "Compressing the design-to-code loop with Cursor, Claude, and Figma Make.",
  "Patterns for AI-assisted prototyping inside enterprise constraints, not around them.",
  "Lightening design systems without losing the structural truth they protect.",
];

const WORKFLOW = [
  // Source of truth
  { item: "Figma · FigJam", note: "Where the system lives. Tokens, flows, components, working canvases." },
  { item: "React + front-end", note: "Where designs survive contact with reality." },
  // AI critique partners
  { item: "Claude", note: "Critique partner. Edge-case generator. Copy editor." },
  { item: "ChatGPT", note: "Second opinion. Different blind spots than Claude." },
  { item: "Gemini · Google AI Studio", note: "Multi-modal exploration. Voice and vision prototypes." },
  // AI scaffolding & generation
  { item: "Figma Make", note: "Generative scaffolding for new surfaces inside the system." },
  { item: "Lovable", note: "Concept-to-clickable in an afternoon." },
  { item: "UX Pilot", note: "Rapid IA and flow generation when the brief is still soft." },
  { item: "Magic Patterns", note: "Exploring component variations at speed." },
  { item: "Stitch", note: "Visual UI experimentation, throwaway-friendly." },
  { item: "Subframe", note: "Design-system-aware UI generation that respects tokens." },
  // Implementation
  { item: "Cursor", note: "Where design becomes shippable code." },
];

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
                Portrait thumbnail beside practice details — select to view a larger
                version. Asset: public/images/elvis-portrait.png (crop ~4:5 suggested).
              </figcaption>
            </figure>
            <FadeRise delay={0.2}>
              <MetadataStrip
                className="flex-col items-start gap-y-4"
                items={[
                  { label: "BASED", value: "Boston, MA" },
                  { label: "PRACTICE", value: "Product Design + Front-End" },
                  { label: "FOCUS", value: "Systems · AI Workflows · Enterprise UX" },
                  { label: "BUILDING FOR WEB SINCE", value: "2017" },
                  { label: "PRODUCT DESIGN FOCUSED SINCE", value: "2022" },
                ]}
              />
            </FadeRise>
          </div>
        </div>
      </header>

      {/* Long-form bio */}
      <Section rhythm="beat" width="reading">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="t-mono text-ink-quiet tabular">01 · BIO</p>
            <h2 className="mt-2 t-heading font-display text-ink">
              The short version.
            </h2>
          </div>
          <ReadingColumn className="md:col-span-7 md:col-start-5">
            <div className="space-y-6">
              <p className="t-body-l text-ink-mute">
                I started exploring design and front-end development in 2005,
                during my early studies in Cape Verde, and continued through
                my Bachelor&rsquo;s at the New England Institute of Art in
                Massachusetts. My professional product and UX career sharpened
                in 2017 at StudentUniverse, where I learned how product design
                behaves under real engineering and business constraints. Since
                then I&rsquo;ve moved deeper into systems work, enterprise UX,
                and the human side of AI products.
              </p>
              <p className="t-body-l text-ink-mute">
                Most recently I led design initiatives at Modulate, working
                across ToxMod, Voice Vault, internal moderation and admin
                tools, executive dashboards, authentication flows, and the
                shared design system underneath. The work was high-consequence
                enterprise UX: dense surfaces, cross-functional review, and
                the daily question of how a human should decide what to do
                with AI signal. I worked closely with engineering, product,
                QA, and trust-and-safety stakeholders — and I implemented in
                front-end where it shortened the loop.
              </p>
              <p className="t-body-l text-ink-mute">
                I work as a product designer and front-end developer in the
                same pass, which means I design for what&rsquo;s actually
                shippable, not what looks good in Figma alone. AI is a
                working tool in that loop — a critique partner, a scaffolding
                generator, a way to compress the gap between concept and
                code. I use it daily and pragmatically; the design decisions
                in the middle still happen in my head.
              </p>
            </div>
          </ReadingColumn>
        </div>
      </Section>

      {/* Currently exploring */}
      <Section rhythm="beat" width="outer">
        <header className="hairline-b mb-12 flex flex-col gap-y-3 pb-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
          <span className="t-mono text-ink-quiet tabular shrink-0">02 · NOW</span>
          <span className="t-mono text-ink-quiet tabular max-w-full break-words sm:text-right">
            CURRENTLY EXPLORING
          </span>
        </header>
        <ul>
          {NOW.map((line, i) => (
            <FadeRise key={i} delay={i * 0.06}>
              <li className="hairline-t grid grid-cols-12 items-baseline gap-4 py-6">
                <span className="col-span-2 t-mono text-ink-quiet tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 t-subhead text-ink">{line}</span>
              </li>
            </FadeRise>
          ))}
        </ul>
      </Section>

      {/* Workflow · daily drivers */}
      <Section rhythm="beat" width="outer">
        <header className="hairline-b mb-12 flex flex-col gap-y-3 pb-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
          <span className="t-mono text-ink-quiet tabular shrink-0">03 · WORKFLOW</span>
          <span className="t-mono text-ink-quiet tabular max-w-full break-words sm:text-right">
            DAILY DRIVERS
          </span>
        </header>
        <ul className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {WORKFLOW.map((tool) => (
            <FadeRise key={tool.item}>
              <li className="hairline-t pt-6">
                <p className="t-subhead text-ink">{tool.item}</p>
                <p className="mt-2 t-body text-ink-mute">{tool.note}</p>
              </li>
            </FadeRise>
          ))}
        </ul>
      </Section>

      {/* Philosophy */}
      <Section rhythm="beat" width="reading">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="t-mono text-ink-quiet tabular">04 · PHILOSOPHY</p>
            <h2 className="mt-2 t-heading font-display text-ink">
              How I work.
            </h2>
          </div>
          <ReadingColumn className="md:col-span-7 md:col-start-5">
            <ul className="space-y-6 t-body-l text-ink-mute">
              <li className="hairline-t pt-6">
                <strong className="text-ink">Systems before screens.</strong>{" "}
                Enterprise products are components, states, density modes,
                and time—not a sequence of hero frames. I think in that
                order so reviews with product and engineering stay tied to
                what we actually ship.
              </li>
              <li className="hairline-t pt-6">
                <strong className="text-ink">
                  Front-end fluency changes the design.
                </strong>{" "}
                I implement in React. What is pragmatic to build informs
                the canvas alongside brand and usability—and it gives
                engineering and me a shared vocabulary when we negotiate
                tradeoffs.
              </li>
              <li className="hairline-t pt-6">
                <strong className="text-ink">
                  AI is a collaborator, not an author.
                </strong>{" "}
                I use AI to shorten the distance between idea and artifact,
                surface edge cases, and speed scaffolding. What we commit
                to still earns its place in critique; the model helps,
                it doesn&rsquo;t decide.
              </li>
              <li className="hairline-t pt-6">
                <strong className="text-ink">
                  Data-informed, not data-led.
                </strong>{" "}
                Metrics sharpen the conversation with stakeholders—they
                should not substitute for it. I care about grounded arguments:
                users, constraints, incentives, then a deliberate call.
              </li>
              <li className="hairline-t pt-6">
                <strong className="text-ink">
                  Operational clarity over visual flash.
                </strong>{" "}
                I care most about outcomes for real operators: the right state
                at the right beat under load. Quiet UI that reads fast beats
                a memorable decoration that adds cognitive tax.
              </li>
              <li className="hairline-t pt-6">
                <strong className="text-ink">
                  Feedback is part of the work.
                </strong>{" "}
                I take critique seriously and try to give it back the same way:
                specific, tied to shared goals, actionable. Strong views,
                open to revision when we learn something new from design,
                eng, QA, or the field—iteration is ordinary, not a crisis.
              </li>
              <li className="hairline-t pt-6">
                <strong className="text-ink">
                  Collaboration is craftsmanship.
                </strong>{" "}
                Respect for engineering, product, QA, and stakeholders is
                not soft culture—it keeps the craft honest. I stay curious
                about what they see before I&rsquo;ve drawn it; that gap is
                where assumptions die. Prepared reviews, clear async signals,
                patience with the messy middle, low drama. I am ambitious about
                what we ship; I try to leave the room calmer than I found it.
              </li>
            </ul>
          </ReadingColumn>
        </div>
      </Section>
    </article>
  );
}
