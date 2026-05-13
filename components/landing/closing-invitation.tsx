"use client";

import { useState } from "react";
import { Section } from "@/components/primitives/section";
import { FadeRise } from "@/components/motion/fade-rise";

/**
 * Movement 07 — Closing Invitation.
 *
 * One sentence. One input. A monospace timestamp showing the page is alive.
 * No social icon flood. No floating CTA elsewhere.
 */
export function ClosingInvitation() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "ready" | "sent">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setStatus(v.includes("@") && v.length > 4 ? "ready" : "idle");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "ready") return;
    // Mailto-as-handoff — no backend on the landing input.
    window.location.href = `mailto:elvisfdesign@gmail.com?subject=Hello%20from%20${encodeURIComponent(
      value
    )}`;
    setStatus("sent");
  };

  return (
    <Section
      rhythm="movement"
      width="outer"
      eyebrow="INVITATION"
      number="07 / 07"
      id="contact"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <FadeRise>
            <h2 className="t-display-l font-display text-ink">
              If any of this looks
              <br />
              <span className="italic text-ink-mute">like a system</span>{" "}
              you&rsquo;re building —
              <br />
              say hello.
            </h2>
          </FadeRise>
        </div>

        <div className="md:col-span-5 md:pt-8">
          <FadeRise delay={0.15}>
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block t-mono text-ink-mute tabular">
                YOUR&nbsp;EMAIL
              </label>
              <div className="hairline-b flex items-baseline gap-4 py-3">
                <input
                  type="email"
                  inputMode="email"
                  required
                  autoComplete="email"
                  value={value}
                  onChange={onChange}
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent t-display-m font-display text-ink placeholder:text-ink-quiet focus:outline-none"
                  aria-label="Your email"
                />
                <button
                  type="submit"
                  disabled={status !== "ready"}
                  className={
                    "t-mono link-underline transition-colors duration-300 " +
                    (status === "ready" ? "text-signal" : "text-ink-quiet")
                  }
                >
                  {status === "sent" ? "SENT" : "SEND\u00a0→"}
                </button>
              </div>
              <p className="t-mono text-ink-quiet tabular">
                {status === "sent"
                  ? "OPENED YOUR MAIL CLIENT — REPLY ANYTIME."
                  : "MY EMAIL ELVISFDESIGN@GMAIL.COM DIRECTLY"}
              </p>
            </form>
          </FadeRise>
        </div>
      </div>
    </Section>
  );
}
