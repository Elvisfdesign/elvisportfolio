import type { CaseStudy } from "./types";

export const designingMyDesignPortfolio: CaseStudy = {
  slug: "designing-my-design-portfolio",
  index: "07",
  title: "Designing My Design Portfolio",
  thesis:
    "Treating my own digital presence like a product: rebuilding the portfolio from scratch through information architecture, content strategy, direct-in-code design, critique, and iteration — not as a gallery of screenshots.",
  positioning:
    "I treated my portfolio as a product rather than a static collection of work. The experience was shaped through information architecture, content strategy, direct-in-code design, responsive implementation, continuous UX reviews, and feedback from experienced designers and former colleagues.",
  projectType: "Independent Project",
  layout: "essay",
  hideCoverMedia: true,
  beatLabels: {
    premise: "01 · CHALLENGE",
    lens: "02 · GOALS",
    thinking: "03 · PRINCIPLES",
    system: "04 · ITERATION",
    product: "05 · AI WORKFLOW",
    craft: "06 · FEEDBACK",
    outcome: "07 · DECISIONS & LESSONS",
    reflection: "08 · WHAT'S NEXT",
  },
  meta: {
    role: "Senior UX/UI Designer and Frontend Builder",
    year: "2025–2026",
    team: "Independent portfolio redesign",
    surface:
      "Strategy, IA, content, UX/UI direction, implementation, iteration",
    status: "Living project · Continuously evolving",
  },
  reading: "8 min read",
  ambient: "Process · critique · direct-in-code · iteration",
  blocks: [
    // ---------- 01 CHALLENGE ----------
    {
      kind: "prose",
      beat: "premise",
      eyebrow: "THE PROBLEM",
      heading: "Why build a portfolio from scratch?",
      body: [
        "The previous portfolio no longer represented the designer I had become. It could show finished screens, but it struggled to communicate stronger storytelling, clearer information architecture, enterprise positioning, systems thinking, and the ability to take work from idea into working interfaces.",
        "Hiring managers do not only ask what I made. They ask how I think, how I structure complexity, and whether I can collaborate across product, design, and engineering. The rebuild started from that gap — not from a desire for a more decorative site.",
      ],
    },
    {
      kind: "pull-quote",
      beat: "premise",
      text: "The problem was representation, not decoration. The site needed to show how I approach products — not only how polished the final frames look.",
    },

    // ---------- 02 GOALS ----------
    {
      kind: "prose",
      beat: "lens",
      eyebrow: "DIRECTION",
      heading: "What success looked like.",
      body: [
        "I framed the redesign as a product brief with a short set of goals. Everything that followed — structure, writing, navigation, and implementation — had to earn its place against this list.",
      ],
    },
    {
      kind: "checklist",
      beat: "lens",
      items: [
        "Build a portfolio that feels like a product, not a slideshow.",
        "Tell one continuous story from positioning through Selected Work to contact.",
        "Reduce visual noise so hierarchy and content carry the first impression.",
        "Connect UX and engineering in the same narrative — design decisions that survive code.",
        "Make navigation effortless for long case studies and short visits alike.",
        "Keep the site evolvable during an active job search without losing consistency.",
      ],
    },

    // ---------- 03 PRINCIPLES ----------
    {
      kind: "prose",
      beat: "thinking",
      eyebrow: "GUIDES",
      heading: "Design principles that stayed in the room.",
      body: [
        "These principles shaped what stayed, what was cut, and how each section was ordered. They are short on purpose — used as checks during critique rather than slogans on a slide.",
      ],
    },
    {
      kind: "principle-grid",
      beat: "thinking",
      items: [
        {
          title: "Systems before screens",
          body: "Structure, states, and reusable patterns come before individual compositions.",
        },
        {
          title: "Story over decoration",
          body: "Every section should advance the narrative. Atmosphere never replaces clarity.",
        },
        {
          title: "Readable before impressive",
          body: "Scanability for recruiters beats clever layout that slows comprehension.",
        },
        {
          title: "Everything earns its place",
          body: "If a block, image, or label does not help a decision, it does not ship.",
        },
        {
          title: "Interaction supports understanding",
          body: "Motion, themes, and galleries exist to orient — not to perform.",
        },
      ],
    },

    // ---------- 04 ITERATION (centerpiece) ----------
    {
      kind: "prose",
      beat: "system",
      eyebrow: "CENTERPIECE",
      heading: "How the work actually moved.",
      body: [
        "Most of the design happened in the browser, not in a finished Figma file handed off later. The sequence below is the real loop: content and structure first, then layout, then critique, then revision — repeated until the story held together.",
      ],
    },
    {
      kind: "timeline",
      beat: "system",
      steps: [
        {
          title: "Research",
          body: "Reviewed portfolios I respected, hiring-manager reading patterns, and where my previous site failed to communicate seniority.",
        },
        {
          title: "Content planning",
          body: "Defined what each project needed to prove and what could stay out of the first viewport.",
        },
        {
          title: "Information architecture",
          body: "Ordered homepage movements and Selected Work so flagship product stories lead without burying process and practice.",
        },
        {
          title: "Writing",
          body: "Rewrote positioning, case-study openings, and action labels until they said something specific.",
        },
        {
          title: "Layout exploration",
          body: "Tested hierarchy, density, and editorial grids directly in code against real content length.",
        },
        {
          title: "Navigation refinements",
          body: "Tightened chapter navigation, in-page anchors, and resource links so long studies stay oriented.",
        },
        {
          title: "Responsive adjustments",
          body: "Collapsed multi-column spreads, CTAs, and metadata so mobile kept the same story without overflow.",
        },
        {
          title: "Accessibility review",
          body: "Checked heading order, focus, contrast, link language, and reduced-motion behavior as part of ordinary QA.",
        },
        {
          title: "Peer portfolio review",
          body: "Shared builds with former colleagues and experienced UX designers; captured critique without formal usability tests.",
        },
        {
          title: "Iteration",
          body: "Applied feedback to order, spacing, themes, storytelling, and case-study structure — then reviewed again.",
        },
        {
          title: "Launch and continue",
          body: "Shipped a living site and kept deploying as projects, copy, and systems matured.",
        },
      ],
    },

    // ---------- 05 AI WORKFLOW ----------
    {
      kind: "prose",
      beat: "product",
      eyebrow: "TOOLS",
      heading: "AI accelerated execution. It did not replace thinking.",
      body: [
        "AI was part of the workflow the same way a sharp editor or a fast IDE is part of the workflow: useful for exploration and implementation speed, never the author of product decisions. I set the goals, rejected weak directions, reviewed every meaningful change, and owned the final design.",
      ],
    },
    {
      kind: "principle-grid",
      beat: "product",
      items: [
        {
          title: "ChatGPT",
          body: "Brainstorming, IA discussion, UX critique, copy refinement, case-study structure, and turning feedback into clearer implementation prompts.",
        },
        {
          title: "Claude",
          body: "Architecture questions, implementation planning, adversarial critique, and documentation when the structure needed another pass.",
        },
        {
          title: "Cursor",
          body: "React and CSS changes, component updates, debugging, responsive fixes, and applying approved revisions in the real codebase.",
        },
        {
          title: "Figma Make",
          body: "Used selectively for early visual exploration — never as the source of truth for the shipped experience.",
        },
      ],
    },
    {
      kind: "pull-quote",
      beat: "product",
      text: "AI accelerated exploration and implementation, but product thinking, critique, prioritization, and final decisions remained mine.",
    },

    // ---------- 06 FEEDBACK LOOP ----------
    {
      kind: "prose",
      beat: "craft",
      eyebrow: "CRITIQUE",
      heading: "The portfolio evolved through repeated review.",
      body: [
        "Throughout development the site changed because of self-review, peer feedback from former colleagues and experienced UX designers, and an engineering mindset that asks whether something is clear, buildable, and honest. Formal usability testing was not part of this phase — the loop was iterative critique against how hiring managers actually read portfolios.",
      ],
    },
    {
      kind: "cycle",
      beat: "craft",
      steps: [
        "Design",
        "Review",
        "Feedback",
        "Revision",
        "Prototype",
        "Repeat",
      ],
      note: "Self-review, peer critique, and real-world revisions — not a one-time handoff.",
    },

    // ---------- 07 KEY DECISIONS + LESSONS ----------
    {
      kind: "prose",
      beat: "outcome",
      eyebrow: "TRADEOFFS",
      heading: "Key decisions, stated plainly.",
      body: [
        "Several shifts define the difference between the previous site and this one. They are product decisions, not visual preferences.",
      ],
    },
    {
      kind: "comparison",
      beat: "outcome",
      pairs: [
        {
          before: "Traditional portfolio",
          after: "Editorial product experience",
        },
        {
          before: "Project gallery",
          after: "Continuous storytelling",
        },
        {
          before: "Static screenshot stacks",
          after: "Interactive prototypes and working links",
        },
        {
          before: "Visual-first presentation",
          after: "Reasoning-first narrative",
        },
      ],
    },
    {
      kind: "prose",
      beat: "outcome",
      eyebrow: "REFLECTION",
      heading: "What I learned while building it.",
      body: [
        "Writing is harder than UI — and more decisive for first impressions. Removing content improved clarity more often than adding it. Iteration beat waiting for a perfect Figma pass. AI accelerates the loop but does not replace judgment. Real feedback from people who hire and design changed the product more than solitary polish. Building my own portfolio was a reminder of what visitors experience when a site is dense, unclear, or self-indulgent.",
      ],
    },
    {
      kind: "checklist",
      beat: "outcome",
      items: [
        "Writing is harder than UI.",
        "Removing content improves clarity.",
        "Iteration beats perfection.",
        "AI accelerates but does not replace judgment.",
        "Real feedback changes products.",
        "Building the portfolio reminded me what users experience.",
      ],
    },
    {
      kind: "cta",
      beat: "outcome",
      label: "RETURN TO THE LIVE PORTFOLIO",
      href: "/",
    },

    // ---------- 08 WHAT'S NEXT ----------
    {
      kind: "prose",
      beat: "reflection",
      eyebrow: "LIVING PRODUCT",
      heading: "What I would improve next.",
      body: [
        "This remains a living project. Next work includes expanding case studies, continued responsive refinement, introducing a dedicated portfolio design system for the patterns that emerged in code, more deliberate motion, and additional enterprise work as it is ready to tell honestly.",
        "The commitment is the same as the original brief: treat the portfolio as a product that can keep evolving without losing its story.",
      ],
    },
  ],
  next: {
    slug: "voice-moderation",
    title: "Voice Moderation Platform",
  },
};
