import { ascendProject, ascendUrls } from "@/content/ascend/project";

/**
 * Currently building — data for the small editorial hero-side card.
 *
 * Kept as a thin projection of `ascendProject` so the homepage card and the
 * /ascend case study never drift out of sync. The card opens the case study;
 * Live Figma remains a secondary action.
 */
export const currentProject = {
  eyebrow: "CURRENTLY BUILDING",
  name: ascendProject.name,
  subtitle: ascendProject.subtitle,
  description:
    "Designing a premium operating system that helps men build discipline through intentional habits, health, training, recovery, and community.",
  status: "Active Development",
  progress: [
    "Product Experience",
    "Marketing Website",
    "Design System (In Progress)",
    "7 Marketing Pages",
  ] as const,
  /** Primary destination — the flagship case study. */
  caseStudyHref: ascendProject.href,
  caseStudyCtaLabel: "Explore Case Study",
  /** Secondary destination — live Figma (always kept). */
  figmaUrl: ascendUrls.figmaProductUrl,
  figmaCtaLabel: "View Live Figma",
} as const;

export type CurrentProject = typeof currentProject;
