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
  | "dashboardUrl";

export type AtlasCta = {
  id: AtlasUrlKey | string;
  label: string;
  href: string | null;
  external?: boolean;
  /** Shown when href is null. */
  pendingLabel?: string;
  /** Optional status note shown alongside an active link (e.g. "Work in progress"). */
  statusLabel?: string;
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
    "A modern enterprise design language built from product UI, extracted into a Figma system, and translated into reusable React components.",
  tagline: "From product UI to a scalable system and production code.",
  eyebrow: "FLAGSHIP PROJECT · BUILDING IN PUBLIC",
  statusLabel: "Building in public · Atlas UI v0.1",
  libraryStatus: "React library in development",
  secondaryStatus: "Live component documentation publishing soon",
  version: "0.1",
  /** Manual editorial date — update when publishing meaningful progress. */
  lastUpdated: "2026-07-15",
  lastUpdatedDisplay: "July 2026",
  href: "/atlas",
  metadataLabel: "Product → Design System → Production Code",
  tools: [
    "Figma",
    "Claude Code",
    "React",
    "TypeScript",
    "Storybook",
    "Tailwind CSS",
  ] as const,
  builtWithLine: "Figma × Claude Code × React",
  cardToolsLine: "Figma · Claude Code · React · TypeScript · Storybook",

  /** Public URLs — null renders an honest inactive CTA. Never use "#". */
  urls: {
    figmaProductUrl:
      "https://www.figma.com/design/dj1paTl6gvC58KQMUuzdW3/ATLAS?node-id=11-77&t=9g8qepXC4OytVeab-0",
    figmaSystemUrl:
      "https://www.figma.com/design/4WOjv0BlxVPtDJZk07Lnts/Atlas-UI-System?node-id=0-1&p=f&t=gPV9rHUrNtKJ1jZH-0",
    storybookUrl: null as string | null,
    githubUrl: null as string | null,
    dashboardUrl: null as string | null,
  },

  /** Hero + footer CTAs derived from urls. */
  ctas: [
    {
      id: "figmaProductUrl",
      label: "View Atlas Product",
      href: "https://www.figma.com/design/dj1paTl6gvC58KQMUuzdW3/ATLAS?node-id=11-77&t=9g8qepXC4OytVeab-0",
      external: true,
      pendingLabel: "Publishing soon",
    },
    {
      id: "figmaSystemUrl",
      label: "Explore Atlas UI System",
      href: "https://www.figma.com/design/4WOjv0BlxVPtDJZk07Lnts/Atlas-UI-System?node-id=0-1&p=f&t=gPV9rHUrNtKJ1jZH-0",
      external: true,
      pendingLabel: "Publishing soon",
    },
    {
      id: "storybookUrl",
      label: "View React Component Library",
      href: "https://atlas-ui-alpha.vercel.app/",
      external: true,
      pendingLabel: "Publishing soon",
      statusLabel: "Work in progress",
    },
    {
      id: "githubUrl",
      label: "View Repository",
      href: "https://github.com/Elvisfdesign/atlas-ui",
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

  architecture: [
    "Atlas Product",
    "Figma UI System",
    "Atlas UI React Library",
    "Storybook Documentation",
    "Atlas Dashboard",
  ] as const,

  /** Single active workflow stage id — drives highlight on the process flow. */
  activeWorkflowStage: "react" as const,

  workflow: [
    { id: "product-ui", label: "Product UI" },
    { id: "patterns", label: "Pattern identification" },
    { id: "figma", label: "Figma variables and components" },
    { id: "audit", label: "System audit" },
    { id: "react", label: "React implementation" },
    { id: "storybook", label: "Storybook documentation" },
    { id: "dashboard", label: "Atlas Dashboard" },
    { id: "refine", label: "Production refinement" },
  ] satisfies AtlasWorkflowStep[],

  componentCategories: [
    { id: "foundations", label: "Foundations", state: "Complete" },
    { id: "actions", label: "Actions", state: "Complete" },
    { id: "forms", label: "Forms", state: "In progress" },
    { id: "navigation", label: "Navigation", state: "In progress" },
    { id: "data", label: "Data Display", state: "In progress" },
    { id: "feedback", label: "Feedback", state: "In progress" },
    { id: "overlays", label: "Overlays", state: "In progress" },
    { id: "ai", label: "AI Components", state: "Planned" },
  ] satisfies AtlasComponentCategory[],

  reactProgress: {
    completed: [
      { label: "React and TypeScript architecture" },
      { label: "Semantic design tokens" },
      { label: "Light and Dark themes" },
      { label: "Storybook documentation" },
      { label: "Button" },
      { label: "Icon Button" },
      { label: "Badge" },
      { label: "Avatar" },
      { label: "Tooltip" },
      { label: "KPI Card" },
    ],
    inProgress: [
      { label: "Forms" },
      { label: "Navigation" },
      { label: "Data Table" },
      { label: "Feedback" },
      { label: "Overlays" },
      { label: "AI components" },
    ],
    next: [
      { label: "Review Queue live prototype" },
      { label: "Complete Atlas Dashboard" },
      { label: "Public Storybook deployment" },
      { label: "GitHub repository" },
    ],
  } satisfies AtlasProgressGroups,

  /**
   * Storybook screenshots — only entries with real imageSrc render.
   * Add shots here as assets land under /public/images/atlas/storybook/.
   */
  storybookShots: [] as AtlasStorybookShot[],

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
      body: "Semantic tokens power both themes across product mockups and the Figma system, so Light and Dark stay aligned without duplicated component trees.",
    },
    {
      id: "audit",
      label: "System audit",
      state: "Complete",
      body: "A structured handoff audit checked accessibility, layout consistency, missing variants, and React readiness before implementation started.",
    },
    {
      id: "react",
      label: "React architecture",
      state: "Complete",
      body: "Atlas UI is a React and TypeScript library with semantic tokens, theme switching, Storybook, and tests — a disciplined translation of the approved Figma system.",
    },
    {
      id: "storybook",
      label: "Storybook documentation",
      state: "Complete",
      body: "Storybook documents foundations and the first shipped components with controls, themes, and accessibility checks. Public deployment is next.",
    },
    {
      id: "components",
      label: "Component implementation",
      state: "In progress",
    },
    {
      id: "dashboard",
      label: "Atlas Dashboard",
      state: "Next",
    },
    {
      id: "learned",
      label: "What I learned",
      state: "In progress",
    },
  ] satisfies AtlasCaseBeat[],

  statuses: [
    { label: "Enterprise product UI", state: "Complete" },
    { label: "Light and Dark product themes", state: "Complete" },
    { label: "Figma UI System", state: "Complete" },
    { label: "System audit and documentation", state: "Complete" },
    { label: "React foundations and tokens", state: "Complete" },
    { label: "Storybook documentation", state: "Complete" },
    { label: "Core React components", state: "Complete" },
    { label: "Full React component library", state: "In progress" },
    { label: "Interactive Dashboard", state: "Next" },
    { label: "Public deployment", state: "Planned" },
    { label: "Portfolio case study", state: "In progress" },
  ] satisfies AtlasStatusItem[],

  updates: [
    {
      version: "Atlas UI v0.1",
      items: [
        "Product UI and Light/Dark themes complete",
        "Figma UI System audited and documented",
        "React tokens, themes, and Storybook foundation shipped",
        "Core components: Button, Icon Button, Badge, Avatar, Tooltip, KPI Card",
        "Full component library and public Storybook in progress",
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
