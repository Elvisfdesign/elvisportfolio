/**
 * Case study content model.
 *
 * Each case study follows the nine-beat film structure:
 *   cover · premise · lens · thinking · system · product · craft · outcome · reflection
 *
 * The /work/[slug] route renders the blocks in order, grouped by beat.
 */

export type Beat =
  | "cover"
  | "premise"
  | "lens"
  | "thinking"
  | "system"
  | "product"
  | "craft"
  | "outcome"
  | "reflection";

export const BEAT_ORDER: Beat[] = [
  "cover",
  "premise",
  "lens",
  "thinking",
  "system",
  "product",
  "craft",
  "outcome",
  "reflection",
];

export const BEAT_LABEL: Record<Beat, string> = {
  cover: "00 · COVER",
  premise: "01 · THE PREMISE",
  lens: "02 · THE LENS",
  thinking: "03 · THE THINKING",
  system: "04 · THE SYSTEM",
  product: "05 · THE PRODUCT",
  craft: "06 · THE CRAFT",
  outcome: "07 · THE OUTCOME",
  reflection: "08 · REFLECTION",
};

/** Inline segments for a prose heading — use instead of `heading` when links are needed. */
export type ProseHeadingFragment =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string };

export type ContentBlock =
  | {
      kind: "prose";
      beat: Beat;
      eyebrow?: string;
      heading?: string;
      /** When set, rendered as the `<h3>` instead of `heading` (e.g. inline external links). */
      headingFragments?: ProseHeadingFragment[];
      body: string[];
    }
  | {
      kind: "artifact";
      beat: Beat;
      label: string;
      meta?: string;
      lines: string[];
    }
  | {
      kind: "pull-quote";
      beat: Beat;
      text: string;
      attribution?: string;
    }
  | {
      kind: "image";
      beat: Beat;
      caption?: string;
      alt: string;
      /** Placeholder kind — what to render in the stub panel. */
      stub?: "dashboard" | "system" | "flow" | "graph" | "prompt" | "screen";
      aspect?: "16/9" | "21/9" | "4/3" | "1/1" | "3/4";
    }
  | {
      kind: "image-grid";
      beat: Beat;
      caption?: string;
      images: {
        alt: string;
        stub?: "dashboard" | "system" | "flow" | "graph" | "prompt" | "screen";
        aspect?: "16/9" | "21/9" | "4/3" | "1/1" | "3/4";
      }[];
    }
  | {
      kind: "metric-row";
      beat: Beat;
      items: { value: string; label: string }[];
    }
  | {
      kind: "cta";
      beat: Beat;
      label: string;
      href: string;
    };

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  /** One-sentence thesis. */
  thesis: string;
  /** Shorter blurb used on landing card. */
  positioning: string;
  /** Optional hero reference links (quiet editorial mono — rendered beside metadata). */
  prototypeUrl?: string;
  prototypeLabel?: string;
  journalUrl?: string;
  journalLabel?: string;
  /** Very small muted line under prototype / journal links. */
  heroLinksNote?: string;
  meta: {
    role: string;
    year: string;
    team: string;
    surface: string;
    status: string;
  };
  reading: string;
  ambient: string;
  blocks: ContentBlock[];
  next: { slug: string; title: string };
};
