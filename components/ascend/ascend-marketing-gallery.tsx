"use client";

/**
 * Marketing-site preview gallery — fixed-height window cards with
 * object-cover crops, plus a scrollable / zoomable full-page lightbox.
 * Isolated from AscendChapterGallery so product/brand chapters stay untouched.
 */

import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import { duration, ease } from "@/lib/motion";

export type AscendMarketingPage = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

type AscendMarketingGalleryProps = {
  pages: readonly AscendMarketingPage[];
};

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2;
const ZOOM_STEP = 0.25;

/**
 * Responsive preview gallery for long marketing-page screenshots.
 */
export function AscendMarketingGallery({ pages }: AscendMarketingGalleryProps) {
  const reduced = useReducedMotionPreference();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const lastTriggerIndex = useRef(0);

  const headingId = useId();
  const panelId = `${headingId}-marketing-lightbox`;
  const open = activeIndex !== null;
  const activePage =
    activeIndex !== null ? (pages[activeIndex] ?? null) : null;
  const isFirst = activeIndex === 0;
  const isLast = activeIndex !== null && activeIndex === pages.length - 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const openAt = useCallback(
    (index: number) => {
      if (index < 0 || index >= pages.length) return;
      setZoom(1);
      setActiveIndex(index);
    },
    [pages.length],
  );

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || current <= 0) return current;
      setZoom(1);
      return current - 1;
    });
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || current >= pages.length - 1) return current;
      setZoom(1);
      return current + 1;
    });
  }, [pages.length]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100));
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
        return;
      }
      if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, goPrev, goNext, zoomIn, zoomOut]);

  useEffect(() => {
    if (!open || !mounted) return;
    queueMicrotask(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
      scrollRef.current?.scrollTo({ top: 0, left: 0 });
    });
  }, [open, mounted, activeIndex]);

  useEffect(() => {
    if (open && activeIndex !== null) {
      lastTriggerIndex.current = activeIndex;
    }
  }, [open, activeIndex]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      triggerRefs.current[lastTriggerIndex.current]?.focus({
        preventScroll: true,
      });
    }
    wasOpenRef.current = open;
  }, [open]);

  const onPanelKeyDown = useCallback((e: ReactKeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = panelRef.current;
    if (!root) return;

    const selectors = [
      "button:not([disabled])",
      "[href]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(selectors),
    ).filter((el) => el.getClientRects().length > 0);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (
        active === first ||
        !focusables.some((node) => node.contains(active ?? null))
      ) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus({ preventScroll: true });
    }
  }, []);

  const shellTransition = reduced
    ? { duration: 0 }
    : { duration: duration.fast, ease: ease.entrance };

  const portal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && activePage ? (
          <motion.div
            key="ascend-marketing-lightbox"
            className="ascend-marketing-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shellTransition}
          >
            <div
              role="presentation"
              className="ascend-marketing-lightbox-backdrop"
              onClick={close}
            />

            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              onKeyDown={onPanelKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="ascend-marketing-lightbox-panel outline-none"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={shellTransition}
            >
              <header className="ascend-marketing-lightbox-header">
                <div className="min-w-0">
                  <h2
                    id={headingId}
                    className="truncate t-mono text-white tabular"
                  >
                    {activePage.label}
                  </h2>
                  <p
                    className="mt-1 t-mono text-[0.6875rem] text-white/55 tabular"
                    aria-live="polite"
                  >
                    {(activeIndex ?? 0) + 1} of {pages.length}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <div
                    className="ascend-marketing-zoom"
                    role="group"
                    aria-label="Zoom controls"
                  >
                    <button
                      type="button"
                      onClick={zoomOut}
                      disabled={zoom <= ZOOM_MIN}
                      className="ascend-marketing-zoom-btn"
                      aria-label="Zoom out"
                    >
                      −
                    </button>
                    <span className="ascend-marketing-zoom-label t-mono tabular">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={zoomIn}
                      disabled={zoom >= ZOOM_MAX}
                      className="ascend-marketing-zoom-btn"
                      aria-label="Zoom in"
                    >
                      +
                    </button>
                  </div>

                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={close}
                    className="ascend-marketing-lightbox-close"
                    aria-label="Close page viewer"
                  >
                    <span aria-hidden>×</span>
                  </button>
                </div>
              </header>

              <div className="ascend-marketing-lightbox-stage">
                {pages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={isFirst}
                      className="ascend-marketing-side-nav ascend-marketing-side-nav--prev"
                      aria-label="Previous page"
                    >
                      <span aria-hidden>←</span>
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={isLast}
                      className="ascend-marketing-side-nav ascend-marketing-side-nav--next"
                      aria-label="Next page"
                    >
                      <span aria-hidden>→</span>
                    </button>
                  </>
                ) : null}

                <div
                  ref={scrollRef}
                  className="ascend-marketing-lightbox-scroll"
                >
                  <div
                    className="ascend-marketing-lightbox-scroll-inner"
                    style={{
                      width: activePage.width * zoom,
                      minWidth: activePage.width * zoom,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activePage.src}
                      alt={activePage.alt}
                      width={activePage.width}
                      height={activePage.height}
                      decoding="async"
                      draggable={false}
                      className="ascend-marketing-lightbox-image"
                      style={{
                        width: activePage.width * zoom,
                        height: activePage.height * zoom,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-12 lg:gap-y-14">
        {pages.map((page, index) => (
          <figure key={page.id} className="m-0 flex min-w-0 flex-col">
            <figcaption className="mb-3 t-mono text-ink-quiet tabular md:mb-4">
              {page.label}
            </figcaption>

            <button
              ref={(el) => {
                triggerRefs.current[index] = el;
              }}
              type="button"
              onClick={() => openAt(index)}
              aria-haspopup="dialog"
              aria-expanded={open && activeIndex === index}
              aria-controls={open ? panelId : undefined}
              aria-label={`View ${page.label} page fullscreen`}
              className={clsx(
                "ascend-marketing-preview group relative block w-full overflow-hidden rounded-sm border text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ascend-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]",
              )}
            >
              <span className="ascend-marketing-preview-pad relative block p-2.5 md:p-3">
                <span className="ascend-marketing-preview-window relative block overflow-hidden rounded-[1px]">
                  <Image
                    src={page.src}
                    alt={page.alt}
                    fill
                    sizes="(min-width: 768px) 36vw, 100vw"
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    className="ascend-marketing-preview-image"
                  />

                  <span
                    aria-hidden
                    className="ascend-marketing-preview-overlay"
                  >
                    <span className="ascend-marketing-preview-cta t-mono tabular">
                      View page →
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>
      {portal}
    </>
  );
}
