/**
 * ASCEND — Premium Lifestyle Operating System.
 *
 * Single source of truth for the /ascend flagship case study, the homepage
 * feature card, the "currently building" hero-side card, and any homepage
 * "selected work" entry.
 *
 * Phase 1 goal: establish structure and copy for hero, at-a-glance, chapter
 * navigation, and external resources. Chapter bodies stay intentionally
 * sparse (title + summary only) so each one can be filled in later without
 * disturbing the shell.
 */

export type AscendCta = {
  id: string;
  label: string;
  href: string | null;
  external?: boolean;
  /** Rendered when href is null. Required for any inactive CTA. */
  pendingLabel?: string;
  /** Optional status note shown alongside an active link. */
  statusLabel?: string;
};

export type AscendChapterState = "Complete" | "In progress" | "Placeholder";

/**
 * Every case-study chapter. `slug` powers anchor IDs (`#chapter-<slug>`) and
 * the chapter navigation. `navLabel` is the compact TOC label; `title` is
 * the full section heading; `summary` is the level-1 (scannable) copy.
 */
export type AscendChapter = {
  id: string;
  number: string;
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  state: AscendChapterState;
};

export type AscendMetric = {
  id: string;
  value: string;
  label: string;
  caption?: string;
};

export type AscendAtAGlanceItem = {
  id: string;
  eyebrow: string;
  body: string;
};

export type AscendEcosystemNode = {
  id: string;
  label: string;
};

/** Public URLs — null renders an honest "planned" inline label, never "#". */
export const ascendUrls = {
  figmaProductUrl:
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product?node-id=742-16&t=obBterjcFHUYGYOz-1",
  figmaSystemUrl: null as string | null,
  storybookUrl: null as string | null,
  githubUrl: null as string | null,
  prototypeUrl: null as string | null,
  marketingUrl: null as string | null,
} as const;

/**
 * Ordered external resources for the hero + Resources chapter.
 *
 * Only publish `href` when the destination is live — the AscendExternalLinks
 * component renders an honest inline "Planned" label when href is null so
 * we never ship dead "#" anchors on a portfolio surface.
 */
export const ascendCtas: readonly AscendCta[] = [
  {
    id: "figmaProductUrl",
    label: "Live Figma",
    href: ascendUrls.figmaProductUrl,
    external: true,
    statusLabel: "Active development",
  },
  {
    id: "prototypeUrl",
    label: "Prototype",
    href: ascendUrls.prototypeUrl,
    external: true,
    pendingLabel: "In progress",
  },
  {
    id: "storybookUrl",
    label: "Storybook",
    href: ascendUrls.storybookUrl,
    external: true,
    pendingLabel: "Planned",
  },
  {
    id: "githubUrl",
    label: "GitHub",
    href: ascendUrls.githubUrl,
    external: true,
    pendingLabel: "Planned",
  },
  {
    id: "figmaSystemUrl",
    label: "Design System (Figma)",
    href: ascendUrls.figmaSystemUrl,
    external: true,
    pendingLabel: "In progress",
  },
  {
    id: "marketingUrl",
    label: "Marketing Site",
    href: ascendUrls.marketingUrl,
    external: true,
    pendingLabel: "Planned",
  },
];

/** Metadata strip beneath the hero title. */
export const ascendMeta = {
  role: "Product Designer / Design Engineer",
  scope: "Brand · UX/UI · Product Strategy · Design System · Front-End",
  platform: "Web Product + Marketing Website",
  status: "In Active Development",
  year: "2026",
} as const;

/**
 * Ecosystem chip strip — communicates that ASCEND is larger than any single
 * screen. Rendered as a horizontal row with hairline connectors.
 */
export const ascendEcosystem: readonly AscendEcosystemNode[] = [
  { id: "brand", label: "Brand" },
  { id: "marketing", label: "Marketing" },
  { id: "product", label: "Product" },
  { id: "system", label: "System" },
  { id: "code", label: "Code" },
];

/**
 * At-a-Glance strip — four compact editorial cards.
 * Phase-1 copy is intentionally tight so recruiters can scan in <30s.
 */
export const ascendAtAGlance: readonly AscendAtAGlanceItem[] = [
  {
    id: "challenge",
    eyebrow: "Challenge",
    body: "Create a connected system for discipline, health, recovery, reflection, and community.",
  },
  {
    id: "approach",
    eyebrow: "Approach",
    body: "Design the complete ecosystem before extracting reusable foundations and components.",
  },
  {
    id: "deliverables",
    eyebrow: "Deliverables",
    body: "Brand, marketing site, product experience, design system, Storybook, prototype, and code.",
  },
  {
    id: "outcome",
    eyebrow: "Outcome",
    body: "A cohesive, scalable product concept ready for demonstration, development, and portfolio presentation.",
  },
];

/**
 * Chapter list — 11 beats. Phase 1 populates the shell only; every chapter
 * currently renders eyebrow + title + summary. Bodies, galleries, metrics,
 * quotes, and comparisons will be layered in during later phases.
 *
 * `state` is honest: `Complete` for the two chapters shipped in Phase 1
 * (Overview + Outcomes), `Placeholder` everywhere else. The chapter-status
 * badge in each Section header reads directly from this field.
 */
export const ascendChapters: readonly AscendChapter[] = [
  {
    id: "overview",
    number: "01",
    slug: "overview",
    navLabel: "Overview",
    eyebrow: "OVERVIEW",
    title: "One ecosystem, five surfaces.",
    summary:
      "ASCEND is a self-initiated product ecosystem — brand, marketing, product, design system, and code — designed as one cohesive experience rather than five disconnected artefacts.",
    state: "Complete",
  },
  {
    id: "opportunity",
    number: "02",
    slug: "opportunity",
    navLabel: "Opportunity",
    eyebrow: "THE OPPORTUNITY",
    title: "Why this product needed to exist.",
    summary:
      "Most lifestyle apps optimize for streaks, not systems. ASCEND asks a harder question: what would a premium operating system for intentional living actually look like?",
    state: "Placeholder",
  },
  {
    id: "vision",
    number: "03",
    slug: "vision",
    navLabel: "Vision",
    eyebrow: "PRODUCT VISION",
    title: "A calm, disciplined space to build a life.",
    summary:
      "Not another habit tracker. A quiet interface for training, recovery, community, and reflection — designed to hold attention with restraint, not compete for it.",
    state: "Placeholder",
  },
  {
    id: "brand",
    number: "04",
    slug: "brand",
    navLabel: "Brand",
    eyebrow: "BRAND & VISUAL DIRECTION",
    title: "Editorial darkness, warm gold, quiet type.",
    summary:
      "Serif display type paired with restrained mono captions. A gold accent that reads as ambition rather than ornament. Photography that leans documentary, not aspirational.",
    state: "Placeholder",
  },
  {
    id: "architecture",
    number: "05",
    slug: "architecture",
    navLabel: "Architecture",
    eyebrow: "PRODUCT ARCHITECTURE",
    title: "The map before the pixels.",
    summary:
      "IA, primary flows, and the relationship between dashboard, daily plan, programs, community, and reflection. Structure that lets the product grow without collapsing into complexity.",
    state: "Placeholder",
  },
  {
    id: "product",
    number: "06",
    slug: "product",
    navLabel: "Product",
    eyebrow: "CORE PRODUCT EXPERIENCE",
    title: "Discipline, designed.",
    summary:
      "The core product screens — dashboard, daily plan, program detail, training, recovery, community — designed as a single visual language rather than a collection of features.",
    state: "Placeholder",
  },
  {
    id: "marketing",
    number: "07",
    slug: "marketing",
    navLabel: "Marketing",
    eyebrow: "MARKETING WEBSITE",
    title: "Seven pages, one narrative.",
    summary:
      "A dark, editorial marketing site that positions ASCEND as a premium operating system. Every page written to move a specific reader from awareness to intent.",
    state: "Placeholder",
  },
  {
    id: "system",
    number: "08",
    slug: "system",
    navLabel: "System",
    eyebrow: "DESIGN SYSTEM",
    title: "Foundations extracted, not invented.",
    summary:
      "Color, type, spacing, elevation, motion, and component tokens — all extracted from the product itself so the system stays honest to real interfaces, not aspirational libraries.",
    state: "Placeholder",
  },
  {
    id: "code",
    number: "09",
    slug: "code",
    navLabel: "Code",
    eyebrow: "REACT + STORYBOOK",
    title: "The system, in production code.",
    summary:
      "The visual system, mirrored 1:1 as React components and documented in Storybook with controls, states, and accessibility checks — so design decisions survive contact with implementation.",
    state: "Placeholder",
  },
  {
    id: "prototype",
    number: "10",
    slug: "prototype",
    navLabel: "Prototype",
    eyebrow: "PROTOTYPE",
    title: "Live interactive proof.",
    summary:
      "An interactive prototype where the whole ecosystem earns its keep — where navigating from marketing site to product to system feels like one continuous surface.",
    state: "Placeholder",
  },
  {
    id: "outcome",
    number: "11",
    slug: "outcome",
    navLabel: "Outcome",
    eyebrow: "OUTCOMES & REFLECTION",
    title: "What the work is really about.",
    summary:
      "ASCEND is a demonstration piece: a portfolio of what happens when brand, product, system, and code are designed as one act — and the reasoning that ties them together.",
    state: "Placeholder",
  },
];

/**
 * Top-level project record — everything a card, page, or SEO payload needs.
 */
export const ascendProject = {
  name: "ASCEND",
  fullName: "ASCEND — Premium Lifestyle Operating System",
  shortName: "ASCEND",
  eyebrow: "SELF-INITIATED PRODUCT ECOSYSTEM",
  tagline: "A premium lifestyle operating system for intentional growth.",
  subtitle: "Premium Lifestyle Operating System",
  description:
    "A self-initiated product ecosystem — brand, marketing site, product experience, design system, and React implementation — designed as one cohesive premium lifestyle operating system.",
  thesis:
    "I designed ASCEND from the ground up — connecting brand, marketing, product strategy, UX, design systems, and front-end implementation into one cohesive ecosystem.",
  statusLabel: "In Active Development",
  statusDetail: "Product experience live · Marketing site in progress",
  year: "2026",
  href: "/ascend",
  metadataLabel: "Brand → Marketing → Product → System → Code",
  meta: ascendMeta,
  ecosystem: ascendEcosystem,
  atAGlance: ascendAtAGlance,
  chapters: ascendChapters,
  ctas: ascendCtas,
  urls: ascendUrls,
  /** Hero primary + secondary actions. */
  heroPrimaryCta: {
    label: "Explore the Case Study",
    hrefAnchor: "#chapter-overview",
  },
  heroSecondaryCta: {
    label: "View Live Figma",
    href: ascendUrls.figmaProductUrl,
    external: true,
  },
} as const;

export type AscendProject = typeof ascendProject;
