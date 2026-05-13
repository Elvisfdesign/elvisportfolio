import type { CaseStudy } from "./types";

export const signal: CaseStudy = {
  slug: "signal",
  index: "04",
  title: "Signal — AI Trust Layer",
  thesis:
    "Cross-feed provenance as infrastructure: real-time detection rendered as glanceable trust signals, contextual transparency when you pull for it, and one adaptive grammar from Reels to long-form.",
  positioning:
    "A concept for embedding AI disclosure in social feeds — fast to read, voluntary to deepen, consistent across platforms.",
  prototypeUrl:
    "https://www.figma.com/make/EktkMIz5YD9u68Fe7oSi5h/Interactive-AI-Detection-Prototype?fullscreen=1&t=9Op8c26cAUsyxh5Y-1",
  prototypeLabel: "View Prototype",
  journalUrl: "https://elvisfportfolio.netlify.app/signal-case-study.html",
  journalLabel: "Design Journal",
  heroLinksNote:
    "Interactive flows, exploratory systems, and archived process studies.",
  meta: {
    role: "Product Designer (concept)",
    year: "2026",
    team: "Independent · vision study",
    surface: "Cross-platform · Trust Signals · Adaptive",
    status: "Concept",
  },
  reading: "6 min read",
  ambient: "Real-time cues · contextual disclosure · feed-native trust",
  blocks: [
    // ---------- 01 PREMISE ----------
    {
      kind: "prose",
      beat: "premise",
      eyebrow: "WHAT IT IS",
      heading: "Provenance, as a UI primitive.",
      body: [
        "This project came from a steady concern I had while using social feeds: how easily AI-generated misinformation can blend into everything else, and how little shared language we have for knowing what to trust. I wanted to sketch a trust layer that could help someone quickly distinguish what reads as credible, what may be synthetic or assisted, and what simply needs more context — without disrupting the cadence of browsing.",
        "Signal sketches how platforms could surface AI-generated and AI-assisted content inside the feed itself: a single, interoperable cue that travels with media instead of burying attribution in menus or moderation screens.",
        "The framing is pragmatic. When misinformation and synthetic media move at feed speed, people need cues that compound as they skim — transparency without interrogation, voluntary depth when doubt appears. Signal treats provenance less like philosophy and more like a legible overlay on today's browsing behavior.",
      ],
    },
    {
      kind: "image",
      beat: "premise",
      stub: "flow",
      aspect: "16/9",
      alt: "Low-fidelity feed tiles with Signal mark placements sketched beside scroll paths",
      caption:
        "Early tile studies — where the mark lives before chrome, overlays, or headlines compete for attention.",
    },

    // ---------- 02 LENS ----------
    {
      kind: "prose",
      beat: "lens",
      eyebrow: "THE REAL QUESTION",
      heading: "What does trust look like at a glance?",
      body: [
        "Today's trust tooling is fragmented: community notes, verification marks, fact-check labels, breaker screens — each a different UX contract, vocabulary, and volume. Useful, but rarely composable across platforms and rarely calibrated for continuous scrolling.",
        "Signal proposes the opposite stance for that layer of the UI: quiet, ambient, peripheral signal — a mark that earns meaning through consistency, reveals depth only on intent, and never shouts louder than the content it annotates.",
      ],
    },

    // ---------- 03 THINKING ----------
    {
      kind: "prose",
      beat: "thinking",
      eyebrow: "PROCESS",
      heading: "Designed across three feeds, then abstracted.",
      body: [
        "I built three feed-native mocks first — long-form text, dense image timelines, TikTok/Reels-length vertical stacks. Each pass forced placement, motion, and density rules that abstraction alone would miss. Only when all three survived real scroll speeds did the shared primitive stabilize.",
      ],
    },
    {
      kind: "image",
      beat: "thinking",
      stub: "system",
      aspect: "16/9",
      alt: "FigJam-style board linking taxonomy axes, feed sketches, and edge-case buckets",
      caption:
        "Product definition spread — taxonomy, feed constraints, and detection scenarios traced in one working surface.",
    },
    {
      kind: "prose",
      beat: "thinking",
      body: [
        "From there Claude became a blunt instrument for adversarial QA: synthesized voice over real footage, screenshot chains, illustrative AI sold as documentary. Each failure mode became either a discrete state or a deliberate gap in disclosure — the system exposes what detection can justify, nothing more.",
      ],
    },
    {
      kind: "artifact",
      beat: "thinking",
      label: "PROMPT · ADVERSARIAL EDGE CASES",
      meta: "Claude · stress test",
      lines: [
        "You are an adversarial reviewer of a proposed trust UI called Signal.",
        "It claims to mark content with: ORIGIN (human/AI/mixed), MODEL (named),",
        "REVIEW (none/automated/human), and HISTORY (1st/repost/derivative).",
        "",
        "Give me 10 content scenarios where this taxonomy collapses or misleads.",
        "Be specific. Include at least 2 cases where the *absence* of a label is",
        "more misleading than the wrong one.",
      ],
    },
    {
      kind: "prose",
      beat: "thinking",
      body: [
        "Two answers rebuilt the UX: model absence as a readable state instead of emptiness and keep expansion user-initiated so detection never preempts someone's reading tempo. What's on the timeline stays thin; disclosure depth only opens after an explicit gesture.",
      ],
    },

    // ---------- 04 SYSTEM ----------
    {
      kind: "prose",
      beat: "system",
      eyebrow: "STRUCTURE",
      heading: "Four axes, one mark.",
      body: [
        "Content maps to Origin, Model lineage, Review posture, and History (original versus repost versus derivative tooling). Discrete states collapse into one glyph anchored like a credibility affordance — adaptive density hides secondary facets until hover, focus, or tap.",
        "Mobile keeps the cue tight and tap-expandable; desktop allows hover choreography without autoplay banners. Density scales down on fast-vertical video, relaxes slightly on Instagram-style tiles, and lengthens subtly on long-form surfaces where thumbnails sit longer — same grammar, tuned to dwell time and gesture vocabulary.",
      ],
    },
    {
      kind: "image",
      beat: "system",
      stub: "system",
      aspect: "16/9",
      alt: "Anatomy diagram of Signal mark encoded with four orthogonal axes",
      caption:
        "System anatomy — how four orthogonal claims compress into one legible footprint.",
    },

    // ---------- 05 PRODUCT ----------
    {
      kind: "prose",
      beat: "product",
      eyebrow: "THE FEEDS",
      heading: "Three platforms, one grammar.",
      body: [
        "On TikTok-style stacks the mark nests near captions and survives rapid skip behavior — cue visible on the first beat, expandable only if someone pauses. Instagram-style grids pull the cue closer to thumbnails where intent forms before fullscreen. Long-form thumbnails (YouTube, essays, Substacks-in-feed) widen the substrate so disclosure can whisper alongside titles without hijacking skim reading.",
      ],
    },
    {
      kind: "image",
      beat: "product",
      stub: "dashboard",
      aspect: "21/9",
      alt: "Editorial collage comparing vertical video, dense grid tiles, and long-form thumbnails marked with Signal placements",
      caption:
        "Platform adaptation collage — placements tuned to pacing: vertical skim, dense grid thumbnails, lingering long-form previews.",
    },
    {
      kind: "prose",
      beat: "product",
      body: [
        "Contextual disclosure depth follows interaction, not autoplay overlays: quick tap or hover peels into provenance lineage, reviewer notes when they exist, and human-readable explanations of classifier confidence ranges. Interaction-triggered transparency keeps feed-native pacing intact while signaling that richer truth is reachable.",
      ],
    },
    {
      kind: "image-grid",
      beat: "product",
      images: [
        {
          stub: "graph",
          aspect: "3/4",
          alt: "Short-form vertical reel interface with condensed Signal cue near caption chrome",
        },
        {
          stub: "screen",
          aspect: "3/4",
          alt: "Image-first grid timeline with Signal mark anchored to thumbnails",
        },
        {
          stub: "flow",
          aspect: "3/4",
          alt: "Long-form video or article thumbnail with expanded disclosure rail",
        },
      ],
      caption:
        "Three native readings — skim, browse, linger — stitched by the same expandable affordance.",
    },

    // ---------- 06 CRAFT ----------
    {
      kind: "prose",
      beat: "craft",
      eyebrow: "CLOSE-UP",
      heading: "The expand interaction.",
      body: [
        "The expand gesture is annotation, not modal chrome: a recessed panel mono-set like a marginal note naming each claim plus how it was derived. Hover on desktop lifts it gently; tap on phones pins it beside the thumbnail without jumping the viewport.",
        "Motion stays quiet enough to disappear when ignored. Nothing animates toward the user unsolicited — initiation always reads as deliberate, transparency as something you summon.",
      ],
    },

    // ---------- 07 OUTCOME ----------
    {
      kind: "prose",
      beat: "outcome",
      eyebrow: "RESULT",
      heading: "What the concept argues for.",
      body: [
        "Signal is a concept, not a shipped product. The artifact pair is deliberate: this page keeps the curated narrative tight while an interactive prototype and a design archive carry flow-level proof and iterative residue.",
        "The output is prototyping trust infrastructure ahead of consensus standards — proposing interaction patterns platforms could converge on before regulators or SDKs prescribe them. Designing that layer explicitly is how product craft steers eventual platform behavior.",
      ],
    },

    // ---------- 08 REFLECTION ----------
    {
      kind: "prose",
      beat: "reflection",
      eyebrow: "WHAT I LEARNED",
      heading: "Small marks carry the future.",
      body: [
        "The invisible work is interoperability: glyphs that behave predictably regardless of TikTok choreography, IG density, or YouTube pacing. Investing there reframed AI interfaces more broadly — I now sketch detection and disclosure as choreography problems, not static badge systems.",
        "Trust, in practice here, is interaction design inside hostile attention budgets. Keeping that small surface honest changed how I approach model-forward UI: prototype the infrastructure mark first, negotiate visual delight second.",
      ],
    },
  ],
  next: { slug: "voice-moderation", title: "Voice Moderation Platform" },
};
