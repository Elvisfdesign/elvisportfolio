import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/primitives/section";
import { MetadataStrip } from "@/components/primitives/metadata-strip";
import { ContactForm } from "@/components/contact/contact-form";
import { MaskUp } from "@/components/motion/mask-up";
import { FadeRise } from "@/components/motion/fade-rise";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "One note opens your mail client. What you're building, and typically a reply within a few weekday hours.",
};

export default function ContactPage() {
  return (
    <article className="pt-32">
      <Section rhythm="movement" width="outer">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="t-mono text-ink-quiet tabular">CONTACT · ONE INPUT</p>
            <h1 className="mt-8 t-display-xl font-display text-ink">
              <MaskUp>Say what you&rsquo;re</MaskUp>
              <br />
              <MaskUp delay={0.15}>
                <span className="italic text-ink-mute">building.</span>
              </MaskUp>
            </h1>
            <FadeRise delay={0.3} className="mt-10 max-w-prose">
              <p className="t-body-l text-ink-mute">
                I enjoy notes from people building careful products—I read
                everything and reply as soon as practical (usually within a
                few hours on weekdays; slower when calendars stack).
                Mention what you&rsquo;re working on and where design could
                sharpen the outcome.
              </p>
            </FadeRise>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-12">
            <FadeRise delay={0.4}>
              <MetadataStrip
                className="flex-col items-start gap-y-4"
                items={[
                  { label: "BASED", value: "Boston, MA" },
                  {
                    label: "OPEN TO",
                    value:
                      "Product Design · Design Systems · Design Engineer · AI",
                  },
                  { label: "FOCUS", value: "AI · Systems · Enterprise" },
                  { label: "RESPONSE", value: "Usually within hours" },
                ]}
              />
            </FadeRise>
          </div>
        </div>
      </Section>

      <Section rhythm="beat" width="reading">
        <ContactForm />
      </Section>

      <Section rhythm="beat" width="outer">
        <header className="hairline-b mb-12 flex flex-col gap-3 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="t-mono text-ink-quiet tabular">DIRECT</span>
          <span className="t-mono text-ink-quiet tabular sm:text-right">
            FOR THE LINK COLLECTORS
          </span>
        </header>
        <ul className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-x-16 md:gap-y-14 items-start">
          <li className="hairline-t pt-6">
            <p className="t-mono text-ink-quiet tabular">EMAIL</p>
            <a
              href="mailto:elvisfdesign@gmail.com"
              className="mt-3 inline-block max-w-full t-subhead text-ink link-underline break-words"
            >
              elvisfdesign@gmail.com
            </a>
          </li>
          <li className="hairline-t pt-6">
            <p className="t-mono text-ink-quiet tabular">LINKEDIN</p>
            <a
              href="https://www.linkedin.com/in/elvisfdesign/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block max-w-full t-subhead text-ink link-underline break-words"
            >
              linkedin.com/in/elvisfdesign
            </a>
          </li>
          <li className="hairline-t pt-6">
            <p className="t-mono text-ink-quiet tabular">PRACTICE</p>
            <Link
              href="/practice/ai-for-product-designers"
              className="mt-3 inline-block t-subhead text-ink link-underline"
            >
              AI for product designers
            </Link>
          </li>
        </ul>
      </Section>
    </article>
  );
}
