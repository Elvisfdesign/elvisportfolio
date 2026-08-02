import type { Metadata } from "next";
import { AscendPage } from "@/components/ascend/ascend-page";
import { ascendProject } from "@/content/ascend/project";

const TITLE = "ASCEND — Premium Lifestyle Operating System";
const DESCRIPTION = ascendProject.description;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ascend" },
  openGraph: {
    title: `${TITLE} | Elvis Fernandes`,
    description: DESCRIPTION,
    url: "/ascend",
  },
  twitter: {
    title: `${TITLE} | Elvis Fernandes`,
    description: DESCRIPTION,
  },
};

/**
 * Structured data — publishes the live Figma URL (and any other live
 * destinations) so crawlers can associate this case-study page with the
 * active ASCEND product work.
 */
const ascendJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: ascendProject.fullName,
  alternateName: ascendProject.name,
  description: ascendProject.description,
  url: "https://elvisfernandes.com/ascend",
  dateCreated: "2026",
  creator: { "@type": "Person", name: "Elvis Fernandes" },
  about: "Premium lifestyle operating system — brand, product, system, and code",
  sameAs: [
    ascendProject.urls.figmaProductUrl,
    ascendProject.urls.figmaSystemUrl,
    ascendProject.urls.storybookUrl,
    ascendProject.urls.githubUrl,
    ascendProject.urls.prototypeUrl,
    ascendProject.urls.marketingUrl,
  ].filter((u): u is string => typeof u === "string"),
};

export default function AscendRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ascendJsonLd) }}
      />
      <AscendPage />
    </>
  );
}
