import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="hairline-t mt-32 px-[var(--gutter)] py-12 text-ink-mute"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="t-display-m font-display text-ink">
            Let&rsquo;s make something
            <span className="italic"> inevitable.</span>
          </p>
          <p className="mt-4 t-body text-ink-mute max-w-prose">
            Open to product design, design systems, design engineering, and AI-product roles.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <Link
            href="/contact"
            className="t-mono link-underline text-ink"
            aria-label="Say hello"
          >
            SAY&nbsp;HELLO&nbsp;→
          </Link>
          <a
            href="mailto:elvisfdesign@gmail.com"
            className="t-mono link-underline text-ink-mute"
          >
            elvisfdesign@gmail.com
          </a>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="t-mono text-ink-quiet tabular">
          ©&nbsp;{year}&nbsp;ELVIS&nbsp;FERNANDES&nbsp;·&nbsp;BUILT&nbsp;WITH&nbsp;NEXT&nbsp;+&nbsp;MOTION
        </p>
        <p className="t-mono text-ink-quiet tabular">
          LAST&nbsp;UPDATED&nbsp;{new Date().toISOString().slice(0, 10)}
        </p>
      </div>
    </footer>
  );
}
