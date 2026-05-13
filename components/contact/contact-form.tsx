"use client";

import { useState } from "react";
import { ArtifactSurface } from "@/components/primitives/artifact-surface";

/**
 * A single, beautifully-treated input. Inputs are first-class on this site.
 *
 * Submitting hands off to the user's mail client with a pre-filled subject —
 * no backend required, no fake "thank you" toast, no Calendly embed.
 */
export function ContactForm() {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const ready = email.includes("@") && body.trim().length > 10;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    const subject = encodeURIComponent(
      `Hello from ${email}`
    );
    const text = encodeURIComponent(body + "\n\n— sent via elvisfernandes.com");
    window.location.href = `mailto:elvisfdesign@gmail.com?subject=${subject}&body=${text}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <label className="block">
        <span className="t-mono text-ink-mute tabular">YOUR EMAIL</span>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="hairline-b mt-3 w-full bg-transparent t-display-m font-display text-ink placeholder:text-ink-quiet focus:outline-none focus:border-signal pb-2"
          aria-label="Your email"
        />
      </label>

      <div>
        <span className="t-mono text-ink-mute tabular">YOUR NOTE</span>
        <div className="mt-3">
          <ArtifactSurface label="MESSAGE" meta={`${body.length} CHARS`}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Hi Elvis —\n\nWe're building [thing]. We're hiring a [role].\nHere's what we're stuck on:`}
              rows={8}
              className="block w-full resize-none bg-transparent font-mono text-[0.9375rem] leading-[1.65] text-artifact-ink placeholder:text-ink-quiet focus:outline-none"
              aria-label="Your note"
            />
          </ArtifactSurface>
        </div>
      </div>

      <div className="flex items-center justify-between gap-8">
        <p className="t-mono text-ink-quiet tabular shrink-0 min-w-0">
          OPENS YOUR MAIL CLIENT · NO TRACKING · NO BACKEND
        </p>
        <button
          type="submit"
          disabled={!ready}
          className="t-mono link-underline transition-colors duration-300 text-signal disabled:text-ink-quiet shrink-0 min-w-[9.75rem] text-right"
        >
          {ready ? "SEND →" : "WRITE TO SEND"}
        </button>
      </div>
    </form>
  );
}
