import type { CaseStudy } from "./types";

export const designingMyDesignPortfolio: CaseStudy = {
  slug: "designing-my-design-portfolio",
  index: "07",
  title: "Designing My Design Portfolio",
  thesis:
    "My previous portfolio no longer represented the kind of designer I had become. I rebuilt the experience directly in code, using product thinking, UX critique, content strategy, and continuous iteration to create a clearer and more intentional representation of my work.",
  positioning:
    "I treated my portfolio as a product rather than a static collection of work. The experience was shaped through information architecture, content strategy, direct-in-code design, responsive implementation, continuous UX reviews, and feedback from experienced designers and former colleagues.",
  projectType: "Independent Project",
  meta: {
    role: "Senior UX/UI Designer and Frontend Builder",
    year: "2025–2026",
    team: "Independent portfolio redesign",
    surface:
      "Strategy, IA, content, UX/UI direction, implementation, iteration",
    status: "Living project · Continuously evolving",
  },
  reading: "7 min read",
  ambient: "Process · critique · direct-in-code · iteration",
  coverImage: "/images/portfolio-process/homepage-desktop.png",
  coverImageAlt:
    "Desktop screenshot of the Elvis Fernandes portfolio homepage hero, including navigation and primary headline",
  blocks: [
    // ---------- 01 CONTEXT / PREMISE ----------
    {
      kind: "prose",
      beat: "premise",
      eyebrow: "CONTEXT",
      heading: "Why rebuild the portfolio?",
      body: [
        "The previous portfolio no longer reflected the designer I am now — someone who works across product thinking, UX/UI, design systems, frontend implementation, and an AI-assisted workflow that turns ideas into working experiences.",
        "The goal was not simply to make the site more attractive. It was to improve how recruiters and hiring managers understand the work, the process behind it, the range of capabilities, and the professional direction I am pursuing.",
      ],
    },
    {
      kind: "image",
      beat: "premise",
      src: "/images/portfolio-process/homepage-desktop.png",
      aspect: "16/9",
      alt: "Current portfolio homepage hero on desktop",
      caption:
        "Homepage overview — brand, positioning, and entry points before Selected Work.",
    },

    // ---------- 02 CHALLENGE / LENS ----------
    {
      kind: "prose",
      beat: "lens",
      eyebrow: "THE CHALLENGE",
      heading: "One site, several kinds of work.",
      body: [
        "The portfolio needed to hold flagship product work, systems thinking, practice writing, and detailed case studies without feeling fragmented. That meant careful ordering, clear labels, and a hierarchy that lets visitors scan before they commit to a long read.",
        "Other constraints were practical: long case studies had to stay scannable; the first impression had to feel confident without crowding the viewport; light and dark themes needed to stay coherent; and the site had to keep evolving during an active job search while remaining consistent — even while designing directly in the browser.",
      ],
    },

    // ---------- 03 DEFINING THE EXPERIENCE / THINKING ----------
    {
      kind: "prose",
      beat: "thinking",
      eyebrow: "DEFINING THE EXPERIENCE",
      heading: "Information architecture before polish.",
      body: [
        "Homepage hierarchy leads with positioning, then Selected Work, then supporting context — practice, identity, capabilities, and a clear invitation to connect. Selected Work puts ASCEND and Atlas first, then professional and concept projects in a deliberate order so the strongest product stories lead.",
        "Case studies use chapter navigation so long narratives stay explorable. Action labels stay plain and specific — explore, enter, view live prototype, view Storybook, view source, view product design — so visitors know what they are opening. Live prototypes, Storybook, source, and design files sit beside the narrative when they exist.",
        "Responsive behavior, image galleries with fullscreen viewing, light and dark presentation, and the About and contact experience were treated as part of the product, not afterthoughts. The work is UX and information architecture as much as visual styling.",
      ],
    },
    {
      kind: "image",
      beat: "thinking",
      src: "/images/portfolio-process/selected-work.png",
      aspect: "16/9",
      alt: "Selected Work project entry showing title, summary, metadata, and Enter action",
      caption:
        "Selected Work storytelling — index, type, summary, metadata, and a clear enter action.",
    },
    {
      kind: "image",
      beat: "thinking",
      src: "/images/portfolio-process/ascend-chapter-nav.png",
      aspect: "16/9",
      alt: "ASCEND case study with chapter navigation sidebar listing Overview through System",
      caption:
        "Chapter navigation on ASCEND — long case studies stay scannable and oriented.",
    },
    {
      kind: "image-grid",
      beat: "thinking",
      caption:
        "Light and dark presentation of the same homepage hero — theme support was part of the experience definition.",
      images: [
        {
          src: "/images/portfolio-process/homepage-desktop.png",
          alt: "Portfolio homepage in light theme",
          aspect: "16/9",
        },
        {
          src: "/images/portfolio-process/homepage-dark.png",
          alt: "Portfolio homepage in dark theme",
          aspect: "16/9",
        },
      ],
    },
    {
      kind: "image",
      beat: "thinking",
      src: "/images/portfolio-process/homepage-mobile.png",
      aspect: "3/4",
      alt: "Portfolio homepage hero on a mobile viewport",
      caption: "Mobile homepage — single-column hierarchy with accessible actions.",
    },

    // ---------- 04 DESIGNING IN CODE / SYSTEM ----------
    {
      kind: "prose",
      beat: "system",
      eyebrow: "DIRECT-IN-CODE DESIGN",
      heading: "Using the browser as the design environment.",
      body: [
        "Rather than completing a separate Figma design first, I explored and refined the portfolio directly in its final medium. Working in code allowed me to evaluate typography, spacing, responsiveness, interaction, and content together instead of treating implementation as a later handoff.",
        "That speed helped iteration, but it also created a need for careful consistency reviews — layout refinements, link and CTA alignment, responsive adjustments, light and dark corrections, gallery behavior, chapter spacing, and typography hierarchy were checked repeatedly in the running product.",
      ],
    },
    {
      kind: "pull-quote",
      beat: "system",
      text: "The browser was the design surface. Consistency came from critique and revision, not from a finished file handed off to engineering.",
    },

    // ---------- 05 AI WORKFLOW / PRODUCT ----------
    {
      kind: "prose",
      beat: "product",
      eyebrow: "AI-ASSISTED WORKFLOW",
      heading: "Human direction, accelerated execution.",
      body: [
        "ChatGPT supported brainstorming, information-architecture discussions, UX critique, content and copy refinement, case-study structure, accessibility considerations, screenshot review, and translating design feedback into clearer implementation prompts.",
        "Cursor supported React and frontend implementation, CSS and responsive-layout changes, component updates, debugging, interaction refinements, and applying approved revisions directly in the codebase.",
        "My role remained the center of the work: I defined goals and direction, selected and rejected ideas, reviewed the work repeatedly, identified visual and UX issues, made the final design decisions, directed every revision, and ensured the result reflected my experience and standards.",
      ],
    },
    {
      kind: "pull-quote",
      beat: "product",
      text: "AI accelerated exploration and implementation, but product thinking, critique, prioritization, and final decisions remained mine.",
    },
    {
      kind: "artifact",
      beat: "product",
      label: "WORKFLOW",
      meta: "Living loop",
      lines: [
        "Idea",
        "→ Discussion and critique",
        "→ Direct-in-code implementation",
        "→ Review",
        "→ Peer feedback",
        "→ Revision",
        "→ Live update",
      ],
    },

    // ---------- 06 FEEDBACK / CRAFT ----------
    {
      kind: "prose",
      beat: "craft",
      eyebrow: "FEEDBACK AND ITERATION",
      heading: "Critique as a continuous practice.",
      body: [
        "The portfolio was reviewed and refined across many iterations — self-review, screenshot-by-screenshot visual QA, and peer feedback from former colleagues and experienced UX designers. Formal usability testing was not part of this phase; the loop was iterative critique with people who know how hiring managers read portfolios.",
        "That feedback shaped project order and storytelling, spacing and typography, navigation and links, theme behavior, and case-study structure. Revisions were judged against how the work might be interpreted by recruiters and hiring managers, not only against personal taste.",
      ],
    },

    // ---------- 07 WHAT WAS BUILT (still craft / lead into outcome) ----------
    {
      kind: "prose",
      beat: "craft",
      eyebrow: "WHAT WAS BUILT",
      heading: "A working product, not a mock.",
      body: [
        "The current site is a responsive React portfolio with a homepage and Selected Work structure, multiple detailed case studies, chapter-based navigation where it earns its keep, light and dark themes, fullscreen project-image galleries, responsive project actions and external-resource links, an About and contact experience, live project and prototype integrations, and continuous deployment with iterative updates.",
      ],
    },
    {
      kind: "artifact",
      beat: "craft",
      label: "DELIVERABLES",
      meta: "Shipped and maintained",
      lines: [
        "• Responsive React portfolio",
        "• Homepage and Selected Work structure",
        "• Multiple detailed case studies",
        "• Chapter-based case-study navigation",
        "• Light and dark themes",
        "• Fullscreen project-image galleries",
        "• Responsive project actions and external-resource links",
        "• About and contact experience",
        "• Live project and prototype integrations",
        "• Continuous deployment and iterative updates",
      ],
    },

    // ---------- 08 OUTCOME ----------
    {
      kind: "prose",
      beat: "outcome",
      eyebrow: "OUTCOME",
      heading: "A portfolio that reflects how I work now.",
      body: [
        "The outcome is a living portfolio that communicates not only finished design work, but the process of turning ideas into structured, implemented, and continuously refined experiences.",
        "Qualitatively, the redesign clarified professional positioning, strengthened project storytelling, tightened the connection between design and implementation, and created a platform that can evolve as new work ships — with evidence of an iterative, AI-assisted design and development workflow.",
      ],
    },
    {
      kind: "cta",
      beat: "outcome",
      label: "VIEW THE LIVE PORTFOLIO",
      href: "/",
    },

    // ---------- 09 WHAT'S NEXT / REFLECTION ----------
    {
      kind: "prose",
      beat: "reflection",
      eyebrow: "WHAT'S NEXT",
      heading: "Building the system behind the experience.",
      body: [
        "The portfolio was intentionally designed and refined directly in code. A formal portfolio design system has not been created yet. A future phase will formalize the patterns that emerged — typography, spacing, color roles, reusable components, interaction states, and documentation.",
        "Future improvements may include shared tokens and component documentation, deeper accessibility testing, performance optimization, more deliberate motion patterns, additional project case studies, and continued mobile refinement. Those remain planned work, not completed deliverables.",
      ],
    },
  ],
  next: {
    slug: "voice-moderation",
    title: "Voice Moderation Platform",
  },
};
