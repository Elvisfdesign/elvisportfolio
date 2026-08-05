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
  figmaSystemUrl:
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product" as string | null,
  storybookUrl: "https://ascend-ui.vercel.app/",
  githubUrl: "https://github.com/Elvisfdesign/ascend-ui",
  prototypeUrl: "https://ascend-product-prototype.vercel.app/dashboard",
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
    label: "Live Prototype",
    href: ascendUrls.prototypeUrl,
    external: true,
    statusLabel: "Active development",
    description:
      "Interactive product prototype for the ASCEND dashboard and core experience — currently in active development.",
    ariaLabel: "Open ASCEND live product prototype in a new tab",
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
    state: "Complete",
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
    state: "Complete",
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
    state: "Complete",
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
    title: "Experience ASCEND as a working product.",
    summary:
      "Rather than stopping at polished mockups, I built a live interactive prototype that brings the product experience to life. The screens, navigation, interactions, and reusable components reflect the design system and product architecture documented throughout this case study. The prototype continues to evolve as new features are designed, reviewed, and implemented.",
    state: "Complete",
  },
  {
    id: "outcome",
    number: "11",
    slug: "outcome",
    navLabel: "Outcome",
    eyebrow: "OUTCOMES & REFLECTION",
    title: "What the work is really about.",
    summary:
      "ASCEND demonstrates what happens when brand, product strategy, interface design, systems thinking, and implementation are treated as one connected discipline. The result is not only a collection of polished screens, but a cohesive product ecosystem that can be explored, tested, and continuously improved.",
    state: "Complete",
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
 * Chapter 06 — Core Product Experience.
 * Editorial product showcase: dashboard hero, featured pair, session feature,
 * then Figma explore CTA. Summary copy lives on the chapter record.
 */
export const ascendProduct = {
  exploreHref:
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product?node-id=7-5&t=QiJWAAfLKLZ0ysJq-1",
  exploreLabel: "Explore Full Product in Figma",
  exploreAriaLabel: "Open ASCEND Full Product in Figma in a new tab",
  exploreTitle: "Explore the complete product",
  exploreDescription:
    "The complete design system includes Dashboard, Daily Plan, Programs, Recovery, Journal, Nutrition, Progress, Community, Profile, Settings, responsive layouts, interaction states, and supporting design documentation.",
  featuredTitle: "Featured Product Experiences",
  featuredDescription:
    "The product is intentionally focused. Each screen helps transform daily habits into long-term discipline through calm, structured experiences.",
  /** Full-width hero — Dashboard. */
  hero: {
    id: "dashboard",
    label: "Dashboard",
    src: "/images/ascend/product/Dashboard (1).png",
    width: 1440,
    height: 1140,
    alt: "ASCEND product dashboard showing daily score, focus areas, recovery, and progress at a glance.",
  },
  /** Equal two-column pair beneath the featured intro. */
  featured: [
    {
      id: "daily-plan",
      label: "Daily Plan",
      src: "/images/ascend/product/Daily Plan.png",
      width: 1440,
      height: 2737,
      alt: "ASCEND Daily Plan screen organizing the day’s training, recovery, and intentional habits.",
    },
    {
      id: "programs",
      label: "Programs",
      src: "/images/ascend/product/Programs.png",
      width: 1440,
      height: 2452,
      alt: "ASCEND Programs screen presenting structured training paths with clear progression.",
    },
  ] as const,
  /** Full-width feature — in-workout Session Experience. */
  session: {
    id: "session-experience",
    label: "Session Experience",
    src: "/images/ascend/product/Session Experience (1).png",
    width: 1440,
    height: 1862,
    alt: "ASCEND Session Experience showing the in-workout interface with calm, structured guidance.",
  },
  process: {
    summary: "Designing a calm operating system",
    blocks: [
      {
        id: "approach",
        title: "Designing a calm operating system",
        body: "ASCEND wasn't designed as a collection of screens—it was designed as a single operating system for personal discipline. Every interaction reduces cognitive load while helping users focus on the next meaningful action.",
      },
      {
        id: "principles",
        title: "Product principles",
        items: [
          "One primary action per screen",
          "Calm, distraction-free layouts",
          "Consistent navigation and reusable components",
          "Editorial typography balanced with practical usability",
          "Progress always visible without becoming overwhelming",
        ],
      },
      {
        id: "design-system",
        title: "Design system",
        body: "Every screen shares the same design language.",
        itemsIntro: "This includes:",
        items: [
          "Sidebar navigation",
          "Card components",
          "Progress indicators",
          "Buttons",
          "Status badges",
          "Typography scale",
          "Color tokens",
          "Spacing system",
        ],
        itemsOutro:
          "Building the experience from reusable components kept the interface visually consistent while making future expansion straightforward.",
      },
      {
        id: "screen-coverage",
        title: "Screen coverage",
        body: "The prototype includes the primary product surfaces:",
        items: [
          "Dashboard",
          "Daily Plan",
          "Programs",
          "Workout Experience",
          "Journal",
          "Recovery",
          "Nutrition",
          "Progress",
          "Community",
          "Profile",
          "Settings",
        ],
        itemsOutro:
          "Each screen was designed as part of one connected workflow rather than as an isolated page.",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "The result is a product that feels calm, premium, and intentional.",
        itemsOutro:
          "Instead of exposing dozens of features, the experience focuses on helping users build consistent habits through thoughtful UX, clear hierarchy, and a cohesive visual system.",
      },
    ] as const,
  },
} as const;

/**
 * Chapter 07 — Marketing Website.
 * Seven-page editorial site shown as fixed-height window previews
 * (object-cover), with a scrollable full-page lightbox.
 */
export const ascendMarketing = {
  exploreHref:
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product?node-id=742-16&t=QiJWAAfLKLZ0ysJq-1",
  exploreLabel: "Open Marketing Website in Figma",
  exploreAriaLabel: "Open ASCEND Marketing Website in Figma in a new tab",
  exploreTitle: "Explore the complete marketing website",
  exploreDescription:
    "Every page was designed as part of a cohesive editorial experience—from first impression to membership conversion.",
  pages: [
    {
      id: "homepage",
      label: "Homepage",
      src: "/images/ascend/marketing/homepage.png",
      width: 1440,
      height: 9720,
      alt: "ASCEND marketing homepage — cinematic hero, positioning, and entry into the lifestyle operating system narrative.",
    },
    {
      id: "programs",
      label: "Programs",
      src: "/images/ascend/marketing/programs.png",
      width: 1440,
      height: 8288,
      alt: "ASCEND Programs marketing page presenting structured training paths and editorial program storytelling.",
    },
    {
      id: "the-app",
      label: "The App",
      src: "/images/ascend/marketing/the-app.png",
      width: 1440,
      height: 9898,
      alt: "ASCEND The App marketing page showcasing product surfaces and how the operating system supports daily practice.",
    },
    {
      id: "community",
      label: "Community",
      src: "/images/ascend/marketing/community.png",
      width: 1440,
      height: 8697,
      alt: "ASCEND Community marketing page highlighting shared practice, belonging, and collective discipline.",
    },
    {
      id: "philosophy",
      label: "Philosophy",
      src: "/images/ascend/marketing/philosophy.png",
      width: 1440,
      height: 8935,
      alt: "ASCEND Philosophy marketing page articulating the brand’s intentional, calm approach to growth.",
    },
    {
      id: "membership",
      label: "Membership",
      src: "/images/ascend/marketing/membership.png",
      width: 1440,
      height: 6793,
      alt: "ASCEND Membership marketing page outlining plans and the conversion path into the product.",
    },
    {
      id: "about",
      label: "About",
      src: "/images/ascend/marketing/about.png",
      width: 1440,
      height: 7957,
      alt: "ASCEND About marketing page sharing the story and intent behind the lifestyle operating system.",
    },
  ] as const,
  process: {
    summary: "How the seven-page narrative was designed.",
    points: [
      {
        id: "storytelling",
        title: "Editorial storytelling",
        body: "Each page reads as a chapter in one narrative—not a traditional feature landing page with interchangeable modules.",
      },
      {
        id: "language",
        title: "Consistent visual language",
        body: "Typography, color, spacing, and layout cadence stay coherent across all seven pages so the site feels like one surface.",
      },
      {
        id: "photography",
        title: "Photography-led layouts",
        body: "Documentary imagery leads the composition, giving every page atmosphere before it asks for attention or conversion.",
      },
      {
        id: "system",
        title: "Shared design system",
        body: "Reusable components and tokens keep the marketing site aligned with the product and brand foundations.",
      },
      {
        id: "conversion",
        title: "Clear conversion path",
        body: "The journey moves deliberately from awareness to intent to membership, without interrupting the editorial rhythm.",
      },
    ] as const,
  },
} as const;

/**
 * Chapter 08 — Design System.
 * Intentionally minimal: one overview hero + explore link + process notes.
 * Summary copy lives on the chapter record.
 */
export const ascendSystem = {
  exploreHref:
    ascendUrls.figmaSystemUrl ??
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product",
  exploreLabel: "Explore the full Design System in Figma",
  exploreAriaLabel: "Open ASCEND Design System in Figma in a new tab",
  overview: {
    id: "design-system-overview",
    label: "Design System Overview",
    src: "/images/ascend/system/design-system-overview.png",
    width: 1440,
    height: 900,
    alt: "ASCEND design system overview covering foundations, components, and the shared visual language extracted from the product.",
  },
  process: {
    summary: "Building one language instead of many",
    paragraphs: [
      "The design system wasn't designed first—it was extracted from the product itself.",
      "Every color, spacing rule, typography style, component, interaction, and token came from solving real interface problems rather than creating a theoretical UI kit.",
      "The result is a system that feels cohesive because every pattern has already been proven inside the product.",
      "Instead of maintaining separate design languages for marketing and product, both experiences share the same visual foundations, making the brand feel consistent everywhere.",
      "The system now serves as the foundation for future product growth, faster iteration, and reusable components.",
    ] as const,
  },
} as const;

/**
 * Chapter 10 — Prototype.
 * Live interactive product experience: callout, screen highlights, status,
 * stack, related links, process notes, and closing CTA.
 */
const ASCEND_PROTOTYPE_ORIGIN = "https://ascend-product-prototype.vercel.app";

export const ascendPrototype = {
  launchHref: ascendUrls.prototypeUrl,
  launchLabel: "Launch Live Prototype",
  launchAriaLabel: "Launch ASCEND live product prototype in a new tab",
  callout: {
    eyebrow: "LIVE PRODUCT EXPERIENCE",
    title: "Explore the interactive ASCEND prototype",
    body: "Navigate the dashboard, daily workflow, programs, guided sessions, and reflection experience in a working React application.",
    statusLabel: "Active development",
    statusSupport:
      "New screens and interactions are being added as the product evolves.",
  },
  screens: [
    {
      id: "dashboard",
      title: "Personalized Dashboard",
      description:
        "A focused overview of the user’s score, daily priority, progress, recovery, consistency, and reflection status.",
      src: "/images/ascend/product/Dashboard (1).png",
      width: 1440,
      height: 1140,
      href: `${ASCEND_PROTOTYPE_ORIGIN}/dashboard`,
      alt: "ASCEND live prototype dashboard showing score, daily priority, progress, and recovery.",
    },
    {
      id: "daily-plan",
      title: "Guided Daily Workflow",
      description:
        "A structured day that combines habits, reflection, movement, training, nutrition, and recovery into one intentional flow.",
      src: "/images/ascend/product/Daily Plan.png",
      width: 1440,
      height: 2737,
      href: `${ASCEND_PROTOTYPE_ORIGIN}/daily-plan`,
      alt: "ASCEND live prototype Daily Plan organizing habits, movement, training, and recovery.",
    },
    {
      id: "programs",
      title: "Program Discovery",
      description:
        "A browsable program library that helps users continue active programs, explore new paths, and find the right next step.",
      src: "/images/ascend/product/Programs.png",
      width: 1440,
      height: 2452,
      href: `${ASCEND_PROTOTYPE_ORIGIN}/programs`,
      alt: "ASCEND live prototype Programs library for discovering and continuing training paths.",
    },
    {
      id: "session",
      title: "Focused Session Experience",
      description:
        "A guided training interface that combines exercise media, coaching, set progress, navigation, and clear session controls.",
      src: "/images/ascend/product/Session Experience (1).png",
      width: 1440,
      height: 1862,
      href: `${ASCEND_PROTOTYPE_ORIGIN}/programs/program-strength-foundations`,
      alt: "ASCEND live prototype session experience with coaching, set progress, and session controls.",
    },
  ] as const,
  principles: [
    {
      id: "component-driven",
      title: "Component Driven",
      body: "The application is built from reusable ASCEND UI components rather than one-off page implementations.",
    },
    {
      id: "connected",
      title: "Connected Experience",
      body: "Routes, calls to action, and navigation connect the screens into a believable end-to-end product flow.",
    },
    {
      id: "living",
      title: "Living Product",
      body: "The prototype is updated continuously as new screens, states, and interactions are designed and reviewed.",
    },
  ] as const,
  status: {
    title: "Current Prototype Status",
    label: "Active development",
    available: [
      "Dashboard",
      "Daily Plan",
      "Programs",
      "Program Details",
      "Session Experience",
      "Journal",
    ] as const,
    inProgress: [
      "Recovery",
      "Nutrition",
      "Progress",
      "Community",
      "Profile",
      "Settings",
    ] as const,
  },
  builtWith: [
    "React",
    "TypeScript",
    "Vite",
    "ASCEND UI",
    "Storybook",
    "Figma",
    "Vercel",
  ] as const,
  relatedLinks: [
    {
      id: "prototype",
      label: "View Live Prototype",
      href: ascendUrls.prototypeUrl,
      ariaLabel: "Open ASCEND live product prototype in a new tab",
    },
    {
      id: "storybook",
      label: "View Storybook",
      href: ascendUrls.storybookUrl,
      ariaLabel: "Open ASCEND UI Storybook in a new tab",
    },
    {
      id: "github",
      label: "View Source Code",
      href: ascendUrls.githubUrl,
      ariaLabel: "Open ASCEND source code on GitHub in a new tab",
    },
    {
      id: "figma",
      label: "View Product Design",
      href: ascendUrls.figmaProductUrl,
      ariaLabel: "Open ASCEND Product Design in Figma in a new tab",
    },
  ] as const,
  process: {
    summary: "Building beyond static mockups",
    blocks: [
      {
        id: "why",
        title: "Why I built it",
        body: "A live prototype makes the design decisions tangible. It allows reviewers to experience navigation, hierarchy, responsiveness, reusable components, and product behavior rather than evaluating isolated screens.",
      },
      {
        id: "system-first",
        title: "Design-system-first workflow",
        body: "The prototype consumes the ASCEND UI system so the implementation stays aligned with the approved colors, typography, spacing, components, and interaction patterns.",
      },
      {
        id: "mockup-to-app",
        title: "From mockup to application",
        body: "Each approved Figma screen is translated into a responsive page, connected to the relevant product route, and reviewed against the original composition before being added to the live experience.",
      },
      {
        id: "iteration",
        title: "Continuous iteration",
        body: "The prototype remains intentionally active. New pages, states, and interactions are added in phases while preserving the shared architecture and visual system.",
      },
      {
        id: "learned",
        title: "What I learned",
        body: "Building the product exposed implementation details that static mockups do not reveal, including responsive behavior, route structure, component reuse, state continuity, and deployment constraints.",
      },
    ] as const,
  },
  closing: {
    title: "The prototype is a living product, not a static deliverable.",
    body: "As new features are designed and refined, the live experience evolves alongside the case study.",
    primaryLabel: "Launch Live Prototype",
    primaryHref: ascendUrls.prototypeUrl,
    primaryAriaLabel: "Launch ASCEND live product prototype in a new tab",
    secondaryLabel: "View Product Design",
    secondaryHref: ascendUrls.figmaProductUrl,
    secondaryAriaLabel: "Open ASCEND Product Design in Figma in a new tab",
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
 * Chapter 11 — Outcomes & Reflection.
 * Closing chapter: deliverables, proof points, scope metrics, process shifts,
 * lessons, personal reflection, project links, and next-phase notes.
 */
export const ascendOutcome = {
  panels: [
    {
      id: "built",
      eyebrow: "WHAT I BUILT",
      title: "A complete product ecosystem",
      body: "The project grew from a brand foundation into a connected system that includes product architecture, a premium visual language, a responsive product experience, a marketing website, a reusable design system, Storybook documentation, and a live React prototype.",
      deliverables: [
        "Brand and visual foundation",
        "Product architecture and user flows",
        "Core product screens",
        "Marketing website",
        "ASCEND UI design system",
        "Storybook documentation",
        "Live interactive prototype",
        "Source-controlled implementation",
      ] as const,
    },
    {
      id: "proves",
      eyebrow: "WHAT IT PROVES",
      title: "Design decisions that survive implementation",
      body: "The strongest outcome is not a single screen. It is the continuity between the original idea, the product structure, the visual system, the reusable components, and the working experience. Building the prototype revealed which decisions were truly scalable and which needed refinement once they reached code.",
      proofPoints: [
        "Strategy translated into a coherent product direction",
        "Figma decisions carried into reusable components",
        "Shared tokens kept product and system aligned",
        "Real implementation exposed responsive and interaction details",
      ] as const,
    },
  ] as const,
  metrics: {
    title: "Project Scope",
    items: [
      {
        id: "chapters",
        value: "11",
        label: "Case study chapters",
      },
      {
        id: "surfaces",
        value: "2",
        label: "Connected product surfaces",
        caption: "Product and marketing",
      },
      {
        id: "system",
        value: "1",
        label: "Reusable design system",
      },
      {
        id: "prototype",
        value: "1",
        label: "Live interactive prototype",
      },
      {
        id: "experiences",
        value: "7+",
        label: "Core product experiences designed",
      },
      {
        id: "workflow",
        value: "1",
        label: "Connected design-to-code workflow",
      },
    ] as const,
  },
  changes: {
    title: "What changed through the process",
    items: [
      {
        id: "screens-to-systems",
        title: "From screens to systems",
        body: "The work began as individual product and marketing surfaces, but the project became stronger once shared tokens, components, layouts, and interaction patterns were treated as the foundation.",
      },
      {
        id: "mockups-to-behavior",
        title: "From mockups to behavior",
        body: "Building the live prototype shifted the focus from static composition to routing, responsive behavior, reusable states, and the continuity between screens.",
      },
      {
        id: "presentation-to-product",
        title: "From presentation to product",
        body: "The final case study does more than show artifacts. It allows reviewers to move between the strategy, the system, the source, and the working experience.",
      },
    ] as const,
  },
  lessons: {
    title: "What I learned",
    items: [
      {
        id: "systems",
        number: "01",
        title: "Systems expose weak decisions",
        body: "A visual choice may look convincing in isolation, but a reusable system reveals whether it can support multiple pages, states, and breakpoints.",
      },
      {
        id: "implementation",
        number: "02",
        title: "Implementation is part of design",
        body: "Routing, responsive behavior, component APIs, loading states, and deployment constraints all influence the final user experience.",
      },
      {
        id: "consistency",
        number: "03",
        title: "Consistency requires explicit rules",
        body: "Typography, spacing, icons, color roles, and interaction states became more reliable once they were formalized instead of adjusted page by page.",
      },
      {
        id: "prototype",
        number: "04",
        title: "A prototype changes the conversation",
        body: "A live product allows reviewers to experience flow, hierarchy, and behavior directly rather than interpreting static screens alone.",
      },
    ] as const,
  },
  reflection: {
    eyebrow: "PERSONAL REFLECTION",
    title: "The value was in connecting the disciplines.",
    paragraphs: [
      "ASCEND gave me the opportunity to work across product thinking, visual design, systems, frontend structure, documentation, and deployment. The project became a practical demonstration of how I prefer to work: understand the problem, define the system, design the experience, build enough of it to test the decisions, and refine what does not hold up.",
      "The result is intentionally still evolving. That is part of the outcome. The live prototype, design system, and case study can continue to grow without losing the foundation established at the beginning.",
    ] as const,
  },
  explore: {
    title: "Explore the complete project",
    statusLabel: "Active development",
    links: [
      {
        id: "prototype",
        label: "View Live Prototype",
        href: ascendUrls.prototypeUrl,
        ariaLabel: "Open ASCEND live product prototype in a new tab",
        showStatus: true,
      },
      {
        id: "storybook",
        label: "View Storybook",
        href: ascendUrls.storybookUrl,
        ariaLabel: "Open ASCEND UI Storybook in a new tab",
      },
      {
        id: "github",
        label: "View Source Code",
        href: ascendUrls.githubUrl,
        ariaLabel: "Open ASCEND source code on GitHub in a new tab",
      },
      {
        id: "figma",
        label: "View Product Design",
        href: ascendUrls.figmaProductUrl,
        ariaLabel: "Open ASCEND Product Design in Figma in a new tab",
      },
    ] as const,
  },
  closing: {
    title: "The outcome is not one perfect screen. It is a system that can keep becoming a product.",
    body: "ASCEND is the result of treating research, structure, visual direction, components, code, and reflection as one continuous design process.",
    ctaLabel: "Launch Live Prototype",
    ctaHref: ascendUrls.prototypeUrl,
    ctaAriaLabel: "Launch ASCEND live product prototype in a new tab",
  },
  process: {
    summary: "What I would improve next",
    blocks: [
      {
        id: "validation",
        title: "Deeper product validation",
        body: "The next phase would include structured usability testing with target users to validate navigation, daily-plan comprehension, program discovery, and session guidance.",
      },
      {
        id: "state",
        title: "More complete application state",
        body: "The current prototype uses realistic front-end state. A future phase could introduce authentication, persistent user data, saved reflections, and real progress tracking.",
      },
      {
        id: "responsive",
        title: "Expanded responsive validation",
        body: "The product would benefit from a deeper mobile-first refinement pass across longer workflows and dense information layouts.",
      },
      {
        id: "a11y",
        title: "Accessibility testing",
        body: "The design system already establishes accessible patterns, but the full product should be tested with keyboard navigation, screen readers, zoom, reduced motion, and contrast validation.",
      },
      {
        id: "content",
        title: "Real content and analytics",
        body: "A production version would replace demonstration content with validated program data and measure where users complete, pause, or abandon key flows.",
      },
    ] as const,
  },
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
  statusDetail: "Live prototype · Active development",
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
  product: ascendProduct,
  marketing: ascendMarketing,
  system: ascendSystem,
  prototype: ascendPrototype,
  outcome: ascendOutcome,
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
  /** Live product prototype — sits with Storybook in the secondary action group. */
  heroPrototypeCta: {
    label: "View Live Prototype",
    href: ascendUrls.prototypeUrl,
    external: true,
    ariaLabel: "Open ASCEND live product prototype in a new tab",
    statusLabel: "Active Development",
  },
  /** Quiet supporting destinations under the primary / secondary pair. */
  heroSupportingLinks: [
    {
      id: "github",
      label: "View Source Code",
      href: ascendUrls.githubUrl,
      ariaLabel: "Open ASCEND source code on GitHub in a new tab",
    },
    {
      id: "figma",
      label: "View Product Design",
      href: ascendUrls.figmaProductUrl,
      ariaLabel: "Open ASCEND Product Design in Figma in a new tab",
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
