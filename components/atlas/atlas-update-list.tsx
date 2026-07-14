import clsx from "clsx";
import type { AtlasUpdate } from "@/content/atlas/project";

type AtlasUpdateListProps = {
  updates: readonly AtlasUpdate[];
  className?: string;
};

export function AtlasUpdateList({ updates, className }: AtlasUpdateListProps) {
  return (
    <div className={clsx("space-y-10", className)}>
      {updates.map((update) => (
        <article key={update.version}>
          <h3 className="t-mono text-ink tabular">{update.version}</h3>
          <ul className="mt-4 space-y-3" role="list">
            {update.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 t-body text-ink-mute"
              >
                <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
