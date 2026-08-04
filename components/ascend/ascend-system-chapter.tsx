import {
  AscendChapterGallery,
  AscendGalleryImage,
  type AscendGalleryImageItem,
} from "@/components/ascend/ascend-chapter-gallery";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { FadeRise } from "@/components/motion/fade-rise";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendSystem } from "@/content/ascend/project";

/**
 * Chapter 08 body — design system overview.
 * Title + summary stay in the parent Section header.
 *
 * Intentionally minimal: one framed overview hero (Architecture treatment),
 * Explore link in the hero header row, then Process notes.
 */
export function AscendSystemChapter() {
  const {
    overview,
    process,
    exploreHref,
    exploreLabel,
    exploreAriaLabel,
  } = ascendSystem;

  const panels: readonly AscendGalleryImageItem[] = [
    {
      id: overview.id,
      label: overview.label,
      src: overview.src,
      width: overview.width,
      height: overview.height,
      alt: overview.alt,
    },
  ];

  return (
    <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
      <FadeRise>
        <AscendChapterGallery galleryId="system" items={panels}>
          <figure className="m-0 flex min-w-0 flex-col">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 md:mb-5">
              <figcaption className="t-mono text-ink-quiet tabular">
                {overview.label}
              </figcaption>
              <EditorialTextLink
                href={exploreHref}
                label={exploreLabel}
                arrow="external"
                tone="ink"
                ariaLabel={exploreAriaLabel}
              />
            </div>
            <AscendGalleryImage
              index={0}
              sizes="(min-width: 1024px) 72vw, 100vw"
              aspectRatio={`${overview.width} / ${overview.height}`}
              framePaddingClassName="p-2.5 md:p-3"
              priority
            />
          </figure>
        </AscendChapterGallery>
      </FadeRise>

      <FadeRise delay={0.06}>
        <AscendDetails eyebrow="PROCESS" summary={process.summary}>
          <div className="space-y-4">
            {process.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="t-body text-ink-mute leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AscendDetails>
      </FadeRise>
    </div>
  );
}
