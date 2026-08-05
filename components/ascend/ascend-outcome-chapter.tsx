import type { ReactNode } from "react";
import { AscendCallout } from "@/components/ascend/ascend-callout";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { AscendMetric } from "@/components/ascend/ascend-metric";
import { FadeRise } from "@/components/motion/fade-rise";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendOutcome } from "@/content/ascend/project";

/**
 * Chapter 11 body — outcomes, reflection, and closing project links.
 * Title + summary stay in the parent Section header.
 */
export function AscendOutcomeChapter() {
  const {
    panels,
    metrics,
    changes,
    lessons,
    reflection,
    explore,
    closing,
    process,
  } = ascendOutcome;

  const built = panels[0];
  const proves = panels[1];

  return (
    <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
      {/* Two outcome panels */}
      <FadeRise>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <OutcomePanel eyebrow={built.eyebrow} title={built.title} body={built.body}>
            <ul className="mt-6 space-y-2" role="list">
              {built.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2.5 t-body text-ink-mute leading-relaxed"
                >
                  <span aria-hidden className="text-signal">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </OutcomePanel>

          <OutcomePanel
            eyebrow={proves.eyebrow}
            title={proves.title}
            body={proves.body}
          >
            <ul className="mt-6 space-y-3" role="list">
              {proves.proofPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2.5 t-body text-ink-mute leading-relaxed"
                >
                  <span aria-hidden className="text-[var(--ascend-gold)]">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </OutcomePanel>
        </div>
      </FadeRise>

      {/* Project scope metrics */}
      <FadeRise delay={0.04}>
        <div>
          <h3 className="t-display-m font-display text-ink text-balance">
            {metrics.title}
          </h3>
          <ul
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-10 lg:grid-cols-3"
            role="list"
          >
            {metrics.items.map((item) => (
              <li key={item.id}>
                <AscendMetric
                  value={item.value}
                  label={item.label}
                  caption={"caption" in item ? item.caption : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      </FadeRise>

      {/* What changed */}
      <FadeRise delay={0.06}>
        <div>
          <h3 className="t-display-m font-display text-ink text-balance">
            {changes.title}
          </h3>
          <ul
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6 lg:gap-8"
            role="list"
          >
            {changes.items.map((item) => (
              <li
                key={item.id}
                className="rounded-sm border bg-canvas-raised p-5 md:p-6"
                style={{ borderColor: "var(--hairline)" }}
              >
                <h4 className="t-subhead font-display text-ink leading-none">
                  {item.title}
                </h4>
                <p className="mt-3 t-body text-ink-mute leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </FadeRise>

      {/* Lessons */}
      <FadeRise delay={0.08}>
        <div>
          <h3 className="t-display-m font-display text-ink text-balance">
            {lessons.title}
          </h3>
          <ol className="mt-8 space-y-8 md:space-y-10" role="list">
            {lessons.items.map((lesson) => (
              <li
                key={lesson.id}
                className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 md:gap-x-6"
              >
                <span className="t-mono text-[0.6875rem] text-ink-quiet tabular">
                  {lesson.number}
                </span>
                <div className="min-w-0">
                  <h4 className="t-subhead font-display text-ink leading-none">
                    {lesson.title}
                  </h4>
                  <p className="mt-3 max-w-[40rem] t-body text-ink-mute leading-relaxed">
                    {lesson.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </FadeRise>

      {/* Personal reflection */}
      <FadeRise delay={0.1}>
        <AscendCallout
          tone="emphasis"
          eyebrow={reflection.eyebrow}
          title={reflection.title}
        >
          <div className="space-y-4">
            {reflection.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </AscendCallout>
      </FadeRise>

      {/* Explore links */}
      <FadeRise delay={0.12}>
        <div>
          <h3 className="t-display-m font-display text-ink text-balance">
            {explore.title}
          </h3>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-8 sm:gap-y-5">
            {explore.links.map((link, index) => (
              <div key={link.id} className="flex flex-col items-start gap-2.5">
                <EditorialTextLink
                  href={link.href}
                  label={link.label}
                  arrow="external"
                  tone={index === 0 ? "ink" : "mute"}
                  ariaLabel={link.ariaLabel}
                />
                {"showStatus" in link && link.showStatus ? (
                  <p className="ascend-prototype-status-line">
                    <span className="ascend-prototype-status-dot" aria-hidden />
                    <span>{explore.statusLabel}</span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </FadeRise>

      {/* Process — next phase */}
      <FadeRise delay={0.14}>
        <AscendDetails eyebrow="PROCESS" summary={process.summary}>
          <div className="space-y-7 md:space-y-8">
            {process.blocks.map((block) => (
              <ProcessBlock key={block.id} title={block.title}>
                <p>{block.body}</p>
              </ProcessBlock>
            ))}
          </div>
        </AscendDetails>
      </FadeRise>

      {/* Closing statement */}
      <FadeRise delay={0.16}>
        <div className="max-w-[42rem]">
          <p className="t-display-m font-display text-ink text-balance leading-tight">
            {closing.title}
          </p>
          <p className="mt-6 max-w-prose t-body-l text-ink-mute leading-relaxed">
            {closing.body}
          </p>
          <div className="mt-8">
            <EditorialTextLink
              href={closing.ctaHref}
              label={closing.ctaLabel}
              arrow="external"
              tone="ink"
              ariaLabel={closing.ctaAriaLabel}
            />
          </div>
        </div>
      </FadeRise>
    </div>
  );
}

function OutcomePanel({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <article
      className="rounded-sm border bg-canvas-raised p-6 md:p-8"
      style={{ borderColor: "var(--hairline)" }}
    >
      <p className="t-mono text-ink-quiet tabular">{eyebrow}</p>
      <h3 className="mt-4 t-subhead font-display text-ink leading-none text-balance">
        {title}
      </h3>
      <p className="mt-4 t-body text-ink-mute leading-relaxed">{body}</p>
      {children}
    </article>
  );
}

function ProcessBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="t-mono text-[0.6875rem] text-ink-quiet tabular">{title}</h3>
      <div className="mt-3 t-body text-ink-mute leading-relaxed">{children}</div>
    </div>
  );
}
