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
  /** Optional short description for Project Resources. */
  description?: string;
  /** Optional accessible name override for external anchors. */
  ariaLabel?: string;
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
  storybookUrl: "https://ascend-ui.vercel.app/",
  githubUrl: "https://github.com/Elvisfdesign/ascend-ui",
  prototypeUrl: null as string | null,
  marketingUrl: null as string | null,
} as const;

/**
 * Ordered Project Resources for the case-study resources block.
 *
 * Only publish `href` when the destination is live — the AscendExternalLinks
 * component renders an honest inline pending label when href is null so
 * we never ship dead "#" anchors on a portfolio surface.
 */
export const ascendCtas: readonly AscendCta[] = [
  {
    id: "figmaProductUrl",
    label: "Figma Design System",
    href: ascendUrls.figmaProductUrl,
    external: true,
    statusLabel: "Active development",
    description:
      "Product and design-system source of truth — components, tokens, and flows in Figma.",
    ariaLabel: "Open ASCEND Figma Design System in a new tab",
  },
  {
    id: "storybookUrl",
    label: "Live Storybook",
    href: ascendUrls.storybookUrl,
    external: true,
    statusLabel: "ASCEND UI v1.0",
    description:
      "Reusable React and TypeScript components documented with controls, states, and accessibility checks.",
    ariaLabel: "Open ASCEND UI Storybook in a new tab",
  },
  {
    id: "githubUrl",
    label: "GitHub Repository",
    href: ascendUrls.githubUrl,
    external: true,
    statusLabel: "Public",
    description:
      "Open-source ASCEND UI repository — the React implementation of the design system.",
    ariaLabel: "Open ASCEND UI GitHub repository in a new tab",
  },
  {
    id: "prototypeUrl",
    label: "Interactive Prototype",
    href: ascendUrls.prototypeUrl,
    external: true,
    pendingLabel: "Coming soon",
    description:
      "End-to-end interactive proof of the ASCEND marketing-to-product experience.",
  },
  {
    id: "marketingUrl",
    label: "Marketing Site",
    href: ascendUrls.marketingUrl,
    external: true,
    pendingLabel: "Planned",
    description: "Public marketing website for ASCEND.",
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
    state: "Complete",
  },
  {
    id: "vision",
    number: "03",
    slug: "vision",
    navLabel: "Vision",
    eyebrow: "PRODUCT VISION",
    title: "A calm, disciplined space to build a life.",
    summary:
      "Not another habit tracker. A quiet interface for training, recovery, community, and reflection—designed to hold attention with restraint, not compete for it.",
    state: "Complete",
  },
  {
    id: "brand",
    number: "04",
    slug: "brand",
    navLabel: "Brand",
    eyebrow: "BRAND & VISUAL DIRECTION",
    title: "Editorial darkness, warm gold, quiet type.",
    summary:
      "ASCEND's identity was designed to feel disciplined rather than loud. A restrained serif introduces warmth and confidence, while IBM Plex Mono provides structure and precision. Every visual decision supports clarity, focus, and long-term usability across both the marketing site and product experience.",
    state: "Complete",
  },
  {
    id: "architecture",
    number: "05",
    slug: "architecture",
    navLabel: "Architecture",
    eyebrow: "PRODUCT ARCHITECTURE",
    title: "The map before the pixels.",
    summary:
      "Before designing interfaces, ASCEND was structured around a scalable information architecture that defines navigation, user journeys, and relationships between every major feature. By solving the product structure first, every screen became easier to design, build, and evolve without introducing unnecessary complexity.",
    state: "Complete",
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
      "I translated the ASCEND Design System into a reusable React and TypeScript component library, documented through a live Storybook experience and prepared as an open-source repository.",
    state: "In progress",
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
 * Chapter 02 — Opportunity.
 * Narrative visuals + Level-2 process notes. Summary copy lives on the
 * chapter record above; this object holds everything beneath it.
 */
export const ascendOpportunity = {
  landscape: {
    id: "current-landscape",
    label: "The Current Landscape",
    src: "/images/ascend/opportunity/current-landscape.jpg",
    width: 1536,
    height: 1024,
    alt: "Editorial diagram of disconnected lifestyle apps surrounding a person — Headspace, Apple Health, Calendar, MyFitnessPal, and others — with broken connections between them.",
    statement:
      "Most products optimize one habit. Very few help people build a complete system for intentional living.",
  },
  opportunity: {
    id: "the-opportunity",
    label: "The Opportunity",
    src: "/images/ascend/opportunity/the-opportunity.jpg",
    width: 1536,
    height: 1024,
    alt: "ASCEND ecosystem diagram with a central hub connected to mind, body, recovery, journal, community, nutrition, and progress.",
    statement:
      "Instead of another habit tracker, I imagined ASCEND as a lifestyle operating system—bringing health, recovery, planning, reflection, and community into one cohesive experience.",
  },
  behindTheDesign: {
    whyThisDirection:
      "I didn't set out to build another habit tracker. That would have solved a narrow problem and left the rest of someone's life scattered across five other apps. The real gap I saw was continuity — a single place where training, recovery, planning, and reflection reinforce each other instead of competing for attention.",
    designQuestions: [
      "How can discipline feel sustainable instead of overwhelming?",
      "How can recovery become part of the daily workflow?",
      "How can one system replace multiple disconnected apps?",
    ] as const,
    research: [
      "Competitive review across fitness, wellness, journaling, and productivity tools",
      "Product strategy defining ASCEND as an operating system, not a feature set",
      "Information architecture mapping the relationship between daily plan, programs, and reflection",
      "Experience principles that keep the interface calm under complexity",
    ] as const,
    deliverables: [
      "Product Vision",
      "Information Architecture",
      "UX Strategy",
      "Brand Foundation",
      "Experience Principles",
    ] as const,
  },
} as const;

/**
 * Chapter 03 — Vision.
 * Philosophy before product: experience intent, principles, and the thinking
 * that guided every later surface. Summary copy lives on the chapter record.
 */
export const ascendVision = {
  experience: {
    id: "experience-i-wanted",
    label: "The Experience I Wanted to Create",
    src: "/images/ascend/vision/experience-we-wanted.jpg",
    width: 1536,
    height: 1024,
    alt: "Editorial lifestyle photograph representing calm, intentional living and focused daily routines.",
    statement:
      "I envisioned technology that quietly supports better decisions, creating space for focus instead of demanding attention.",
  },
  principlesDiagram: {
    id: "experience-principles",
    label: "Experience Principles",
    src: "/images/ascend/vision/experience-principles.jpg",
    width: 1536,
    height: 1024,
    alt: "Conceptual diagram illustrating the five guiding principles of ASCEND: Calm, Discipline, Focus, Recovery, and Community.",
    intro:
      "I measured every product decision against five principles that shaped the experience.",
  },
  principles: [
    {
      id: "calm",
      title: "Calm",
      lines: ["Reduce noise.", "Create mental space."],
    },
    {
      id: "discipline",
      title: "Discipline",
      lines: ["Support consistency rather than motivation."],
    },
    {
      id: "focus",
      title: "Focus",
      lines: ["Help users stay present instead of distracted."],
    },
    {
      id: "recovery",
      title: "Recovery",
      lines: ["Treat recovery as essential, not optional."],
    },
    {
      id: "community",
      title: "Community",
      lines: [
        "Encourage accountability without becoming another social network.",
      ],
    },
  ] as const,
  behindTheDesign: {
    whyThisVision:
      "I intentionally designed ASCEND to feel slower, calmer, and more deliberate than modern productivity tools. My goal was to reduce cognitive load rather than maximize engagement — to leave people with more attention, not less.",
    designPrinciples: [
      "Clarity over complexity",
      "Consistency over novelty",
      "Intentionality over urgency",
      "Reflection over endless tracking",
      "Quality over quantity",
    ] as const,
    experienceGoals: [
      "Organized",
      "Calmer",
      "Focused",
      "Encouraged",
      "In control",
    ] as const,
    experienceGoalsNote: "—not overwhelmed.",
    foundation: [
      "Brand",
      "Information Architecture",
      "Product UX",
      "Design System",
      "React Component Library",
      "Storybook",
    ] as const,
  },
} as const;

/**
 * Chapter 04 — Brand & Visual Direction.
 * Identity system boards + process notes. Summary copy lives on the
 * chapter record above; this object holds the visual grid and process body.
 */
export const ascendBrand = {
  exploreHref:
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product?node-id=15-28&t=UQwgCnHa3cpvIDOf-0",
  exploreLabel: "Explore Brand Foundation",
  exploreAriaLabel: "Open ASCEND Brand Foundation in Figma in a new tab",
  panels: [
    {
      id: "logo-system",
      label: "Logo System",
      src: "/images/ascend/brand/brand-logo-system.png",
      width: 1120,
      height: 1187,
      alt: "ASCEND logo system board showing the primary mark, wordmark lockups, clear space, and monochrome treatments.",
    },
    {
      id: "color-palette",
      label: "Color Palette",
      src: "/images/ascend/brand/brand-colors.png",
      width: 1120,
      height: 1810,
      alt: "ASCEND color system board with deep charcoal foundations, warm gold accent, and supporting neutrals for product and marketing surfaces.",
    },
    {
      id: "typography",
      label: "Typography",
      src: "/images/ascend/brand/brand-typography.png",
      width: 1120,
      height: 1441,
      alt: "ASCEND typography system pairing an editorial serif display with IBM Plex Mono for captions, labels, and interface structure.",
    },
    {
      id: "photography",
      label: "Photography",
      src: "/images/ascend/brand/photography-grid.png",
      width: 1120,
      height: 1655,
      alt: "ASCEND photography grid of calm, documentary lifestyle moments emphasizing authenticity over aspirational fitness clichés.",
    },
  ] as const,
  process: {
    summary: "Every visual decision reinforces ASCEND's personality.",
    blocks: [
      {
        id: "logo",
        title: "Logo System",
        body: "The logo system emphasizes simplicity and recognition across every touchpoint.",
      },
      {
        id: "type",
        title: "Typography",
        body: "Typography pairs editorial elegance with technical precision to balance warmth and clarity.",
      },
      {
        id: "color",
        title: "Color Palette",
        body: "The color palette uses warm gold as a restrained accent rather than decoration, creating hierarchy without visual noise.",
      },
      {
        id: "photo",
        title: "Photography",
        body: "Photography favors authentic documentary moments over aspirational fitness clichés, making the experience feel calm, trustworthy, and premium.",
      },
    ] as const,
  },
} as const;

/**
 * Chapter 05 — Product Architecture.
 * Structure-first documentation: overview, navigation, hierarchy, and flows.
 * Summary copy lives on the chapter record; this object holds the visuals
 * and process notes.
 */
export const ascendArchitecture = {
  exploreHref:
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product?node-id=123-8&t=UQwgCnHa3cpvIDOf-1",
  exploreLabel: "Explore Product Architecture",
  exploreAriaLabel: "Open ASCEND Product Architecture in Figma in a new tab",
  /** Hero board — rendered full-width for emphasis. */
  overview: {
    id: "product-architecture",
    label: "Product Architecture",
    src: "/images/ascend/architecture/product-architecture.png",
    width: 1120,
    height: 567,
    alt: "ASCEND product architecture overview mapping major areas — dashboard, daily plan, programs, community, and reflection — and how they relate.",
  },
  /** Supporting boards beneath the overview. */
  supporting: [
    {
      id: "primary-navigation",
      label: "Primary Navigation",
      src: "/images/ascend/architecture/primary-navigation.png",
      width: 1120,
      height: 613,
      alt: "ASCEND primary navigation structure showing how users move between the product’s core destinations.",
    },
    {
      id: "screen-hierarchy",
      label: "Screen Hierarchy",
      src: "/images/ascend/architecture/screen-hierarchy.png",
      width: 1120,
      height: 734,
      alt: "ASCEND screen hierarchy diagram organizing parent screens, nested views, and supporting states.",
    },
    {
      id: "core-user-flows",
      label: "Core User Flows",
      src: "/images/ascend/architecture/core-user-flows.png",
      width: 1120,
      height: 936,
      alt: "ASCEND core user flows outlining key journeys through planning, training, recovery, and reflection.",
    },
  ] as const,
  process: {
    summary:
      "Before designing individual interfaces, ASCEND was organized around a scalable product architecture.",
    body: "Information hierarchy, navigation, and core user journeys were defined first, creating a clear foundation for every screen. This approach reduced complexity, improved consistency, and ensured that future features could be added without redesigning the core experience.",
  },
} as const;

/**
 * Chapter 09 — React + Storybook.
 * Live library deliverables. Summary copy lives on the chapter record;
 * this object holds the body actions and version label.
 */
export const ascendCode = {
  versionLabel: "ASCEND UI v1.0",
  body:
    "I translated the ASCEND Design System into a reusable React and TypeScript component library, documented through a live Storybook experience and prepared as an open-source repository.",
  actions: [
    {
      id: "storybook",
      label: "Explore Live Storybook",
      href: ascendUrls.storybookUrl,
      ariaLabel: "Open ASCEND UI Storybook in a new tab",
    },
    {
      id: "github",
      label: "View Source on GitHub",
      href: ascendUrls.githubUrl,
      ariaLabel: "Open ASCEND UI GitHub repository in a new tab",
    },
  ] as const,
} as const;

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
  opportunity: ascendOpportunity,
  vision: ascendVision,
  brand: ascendBrand,
  architecture: ascendArchitecture,
  code: ascendCode,
  ctas: ascendCtas,
  urls: ascendUrls,
  /** Hero primary + secondary actions. */
  heroPrimaryCta: {
    label: "Explore the Case Study",
    hrefAnchor: "#chapter-overview",
  },
  heroSecondaryCta: {
    label: "View Storybook",
    href: ascendUrls.storybookUrl,
    external: true,
    ariaLabel: "Open ASCEND UI Storybook in a new tab",
  },
  /** Quiet supporting destinations under the primary / secondary pair. */
  heroSupportingLinks: [
    {
      id: "github",
      label: "GitHub",
      href: ascendUrls.githubUrl,
      ariaLabel: "Open ASCEND UI GitHub repository in a new tab",
    },
    {
      id: "figma",
      label: "Figma",
      href: ascendUrls.figmaProductUrl,
      ariaLabel: "Open ASCEND Live Figma in a new tab",
    },
  ] as const,
  /**
   * Hero layered preview — product dominates the foreground;
   * marketing sits behind. Paths are relative to `/public`.
   */
  heroScreens: {
    product: {
      id: "hero-product",
      label: "Product — Dashboard",
      src: "/images/ascend/hero/product-dashboard.png",
      width: 1440,
      height: 1140,
      alt: "ASCEND product dashboard showing daily score, focus, recovery, and progress metrics.",
    },
    marketing: {
      id: "hero-marketing",
      label: "Marketing — Home",
      src: "/images/ascend/hero/marketing-home.jpg",
      width: 1440,
      height: 780,
      alt: "ASCEND marketing website homepage with cinematic lifestyle imagery and product messaging.",
    },
  },
} as const;

export type AscendProject = typeof ascendProject;
