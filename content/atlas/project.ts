/**
 * Atlas UI System — single source of truth for homepage card, /atlas page,
 * gallery themes, progress, workflow, CTAs, and status.
 *
 * Update this file to evolve the project publicly without rewriting sections.
 */

export type AtlasStatusState =
  | "Complete"
  | "In review"
  | "In progress"
  | "Next"
  | "Planned";

export type AtlasStatusItem = {
  label: string;
  state: AtlasStatusState;
};

export type AtlasUpdate = {
  version: string;
  items: string[];
};

export type AtlasThemeId = "light" | "dark";

export type AtlasScreenAssets = {
  thumbnailSrc: string;
  fullSrc: string;
  width: number;
  height: number;
  thumbWidth: number;
  thumbHeight: number;
};

export type AtlasScreen = {
  id: string;
  label: string;
  alt: string;
  /** Theme variants. Omit a theme until real mockups exist — never invent with filters. */
  themes: Partial<Record<AtlasThemeId, AtlasScreenAssets>>;
};

export type AtlasFoundation = {
  id: string;
  label: string;
};

export type AtlasComponentCategory = {
  id: string;
  label: string;
  state: AtlasStatusState;
};

export type AtlasCaseBeat = {
  id: string;
  label: string;
  state: AtlasStatusState;
  /** Real narrative body — omit until written. */
  body?: string;
};

export type AtlasWorkflowStep = {
  id: string;
  label: string;
};

export type AtlasProgressItem = {
  label: string;
};

export type AtlasProgressGroups = {
  completed: readonly AtlasProgressItem[];
  inProgress: readonly AtlasProgressItem[];
  next: readonly AtlasProgressItem[];
};

export type AtlasStorybookShot = {
  id: string;
  title: string;
  description: string;
  status: AtlasStatusState;
  imageSrc: string;
  width: number;
  height: number;
  href?: string | null;
};

export type AtlasUrlKey =
  | "figmaProductUrl"
  | "figmaSystemUrl"
  | "storybookUrl"
  | "githubUrl"
  | "prototypeUrl"
  | "dashboardUrl";

export type AtlasCta = {
  id: AtlasUrlKey | string;
  label: string;
  href: string | null;
  external?: boolean;
  /** Shown when href is null. Required for any inactive CTA. */
  pendingLabel?: string;
  /** Optional status note shown alongside an active link (e.g. "Active development"). */
  statusLabel?: string;
};

export type AtlasRole = { id: string; label: string };

/** Named product journey step used inside the prototype section. */
export type AtlasProductFlowStep = { id: string; label: string };

/** Concise capability inside the prototype section. */
export type AtlasPrototypeCapability = { id: string; label: string };

/** Workspace package/app card. */
export type AtlasWorkspaceEntry = {
  path: string;
  role: "package" | "app";
  description: string;
};

/**
 * Screen dimensions per aspect. Grid + modal derive their intrinsic size
 * from these values so a single resolver drives both roles.
 *
 * - Light theme currently ships from `/light/thumb/*.jpg` (1280 wide,
 *   Figma-exported light screenshots — the only files that actually
 *   contain light-mode content today). Replace with high-res
 *   `/light/full/*.png` here + on disk once exported.
 * - Dark theme ships from `/dark/full/*.png` (2880 wide).
 */
const LIGHT_COMMON = { width: 1280, height: 981 } as const;
const LIGHT_ANALYTICS = { width: 1280, height: 1121 } as const;
const DARK_COMMON = { width: 2880, height: 2208 } as const;
const DARK_ANALYTICS = { width: 2880, height: 2522 } as const;

function lightAssets(
  id: string,
  dims: typeof LIGHT_COMMON | typeof LIGHT_ANALYTICS = LIGHT_COMMON,
): AtlasScreenAssets {
  const src = `/images/atlas/product/light/thumb/${id}.jpg`;
  return {
    thumbnailSrc: src,
    fullSrc: src,
    width: dims.width,
    height: dims.height,
    thumbWidth: dims.width,
    thumbHeight: dims.height,
  };
}

function darkAssets(
  id: string,
  dims: typeof DARK_COMMON | typeof DARK_ANALYTICS = DARK_COMMON,
): AtlasScreenAssets {
  const src = `/images/atlas/product/dark/full/${id}.png`;
  return {
    thumbnailSrc: src,
    fullSrc: src,
    width: dims.width,
    height: dims.height,
    thumbWidth: dims.width,
    thumbHeight: dims.height,
  };
}

/**
 * Atlas UI System — structured content for homepage card + /atlas.
 */
export const atlasProject = {
  name: "Atlas UI System",
  shortName: "Atlas",
  /** Selected Work + feature card primary description. */
  description:
    "An enterprise product ecosystem spanning UX/UI, design systems, React components, Storybook, and a live interactive product.",
  /** Longer /atlas thesis copy. */
  thesis:
    "Atlas is an enterprise product ecosystem designed from product UI to reusable system to a live interactive product. Visitors can explore the working application directly — a product, design system, component library, and AI-assisted implementation workflow evolving together.",
  tagline: "From product concept to live interactive product.",
  eyebrow: "FLAGSHIP PROJECT · LIVE INTERACTIVE PRODUCT",
  statusLabel: "Active development",
  statusDetail: "Live interactive product",
  /** Compact card status lines (feature card + selected-work meta). */
  libraryStatus: "Live",
  secondaryStatus: "Live interactive product · React library on Storybook",
  /** Subtle caption shown below the Live Demo CTA. */
  liveDemoCaption:
    "This application is actively evolving with new product improvements, workflows, and design system enhancements.",
  version: "0.3",
  /** Manual editorial date — update when publishing meaningful progress. */
  lastUpdated: "2026-07-22",
  lastUpdatedDisplay: "July 2026",
  href: "/atlas",
  metadataLabel: "Product UI → Design System → React → Live Product",
  activeSummary:
    "Atlas Intelligence is now publicly available as an interactive enterprise product demonstration. The experience continues to evolve through ongoing refinement, additional workflows, accessibility improvements, and design system enhancements.",

  roles: [
    { id: "product", label: "Product Designer" },
    { id: "systems", label: "Design Systems" },
    { id: "engineer", label: "Design Engineer" },
  ] satisfies AtlasRole[],

  focus: [
    "Enterprise UX",
    "Design Systems",
    "AI-assisted workflows",
    "Front-end implementation",
  ] as const,

  tools: [
    "Figma",
    "React",
    "TypeScript",
    "Storybook",
    "Claude Code",
    "Cursor",
  ] as const,

  builtWithLine: "Figma × React × Storybook × Claude Code",
  cardToolsLine: "Product · Systems · React · Storybook · AI-assisted",

  /** Public URLs — null renders an honest inactive CTA. Never use "#". */
  urls: {
    figmaProductUrl:
      "https://www.figma.com/design/dj1paTl6gvC58KQMUuzdW3/ATLAS?node-id=11-77&t=vKN3UwNoDvZkF8v9-0",
    figmaSystemUrl:
      "https://www.figma.com/design/4WOjv0BlxVPtDJZk07Lnts/Atlas-UI-System?node-id=0-1&p=f&t=gPV9rHUrNtKJ1jZH-0",
    storybookUrl: "https://atlas-ui-alpha.vercel.app/" as string | null,
    githubUrl: "https://github.com/Elvisfdesign/atlas-ui" as string | null,
    prototypeUrl:
      "https://atlas-ui-atlas-intelligence.vercel.app/" as string | null,
    dashboardUrl: null as string | null,
  },

  /**
   * Hero + footer CTAs derived from urls.
   * Order matters: Live Demo is the primary Atlas action and appears first.
   */
  ctas: [
    {
      id: "prototypeUrl",
      label: "Launch Live Demo",
      href: "https://atlas-ui-atlas-intelligence.vercel.app/",
      external: true,
    },
    {
      id: "storybookUrl",
      label: "View Storybook",
      href: "https://atlas-ui-alpha.vercel.app/",
      external: true,
    },
    {
      id: "githubUrl",
      label: "View Repository",
      href: "https://github.com/Elvisfdesign/atlas-ui",
      external: true,
    },
    {
      id: "figmaProductUrl",
      label: "Product UI (Figma)",
      href: "https://www.figma.com/design/dj1paTl6gvC58KQMUuzdW3/ATLAS?node-id=11-77&t=vKN3UwNoDvZkF8v9-0",
      external: true,
    },
    {
      id: "figmaSystemUrl",
      label: "Design System (Figma)",
      href: "https://www.figma.com/design/4WOjv0BlxVPtDJZk07Lnts/Atlas-UI-System?node-id=0-1&p=f&t=gPV9rHUrNtKJ1jZH-0",
      external: true,
    },
  ] satisfies AtlasCta[],

  screens: [
    {
      id: "dashboard",
      label: "Dashboard",
      alt: "Atlas Intelligence dashboard showing workflow metrics, activity overview, recent workflows, and quick actions.",
      themes: {
        light: lightAssets("dashboard"),
        dark: darkAssets("dashboard"),
      },
    },
    {
      id: "review-queue",
      label: "Review Queue",
      alt: "Atlas Intelligence Review Queue table listing documents with review status, confidence scores, assignees, and upload times.",
      themes: {
        light: lightAssets("review-queue"),
        dark: darkAssets("review-queue"),
      },
    },
    {
      id: "document-review",
      label: "Document Review",
      alt: "Atlas Intelligence Document Review workspace with invoice preview, extracted fields with confidence, and an AI assistant panel.",
      themes: {
        light: lightAssets("document-review"),
        dark: darkAssets("document-review"),
      },
    },
    {
      id: "analytics",
      label: "Analytics",
      alt: "Atlas Intelligence Analytics dashboard with KPI cards, processing trend chart, document-type distribution, and recent activity.",
      themes: {
        light: lightAssets("analytics", LIGHT_ANALYTICS),
        dark: darkAssets("analytics", DARK_ANALYTICS),
      },
    },
    {
      id: "workflow-builder",
      label: "Workflow Builder",
      alt: "Atlas Intelligence Workflows board with Intake, Processing, Review, and Output columns of workflow cards.",
      themes: {
        light: lightAssets("workflow-builder"),
        dark: darkAssets("workflow-builder"),
      },
    },
    {
      id: "settings",
      label: "Settings",
      alt: "Atlas Intelligence Settings screen with user profile, workspace details, and notification preferences.",
      themes: {
        light: lightAssets("settings"),
        dark: darkAssets("settings"),
      },
    },
  ] satisfies AtlasScreen[],

  foundations: [
    { id: "foundations", label: "Foundations" },
    { id: "variables", label: "Variables" },
    { id: "typography", label: "Typography" },
    { id: "color", label: "Color" },
    { id: "spacing", label: "Spacing" },
    { id: "components", label: "Components" },
    { id: "enterprise", label: "Enterprise patterns" },
    { id: "ai", label: "AI-specific patterns" },
    { id: "a11y", label: "Accessibility" },
    { id: "templates", label: "Templates" },
  ] satisfies AtlasFoundation[],

  /** High-level system architecture — visualized as a vertical flow. */
  architecture: [
    "Figma Product",
    "Atlas UI System",
    "React Component Library",
    "Storybook Documentation",
    "Atlas Intelligence Prototype",
  ] as const,

  /** Monorepo split shown under the architecture flow. */
  workspace: [
    {
      path: "packages/atlas-ui",
      role: "package",
      description:
        "Tokens, themes, reusable components, tests, and Storybook. App-agnostic and consumable by any product.",
    },
    {
      path: "apps/atlas-intelligence",
      role: "app",
      description:
        "Routing, pages, product state, mock data, and workflows. Consumes the Atlas UI library.",
    },
  ] satisfies AtlasWorkspaceEntry[],

  /** Single active workflow stage id — drives highlight on the process flow. */
  activeWorkflowStage: "refine" as const,

  workflow: [
    { id: "product-ui", label: "Product UI" },
    { id: "patterns", label: "Pattern identification" },
    { id: "figma", label: "Figma variables and components" },
    { id: "audit", label: "System audit" },
    { id: "react", label: "React component library" },
    { id: "storybook", label: "Storybook documentation" },
    { id: "prototype", label: "Atlas Intelligence live" },
    { id: "refine", label: "Ongoing refinement" },
  ] satisfies AtlasWorkflowStep[],

  componentCategories: [
    { id: "foundations", label: "Foundations", state: "Complete" },
    { id: "actions", label: "Actions", state: "Complete" },
    { id: "forms", label: "Forms", state: "Complete" },
    { id: "navigation", label: "Navigation", state: "Complete" },
    { id: "data", label: "Data Display", state: "Complete" },
    { id: "feedback", label: "Feedback", state: "Complete" },
    { id: "overlays", label: "Overlays", state: "Complete" },
    { id: "ai", label: "AI Components", state: "In progress" },
  ] satisfies AtlasComponentCategory[],

  reactProgress: {
    completed: [
      { label: "React and TypeScript architecture" },
      { label: "Semantic design tokens" },
      { label: "Light and Dark themes" },
      { label: "Storybook documentation" },
      { label: "Foundations, Actions, Forms" },
      { label: "Navigation, Data Display, Feedback, Overlays" },
    ],
    inProgress: [
      { label: "AI Assistant components" },
      { label: "Performance and accessibility audit" },
      { label: "Prototype polish and QA" },
    ],
    next: [
      { label: "Public Atlas Intelligence deployment" },
      { label: "Advanced workflow creation" },
      { label: "Open-source package improvements" },
    ],
  } satisfies AtlasProgressGroups,

  /**
   * Storybook screenshots — only entries with real imageSrc render.
   * Add shots here as assets land under /public/images/atlas/storybook/.
   */
  storybookShots: [] as AtlasStorybookShot[],

  /** Feature summary shown inside the Interactive Product Prototype section. */
  prototypeCapabilities: [
    { id: "dashboard", label: "Dashboard with operational metrics" },
    { id: "queue", label: "Review Queue with search, sort, filter, selection, pagination" },
    { id: "review", label: "Document Review with editable extracted fields" },
    { id: "ai", label: "AI-assisted review with confidence and evidence" },
    { id: "approval", label: "Approval flow with persistent state updates" },
    { id: "analytics", label: "Analytics with trends and distribution" },
    { id: "workflows", label: "Workflow management" },
    { id: "settings", label: "Settings and preferences" },
    { id: "themes", label: "Light and Dark modes" },
    { id: "responsive", label: "Responsive navigation and mobile layouts" },
  ] satisfies AtlasPrototypeCapability[],

  /** End-to-end review workflow: dashboard → decision. */
  productFlow: [
    { id: "dashboard-start", label: "Dashboard" },
    { id: "queue", label: "Review Queue" },
    { id: "review", label: "Document Review" },
    { id: "edit", label: "Edit extracted data" },
    { id: "ask", label: "Ask AI" },
    { id: "approve", label: "Approve document" },
    { id: "queue-updates", label: "Queue updates" },
    { id: "metrics", label: "Dashboard metrics update" },
  ] satisfies AtlasProductFlowStep[],

  caseBeats: [
    {
      id: "challenge",
      label: "Challenge",
      state: "Complete",
      body: "Enterprise AI products need a durable design language — not one-off screens. Atlas began as a complete product so the system could be extracted from real decisions, not invented in isolation.",
    },
    {
      id: "direction",
      label: "Product direction",
      state: "Complete",
      body: "Atlas Intelligence is framed as an enterprise AI workspace: review queues, document review, analytics, workflow building, and settings — dense surfaces that demand clarity under operational pressure.",
    },
    {
      id: "product",
      label: "Product UI",
      state: "Complete",
      body: "Six core product screens were designed end-to-end — establishing density, hierarchy, and interaction patterns before any component library work began.",
    },
    {
      id: "patterns",
      label: "Pattern extraction",
      state: "Complete",
      body: "Repeated product decisions — tables, KPI cards, status pills, AI suggestions, sidebars — were inventoried and named so the Figma system could stay faithful to shipped UI.",
    },
    {
      id: "system",
      label: "Figma system construction",
      state: "Complete",
      body: "Variables, foundations, and components were built in Figma as the visual source of truth for Atlas products and the React library that follows.",
    },
    {
      id: "theming",
      label: "Light and Dark theming",
      state: "Complete",
      body: "Semantic tokens power both themes across product mockups, the Figma system, the React library, and the interactive prototype — so Light and Dark stay aligned without duplicated component trees.",
    },
    {
      id: "audit",
      label: "System audit",
      state: "Complete",
      body: "A structured handoff audit checked accessibility, layout consistency, missing variants, and React readiness before implementation started.",
    },
    {
      id: "react",
      label: "React component library",
      state: "Complete",
      body: "Atlas UI is a React and TypeScript library with semantic tokens, theme switching, Storybook, and tests — a disciplined translation of the approved Figma system, now live on Storybook.",
    },
    {
      id: "storybook",
      label: "Storybook documentation",
      state: "Complete",
      body: "Storybook documents foundations and shipped components with controls, themes, and accessibility checks. Public deployment is live at atlas-ui-alpha.vercel.app.",
    },
    {
      id: "prototype",
      label: "Live interactive product",
      state: "Complete",
      body: "Atlas Intelligence is now publicly available. It consumes the React library to demonstrate the design system inside a working enterprise product — dashboard, review queue, document review, analytics, workflows, and settings — all sharing state and available to explore in the live demo.",
    },
    {
      id: "ai-workflow",
      label: "AI-assisted implementation",
      state: "Complete",
      body: "Claude Code and Cursor accelerated implementation, testing, and iteration. Design direction, UX decisions, component reuse, visual review, and design-system governance remained a designer-led practice throughout.",
    },
    {
      id: "refine",
      label: "Ongoing refinement",
      state: "In progress",
      body: "Now that Atlas Intelligence is live, refinement continues in the open — new workflows, accessibility polish, performance work, and design-system enhancements ship as the product evolves.",
    },
  ] satisfies AtlasCaseBeat[],

  statuses: [
    { label: "Product UI", state: "Complete" },
    { label: "Figma design system", state: "Complete" },
    { label: "Light and Dark themes", state: "Complete" },
    { label: "System audit and documentation", state: "Complete" },
    { label: "React component library", state: "Complete" },
    { label: "Storybook documentation", state: "Complete" },
    { label: "Interactive dashboard", state: "Complete" },
    { label: "Review Queue", state: "Complete" },
    { label: "Document Review workflow", state: "Complete" },
    { label: "Analytics", state: "Complete" },
    { label: "Workflow management", state: "Complete" },
    { label: "Settings", state: "Complete" },
    { label: "Responsive shell", state: "Complete" },
    { label: "Public live demo", state: "Complete" },
    { label: "Ongoing product refinement", state: "In progress" },
    { label: "Performance and accessibility audit", state: "In progress" },
    { label: "Additional workflows and improvements", state: "In progress" },
  ] satisfies AtlasStatusItem[],

  updates: [
    {
      version: "Atlas UI v0.3 · July 2026",
      items: [
        "Atlas Intelligence live at atlas-ui-atlas-intelligence.vercel.app",
        "Interactive dashboard, review queue, document review, analytics, workflows, and settings publicly available",
        "Ongoing refinement: additional workflows, accessibility polish, and design-system enhancements",
      ],
    },
    {
      version: "Atlas UI v0.2 · July 2026",
      items: [
        "React component library live on Storybook",
        "GitHub repository open sourced",
        "Light and Dark parity across product and system",
        "Responsive shell and mobile layouts",
      ],
    },
    {
      version: "Atlas UI v0.1 · earlier 2026",
      items: [
        "Product UI and Figma UI System complete",
        "System audit and Light/Dark token model",
        "React tokens, themes, and Storybook foundation shipped",
        "Core components: Button, Icon Button, Badge, Avatar, Tooltip, KPI Card",
      ],
    },
  ] satisfies AtlasUpdate[],
} as const;

export type AtlasProject = typeof atlasProject;

/** Themes that have assets for every product screen. */
export function getCompleteGalleryThemes(
  screens: readonly AtlasScreen[] = atlasProject.screens,
): AtlasThemeId[] {
  const themes: AtlasThemeId[] = ["light", "dark"];
  return themes.filter((theme) =>
    screens.every((screen) => Boolean(screen.themes[theme])),
  );
}

export function resolveScreenAssets(
  screen: AtlasScreen,
  theme: AtlasThemeId,
): AtlasScreenAssets | null {
  return screen.themes[theme] ?? null;
}

/** Backward-compatible link list for shared CTA rendering. */
export function getAtlasLinks(): AtlasCta[] {
  return [...atlasProject.ctas];
}
