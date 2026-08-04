import {
  AscendChapterGallery,
  AscendGalleryImage,
  type AscendGalleryImageItem,
} from "@/components/ascend/ascend-chapter-gallery";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { FadeRise } from "@/components/motion/fade-rise";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendArchitecture } from "@/content/ascend/project";

/**
 * Chapter 05 body — product architecture documentation.
 * Title + summary stay in the parent Section header.
 *
 * Hero + supporting boards keep the shared framed gallery treatment
 * (padding, border, object-contain). Vertical rhythm between the hero
 * card and the supporting trio is controlled separately.
 */
export function AscendArchitectureChapter() {
  const {
    overview,
    supporting,
    process,
    exploreHref,
    exploreLabel,
    exploreAriaLabel,
  } = ascendArchitecture;

  const panels: readonly AscendGalleryImageItem[] = [
    {
      id: overview.id,
      label: overview.label,
      src: overview.src,
      width: overview.width,
      height: overview.height,
      alt: overview.alt,
    },
    ...supporting.map((panel) => ({
      id: panel.id,
      label: panel.label,
      src: panel.src,
      width: panel.width,
      height: panel.height,
      alt: panel.alt,
    })),
  ];

  return (
    <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
      <FadeRise>
        <AscendChapterGallery galleryId="architecture" items={panels}>
          {/*
            Editorial gap BELOW the hero card only — 40–56px.
            Image wrappers keep the shared framed treatment (padding + contain).
          */}
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-14">
            {/* Hero — Product Architecture */}
            <figure className="m-0 flex min-w-0 flex-col">
              <figcaption className="mb-4 t-mono text-ink-quiet tabular md:mb-5">
                {overview.label}
              </figcaption>
              <AscendGalleryImage
                index={0}
                sizes="(min-width: 1024px) 72vw, 100vw"
                aspectRatio={`${overview.width} / ${overview.height}`}
                framePaddingClassName="p-2.5 md:p-3"
              />
            </figure>

            {/* Supporting trio — labels 12–16px above cards */}
            <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10">
              {supporting.map((panel, i) => (
                <figure key={panel.id} className="m-0 flex min-w-0 flex-col">
                  <figcaption className="mb-3 t-mono text-ink-quiet tabular md:mb-4">
                    {panel.label}
                  </figcaption>
                  <AscendGalleryImage
                    index={i + 1}
                    sizes="(min-width: 768px) 24vw, 100vw"
                    aspectRatio={`${panel.width} / ${panel.height}`}
                    framePaddingClassName="p-2.5 md:p-3"
                  />
                </figure>
              ))}
            </div>
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
          <p className="t-body text-ink-mute leading-relaxed">{process.body}</p>
        </AscendDetails>
      </FadeRise>
    </div>
  );
}
