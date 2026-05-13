"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Section } from "@/components/primitives/section";
import { useReducedMotionPreference } from "@/components/motion/use-reduced-motion";

type Capability = {
  x: number; // 0–100
  y: number; // 0–100
  label: string;
  family: "design" | "engineering" | "systems" | "ai";
};

// Four overlapping families. AI is a literal axis of practice, not a sticker.
const CAPABILITIES: Capability[] = [
  // Design (top-left cluster)
  { x: 22, y: 24, family: "design", label: "Product Design" },
  { x: 14, y: 36, family: "design", label: "UX / UI" },
  { x: 30, y: 14, family: "design", label: "Visual Design" },
  { x: 36, y: 32, family: "design", label: "Information Design" },

  // Engineering (top-right cluster)
  { x: 70, y: 22, family: "engineering", label: "Front-End" },
  { x: 82, y: 32, family: "engineering", label: "React / Tailwind" },
  { x: 64, y: 12, family: "engineering", label: "Design-to-Code" },
  { x: 78, y: 14, family: "engineering", label: "Webflow" },

  // Systems (bottom-left cluster)
  { x: 18, y: 70, family: "systems", label: "Design Systems" },
  { x: 30, y: 82, family: "systems", label: "Tokens" },
  { x: 12, y: 84, family: "systems", label: "IA / Architecture" },
  { x: 36, y: 66, family: "systems", label: "Service Design" },

  // AI (bottom-right cluster)
  { x: 72, y: 72, family: "ai", label: "AI Workflows" },
  { x: 82, y: 82, family: "ai", label: "Prompt Design" },
  { x: 60, y: 86, family: "ai", label: "Human-AI UX" },
  { x: 86, y: 66, family: "ai", label: "Rapid Prototyping" },

  // Bridges — the overlaps where Elvis actually lives
  { x: 50, y: 22, family: "engineering", label: "Component APIs" },
  { x: 50, y: 78, family: "ai", label: "AI Trust UX" },
  { x: 24, y: 50, family: "design", label: "Strategy" },
  { x: 76, y: 50, family: "systems", label: "Platform UX" },
  { x: 50, y: 50, family: "ai", label: "Systems × AI" },
];

const FAMILY_LABEL: Record<Capability["family"], string> = {
  design: "Product Design",
  engineering: "Front-End",
  systems: "Systems",
  ai: "AI",
};

function sameCap(a: Capability, b: Capability) {
  return (
    a.family === b.family && a.label === b.label && a.x === b.x && a.y === b.y
  );
}

/**
 * Movement 05 — Capability Map.
 *
 * A spatial diagram — not a skill list. Four overlapping families:
 * Product Design, Front-End, Systems, AI. Lightly pannable.
 */
export function CapabilityMap() {
  const reduced = useReducedMotionPreference();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Capability["family"] | null>(null);
  const [picked, setPicked] = useState<Capability | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, [-1, 1], [-12, 12]);
  const ty = useTransform(my, [-1, 1], [-12, 12]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Section
      rhythm="movement"
      width="outer"
      eyebrow="WHERE I LIVE"
      number="05 / 07"
      id="capabilities"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="t-display-m font-display text-ink">
            A map, not a list.
          </h2>
          <p className="mt-6 max-w-prose t-body-l text-ink-mute">
            Four overlapping families. The interesting work happens in the
            overlaps. Hover a family to filter—or tap dots on smaller screens and
            read the label below the map.
          </p>

          <ul className="mt-10 space-y-3">
            {(["design", "engineering", "systems", "ai"] as const).map((f) => (
              <li key={f}>
                <button
                  type="button"
                  onPointerEnter={() => setActive(f)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(f)}
                  onBlur={() => setActive(null)}
                  className="flex min-h-11 w-full touch-manipulation items-center justify-between gap-4 hairline-b py-3 text-left transition-colors duration-300 hover:text-signal focus-visible:text-signal"
                >
                  <span className="t-subhead text-ink">{FAMILY_LABEL[f]}</span>
                  <span className="t-mono text-ink-quiet tabular">
                    {CAPABILITIES.filter((c) => c.family === f).length} NODES
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={wrapRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative md:col-span-8 aspect-square overflow-hidden rounded-sm border bg-canvas-raised"
          style={{ borderColor: "var(--hairline)" }}
        >
          <motion.div className="absolute inset-0" style={{ x: tx, y: ty }}>
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full text-ink opacity-[0.08]"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`gh${i}`}
                  x1="0"
                  x2="100"
                  y1={i * 10}
                  y2={i * 10}
                  stroke="currentColor"
                  strokeWidth="0.15"
                />
              ))}
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`gv${i}`}
                  y1="0"
                  y2="100"
                  x1={i * 10}
                  x2={i * 10}
                  stroke="currentColor"
                  strokeWidth="0.15"
                />
              ))}
            </svg>

            <Quadrant x={4} y={4} label="DESIGN" align="start" />
            <Quadrant x={96} y={4} label="ENGINEERING" align="end" />
            <Quadrant x={4} y={96} label="SYSTEMS" align="start" bottom />
            <Quadrant x={96} y={96} label="AI" align="end" bottom />

            {CAPABILITIES.map((c, i) => (
              <Node
                key={i}
                cap={c}
                active={active === null || active === c.family}
                selected={picked !== null && sameCap(picked, c)}
                onSelect={() =>
                  setPicked((prev) =>
                    prev && sameCap(prev, c) ? null : c,
                  )
                }
              />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-full w-px bg-hairline" />
            <div className="absolute top-1/2 left-0 h-px w-full bg-hairline" />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 t-mono text-ink-quiet tabular">
            ELVIS
          </div>

          <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 md:inset-x-auto md:left-4 md:right-auto md:flex-row md:items-center md:gap-6">
            <span className="inline-flex flex-wrap items-center gap-2 t-mono text-ink-quiet tabular">
              <span className="dot-live" aria-hidden />
              {active ? FAMILY_LABEL[active].toUpperCase() : "ALL FAMILIES"}
            </span>
            <p className="max-w-[min(100%,20rem)] text-balance text-[clamp(0.6875rem,2.8vw,0.8125rem)] leading-snug tracking-wide t-mono text-ink-mute md:hidden">
              {picked ? (
                <>
                  <span className="text-signal">{picked.label}</span>
                  {" · "}
                  {FAMILY_LABEL[picked.family]}
                </>
              ) : (
                <>
                  TAP A NODE
                  {" · "}
                  LABEL BELOW MAP
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Node({
  cap,
  active,
  selected,
  onSelect,
}: {
  cap: Capability;
  active: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const dotBase =
    cap.family === "ai" ? "bg-signal" : "bg-ink-mute";
  const ring =
    selected
      ? " ring-2 ring-signal ring-offset-2 ring-offset-canvas-raised md:ring-0 md:ring-offset-0"
      : "";

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${cap.x}%`, top: `${cap.y}%` }}
    >
      <div className="relative">
        <motion.div
          animate={{
            opacity: active ? 1 : 0.2,
            scale: active ? 1 : 0.96,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
          aria-hidden
        >
          <span
            className={
              "h-2 w-2 shrink-0 rounded-full md:h-1.5 md:w-1.5 " +
              dotBase +
              ring
            }
          />
          <span className="hidden whitespace-nowrap md:inline t-mono text-ink">
            {cap.label}
          </span>
        </motion.div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={
            "absolute left-1/2 top-1/2 z-10 flex h-11 w-11 min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center md:hidden "
          }
          aria-pressed={selected}
          aria-label={`${cap.label}, ${FAMILY_LABEL[cap.family]}`}
        />
      </div>
    </div>
  );
}

function Quadrant({
  x,
  y,
  label,
  align,
  bottom,
}: {
  x: number;
  y: number;
  label: string;
  align: "start" | "end";
  bottom?: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(${align === "end" ? "-100%" : "0"}, ${bottom ? "-100%" : "0"})`,
      }}
    >
      <span className="t-mono text-ink-faint tabular">{label}</span>
    </div>
  );
}
