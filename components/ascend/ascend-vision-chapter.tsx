import type { ReactNode } from "react";
import {
  AscendChapterGallery,
  AscendGalleryImage,
  type AscendGalleryImageItem,
} from "@/components/ascend/ascend-chapter-gallery";
import { AscendDetails } from "@/components/ascend/ascend-details";
import { FadeRise } from "@/components/motion/fade-rise";
import { ascendVision } from "@/content/ascend/project";

/**
 * Chapter 03 body — paired editorial spread, then principle callouts,
 * then Behind the Design. Summary stays in the parent Section header.
 *
 * Desktop / tablet: the two visuals sit side by side in equal columns
 * with matching image frames. Mobile stacks them. Images always use
 * object-contain so the full artwork stays visible — never cropped.
 * Clicking a frame opens the chapter-scoped lightbox gallery.
 */
export function AscendVisionChapter() {
  const {
    experience,
    principlesDiagram,
    principles,
    behindTheDesign,
  } = ascendVision;

  const panels: readonly AscendGalleryImageItem[] = [
    {
      id: experience.id,
      label: experience.label,
      src: experience.src,
      width: experience.width,
      height: experience.height,
      alt: experience.alt,
      caption: experience.statement,
    },
    {
      id: principlesDiagram.id,
      label: principlesDiagram.label,
      src: principlesDiagram.src,
      width: principlesDiagram.width,
      height: principlesDiagram.height,
      alt: principlesDiagram.alt,
      caption: principlesDiagram.intro,
    },
  ];

  return (
    <div className="mt-12 space-y-16 md:mt-14 md:space-y-20 lg:space-y-24">
      <FadeRise>
        <AscendChapterGallery galleryId="vision" items={panels}>
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

      <FadeRise delay={0.06}>
        <ul
          className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5"
          role="list"
          aria-label="ASCEND experience principles"
        >
          {principles.map((principle, index) => (
            <li
              key={principle.id}
              className="border-t py-6 sm:border-t-0 sm:border-l sm:px-5 sm:py-0 lg:px-4 first:sm:border-l-0 first:sm:pl-0"
              style={{ borderColor: "var(--hairline)" }}
            >
              <h3 className="t-subhead font-display text-ink leading-none">
                {principle.title}
              </h3>
              <div className="mt-3 space-y-1">
                {principle.lines.map((line) => (
                  <p
                    key={line}
                    className="t-body text-ink-mute leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <span className="sr-only">
                Principle {index + 1} of {principles.length}
              </span>
            </li>
          ))}
        </ul>
      </FadeRise>

      <FadeRise delay={0.1}>
        <AscendDetails eyebrow="PROCESS" summary="Behind the Design">
          <div className="space-y-8">
            <BehindBlock title="Why This Vision">
              <p>{behindTheDesign.whyThisVision}</p>
            </BehindBlock>

            <BehindBlock title="Design Principles">
              <ul className="space-y-2" role="list">
                {behindTheDesign.designPrinciples.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-[var(--ascend-gold)]">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BehindBlock>

            <BehindBlock title="Experience Goals">
              <p className="mb-3">Users should leave feeling:</p>
              <ul className="space-y-2" role="list">
                {behindTheDesign.experienceGoals.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-ink-faint">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-ink-quiet">
                {behindTheDesign.experienceGoalsNote}
              </p>
            </BehindBlock>

            <BehindBlock title="Foundation for the Product">
              <p className="mb-3">
                These principles guided every later decision I made, including:
              </p>
              <ul
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                role="list"
              >
                {behindTheDesign.foundation.map((item) => (
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
