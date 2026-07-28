/**
 * Currently building — data for the small editorial hero-side card.
 *
 * This is intentionally not a case study. It is a lightweight surface that
 * points a visitor at whatever design work is active in Figma today.
 */
export const currentProject = {
  eyebrow: "CURRENTLY BUILDING",
  name: "ASCEND",
  subtitle: "Premium Lifestyle Operating System",
  description:
    "Designing a premium product experience focused on discipline, health, recovery, and intentional living.",
  status: "Active Design",
  progress: [
    "Dashboard",
    "Daily Plan",
    "Programs",
    "Program Detail",
  ] as const,
  figmaUrl:
    "https://www.figma.com/design/SuxbknnazGyqwY4L5JRkK1/ASCEND-%E2%80%94-Product?node-id=7-5&t=ActgmojJIxrXRKNq-1",
  ctaLabel: "View Live Figma",
} as const;

export type CurrentProject = typeof currentProject;
