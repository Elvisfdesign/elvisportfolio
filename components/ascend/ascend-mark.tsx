import clsx from "clsx";

type AscendMarkProps = {
  className?: string;
  /**
   * Optional aria-label. When provided, the mark becomes a `role="img"`
   * announced element. Default (undefined) is decorative + hidden from AT —
   * appropriate whenever the parent already announces "ASCEND" in text.
   */
  ariaLabel?: string;
};

/**
 * ASCEND faceted mark, inlined as vector paths.
 *
 * Paths are copied verbatim from the ASCEND Figma source (the four
 * triangle facets that read as a stylized mountain). Fill uses the
 * `--ascend-gold` token so a single change in tokens.css propagates
 * everywhere the mark is used.
 *
 * Colocated under `components/ascend/` so both the case study and the
 * homepage `CurrentProjectCard` share one source.
 */
export function AscendMark({ className, ariaLabel }: AscendMarkProps) {
  const decorative = !ariaLabel;
  return (
    <svg
      viewBox="0 0 32 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="var(--ascend-gold)"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={ariaLabel}
      focusable="false"
      className={clsx("shrink-0 select-none", className)}
    >
      <path d="M12.1053 4.73684L15.7895 0L19.4737 4.73684L15.7895 8.94737L12.1053 4.73684Z" />
      <path d="M0 20L11.0526 5.78947L14.7368 10.5263L7.89474 20H0Z" />
      <path d="M20.5263 5.78947L16.8421 10L23.6842 20H31.0526L20.5263 5.78947Z" />
      <path d="M9.47368 20L15.7895 11.5789L21.5789 20H9.47368Z" />
    </svg>
  );
}
