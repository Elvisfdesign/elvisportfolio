"use client";

/**
 * ASCEND chapter image gallery + fullscreen lightbox.
 *
 * Future chapters: wrap visuals in AscendChapterGallery and open each
 * frame with AscendGalleryImage. Images that share a galleryId browse
 * together; different galleryIds stay isolated.
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: "a", src: "/images/…", alt: "…", width: 1536, height: 1024, label: "…" },
 *   { id: "b", src: "/images/…", alt: "…", width: 1536, height: 1024, label: "…" },
 * ];
 *
 * <AscendChapterGallery galleryId="brand" items={items}>
 *   {items.map((item, index) => (
 *     <figure key={item.id}>
 *       <figcaption>{item.label}</figcaption>
 *       <AscendGalleryImage index={index} sizes="(min-width: 768px) 36vw, 100vw" />
 *     </figure>
 *   ))}
 * </AscendChapterGallery>
 * ```
 */

import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import { duration, ease } from "@/lib/motion";

export type AscendGalleryImageItem = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short title shown above the inline frame and in the lightbox header. */
  label: string;
  /** Optional longer caption shown in the lightbox footer. */
  caption?: string;
};

type GalleryContextValue = {
  galleryId: string;
  items: readonly AscendGalleryImageItem[];
  openAt: (index: number) => void;
  activeIndex: number | null;
  panelId: string;
  registerTrigger: (index: number, el: HTMLButtonElement | null) => void;
};

const AscendGalleryContext = createContext<GalleryContextValue | null>(null);

function useAscendGalleryContext(component: string): GalleryContextValue {
  const ctx = useContext(AscendGalleryContext);
  if (!ctx) {
    throw new Error(`${component} must be used inside AscendChapterGallery`);
  }
  return ctx;
}

type AscendChapterGalleryProps = {
  /**
   * Gallery group id — Opportunity, Vision, Brand, etc.
   * Only images that share this id navigate together in the lightbox.
   */
  galleryId: string;
  items: readonly AscendGalleryImageItem[];
  children: ReactNode;
  className?: string;
};

/**
 * Provides chapter-scoped gallery state and mounts the shared lightbox.
 * Layout of `children` is owned by the chapter — this component does not
 * impose a grid.
 */
export function AscendChapterGallery({
  galleryId,
  items,
  children,
  className,
}: AscendChapterGalleryProps) {
  const reduced = useReducedMotionPreference();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const lastTriggerIndex = useRef(0);
  const pointerOrigin = useRef<{ x: number; y: number } | null>(null);

  const headingId = useId();
  const panelId = `${headingId}-${galleryId}-lightbox`;
  const open = activeIndex !== null;
  const activeItem =
    activeIndex !== null ? (items[activeIndex] ?? null) : null;
  const isFirst = activeIndex === 0;
  const isLast = activeIndex !== null && activeIndex === items.length - 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const openAt = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;
      setActiveIndex(index);
    },
    [items.length],
  );

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || current <= 0) return current;
      return current - 1;
    });
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || current >= items.length - 1) return current;
      return current + 1;
    });
  }, [items.length]);

  const registerTrigger = useCallback(
    (index: number, el: HTMLButtonElement | null) => {
      triggerRefs.current[index] = el;
    },
    [],
  );

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
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, goPrev, goNext]);

  useEffect(() => {
    if (!open || !mounted) return;
    const closeBtn = closeBtnRef.current;
    if (!closeBtn) return;
    queueMicrotask(() => {
      closeBtn.focus({ preventScroll: true });
    });
  }, [open, mounted]);

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
    ).filter((el) => {
      if (el.hasAttribute("disabled")) return false;
      // Skip responsive-only controls that are display:none in this viewport.
      return el.getClientRects().length > 0;
    });
    if (focusables.length === 0) return;

    if (focusables.length === 1) {
      e.preventDefault();
      focusables[0].focus({ preventScroll: true });
      return;
    }

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

  const onPointerDown = useCallback((e: ReactPointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerOrigin.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(
    (e: ReactPointerEvent) => {
      const origin = pointerOrigin.current;
      pointerOrigin.current = null;
      if (!origin) return;

      const dx = e.clientX - origin.x;
      const dy = e.clientY - origin.y;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  const ctx = useMemo<GalleryContextValue>(
    () => ({
      galleryId,
      items,
      openAt,
      activeIndex,
      panelId,
      registerTrigger,
    }),
    [galleryId, items, openAt, activeIndex, panelId, registerTrigger],
  );

  const shellTransition = reduced
    ? { duration: 0 }
    : { duration: duration.fast, ease: ease.entrance };

  const imageTransition = reduced
    ? { duration: 0 }
    : { duration: 0.22, ease: ease.soft };

  const portal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && activeItem ? (
          <motion.div
            key={`ascend-lightbox-${galleryId}`}
            className="ascend-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shellTransition}
          >
            <div
              role="presentation"
              className="ascend-lightbox-backdrop"
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
              className="ascend-lightbox-panel outline-none"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={shellTransition}
            >
              <header className="ascend-lightbox-header">
                <div className="min-w-0">
                  <h2
                    id={headingId}
                    className="truncate t-mono text-ink tabular"
                  >
                    {activeItem.label}
                  </h2>
                  <p
                    className="mt-1 t-mono text-[0.6875rem] text-ink-quiet tabular"
                    aria-live="polite"
                  >
                    {(activeIndex ?? 0) + 1} of {items.length}
                  </p>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  className="ascend-lightbox-close"
                  aria-label="Close image viewer"
                >
                  <span aria-hidden className="ascend-lightbox-close-icon">
                    ×
                  </span>
                </button>
              </header>

              <div
                className="ascend-lightbox-stage"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
              >
                {items.length > 1 ? (
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={isFirst}
                    className="ascend-lightbox-side-nav ascend-lightbox-side-nav--prev"
                    aria-label="Previous image"
                  >
                    <span aria-hidden>←</span>
                  </button>
                ) : null}

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeItem.id}
                    initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                    transition={imageTransition}
                    className="ascend-lightbox-frame"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeItem.src}
                      alt={activeItem.alt}
                      width={activeItem.width}
                      height={activeItem.height}
                      decoding="async"
                      draggable={false}
                      className="ascend-lightbox-image"
                    />
                  </motion.div>
                </AnimatePresence>

                {items.length > 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isLast}
                    className="ascend-lightbox-side-nav ascend-lightbox-side-nav--next"
                    aria-label="Next image"
                  >
                    <span aria-hidden>→</span>
                  </button>
                ) : null}
              </div>

              <footer className="ascend-lightbox-footer">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={isFirst || items.length <= 1}
                  className="ascend-lightbox-footer-nav t-mono inline-flex min-h-11 items-center gap-2 px-3 py-2 tabular md:hidden"
                  aria-label="Previous image"
                >
                  ←&nbsp;PREV
                </button>

                <p className="min-w-0 flex-1 px-2 text-center t-body text-ink-mute leading-snug">
                  {activeItem.caption ? (
                    <span className="line-clamp-2">{activeItem.caption}</span>
                  ) : (
                    <span className="t-mono text-ink-quiet tabular">
                      {(activeIndex ?? 0) + 1} of {items.length}
                    </span>
                  )}
                </p>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={isLast || items.length <= 1}
                  className="ascend-lightbox-footer-nav t-mono inline-flex min-h-11 items-center gap-2 px-3 py-2 tabular md:hidden"
                  aria-label="Next image"
                >
                  NEXT&nbsp;→
                </button>
              </footer>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <AscendGalleryContext.Provider value={ctx}>
      <div className={className}>{children}</div>
      {portal}
    </AscendGalleryContext.Provider>
  );
}

type AscendGalleryImageProps = {
  /** Zero-based index into the parent AscendChapterGallery `items` array. */
  index: number;
  sizes: string;
  /**
   * `frame` — reserved aspect-ratio box with object-contain (editorial
   * spreads that share a common stage). Default.
   * `intrinsic` — wrapper collapses to the image height (`h-auto`); use when
   * a fixed frame would reserve unused vertical space beneath the artwork.
   */
  fit?: "frame" | "intrinsic";
  /** CSS aspect-ratio for `fit="frame"`. Defaults to editorial `3 / 2`. */
  aspectRatio?: string;
  /** Extra padding inside the frame around the contained image (`frame` only). */
  framePaddingClassName?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Interactive chapter image trigger. Opens the parent gallery lightbox
 * at `index`. Must be rendered inside AscendChapterGallery.
 */
export function AscendGalleryImage({
  index,
  sizes,
  fit = "frame",
  aspectRatio = "3 / 2",
  framePaddingClassName = "p-3 md:p-4",
  className,
  priority = false,
}: AscendGalleryImageProps) {
  const { items, openAt, activeIndex, panelId, registerTrigger } =
    useAscendGalleryContext("AscendGalleryImage");
  const item = items[index];

  if (!item) return null;

  const open = activeIndex !== null;
  const intrinsic = fit === "intrinsic";

  return (
    <button
      ref={(el) => registerTrigger(index, el)}
      type="button"
      onClick={() => openAt(index)}
      aria-haspopup="dialog"
      aria-expanded={open && activeIndex === index}
      aria-controls={open ? panelId : undefined}
      aria-label={`View ${item.label} fullscreen`}
      className={clsx(
        "ascend-gallery-image-trigger group relative block w-full overflow-hidden rounded-sm border text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ascend-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]",
        className,
      )}
      style={{
        borderColor: "var(--hairline)",
        background: "var(--canvas-recessed)",
        ...(intrinsic ? {} : { aspectRatio }),
      }}
    >
      {intrinsic ? (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="block h-auto w-full"
        />
      ) : (
        <span className="ascend-story-frame relative block h-full w-full overflow-hidden">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className={clsx(
              "h-full w-full object-contain object-center",
              framePaddingClassName,
            )}
          />
        </span>
      )}

      <span
        aria-hidden
        className="ascend-gallery-expand-icon pointer-events-none absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-sm border t-mono text-[0.6875rem] tabular"
      >
        ↗
      </span>
    </button>
  );
}
