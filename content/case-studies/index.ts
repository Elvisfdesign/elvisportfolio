import type { CaseStudy } from "./types";
import { voiceModeration } from "./voice-moderation";
import { careerNavigator } from "./career-navigator";
import { signal } from "./signal";

export const CASE_STUDIES: CaseStudy[] = [
  voiceModeration,
  careerNavigator,
  signal,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export type { CaseStudy } from "./types";
export { BEAT_ORDER, BEAT_LABEL } from "./types";
