import type { Metadata } from "next";
import { AtlasPage } from "@/components/atlas/atlas-page";
import { atlasProject } from "@/content/atlas/project";

const TITLE =
  "Atlas UI System — Live Interactive Product, Design System & React Library";
const DESCRIPTION =
  "Atlas is an enterprise product ecosystem: a live interactive product (Atlas Intelligence), a Figma design system, a React component library on Storybook, and an AI-assisted implementation workflow.";

const LIVE_DEMO_URL =
  atlasProject.urls.prototypeUrl ??
  "https://atlas-ui-atlas-intelligence.vercel.app/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/atlas" },
  openGraph: {
    title: `${TITLE} | Elvis Fernandes`,
    description: DESCRIPTION,
    url: "/atlas",
  },
  twitter: {
    title: `${TITLE} | Elvis Fernandes`,
    description: DESCRIPTION,
  },
};

/**
 * Structured data — publishes the live demo URL so crawlers can associate
 * this case-study page with the deployed Atlas Intelligence application.
 */
const atlasJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: atlasProject.name,
  alternateName: "Atlas Intelligence",
  description: atlasProject.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: LIVE_DEMO_URL,
  sameAs: [
    LIVE_DEMO_URL,
    atlasProject.urls.storybookUrl,
    atlasProject.urls.githubUrl,
    atlasProject.urls.figmaProductUrl,
    atlasProject.urls.figmaSystemUrl,
  ].filter((u): u is string => typeof u === "string"),
  isAccessibleForFree: true,
  creator: { "@type": "Person", name: "Elvis Fernandes" },
  softwareVersion: atlasProject.version,
};

export default function AtlasRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Rendering as an inline string keeps the payload deterministic
        // and prevents React from HTML-escaping the JSON keys.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(atlasJsonLd) }}
      />
      <AtlasPage />
    </>
  );
}
