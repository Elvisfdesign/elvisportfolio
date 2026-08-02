"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import type { AscendChapter } from "@/content/ascend/project";

type AscendChapterNavProps = {
  chapters: readonly AscendChapter[];
  /**
   * `strip` — horizontal chip row for <xl.
   * `rail` — vertical sticky list for xl+.
   * `both` — render both (legacy / single-mount layouts).
   */
  variant?: "strip" | "rail" | "both";
  className?: string;
};

/**
 * Sticky chapter navigation. New pattern for the portfolio (Atlas didn't
 * have one), so it deserves a note on the design decisions:
 *
 *   - Desktop (`xl+`): position:sticky right rail. Vertical list of chapter
 *     labels with a numeric prefix and a hairline connector. Active chapter
 *     receives an ink text color + a gold vertical accent bar to the left.
 *   - Tablet + mobile: horizontal chip strip pinned under the site nav
 *     via `sticky top-16`. Users can flick through chapters without
 *     obstructing the reading flow.
 *
 * Active chapter is tracked by an IntersectionObserver keyed on each
 * chapter section's `id`. The observer only fires when a heading crosses
 * the top viewport band (rootMargin trims the bottom 60% off), so at any
 * moment exactly one chapter is highlighted.
 *
 * Keyboard: every chip is a real anchor, so tab order and browser-native
 * anchor jumps work without any custom handlers. Screen readers hear the
 * chapter numbers because we render them as visible text (not aria-labels).
 */
export function AscendChapterNav({
  chapters,
  variant = "both",
  className,
}: AscendChapterNavProps) {
  const [activeId, setActiveId] = useState<string>(chapters[0]?.id ?? "");
  const showStrip = variant === "strip" || variant === "both";
  const showRail = variant === "rail" || variant === "both";

  useEffect(() => {
    const targets = chapters
      .map((c) =>
        typeof document === "undefined"
          ? null
          : document.getElementById(`chapter-${c.slug}`),
      )
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // Highlight whichever chapter heading is closest to (but past) the top.
    // rootMargin: -20% top, -60% bottom → active band is roughly the top
    // fifth of the viewport. This matches how readers scan case studies.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          const id = visible[0].target.id.replace(/^chapter-/, "");
          setActiveId(id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="ASCEND case study chapters"
      className={clsx("ascend-chapter-nav", className)}
    >
      {showStrip ? (
        <div
          className={clsx(
            "ascend-chapter-nav-strip",
            variant === "both" && "xl:hidden",
          )}
        >
          <ul
            className="flex gap-6 overflow-x-auto whitespace-nowrap px-[var(--gutter)] py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            role="list"
          >
            {chapters.map((c) => (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#chapter-${c.slug}`}
                  aria-current={activeId === c.id ? "location" : undefined}
                  className={clsx(
                    "inline-flex items-baseline gap-2 t-mono tabular touch-manipulation",
                    "transition-colors duration-200",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                    activeId === c.id
                      ? "text-ink"
                      : "text-ink-quiet hover:text-ink",
                  )}
                >
                  <span className="text-ink-faint">{c.number}</span>
                  <span>{c.navLabel}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {showRail ? (
        <div className={clsx(variant === "both" && "hidden xl:block")}>
          <ol className="space-y-2" role="list">
            {chapters.map((c) => {
              const active = activeId === c.id;
              return (
                <li key={c.id} className="relative">
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute -left-3 top-1 h-4 w-[2px] rounded-full bg-[var(--ascend-gold)]"
                    />
                  ) : null}
                  <a
                    href={`#chapter-${c.slug}`}
                    aria-current={active ? "location" : undefined}
                    className={clsx(
                      "group inline-flex items-baseline gap-3 t-mono tabular touch-manipulation",
                      "transition-colors duration-200",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                      active ? "text-ink" : "text-ink-quiet hover:text-ink",
                    )}
                  >
                    <span
                      className={clsx(
                        "shrink-0 tabular",
                        active ? "text-ink-mute" : "text-ink-faint",
                      )}
                    >
                      {c.number}
                    </span>
                    <span>{c.navLabel}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </nav>
  );
}
