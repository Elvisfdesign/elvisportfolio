import type { ReactNode } from "react";
import {
  AscendChapterGallery,
  AscendGalleryImage,
  type AscendGalleryImageItem,
} from "@/components/ascend/ascend-chapter-gallery";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { FadeRise } from "@/components/motion/fade-rise";
import { ascendOpportunity } from "@/content/ascend/project";

/**
 * Chapter 02 body — paired editorial spread, then Behind the Design.
 * Summary stays in the parent Section header.
 *
 * Mirrors the Vision chapter rhythm: two equal columns on desktop/tablet
 * with matching image frames, stacked on mobile. Images use object-contain
 * so the full artwork stays visible — never cropped. Clicking a frame opens
 * the chapter-scoped lightbox gallery.
 */
export function AscendOpportunityChapter() {
  const { landscape, opportunity, behindTheDesign } = ascendOpportunity;

  const panels: readonly AscendGalleryImageItem[] = [
    {
      id: landscape.id,
      label: landscape.label,
      src: landscape.src,
      width: landscape.width,
      height: landscape.height,
      alt: landscape.alt,
      caption: landscape.statement,
    },
    {
      id: opportunity.id,
      label: opportunity.label,
      src: opportunity.src,
      width: opportunity.width,
      height: opportunity.height,
      alt: opportunity.alt,
      caption: opportunity.statement,
    },
  ];

  return (
    <div className="mt-12 space-y-16 md:mt-14 md:space-y-20 lg:space-y-24">
      <FadeRise>
        <AscendChapterGallery galleryId="opportunity" items={panels}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-14">
            {panels.map((panel, index) => (
              <figure key={panel.id} className="m-0 flex min-w-0 flex-col">
                <figcaption className="mb-5 min-h-[2.75rem] t-mono text-ink-quiet tabular md:mb-6">
                  {panel.label}
                </figcaption>

                <AscendGalleryImage
                  index={index}
                  sizes="(min-width: 768px) 36vw, 100vw"
                />

                {panel.caption ? (
                  <p className="mt-6 max-w-[36rem] flex-1 t-body-l text-ink-mute leading-relaxed md:mt-7">
                    {panel.caption}
                  </p>
                ) : null}
              </figure>
            ))}
          </div>
        </AscendChapterGallery>
      </FadeRise>

      <FadeRise delay={0.1}>
        <AscendDetails eyebrow="PROCESS" summary="Behind the Design">
          <div className="space-y-8">
            <BehindBlock title="Why This Direction">
              <p>{behindTheDesign.whyThisDirection}</p>
            </BehindBlock>

            <BehindBlock title="Design Questions">
              <ul className="space-y-2" role="list">
                {behindTheDesign.designQuestions.map((q) => (
                  <li key={q} className="flex gap-3">
                    <span aria-hidden className="text-[var(--ascend-gold)]">
                      •
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </BehindBlock>

            <BehindBlock title="Research & Exploration">
              <ul className="space-y-2" role="list">
                {behindTheDesign.research.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-ink-faint">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BehindBlock>

            <BehindBlock title="Deliverables">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="list">
                {behindTheDesign.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-2 t-mono text-[0.8125rem] text-ink tabular"
                  >
                    <span aria-hidden className="text-signal">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BehindBlock>
          </div>
        </AscendDetails>
      </FadeRise>
    </div>
  );
}

function BehindBlock({
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
