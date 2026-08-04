import type { ReactNode } from "react";
import {
  AscendChapterGallery,
  AscendGalleryImage,
  type AscendGalleryImageItem,
} from "@/components/ascend/ascend-chapter-gallery";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { FadeRise } from "@/components/motion/fade-rise";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendBrand } from "@/content/ascend/project";

/**
 * Chapter 04 body — editorial 2×2 brand system grid, explore link, then
 * Process notes. Title + summary stay in the parent Section header.
 *
 * Desktop/tablet: two equal columns. Mobile: single column with generous
 * rhythm. Each board keeps its intrinsic aspect ratio and opens in the
 * shared chapter lightbox.
 */
export function AscendBrandChapter() {
  const {
    panels: brandPanels,
    process,
    exploreHref,
    exploreLabel,
    exploreAriaLabel,
  } = ascendBrand;

  const panels: readonly AscendGalleryImageItem[] = brandPanels.map(
    (panel) => ({
      id: panel.id,
      label: panel.label,
      src: panel.src,
      width: panel.width,
      height: panel.height,
      alt: panel.alt,
    }),
  );

  return (
    <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
      <FadeRise>
        <AscendChapterGallery galleryId="brand" items={panels}>
          <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-12 lg:gap-y-14 xl:gap-x-14 xl:gap-y-16">
            {panels.map((panel, index) => {
              const source = brandPanels[index];
              return (
                <figure key={panel.id} className="m-0 flex min-w-0 flex-col">
                  <figcaption className="mb-4 t-mono text-ink-quiet tabular md:mb-5">
                    {panel.label}
                  </figcaption>

                  <AscendGalleryImage
                    index={index}
                    sizes="(min-width: 768px) 36vw, 100vw"
                    aspectRatio={`${source.width} / ${source.height}`}
                    framePaddingClassName="p-2.5 md:p-3"
                  />
                </figure>
              );
            })}
          </div>
        </AscendChapterGallery>
      </FadeRise>

      <FadeRise delay={0.06}>
        <EditorialTextLink
          href={exploreHref}
          label={exploreLabel}
          arrow="external"
          tone="ink"
          ariaLabel={exploreAriaLabel}
        />
      </FadeRise>

      <FadeRise delay={0.1}>
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
