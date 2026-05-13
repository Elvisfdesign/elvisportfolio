import type { CaseStudy } from "./types";

export const careerNavigator: CaseStudy = {
  slug: "career-navigator",
  index: "03",
  title: "AI Skill & Career Navigator",
  thesis:
    "After a layoff I kept returning to the same practical questions — what belonged next on the path, which skills deserved the next increment of effort, and how AI might widen the map of adjacent opportunities without replacing judgment. This concept asks what career guidance feels like when the model behaves like a transparent collaborator rather than a black-box authority.",
  positioning:
    "Transparent career exploration: goals, gaps, and a roadmap you can argue with — prototyped as a calm, inspectable AI partner.",
  prototypeUrl: "https://blues-even-90777474.figma.site/",
  prototypeLabel: "View Prototype",
  journalUrl: "https://elvisfportfolio.netlify.app/case-ai-career.html",
  journalLabel: "Design Journal",
  heroLinksNote:
    "Interactive prototype, archived workflow, and full case narrative.",
  meta: {
    role: "Product Designer (lead)",
    year: "2026",
    team: "Independent · Personal project · AI workflow exploration",
    surface: "Web · AI guidance · Learning roadmap",
    status: "Live prototype / Concept",
  },
  reading: "6 min read",
  ambient: "Goals · skill gaps · roadmap · reasoning",
  blocks: [
    // ---------- 01 PREMISE ----------
    {
      kind: "prose",
      beat: "premise",
      eyebrow: "WHAT IT IS",
      heading: "Career guidance, mapped.",
      body: [
        "The Navigator is a self-directed product sketch for anyone trying to grow, pivot, or level up — especially when certainty is scarce. Typical learning catalogs answer “what courses exist”; they rarely synthesize where you are today, where you intend to stand, and which moves genuinely close that distance.",
        "The experience stays guided without becoming prescriptive chat: capture background (résumé or skill context), name goals, run a structured skill-gap read, then surface a roadmap that leaves room for “why here, why now.” Compress uncertainty into actionable next steps, but refuse to disguise inference as destiny.",
      ],
    },

    // ---------- 02 LENS ----------
    {
      kind: "prose",
      beat: "lens",
      eyebrow: "TRUST",
      heading: "Transparency before prescription.",
      body: [
        "Career decisions carry weight. Recommendations that sound final without lineage feel careless — people need receipts for what was inferred from which inputs, and honest language when the model is guessing.",
        "That lens shaped every layout choice here: prioritize inspectable reasoning, separate user-stated facts from model inference, surface uncertainty plainly, and let someone reject a line of advice without the whole thread collapsing.",
      ],
    },
    {
      kind: "pull-quote",
      beat: "lens",
      text: "Make the model show its work. Otherwise it's just a confident stranger in your career.",
    },

    // ---------- 03 THINKING — Process ----------
    {
      kind: "prose",
      beat: "thinking",
      eyebrow: "PROCESS",
      heading: "Discovery through prototype.",
      body: [
        "Work tracked a familiar arc: discovery and definition → journey maps and IA → wireframes → high-fidelity UI → clickable prototype. Notes and scope stayed light in Notion; FigJam held the backbone so structure survived iteration.",
        "Figma Make and other AI builds shortened scaffolding time, yet pacing and critique stayed firmly in designer hands. Tools accelerated reach; they did not outsource intent. The gamble was seeing whether speculative AI interfaces could stay legible enough to critique in the same sprint they were mocked.",
      ],
    },
    {
      kind: "artifact",
      beat: "thinking",
      label: "PROMPT · TRANSPARENCY CONTRACT",
      meta: "Claude · excerpt",
      lines: [
        "You are a career guide. You are not a coach, mentor, or oracle.",
        "",
        "For every recommendation you make, you MUST surface:",
        "  - The 2–3 specific user inputs that drove this suggestion",
        "  - The assumption you made (and how confident you are in it)",
        "  - One adjacent path you considered and chose not to recommend",
        "",
        "Never use the word 'should.' Use 'one option is' or 'a path you could explore.'",
        "Always offer the user a way to say: 'this doesn't sound like me.'",
      ],
    },

    // ---------- 04 SYSTEM ----------
    {
      kind: "prose",
      beat: "system",
      eyebrow: "STRUCTURE",
      heading: "Conversation, map, and receipts—grounded in a real journey.",
      body: [
        "The IA follows the skeleton that first appeared in FigJam: onboarding and profile capture, résumé or skill context, goal selection, AI-assisted gap analysis, a generated roadmap, light progress cues, and a rationale layer reachable whenever someone asks why a move exists.",
        "Conversation gathers intent and texture; the map is the durable view of gaps and ordered bets; receipts bundle the rationale so validation feels like reviewing evidence, not arguing with vibes.",
      ],
    },
    {
      kind: "image",
      beat: "system",
      stub: "flow",
      aspect: "16/9",
      alt: "Flow from landing through profile, skill analysis, roadmap, and reasoning surfaces",
      caption: "Discovery flow — context in, structured path out.",
    },

    // ---------- 05 PRODUCT ----------
    {
      kind: "prose",
      beat: "product",
      eyebrow: "THE SCREENS",
      heading: "Screens that build on each other.",
      body: [
        "The narrative opens calmed and grounded — why the tool exists, what it will ask for — then folds into gap framing that reads plainly, finishes on a roadmap that behaves like sequence instead of overwhelm, with detail drawers that reopen the receipts behind each suggestion.",
        "Every major nod keeps a tether to reasoning: what shifted, what remains uncertain, and what the learner can revisit or reject without losing coherence.",
      ],
    },
    {
      kind: "image-grid",
      beat: "product",
      images: [
        {
          stub: "dashboard",
          aspect: "4/3",
          alt: "Dashboard or guided entry—value and next step",
        },
        { stub: "graph", aspect: "4/3", alt: "Skills analysis summarizing gaps toward a target" },
        {
          stub: "flow",
          aspect: "4/3",
          alt: "Personalized roadmap with ordered learning moves",
        },
        {
          stub: "screen",
          aspect: "4/3",
          alt: "Recommendation detail with explanation and next steps",
        },
      ],
      caption: "Landing → analysis → roadmap → transparent detail.",
    },

    // ---------- 06 CRAFT ----------
    {
      kind: "prose",
      beat: "craft",
      eyebrow: "CLOSE-UP",
      heading: "Receipts, defined simply.",
      body: [
        "A receipt is the explanation tethered to a suggestion: captured inputs, inferences drawn, discarded alternatives, and why this roadmap item surfaced. Trust lives there — not appended as an FAQ afterward.",
        "Visually the story favors editorial calm: restrained palette, disciplined hierarchy, a single accent thread for “live” synthesis so credibility reads as clarity, not spectacle.",
      ],
    },

    // ---------- 07 OUTCOME ----------
    {
      kind: "prose",
      beat: "outcome",
      eyebrow: "RESULT",
      heading: "What the concept demonstrates.",
      body: [
        "Independent exploration rather than shipped production — the artifact is a narrative plus interactive prototype spanning framing through fit-and-finish, evidence that ambiguity can stay steered without surrendering hierarchy to tooling.",
        "Transparent recommendation scaffolding stayed non-negotiable: if the roadmap cannot explain lineage, it missed the premise. Along the way the work also catalogs how assistant-led workflows shorten discovery cycles when humans still hold the bar for intent, coherence, and care.",
      ],
    },

    // ---------- 08 REFLECTION ----------
    {
      kind: "prose",
      beat: "reflection",
      eyebrow: "WHAT I LEARNED",
      heading: "Clarity, control, and visible reasoning.",
      body: [
        "AI enlarged the breadth of drafts and variants; it did not absolve sequencing, tone, or responsibility. Explicit guardrails — what qualifies as proof, where uncertainty earns a label, how users steer correction — preceded anything that deserved to sound predictive.",
        "What carries forward elsewhere: collaborate with models in the open. Pair assistants with clarity, consent, and visible reasoning people can sanity-check; that pairing is what keeps high-stakes exercises like career navigation feeling humane.",
      ],
    },
  ],
  next: { slug: "signal", title: "Signal — AI Trust Layer" },
};
