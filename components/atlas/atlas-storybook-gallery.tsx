"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AtlasStatusBadge } from "@/components/atlas/atlas-status-badge";
import type { AtlasStorybookShot } from "@/content/atlas/project";

type AtlasStorybookGalleryProps = {
  shots: readonly AtlasStorybookShot[];
  className?: string;
};

/**
 * Storybook screenshot gallery. Hides cleanly when no assets are supplied.
 */
export function AtlasStorybookGallery({
  shots,
  className,
}: AtlasStorybookGalleryProps) {
  const visible = useMemo(
    () => shots.filter((shot) => Boolean(shot.imageSrc)),
    [shots],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const active = visible.find((s) => s.id === activeId) ?? null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (visible.length === 0) return null;

  const portal =
    mounted &&
    active &&
    createPortal(
      <div className="atlas-lightbox" role="presentation">
        <button
          type="button"
          className="atlas-lightbox-backdrop"
          aria-label="Close screenshot"
          onClick={() => setActiveId(null)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="atlas-lightbox-panel"
        >
          <header className="atlas-lightbox-header">
            <h3 className="t-mono text-ink tabular">{active.title}</h3>
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="t-mono min-h-11 px-4 text-ink-quiet hover:text-ink"
              aria-label="Close screenshot"
            >
              CLOSE
            </button>
          </header>
          <div className="atlas-lightbox-stage">
            <div className="atlas-lightbox-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.imageSrc}
                alt={active.title}
                width={active.width}
                height={active.height}
                className="atlas-lightbox-image"
              />
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className={clsx("space-y-6", className)}>
      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {visible.map((shot) => (
          <li key={shot.id}>
            <figure
              className="overflow-hidden rounded-sm border bg-canvas-raised"
              style={{ borderColor: "var(--hairline)" }}
            >
              <button
                type="button"
                onClick={() => setActiveId(shot.id)}
                className="relative block aspect-[16/10] w-full bg-canvas-recessed text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                aria-label={`View ${shot.title} fullscreen`}
              >
                <Image
                  src={shot.imageSrc}
                  alt={shot.title}
                  width={shot.width}
                  height={shot.height}
                  className="h-full w-full object-contain object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </button>
              <figcaption
                className="space-y-2 border-t px-4 py-4"
                style={{ borderColor: "var(--hairline)" }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="t-mono text-ink tabular">{shot.title}</span>
                  <AtlasStatusBadge state={shot.status} />
                </div>
                <p className="t-body text-ink-mute">{shot.description}</p>
                {shot.href ? (
                  <a
                    href={shot.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-mono link-underline text-ink-mute tabular"
                    aria-label={`${shot.title} — opens in a new tab`}
                  >
                    Open&nbsp;↗
                  </a>
                ) : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {portal}
    </div>
  );
}
