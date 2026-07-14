import clsx from "clsx";

type AtlasMediaPlaceholderProps = {
  label: string;
  className?: string;
  aspect?: "video" | "square" | "wide";
};

/**
 * Honest labeled placeholder until real Atlas screenshots ship.
 */
export function AtlasMediaPlaceholder({
  label,
  className,
  aspect = "wide",
}: AtlasMediaPlaceholderProps) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "video"
        ? "aspect-video"
        : "aspect-[16/10]";

  return (
    <figure
      className={clsx(
        "relative overflow-hidden rounded-sm border bg-canvas-raised",
        aspectClass,
        className,
      )}
      style={{ borderColor: "var(--hairline)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(145deg, var(--canvas-recessed) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, var(--signal-faint), transparent 55%)",
        }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
        <span className="t-mono text-ink-mute tabular">{label}</span>
        <span className="t-mono text-ink-faint tabular">PLACEHOLDER</span>
      </figcaption>
    </figure>
  );
}
