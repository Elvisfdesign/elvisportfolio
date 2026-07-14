"use client";

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
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";
import type { AtlasScreen } from "@/content/atlas/project";
import { duration, ease } from "@/lib/motion";

type AtlasScreenGalleryProps = {
  screens: readonly AtlasScreen[];
  className?: string;
};

/**
 * Product screenshot grid + fullscreen editorial gallery for Atlas.
 * Keyboard, focus, and swipe patterns follow AboutPortraitLightbox.
 */
export function AtlasScreenGallery({
  screens,
  className,
}: AtlasScreenGalleryProps) {
  const reduced = useReducedMotionPreference();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const pointerOrigin = useRef<{ x: number; y: number } | null>(null);

  const headingId = useId();
  const panelId = `${headingId}-atlas-gallery`;
  const open = activeIndex !== null;
  const activeScreen =
    activeIndex !== null ? screens[activeIndex] ?? null : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + screens.length) % screens.length;
    });
  }, [screens.length]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % screens.length;
    });
  }, [screens.length]);

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

  const lastTriggerIndex = useRef(0);

  useEffect(() => {
    if (open && activeIndex !== null) {
      lastTriggerIndex.current = activeIndex;
    }
  }, [open, activeIndex]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      const trigger = triggerRefs.current[lastTriggerIndex.current];
      trigger?.focus({ preventScroll: true });
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
    );
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

  const transition = reduced
    ? { duration: 0 }
    : { duration: duration.base, ease: ease.entrance };

  const portal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && activeScreen ? (
          <motion.div
            key="atlas-screen-gallery-shell"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <div
              role="presentation"
              className="absolute inset-0 cursor-default"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--canvas) 88%, transparent)",
                backdropFilter: "blur(2px)",
              }}
              onClick={close}
            />

            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[max(0.75rem,env(safe-area-inset-left))] pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-[var(--gutter)]"
            >
              <motion.div
                ref={panelRef}
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={headingId}
                onKeyDown={onPanelKeyDown}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                className="pointer-events-auto relative flex w-full max-w-[min(92vw,1600px)] flex-col outline-none"
                initial={
                  reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                transition={transition}
              >
                <div className="mb-4 flex shrink-0 items-center justify-between gap-4 sm:mb-5">
                  <div className="min-w-0">
                    <h2
                      id={headingId}
                      className="truncate t-mono text-ink tabular"
                    >
                      {activeScreen.label}
                    </h2>
                    <p
                      className="mt-1 t-mono text-ink-quiet tabular"
                      aria-live="polite"
                    >
                      {(activeIndex ?? 0) + 1}&nbsp;/&nbsp;{screens.length}
                    </p>
                  </div>

                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={close}
                    className={clsx(
                      "t-mono inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center px-4 py-2 tabular",
                      "border border-transparent text-ink-quiet transition-colors hover:text-ink",
                      "focus-visible:border-signal focus-visible:outline-none",
                    )}
                    aria-label="Close gallery"
                  >
                    CLOSE
                  </button>
                </div>

                <div
                  className="relative overflow-hidden rounded-sm border bg-canvas-recessed"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeScreen.id}
                      initial={
                        reduced ? { opacity: 1 } : { opacity: 0 }
                      }
                      animate={{ opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                      transition={{
                        duration: reduced ? 0 : duration.fast,
                        ease: ease.soft,
                      }}
                      className="relative flex items-center justify-center"
                    >
                      <Image
                        src={activeScreen.src}
                        alt={activeScreen.alt}
                        width={activeScreen.width}
                        height={activeScreen.height}
                        priority
                        className="block h-auto max-h-[min(82dvh,calc(100svh-9rem))] w-full object-contain"
                        sizes="min(92vw, 1600px)"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
                  <button
                    type="button"
                    onClick={goPrev}
                    className={clsx(
                      "t-mono inline-flex min-h-11 items-center gap-2 px-3 py-2 tabular text-ink-mute transition-colors hover:text-ink",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                    )}
                    aria-label="Previous screenshot"
                  >
                    ←&nbsp;PREV
                  </button>

                  <ul
                    className="hidden items-center gap-2 sm:flex"
                    role="list"
                    aria-label="Screenshots"
                  >
                    {screens.map((screen, index) => (
                      <li key={screen.id}>
                        <button
                          type="button"
                          onClick={() => openAt(index)}
                          aria-label={`Show ${screen.label}`}
                          aria-current={index === activeIndex ? "true" : undefined}
                          className={clsx(
                            "h-1.5 w-6 rounded-full transition-colors duration-300",
                            index === activeIndex
                              ? "bg-signal"
                              : "bg-[var(--hairline-strong)] hover:bg-ink-quiet",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                          )}
                        />
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={goNext}
                    className={clsx(
                      "t-mono inline-flex min-h-11 items-center gap-2 px-3 py-2 tabular text-ink-mute transition-colors hover:text-ink",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                    )}
                    aria-label="Next screenshot"
                  >
                    NEXT&nbsp;→
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <ul
        className={clsx(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
        role="list"
      >
        {screens.map((screen, index) => (
          <li key={screen.id}>
            <button
              ref={(el) => {
                triggerRefs.current[index] = el;
              }}
              type="button"
              onClick={() => openAt(index)}
              aria-haspopup="dialog"
              aria-expanded={open && activeIndex === index}
              aria-controls={open ? panelId : undefined}
              aria-label={`View ${screen.label} fullscreen`}
              className={clsx(
                "atlas-screen-card group relative block w-full touch-manipulation rounded-sm text-left outline-none",
                "[--tw-ring-offset-color:var(--canvas)]",
                "focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2",
              )}
            >
              <figure
                className="relative overflow-hidden rounded-sm border bg-canvas-raised transition-[border-color] duration-300"
                style={{ borderColor: "var(--hairline)" }}
              >
                <div className="relative aspect-[16/12] bg-canvas-recessed">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.width}
                    height={screen.height}
                    loading={index < 3 ? "eager" : "lazy"}
                    priority={index === 0}
                    className="h-full w-full object-contain object-top transition-transform duration-500 ease-[var(--ease-soft)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.01]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <figcaption className="flex items-center justify-between gap-3 border-t px-4 py-3 md:px-5"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <span className="t-mono text-ink tabular">{screen.label}</span>
                  <span
                    aria-hidden
                    className="t-mono text-[0.6875rem] text-ink-quiet tabular transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink"
                  >
                    VIEW&nbsp;FULL&nbsp;SCREEN
                  </span>
                </figcaption>
              </figure>
            </button>
          </li>
        ))}
      </ul>

      {portal}
    </>
  );
}
