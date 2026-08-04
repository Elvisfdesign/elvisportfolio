import type { ReactNode } from "react";
import {
  AscendChapterGallery,
  AscendGalleryImage,
  type AscendGalleryImageItem,
} from "@/components/ascend/ascend-chapter-gallery";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { AscendSectionHeader } from "@/components/ascend/ascend-section-header";
import { FadeRise } from "@/components/motion/fade-rise";
import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendProduct } from "@/content/ascend/project";

/**
 * Chapter 06 body — editorial product showcase.
 * Title + summary stay in the parent Section header.
 *
 * Layout: Dashboard hero → featured intro → equal Daily Plan / Programs
 * pair → full-width Session Experience → Figma explore CTA → Process.
 */
export function AscendProductChapter() {
  const {
    hero,
    featured,
    session,
    featuredTitle,
    featuredDescription,
    exploreHref,
    exploreLabel,
    exploreAriaLabel,
    exploreTitle,
    exploreDescription,
    process,
  } = ascendProduct;

  const panels: readonly AscendGalleryImageItem[] = [
    {
      id: hero.id,
      label: hero.label,
      src: hero.src,
      width: hero.width,
      height: hero.height,
      alt: hero.alt,
    },
    ...featured.map((panel) => ({
      id: panel.id,
      label: panel.label,
      src: panel.src,
      width: panel.width,
      height: panel.height,
      alt: panel.alt,
    })),
    {
      id: session.id,
      label: session.label,
      src: session.src,
      width: session.width,
      height: session.height,
      alt: session.alt,
    },
  ];

  /** Shared stage — equal columns; contain keeps each mockup uncropped. */
  const featuredPairAspect = `${featured[0].width} / ${Math.max(
    featured[0].height,
    featured[1].height,
  )}`;

  return (
    <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
      <FadeRise>
        <AscendChapterGallery galleryId="product" items={panels}>
          <div className="flex flex-col gap-14 md:gap-16 lg:gap-20">
            {/* Section 1 — Dashboard hero */}
            <figure className="m-0 flex min-w-0 flex-col">
              <figcaption className="mb-4 t-mono text-ink-quiet tabular md:mb-5">
                {hero.label}
              </figcaption>
              <AscendGalleryImage
                index={0}
                sizes="(min-width: 1024px) 72vw, 100vw"
                aspectRatio={`${hero.width} / ${hero.height}`}
                framePaddingClassName="p-2.5 md:p-3"
                priority
              />
            </figure>

            {/* Section 2 — Featured intro */}
            <AscendSectionHeader
              level="h3"
              title={featuredTitle}
              description={featuredDescription}
            />

            {/* Section 3 — Equal two-column pair */}
            <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-14">
              {featured.map((panel, i) => (
                <figure key={panel.id} className="m-0 flex min-w-0 flex-col">
                  <figcaption className="mb-3 t-mono text-ink-quiet tabular md:mb-4">
                    {panel.label}
                  </figcaption>
                  <AscendGalleryImage
                    index={i + 1}
                    sizes="(min-width: 768px) 36vw, 100vw"
                    aspectRatio={featuredPairAspect}
                    framePaddingClassName="p-2.5 md:p-3"
                  />
                </figure>
              ))}
            </div>

            {/* Section 4 — Session Experience feature */}
            <figure className="m-0 flex min-w-0 flex-col">
              <figcaption className="mb-4 t-mono text-ink-quiet tabular md:mb-5">
                {session.label}
              </figcaption>
              <AscendGalleryImage
                index={3}
                sizes="(min-width: 1024px) 72vw, 100vw"
                aspectRatio={`${session.width} / ${session.height}`}
                framePaddingClassName="p-2.5 md:p-3"
              />
            </figure>
          </div>
        </AscendChapterGallery>
      </FadeRise>

      {/* Section 5 — Editorial explore CTA */}
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
            {process.blocks.map((block) => {
              const body = "body" in block ? block.body : undefined;
              const itemsIntro =
                "itemsIntro" in block ? block.itemsIntro : undefined;
              const items = "items" in block ? block.items : undefined;
              const itemsOutro =
                "itemsOutro" in block ? block.itemsOutro : undefined;

              return (
                <ProcessBlock key={block.id} title={block.title}>
                  {body ? <p>{body}</p> : null}

                  {itemsIntro ? (
                    <p className={body ? "mt-3" : undefined}>{itemsIntro}</p>
                  ) : null}

                  {items ? (
                    <ul
                      className={
                        body || itemsIntro ? "mt-3 space-y-2" : "space-y-2"
                      }
                      role="list"
                    >
                      {items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden
                            className="text-[var(--ascend-gold)]"
                          >
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {itemsOutro ? <p className="mt-3">{itemsOutro}</p> : null}
                </ProcessBlock>
              );
            })}
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
