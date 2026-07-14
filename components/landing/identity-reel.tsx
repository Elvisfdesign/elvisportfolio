import { Section } from "@/components/primitives/section";
import { MaskUp } from "@/components/motion/mask-up";
import { FadeRise } from "@/components/motion/fade-rise";

/**
 * Movement 02 — Practice framing.
 *
 * Homepage layer between hero and Selected Work: how to read the portfolio—
 * systems, clarity, implementation—without repeating case studies or a résumé.
 */
export function IdentityReel() {
  return (
    <Section
      rhythm="movementDense"
      width="outer"
      eyebrow="PRACTICE"
      number="04 / 07"
      id="identity"
      tightHeader
      className="!pt-8 !pb-16 md:!pt-14 md:!pb-28 lg:!pt-16 lg:!pb-36"
    >
      <div className="flex max-w-4xl flex-col">
        <h2 className="t-display-l font-display text-ink">
          <MaskUp
            lines={[
              "Systems thinking,",
              "clarity, and shipped detail.",
            ]}
            stagger={0.08}
            tightLines
          />
        </h2>

        <FadeRise delay={0.25} className="mt-12 max-w-prose space-y-6">
          <p className="t-body-l text-ink-mute">
            What follows reflects work shaped by systems thinking,
            collaboration, and real product constraints — designed to stay
            clear, useful, and adaptable as products evolve.{" "}
            <span className="text-ink">
              My craft sits between product strategy, design, and front-end
              implementation.
            </span>
          </p>
          <p className="t-body-l text-ink-mute">
            AI is a new material, not a feature. I use it the way I use type,
            color, and motion: as a deliberate part of the design.
          </p>
        </FadeRise>
      </div>
    </Section>
  );
}
