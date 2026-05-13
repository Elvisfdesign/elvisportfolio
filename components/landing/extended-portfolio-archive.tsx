const EXTENDED_PORTFOLIO_ARCHIVE_URL =
  "https://elvisfportfolio.netlify.app/#";

/**
 * Quiet closing note beneath Selected Work — points to the broader archived index
 * without reading as “legacy portfolio.”
 */
export function ExtendedPortfolioArchive() {
  return (
    <aside
      className="hairline-t grid grid-cols-1 gap-8 pt-16 md:grid-cols-12 md:gap-12 md:pt-20 lg:pt-24"
      aria-label="Extended portfolio archive"
    >
      <div className="md:col-span-6">
        <p className="t-mono text-ink-quiet tabular">ARCHIVE</p>
        <h3 className="mt-5 t-heading font-display text-ink">
          Extended Portfolio Archive
        </h3>
        <p className="mt-6 max-w-prose t-body-l text-ink-mute">
          This portfolio is a curated selection of recent product design and
          AI-focused case studies. For additional UX/UI work, explorations,
          visual design, and case studies updated in 2026—including stretches
          where React and front-end implementation were part of the same
          design-to-build arc, not just static deliverables—view the extended
          portfolio archive.
        </p>
        <p className="mt-10">
          <a
            href={EXTENDED_PORTFOLIO_ARCHIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore archive (opens in a new tab)"
            className="t-mono tabular inline-flex touch-manipulation items-baseline whitespace-nowrap link-underline decoration-from-font underline-offset-[0.15em] text-ink transition-colors duration-300 hover:text-signal"
          >
            Explore Archive&nbsp;↗
          </a>
        </p>
      </div>
    </aside>
  );
}
