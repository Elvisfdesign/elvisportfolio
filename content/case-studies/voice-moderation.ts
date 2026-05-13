import type { CaseStudy } from "./types";

export const voiceModeration: CaseStudy = {
  slug: "voice-moderation",
  index: "01",
  title: "Voice Moderation Platform",
  thesis:
    "Designing voice moderation experiences across ToxMod, Voice Vault, internal tools, and launch support initiatives at Modulate.",
  positioning:
    "ToxMod, Voice Vault, executive analytics, design system work, internal tools, and Webflow launch support — Modulate.",
  meta: {
    role: "Senior UX/UI Designer",
    year: "Sep 2022 — Mar 2026",
    team: "Modulate · Product · Engineering · QA · Stakeholders",
    surface: "Web · Enterprise SaaS · Voice moderation · Internal tools",
    status: "Shipped · Production work",
  },
  reading: "10 min read",
  ambient: "ToxMod · Voice Vault · enterprise moderation",
  blocks: [
    // ---------- 01 PREMISE — Overview ----------
    {
      kind: "prose",
      beat: "premise",
      eyebrow: "CONTEXT",
      heading: "Moderation tooling for voice, at enterprise scale.",
      body: [
        "Modulate builds voice moderation technology that online platforms and gaming communities use to detect and respond to harmful behavior in spoken conversations.",
        "As Senior UX/UI Designer, my job was to make dense moderation workflows easier to navigate, tighten UI consistency as products evolved, support redesign initiatives, and work alongside engineering so interfaces shipped clearly and sustainably — from wireframes through production polish.",
        "Much of my time sat at the overlap of research, UX/UI design, hands-on prototyping, implementation support, and cross-functional alignment with Product, QA, stakeholders, and (for marketing-facing work) the wider go-to-market context.",
      ],
    },
    {
      kind: "metric-row",
      beat: "premise",
      items: [
        { value: "Primary", label: "ToxMod · Voice Vault · Executive Dashboard" },
        { value: "Supporting", label: "DEX · Labeling · Office · Audio API · internal tools" },
        { value: "Also", label: "Marketing site — Webflow build & launch support" },
      ],
    },

    // ---------- 02 LENS — Products ----------
    {
      kind: "prose",
      beat: "lens",
      eyebrow: "SCOPE",
      heading: "Products and surfaces I worked on.",
      body: [
        "Most of my effort went into three outward-facing pillars: ToxMod (real-time moderation), Voice Vault (recorded-voice review and analysis flows), and the Executive Dashboard (analytics for leadership). Those are the spine of the story below.",
        "I also contributed to DEX, the Labeling Tool, the Office Dashboard, Audio API–related interfaces, and other internal tools that keep models, operations, and customer workflows running. They matter for completeness, but they sit in the background — supporting systems rather than the main narrative arc.",
        "Across all of it, the throughline is the same: calm, legible UI for teams working with complex, AI-assisted voice data under real operational pressure.",
      ],
    },

    // ---------- 03 THINKING — ToxMod ----------
    {
      kind: "prose",
      beat: "thinking",
      eyebrow: "TOXMOD",
      heading: "Redesigns, reskin, and shipping with the team.",
      body: [
        "On ToxMod I contributed to the redesign of multiple moderation experiences — improving layout clarity, hierarchy, and patterns so moderators and supervisors could move through their work with less friction.",
        "I helped lead the UI reskin across key pages, aligning components and visual language so the product felt like one system rather than a patchwork of one-off screens.",
        "Day to day that meant wireframes and high-fidelity prototypes, pairing with developers during integration, reviewing builds with QA, and supporting additional visual themes where customer-facing configuration required it.",
      ],
    },
    {
      kind: "image",
      beat: "thinking",
      stub: "dashboard",
      aspect: "16/9",
      alt: "Moderation dashboard UI — queue and review patterns",
      caption: "Moderation surfaces — density, hierarchy, and consistent patterns across flows.",
    },

    // ---------- 04 SYSTEM — Voice Vault & Executive Dashboard ----------
    {
      kind: "prose",
      beat: "system",
      eyebrow: "VOICE VAULT",
      heading: "Flows for reviewing and analyzing recorded voice.",
      body: [
        "On Voice Vault I worked through interface flows and page layouts, built UI prototypes for review scenarios, contributed front-end component support where engineering needed design-owned detail, and stayed close to developers so decisions in Figma survived implementation.",
        "The work centered on helping teams inspect and reason about recorded voice interactions — structuring screens so complex audio context stayed legible without overwhelming operators.",
      ],
    },
    {
      kind: "prose",
      beat: "system",
      eyebrow: "EXECUTIVE DASHBOARD",
      heading: "Analytics for leadership — from blank page to shipped UI.",
      body: [
        "The Executive Dashboard was a greenfield analytics experience. I partnered on discovery and open questions, translated those into low-fidelity concepts, iterated into high-fidelity design through stakeholder and engineering review, then supported implementation so the charts, tables, and layouts matched production constraints.",
      ],
    },
    {
      kind: "image-grid",
      beat: "system",
      images: [
        {
          stub: "flow",
          aspect: "4/3",
          alt: "Voice review and analysis flow patterns",
        },
        {
          stub: "dashboard",
          aspect: "4/3",
          alt: "Executive analytics layouts",
        },
      ],
      caption: "Voice Vault flow work · Executive analytics layouts.",
    },

    // ---------- 05 PRODUCT — Design system & buildability ----------
    {
      kind: "prose",
      beat: "product",
      eyebrow: "SYSTEM & HANDOFF",
      heading: "Reusable UI, dense data, and design–development rhythm.",
      body: [
        "I contributed to reusable components and cross-product UI consistency, especially wherever tables, filters, and data-dense panels needed to behave the same from one product to the next.",
        "My front-end background meant I could prototype realistically — spacing, breakpoints, states, and edge cases that engineers could implement without guessing. That translated into tighter design-to-development collaboration: clearer specs, fewer surprises in QA, and faster alignment when UX needed to adapt to backend or model constraints.",
      ],
    },
    {
      kind: "image",
      beat: "product",
      stub: "system",
      aspect: "16/9",
      alt: "Component patterns and dense data layouts",
      caption: "Shared patterns across moderation and analytics surfaces.",
    },

    // ---------- 06 CRAFT — Webflow marketing & process ----------
    {
      kind: "prose",
      beat: "craft",
      eyebrow: "MARKETING",
      headingFragments: [
        { type: "link", text: "Modulate.com", href: "https://www.modulate.ai/" },
        { type: "text", text: " in Webflow — design, build, and launch." },
      ],
      body: [
        "Outside core product UX, I led the design and build of Modulate’s marketing website in Webflow — picking up Webflow quickly without prior hands-on experience, then maintaining sections as messaging and launches evolved.",
        "That included supporting a major product launch visually and structurally — keeping the narrative legible while pages had to absorb new proof points, demos, and calls to action alongside the broader product roadmap.",
      ],
    },
    {
      kind: "artifact",
      beat: "craft",
      label: "PROCESS · DESIGN TO RELEASE",
      meta: "How work moved depending on initiative",
      lines: [
        "Research → Design → Review → Implementation → QA / Release",
        "",
        "Not every initiative hit every gate with the same weight — but that sequence describes how I partnered across Product, Engineering, QA, stakeholders, and Marketing: clarify questions, visualize options, converge with reviews, support the build, and stay involved through release-ready polish.",
      ],
    },

    // ---------- 07 OUTCOME — Honest impact ----------
    {
      kind: "prose",
      beat: "outcome",
      eyebrow: "IMPACT",
      heading: "What this work amounted to.",
      body: [
        "I stayed away from performance claims I couldn’t independently verify — in enterprise tooling, attribution is muddy and narratives often sit under NDA. What I can speak to plainly is breadth, craft, and partnership.",
        "I designed across customer-facing and internal moderation surfaces.",
        "I improved UI consistency across workflows as products matured.",
        "I supported production-ready updates shipped to real operational teams.",
        "I strengthened design-to-development collaboration through prototyping, implementation pairing, and QA-aware reviews.",
        "I helped support product and marketing launches where clarity of the experience mattered.",
        "Overall, this stretch built experience working inside complex, AI-driven moderation systems — where the UX problem is seldom a single screen and almost always an end-to-end flow.",
      ],
    },
    {
      kind: "metric-row",
      beat: "outcome",
      items: [
        { value: "Enterprise", label: "Web SaaS moderation & analytics surfaces" },
        { value: "Cross-team", label: "Product · Eng · QA · stakeholders" },
        {
          value: "End-to-end",
          label: "Research · UX/UI · systems · FE support · launches",
        },
      ],
    },

    // ---------- 08 REFLECTION ----------
    {
      kind: "prose",
      beat: "reflection",
      eyebrow: "REFLECTION",
      heading: "A designer shaped by cross-functional practice.",
      body: [
        "This work helped me grow as a designer who can move between research, UX/UI design, front-end implementation, and cross-functional execution while keeping complex enterprise experiences clear, scalable, and practical for real teams.",
      ],
    },
  ],
  next: {
    slug: "ai-for-product-designers",
    title: "AI for Product Designers",
  },
};
