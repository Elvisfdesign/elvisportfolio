import type { ReactNode } from "react";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { AscendMarketingGallery } from "@/components/ascend/ascend-marketing-gallery";
import { FadeRise } from "@/components/motion/fade-rise";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendMarketing } from "@/content/ascend/project";

/**
 * Chapter 07 body — marketing website showcase.
 * Title + summary stay in the parent Section header.
 *
 * Fixed-height window previews (object-cover) keep long page screenshots
 * readable; the lightbox opens the full scrollable page with zoom.
 */
export function AscendMarketingChapter() {
  const {
    pages,
    process,
    exploreHref,
    exploreLabel,
    exploreAriaLabel,
    exploreTitle,
    exploreDescription,
  } = ascendMarketing;

  return (
    <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
      <FadeRise>
        <AscendMarketingGallery pages={pages} />
      </FadeRise>

      <FadeRise delay={0.06}>
        <div className="max-w-[40rem]">
          <h3 className="t-display-m font-display text-ink text-balance">
            {exploreTitle}
          </h3>
          <p className="mt-6 max-w-prose t-body-l text-ink-mute leading-relaxed">
            {exploreDescription}
          </p>
          <div className="mt-8">
            <EditorialTextLink
              href={exploreHref}
              label={exploreLabel}
              arrow="external"
              tone="ink"
              ariaLabel={exploreAriaLabel}
            />
          </div>
        </div>
      </FadeRise>

      <FadeRise delay={0.1}>
        <AscendDetails eyebrow="PROCESS" summary={process.summary}>
          <div className="space-y-7 md:space-y-8">
            {process.points.map((point) => (
              <ProcessBlock key={point.id} title={point.title}>
                <p>{point.body}</p>
              </ProcessBlock>
            ))}
          </div>
        </AscendDetails>
      </FadeRise>
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
