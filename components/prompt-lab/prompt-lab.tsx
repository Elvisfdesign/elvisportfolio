"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArtifactSurface } from "@/components/primitives/artifact-surface";
import { Magnetic } from "@/components/motion/magnetic";
import {
  PROMPT_SCENARIOS,
  type PromptScenario,
} from "@/content/practice/ai-for-product-designers";

type Status = "idle" | "streaming" | "done" | "error" | "rate-limited";

/**
 * The Prompt Lab — the single, signature live AI moment on this site.
 *
 * Pick one of three pre-curated prompts → live LLM call streams a response
 * into the AI artifact surface. Server enforces a 5-run rate limit per
 * session so cost stays bounded.
 *
 * Restraint is the design. There is no chat. There is one act of model use,
 * presented with care.
 */
export function PromptLab() {
  const [active, setActive] = useState<PromptScenario>(PROMPT_SCENARIOS[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [response, setResponse] = useState<string>("");
  const [meta, setMeta] = useState<{
    model?: string;
    runs?: number;
    limit?: number;
    error?: string;
  }>({});
  const abortRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    []
  );

  const onRun = async () => {
    if (status === "streaming") return;
    setStatus("streaming");
    setResponse("");
    setMeta({});

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/prompt-lab", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenarioId: active.id }),
        signal: ctrl.signal,
      });

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setMeta({ runs: data.runs, limit: data.limit, error: data.error });
        setStatus("rate-limited");
        return;
      }

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => "");
        setMeta({ error: text || `Server returned ${res.status}` });
        setStatus("error");
        return;
      }

      // Read header hints (model + remaining runs)
      const model = res.headers.get("x-model") ?? undefined;
      const runs = Number(res.headers.get("x-runs")) || undefined;
      const limit = Number(res.headers.get("x-runs-limit")) || undefined;
      setMeta({ model, runs, limit });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setResponse(acc);
      }
      setStatus("done");
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      setMeta({ error: (err as Error).message });
      setStatus("error");
    }
  };

  const stop = () => abortRef.current?.abort();
  const runMeta =
    meta.runs && meta.limit
      ? `${meta.runs}/${meta.limit} RUNS`
      : "READY";
  const modelMeta = meta.model ? meta.model.toUpperCase() : "CLAUDE";

  return (
    <section
      id="prompt-lab"
      className="px-[var(--gutter)] py-24 md:py-32"
      style={{ maxWidth: "var(--max-outer)", marginInline: "auto" }}
    >
      <header className="hairline-b mb-12 flex flex-col gap-3 pb-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
        <span className="t-mono text-ink-quiet tabular shrink-0">PROMPT LAB · LIVE</span>
        <span className="t-mono text-ink-quiet tabular max-w-full break-words sm:text-right">
          {modelMeta} · {runMeta}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="t-display-l font-display text-ink">
            Try it on a real
            <br />
            <span className="italic text-ink-mute">design problem.</span>
          </h2>
          <p className="mt-6 max-w-prose t-body-l text-ink-mute">
            Three canned prompts modeled on Maven assignments and analogous IC jams — UX
            tightening, KPI empty states, Cursor handoffs. Run one inside the same artifact pane
            I use to think out loud.
          </p>
          <p className="mt-4 max-w-prose t-mono text-ink-quiet">
            Session limit: 5 runs. Real model call. No chat history kept.
          </p>

          <ul className="mt-12 space-y-2">
            {PROMPT_SCENARIOS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActive(s)}
                  className={
                    "group w-full text-left hairline-b py-4 transition-colors duration-300 " +
                    (active.id === s.id ? "text-ink" : "text-ink-mute hover:text-ink")
                  }
                  aria-pressed={active.id === s.id}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="t-subhead">{s.title}</span>
                    <span
                      className="t-mono tabular"
                      style={{
                        color:
                          active.id === s.id
                            ? "var(--signal)"
                            : "var(--ink-quiet)",
                      }}
                    >
                      {active.id === s.id ? "ACTIVE" : "SELECT"}
                    </span>
                  </div>
                  <p className="mt-2 t-body text-ink-quiet">{s.blurb}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-7">
          <ArtifactSurface
            label="USER PROMPT"
            meta={`SCENARIO · ${active.id.toUpperCase()}`}
          >
            {active.context}
            {"\n\n"}
            {active.userPrompt}
          </ArtifactSurface>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <p className="t-mono text-ink-quiet tabular max-w-[min(100%,52ch)] shrink-0 break-words leading-relaxed">
              SYSTEM PROMPT IS SET ON THE SERVER. NOT EXPOSED.
            </p>
            <div className="flex shrink-0 items-center gap-6">
              {status === "streaming" ? (
                <button
                  type="button"
                  onClick={stop}
                  className="t-mono link-underline text-ink-mute py-3 touch-manipulation"
                >
                  STOP
                </button>
              ) : null}
              <Magnetic>
                <button
                  type="button"
                  onClick={onRun}
                  disabled={status === "streaming"}
                  className="t-mono link-underline text-signal disabled:text-ink-quiet py-3 touch-manipulation"
                >
                  {status === "streaming"
                    ? "RUNNING…"
                    : status === "done"
                    ? "RUN AGAIN →"
                    : "RUN MODEL →"}
                </button>
              </Magnetic>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {(status !== "idle" || response.length > 0) && (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <ArtifactSurface
                  label={
                    status === "error"
                      ? "ERROR"
                      : status === "rate-limited"
                      ? "RATE LIMIT"
                      : "MODEL OUTPUT"
                  }
                  meta={
                    status === "error" || status === "rate-limited"
                      ? undefined
                      : `${modelMeta} · ${runMeta}`
                  }
                  streaming={status === "streaming"}
                >
                  {status === "error"
                    ? meta.error ?? "Something went wrong."
                    : status === "rate-limited"
                    ? meta.error ??
                      "Session run limit reached. Refresh to start a new session."
                    : response || "Preparing the model…"}
                </ArtifactSurface>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
