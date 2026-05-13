import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="flex min-h-svh items-center px-[var(--gutter)] pt-32"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <div>
        <p className="t-mono text-ink-quiet tabular">404 · NOT FOUND</p>
        <h1 className="mt-8 t-display-xl font-display text-ink">
          This page hasn&rsquo;t
          <br />
          <span className="italic text-ink-mute">been written yet.</span>
        </h1>
        <p className="mt-10 max-w-prose t-body-l text-ink-mute">
          Either the link is old, or it&rsquo;s a corner of the portfolio I
          haven&rsquo;t built yet. Try one of these instead.
        </p>
        <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
          <Link href="/" className="t-mono link-underline text-ink">
            INDEX&nbsp;↑
          </Link>
          <Link href="/work/voice-moderation" className="t-mono link-underline text-ink">
            FEATURED&nbsp;WORK&nbsp;→
          </Link>
          <Link href="/contact" className="t-mono link-underline text-ink">
            CONTACT&nbsp;→
          </Link>
        </div>
      </div>
    </section>
  );
}
