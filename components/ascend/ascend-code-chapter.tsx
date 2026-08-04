import { EditorialTextLink } from "@/components/primitives/editorial-text-link";
import { ascendCode } from "@/content/ascend/project";

/**
 * Chapter 09 body — live React + Storybook deliverables.
 * Summary stays in the parent Section header.
 */
export function AscendCodeChapter() {
  return (
    <div className="mt-10 space-y-8 md:mt-12">
      <p className="inline-flex items-center gap-2 t-mono text-[0.6875rem] text-[var(--ascend-gold)] tabular">
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ascend-gold)]"
        />
        {ascendCode.versionLabel}
      </p>

      <p className="max-w-[42rem] t-body-l text-ink-mute leading-relaxed">
        {ascendCode.body}
      </p>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
        {ascendCode.actions.map((action, index) => (
          <EditorialTextLink
            key={action.id}
            href={action.href}
            label={action.label}
            arrow="external"
            tone={index === 0 ? "ink" : "mute"}
            ariaLabel={action.ariaLabel}
          />
        ))}
      </div>
    </div>
  );
}
