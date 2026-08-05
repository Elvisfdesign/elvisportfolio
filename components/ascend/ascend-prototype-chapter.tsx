import Image from "next/image";
import type { ReactNode } from "react";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { FadeRise } from "@/components/motion/fade-rise";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendPrototype } from "@/content/ascend/project";

/**
 * Chapter 10 body — live interactive product prototype.
 * Title + summary stay in the parent Section header.
 */
export function AscendPrototypeChapter() {
  const {
    launchHref,
    launchLabel,
    launchAriaLabel,
    callout,
    screens,
    principles,
    status,
    builtWith,
    relatedLinks,
    process,
    closing,
  } = ascendPrototype;

  return (
    <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
      {/* Live prototype callout */}
      <FadeRise>
        <aside
          className="ascend-prototype-callout relative rounded-sm border bg-canvas-raised p-6 md:p-8 lg:p-10"
          style={{ borderColor: "var(--hairline)" }}
        >
          <span
            aria-hidden
            className="absolute inset-y-6 left-0 w-[2px] rounded-full bg-[var(--ascend-gold)] md:inset-y-8"
          />
          <div className="pl-3 md:pl-4">
            <p className="t-mono text-ink-quiet tabular">{callout.eyebrow}</p>
            <h3 className="mt-4 t-display-m font-display text-ink text-balance">
              {callout.title}
            </h3>
            <p className="mt-4 max-w-[42rem] t-body-l text-ink-mute leading-relaxed">
              {callout.body}
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
              <a
                href={launchHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={launchAriaLabel}
                className="ascend-hero-primary-cta group inline-flex min-h-11 items-center gap-4 rounded-sm border px-5 py-4 md:px-6"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--ascend-gold) 55%, var(--hairline-strong))",
                  background: "var(--ascend-gold-soft)",
                }}
              >
                <span className="t-subhead font-display text-ink leading-none">
                  {launchLabel}
                </span>
                <span
                  aria-hidden
                  className="ascend-hero-cta-arrow t-mono text-[var(--ascend-gold)] tabular"
                >
                  ↗
                </span>
              </a>

              <div className="ascend-prototype-status">
                <p className="ascend-prototype-status-line">
                  <span className="ascend-prototype-status-dot" aria-hidden />
                  <span>{callout.statusLabel}</span>
                </p>
                <p className="mt-2 max-w-[28rem] t-mono text-[0.6875rem] text-ink-quiet tabular leading-relaxed">
                  {callout.statusSupport}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </FadeRise>

      {/* Screenshot highlights */}
      <FadeRise delay={0.04}>
        <ul
          className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-12 lg:gap-y-14"
          role="list"
          aria-label="ASCEND prototype screen highlights"
        >
          {screens.map((screen) => (
            <li key={screen.id} className="min-w-0">
              <a
                href={screen.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ascend-prototype-screen group block rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ascend-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
                aria-label={`Open ${screen.title} in the live prototype`}
              >
                <span className="ascend-prototype-preview relative block overflow-hidden rounded-sm border">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    sizes="(min-width: 768px) 36vw, 100vw"
                    className="ascend-prototype-preview-image"
                  />
                </span>
                <h3 className="mt-4 t-subhead font-display text-ink leading-none">
                  {screen.title}
                </h3>
                <p className="mt-3 t-body text-ink-mute leading-relaxed">
                  {screen.description}
                </p>
                <span className="mt-3 inline-flex items-center t-mono text-ink-quiet tabular transition-colors duration-200 group-hover:text-signal">
                  Open live route
                  <span aria-hidden className="ml-1">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </FadeRise>

      {/* Principles */}
      <FadeRise delay={0.06}>
        <ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6 lg:gap-8"
          role="list"
          aria-label="Prototype principles"
        >
          {principles.map((principle) => (
            <li
              key={principle.id}
              className="rounded-sm border bg-canvas-raised p-5 md:p-6"
              style={{ borderColor: "var(--hairline)" }}
            >
              <h3 className="t-subhead font-display text-ink leading-none">
                {principle.title}
              </h3>
              <p className="mt-3 t-body text-ink-mute leading-relaxed">
                {principle.body}
              </p>
            </li>
          ))}
        </ul>
      </FadeRise>

      {/* Current status */}
      <FadeRise delay={0.08}>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="t-display-m font-display text-ink text-balance">
              {status.title}
            </h3>
            <p className="ascend-prototype-status-line">
              <span className="ascend-prototype-status-dot" aria-hidden />
              <span>{status.label}</span>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <StatusList
              title="Available now"
              items={status.available}
              tone="available"
            />
            <StatusList
              title="In progress"
              items={status.inProgress}
              tone="progress"
            />
          </div>
        </div>
      </FadeRise>

      {/* Built with */}
      <FadeRise delay={0.1}>
        <div>
          <h3 className="t-mono text-ink-quiet tabular">Built With</h3>
          <ul
            className="mt-4 flex flex-wrap gap-2"
            role="list"
            aria-label="Prototype technology stack"
          >
            {builtWith.map((item) => (
              <li
                key={item}
                className="rounded-sm border px-3 py-2 t-mono text-[0.75rem] text-ink-mute tabular"
                style={{ borderColor: "var(--hairline)" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </FadeRise>

      {/* Related links */}
      <FadeRise delay={0.12}>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          {relatedLinks.map((link, index) => (
            <EditorialTextLink
              key={link.id}
              href={link.href}
              label={link.label}
              arrow="external"
              tone={index === 0 ? "ink" : "mute"}
              ariaLabel={link.ariaLabel}
            />
          ))}
        </div>
      </FadeRise>

      {/* Process */}
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

      {/* Closing CTA */}
      <FadeRise delay={0.16}>
        <div className="max-w-[40rem]">
          <h3 className="t-display-m font-display text-ink text-balance">
            {closing.title}
          </h3>
          <p className="mt-6 max-w-prose t-body-l text-ink-mute leading-relaxed">
            {closing.body}
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            <EditorialTextLink
              href={closing.primaryHref}
              label={closing.primaryLabel}
              arrow="external"
              tone="ink"
              ariaLabel={closing.primaryAriaLabel}
            />
            <EditorialTextLink
              href={closing.secondaryHref}
              label={closing.secondaryLabel}
              arrow="external"
              tone="mute"
              ariaLabel={closing.secondaryAriaLabel}
            />
          </div>
        </div>
      </FadeRise>
    </div>
  );
}

function StatusList({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "available" | "progress";
}) {
  return (
    <div>
      <h4 className="t-mono text-[0.6875rem] text-ink-quiet tabular">{title}</h4>
      <ul className="mt-3 space-y-2" role="list">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-baseline gap-2.5 t-body text-ink-mute leading-relaxed"
          >
            <span
              aria-hidden
              className={
                tone === "available"
                  ? "text-signal"
                  : "text-ink-faint"
              }
            >
              {tone === "available" ? "✓" : "–"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
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
