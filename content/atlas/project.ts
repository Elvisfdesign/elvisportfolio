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

export type AtlasExternalLink = {
  id: string;
  label: string;
  href: string | null;
  external?: boolean;
};

export type AtlasScreen = {
  id: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type AtlasFoundation = {
  id: string;
  label: string;
};

export type AtlasComponentCategory = {
  id: string;
  label: string;
};

export type AtlasCaseBeat = {
  id: string;
  label: string;
};

export type AtlasWorkflowStep = {
  id: string;
  label: string;
};

/**
 * Atlas UI System — structured content for homepage card + /atlas.
 * Edit statuses, links, and changelog here as the project grows.
 */
export const atlasProject = {
  name: "Atlas UI System",
  shortName: "Atlas",
  tagline: "Designing the future of design systems.",
  statusLabel: "Building in public · Version 1.0",
  version: "1.0",
  /** Manual editorial date — update when publishing meaningful progress. */
  lastUpdated: "2026-04-10",
  href: "/atlas",
  metadataLabel: "Product → Design System → Production Code",
  tools: [
    "Figma",
    "Claude Code",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ] as const,
  builtWithLine: "Figma × Claude Code",
  screens: [
    {
      id: "dashboard",
      label: "Dashboard",
      src: "/images/atlas/dashboard.jpg",
      width: 1024,
      height: 785,
      alt: "Atlas Intelligence dashboard showing workflow metrics, activity overview, recent workflows, and quick actions.",
    },
    {
      id: "review-queue",
      label: "Review Queue",
      src: "/images/atlas/review-queue.jpg",
      width: 1024,
      height: 785,
      alt: "Atlas Intelligence Review Queue table listing documents with review status, confidence scores, assignees, and upload times.",
    },
    {
      id: "document-review",
      label: "Document Review",
      src: "/images/atlas/document-review.jpg",
      width: 1024,
      height: 785,
      alt: "Atlas Intelligence Document Review workspace with invoice preview, extracted fields with confidence, and an AI assistant panel.",
    },
    {
      id: "analytics",
      label: "Analytics",
      src: "/images/atlas/analytics.jpg",
      width: 1024,
      height: 896,
      alt: "Atlas Intelligence Analytics dashboard with KPI cards, processing trend chart, document-type distribution, and recent activity.",
    },
    {
      id: "workflow-builder",
      label: "Workflow Builder",
      src: "/images/atlas/workflow-builder.jpg",
      width: 1024,
      height: 785,
      alt: "Atlas Intelligence Workflows board with Intake, Processing, Review, and Output columns of workflow cards.",
    },
    {
      id: "settings",
      label: "Settings",
      src: "/images/atlas/settings.jpg",
      width: 1024,
      height: 785,
      alt: "Atlas Intelligence Settings screen with user profile, workspace details, and notification preferences.",
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
  workflow: [
    { id: "product-ui", label: "Product UI" },
    { id: "patterns", label: "Pattern identification" },
    { id: "figma", label: "Figma variables and components" },
    { id: "audit", label: "System audit" },
    { id: "react", label: "React implementation" },
    { id: "refine", label: "Production refinement" },
  ] satisfies AtlasWorkflowStep[],
  componentCategories: [
    { id: "actions", label: "Actions" },
    { id: "forms", label: "Forms" },
    { id: "navigation", label: "Navigation" },
    { id: "data", label: "Data Display" },
    { id: "feedback", label: "Feedback" },
    { id: "overlays", label: "Overlays" },
    { id: "ai", label: "AI Components" },
  ] satisfies AtlasComponentCategory[],
  caseBeats: [
    { id: "challenge", label: "Challenge" },
    { id: "direction", label: "Direction" },
    { id: "product", label: "Product creation" },
    { id: "patterns", label: "Pattern extraction" },
    { id: "system", label: "System construction" },
    { id: "workflow", label: "Figma and Claude Code workflow" },
    { id: "audit", label: "Quality audit" },
    { id: "code", label: "Design-to-code implementation" },
    { id: "learned", label: "What I learned" },
  ] satisfies AtlasCaseBeat[],
  statuses: [
    { label: "Enterprise product UI", state: "Complete" },
    { label: "Design system foundation", state: "Complete" },
    { label: "Component library", state: "In review" },
    { label: "Accessibility and layout audit", state: "In progress" },
    { label: "React implementation", state: "Next" },
    { label: "Interactive playground", state: "Planned" },
    { label: "Portfolio case study", state: "In progress" },
  ] satisfies AtlasStatusItem[],
  updates: [
    {
      version: "Version 1.0",
      items: [
        "Product screens completed",
        "Design language extracted",
        "Figma component system created",
        "QA audit underway",
      ],
    },
  ] satisfies AtlasUpdate[],
  links: [
    {
      id: "product",
      label: "View Atlas Product",
      href: "https://www.figma.com/design/dj1paTl6gvC58KQMUuzdW3/ATLAS?node-id=11-77&t=9g8qepXC4OytVeab-0",
      external: true,
    },
    {
      id: "system",
      label: "Explore Atlas UI System",
      href: "https://www.figma.com/design/4WOjv0BlxVPtDJZk07Lnts/Atlas-UI-System?node-id=0-1&p=f&t=gPV9rHUrNtKJ1jZH-0",
      external: true,
    },
    {
      id: "github",
      label: "View GitHub Repository",
      href: null,
      external: true,
    },
    {
      id: "playground",
      label: "Open Component Playground",
      href: null,
      external: false,
    },
  ] satisfies AtlasExternalLink[],
} as const;

export type AtlasProject = typeof atlasProject;
