import { Section } from "@/components/primitives/section";
import { FadeRise } from "@/components/motion/fade-rise";

/**
 * Movement 06 — Selected credits / context.
 *
 * Editorial credits, not logos. Modulate · ToxMod · Voice Vault, framed as
 * a print colophon.
 */
export function CreditsStrip() {
  const credits = [
    { context: "Senior Product Designer", at: "Modulate", years: "Sep 2022 — Mar 2026" },
    {
      context: "ToxMod",
      at: "Real-time voice moderation",
      years: "Reviewer infrastructure · reskins + refresh",
    },
    {
      context: "Voice Vault",
      at: "Voice authentication",
      years: "Identity UX · greenfield → platform evolution",
    },
    {
      context: "Marketing",
      at: "modulate.ai",
      years: "Webflow stack · redesign + system stewardship",
    },
  ];

  return (
    <Section
      rhythm="movement"
      width="outer"
      eyebrow="CONTEXT"
      number="06 / 07"
      id="context"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <FadeRise>
            <h2 className="t-display-m font-display text-ink">
              Selected credits.
            </h2>
            <p className="mt-6 max-w-prose t-body-l text-ink-mute">
              Set as a print colophon — not as a logo wall. Where the work
              happened, and what it asked of me.
            </p>
          </FadeRise>
        </div>

        <div className="md:col-span-8">
          <ul>
            {credits.map((credit, i) => (
              <FadeRise key={credit.at} delay={i * 0.08}>
                <li className="hairline-t py-8 md:py-6">
                  <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:items-baseline md:gap-x-6 lg:gap-x-10">
                    <div className="flex items-start justify-between gap-4 md:contents">
                      <span className="t-mono text-ink-quiet tabular shrink-0 md:col-span-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-right t-mono text-ink-quiet tabular md:hidden">
                        {credit.years}
                      </span>
                    </div>
                    <span className="max-w-xl t-subhead text-ink md:col-span-5">
                      {credit.context}
                    </span>
                    <span className="max-w-xl t-body text-ink-mute md:col-span-3">
                      {credit.at}
                    </span>
                    <span className="hidden md:block md:col-span-2 md:text-right t-mono text-ink-quiet tabular">
                      {credit.years}
                    </span>
                  </div>
                </li>
              </FadeRise>
            ))}
            <li className="hairline-y py-6 t-mono text-ink-quiet tabular">
              END&nbsp;OF&nbsp;COLOPHON
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
