/**
 * AI for Product Designers — the practice piece, not a case study.
 *
 * Grounded in Maven's AI for Product Designers coursework and day-to-day IC workflow.
 * Includes annotated prompts plus the Prompt Lab demo.
 */

export const practicePiece = {
  slug: "ai-for-product-designers",
  index: "02",
  title: "AI for Product Designers",
  thesis: "How my design workflow has evolved — and what AI has become inside it.",
  positioning:
    "AI became part of the workflow — not just the output. A reflection on rapid prototyping, systems thinking, and designing alongside AI.",
  meta: {
    role: "AI Workflow Exploration",
    year: "May 2026",
    surface: "Workflow · Practice",
  },
  ambient: "Frame · prompt · iterate · refine · ship",
} as const;

/**
 * Pre-curated prompts surfaced inside the Prompt Lab.
 *
 * Each scenario mirrors Maven sprint-style tasks or analogous client IC work.
 * System and user prompts ship together so the model has constraints for useful,
 * voice-consistent output.
 */
export type PromptScenario = {
  id: string;
  title: string;
  blurb: string;
  systemPrompt: string;
  userPrompt: string;
  /** A one-line context shown above the artifact when this scenario is active. */
  context: string;
};

export const PROMPT_SCENARIOS: PromptScenario[] = [
  {
    id: "settings-microcopy",
    title: "Tighten admin settings copy mid-task",
    blurb:
      "Rewrite a noisy toast for MFA rollout so admins get the action in seconds, not paragraphs.",
    context:
      "Admins toggle enforcement during a rollout. Accuracy matters, but the current copy reads like a release note. They are distracted and need the next step without re-reading.",
    systemPrompt:
      "You are a senior product writer for enterprise SaaS admin tools. Copy is calm, declarative, and scan-friendly. No exclamation points, no 'please,' no hedging stacks. Prefer verbs. Keep sentences under 16 words. Lead with the human consequence, then the action.",
    userPrompt:
      "Rewrite this toast for an MFA enforcement screen so it is scannable in under 4 seconds. Original: 'Hi! We wanted to let you know that multi-factor authentication enforcement is now available for your organization. When you enable this setting, users who have not yet enrolled may experience sign-in interruptions until they complete enrollment. Please review the enrollment report before proceeding. Contact support if you need assistance.'",
  },
  {
    id: "analytics-empty-state",
    title: "Product empty-state for a KPI tile",
    blurb:
      "Draft three restrained empty-state options for an analytics summary before data backfills.",
    context:
      "The tile previews weekly active workspaces. Customers see it empty for the first seven days post-onboard. The copy should orient them without sounding broken or hypey.",
    systemPrompt:
      "You write UI copy aligned to a restrained enterprise design system. Empty analytics states explain what will populate, when, and what the customer can check meanwhile. Avoid 'No data yet,' 'Congrats,' or 'Get started!' Stay instructive and confident.",
    userPrompt:
      "Provide three headline + supporting sentence pairs (headline ≤7 words, supporting ≤18 words) for an empty 'Weekly active workspaces' KPI tile during the first-week backfill window.",
  },
  {
    id: "handoff-outline",
    title: "From frame notes to Cursor-ready outline",
    blurb:
      "Turn a messy FigJam excerpt into bullets an engineer can implement without guessing.",
    context:
      "You are prepping a Cursor session after a Maven-style rapid prototype pass. Inputs are conversational notes—not a polished spec.",
    systemPrompt:
      "You are a senior product designer translating messy notes into a tight build outline. Outputs are bullet lists grouped by Objective, Interaction, Empty states / errors, Telemetry to confirm, Questions for engineering. Tone is practical, skeptical of assumptions; call out ambiguity instead of guessing.",
    userPrompt:
      "FigJam excerpt: \n'- settings > billing: admins want invoice export but fear sending PII externally\n- need dual confirmation modal + CSV preview\n- if export fails queue async job + toast with retry\n- QA wants log line for CSV row count'\nProduce a Cursor-ready bullet outline with labelled sections.",
  },
];
