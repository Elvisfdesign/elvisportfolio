/**
 * Designed visual placeholder that stands in for real product imagery.
 * Each `kind` renders a distinct, intentional abstract — not a grey box.
 *
 * Swap to <Image> or <video> seamlessly when real footage is ready.
 */

type StubKind = "dashboard" | "system" | "flow" | "graph" | "prompt" | "screen";

export function VisualStub({
  kind = "screen",
  aspect = "16/9",
  alt,
  caption,
  className,
  index = "—",
}: {
  kind?: StubKind;
  aspect?: "16/9" | "21/9" | "4/3" | "1/1" | "3/4";
  alt: string;
  caption?: string;
  className?: string;
  index?: string;
}) {
  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={alt}
        className="relative overflow-hidden rounded-sm border bg-canvas-raised"
        style={{
          borderColor: "var(--hairline)",
          aspectRatio: aspect.replace("/", " / "),
        }}
      >
        <div className="absolute inset-0" style={getBackgroundStyle(kind)} />
        {renderGlyph(kind)}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="dot-live" aria-hidden />
          <span className="t-mono text-ink-mute tabular">{index}</span>
        </div>
        <div className="absolute right-4 top-4">
          <span className="t-mono text-ink-faint tabular">
            {kind.toUpperCase()}
          </span>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 t-mono text-ink-quiet tabular">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function getBackgroundStyle(kind: StubKind): React.CSSProperties {
  // Each stub kind resolves to a CSS variable so the entire treatment flips
  // with the theme (see styles/tokens.css → --stub-bg-* tokens).
  switch (kind) {
    case "dashboard":
      return { background: "var(--stub-bg-dashboard)" };
    case "system":
      return { background: "var(--stub-bg-system)" };
    case "flow":
      return { background: "var(--stub-bg-flow)" };
    case "graph":
      return { background: "var(--stub-bg-graph)" };
    case "prompt":
      return { background: "var(--stub-bg-prompt)" };
    default:
      return { background: "var(--stub-bg-screen)" };
  }
}

function renderGlyph(kind: StubKind) {
  switch (kind) {
    case "dashboard":
      return (
        <svg
          aria-hidden
          viewBox="0 0 800 450"
          className="absolute inset-0 h-full w-full text-ink"
        >
          {/* Sidebar */}
          <rect x="20" y="20" width="140" height="410" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x="32" y={50 + i * 38} width="116" height="6" fill="currentColor" opacity={0.12 - i * 0.01} />
          ))}
          {/* Top bar */}
          <rect x="180" y="20" width="600" height="40" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          {/* Tiles */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={190 + i * 200} y={80} width="180" height="100" fill="none" stroke="currentColor" strokeOpacity="0.2" />
              <rect x={206 + i * 200} y={100} width="60" height="8" fill="currentColor" opacity="0.4" />
              <rect x={206 + i * 200} y={120} width="140" height="20" fill="currentColor" opacity="0.6" />
              <rect x={206 + i * 200} y={150} width="100" height="6" fill="currentColor" opacity="0.2" />
            </g>
          ))}
          {/* Chart area */}
          <rect x="190" y="200" width="580" height="220" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          <polyline
            points="200,400 280,360 360,380 440,320 520,340 600,280 680,300 760,250"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="1.5"
          />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={200 + i * 80}
              x2={200 + i * 80}
              y1="220"
              y2="410"
              stroke="currentColor"
              strokeOpacity="0.08"
            />
          ))}
        </svg>
      );
    case "system":
      return (
        <svg aria-hidden viewBox="0 0 800 450" className="absolute inset-0 h-full w-full text-ink">
          {/* Token grid */}
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <g key={`${r}-${c}`}>
                <rect
                  x={60 + c * 90}
                  y={60 + r * 70}
                  width="70"
                  height="50"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.2}
                />
                <rect
                  x={68 + c * 90}
                  y={68 + r * 70}
                  width="14"
                  height="14"
                  fill="currentColor"
                  opacity={0.1 + (r * c) * 0.01}
                />
                <rect
                  x={88 + c * 90}
                  y={70 + r * 70}
                  width="34"
                  height="3"
                  fill="currentColor"
                  opacity="0.4"
                />
                <rect
                  x={88 + c * 90}
                  y={78 + r * 70}
                  width="20"
                  height="3"
                  fill="currentColor"
                  opacity="0.2"
                />
              </g>
            ))
          )}
        </svg>
      );
    case "flow":
      return (
        <svg aria-hidden viewBox="0 0 800 450" className="absolute inset-0 h-full w-full text-ink">
          {[120, 320, 520, 720].map((x, i) => (
            <g key={i}>
              <rect x={x - 60} y={195} width="120" height="60" fill="none" stroke="currentColor" strokeOpacity="0.3" />
              <text x={x} y={230} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5" fontFamily="monospace">
                STEP {i + 1}
              </text>
              {i < 3 && (
                <line
                  x1={x + 60}
                  x2={x + 140}
                  y1="225"
                  y2="225"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeDasharray="2 4"
                />
              )}
            </g>
          ))}
        </svg>
      );
    case "graph":
      return (
        <svg aria-hidden viewBox="0 0 800 450" className="absolute inset-0 h-full w-full text-ink">
          {Array.from({ length: 40 }).map((_, i) => {
            const x = (i * 19) % 780 + 20;
            const y = 50 + ((i * 113) % 350);
            const r = 1 + (i % 4);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                fill={i % 7 === 0 ? "var(--signal)" : "currentColor"}
                opacity={i % 7 === 0 ? 1 : 0.4}
              />
            );
          })}
          {/* Connection lines */}
          {Array.from({ length: 12 }).map((_, i) => {
            const x1 = (i * 67) % 780 + 20;
            const y1 = 50 + ((i * 91) % 350);
            const x2 = ((i + 4) * 67) % 780 + 20;
            const y2 = 50 + (((i + 4) * 91) % 350);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeOpacity="0.08"
              />
            );
          })}
        </svg>
      );
    case "prompt":
      return (
        <svg aria-hidden viewBox="0 0 800 450" className="absolute inset-0 h-full w-full text-ink">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="40"
              y={50 + i * 28}
              width={i % 3 === 0 ? 720 : i % 3 === 1 ? 560 : 340}
              height="8"
              fill="currentColor"
              opacity={i % 4 === 0 ? 0.55 : 0.25}
            />
          ))}
          <rect x="40" y={50 + 12 * 28 + 8} width="14" height="14" fill="var(--signal)" />
        </svg>
      );
    case "screen":
    default:
      return (
        <svg aria-hidden viewBox="0 0 800 450" className="absolute inset-0 h-full w-full text-ink">
          <rect x="40" y="40" width="720" height="40" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          <rect x="40" y="100" width="720" height="310" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x={60 + (i % 3) * 240}
              y={120 + Math.floor(i / 3) * 96}
              width="200"
              height="76"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.2"
            />
          ))}
        </svg>
      );
  }
}
