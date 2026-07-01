const EXTENDED_PORTFOLIO_ARCHIVE_URL =
  "https://elvisfportfolio.netlify.app/#";

const ARCHIVE_TAGS = [
  "UX/UI",
  "AI Experiments",
  "Visual Design",
  "React / Front-End",
  "2026 Updates",
] as const;

/**
 * Secondary portfolio CTA beneath Selected Work — points to the broader archived index
 * with enough visual weight to scan quickly without competing with case studies.
 */
export function ExtendedPortfolioArchive() {
  return (
    <aside
      className="hairline-t w-full pt-20 md:pt-28 lg:pt-32"
      aria-label="Extended portfolio archive"
    >
      <div
        className="extended-archive-card relative w-full overflow-hidden rounded-sm border px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16 lg:py-16"
        style={{
          borderColor: "var(--hairline)",
          backgroundColor: "var(--canvas-raised)",
          boxShadow: "var(--shadow-press)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 100% 0%, var(--signal-faint), transparent 70%)",
          }}
        />

        <div className="relative">
          <header className="hairline-b mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pb-4 md:mb-10">
            <p className="t-mono text-ink-quiet tabular">MORE WORK</p>
            <p className="t-mono text-ink-faint tabular">ARCHIVE</p>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-5">
              <h3 className="max-w-[28ch] t-display-m font-display text-ink md:max-w-none lg:max-w-[22ch]">
                Explore more UX/UI, visual, and front-end work
              </h3>

              <p className="mt-5 t-body-l text-ink lg:mt-6">
                A deeper collection of selected projects, experiments, and
                design-to-build work.
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="max-w-prose t-body text-ink-mute lg:max-w-none">
                This archive includes additional product design, UX/UI, visual
                design, AI-focused explorations, and front-end implementation
                work. It highlights projects beyond the main case studies,
                including 2026 updates and design-to-build work where React and
                implementation were part of the process.
              </p>

              <ul
                className="mt-8 flex flex-wrap gap-2 md:mt-10"
                aria-label="What's inside the archive"
              >
                {ARCHIVE_TAGS.map((tag) => (
                  <li key={tag}>
                    <span
                      className="inline-flex min-h-9 items-center rounded-full border px-3.5 py-1.5 t-mono text-[0.6875rem] text-ink-mute tabular sm:text-[0.75rem]"
                      style={{ borderColor: "var(--hairline)" }}
                    >
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 md:mt-12">
                <a
                  href={EXTENDED_PORTFOLIO_ARCHIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View extended archive (opens in a new tab)"
                  className="archive-cta-button inline-flex min-h-11 w-full touch-manipulation items-center justify-center rounded-full px-6 py-3 t-mono tabular sm:w-auto sm:px-7"
                >
                  VIEW&nbsp;EXTENDED&nbsp;ARCHIVE&nbsp;↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
