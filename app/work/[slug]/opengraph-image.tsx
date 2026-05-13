import { ImageResponse } from "next/og";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";

export const alt = "Case study · Elvis Fernandes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const title = study?.title ?? "Case Study";
  const thesis = study?.thesis ?? "";
  const index = study?.index ?? "—";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#0b0b0c",
          color: "#edeae3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Geist, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 1.4,
            opacity: 0.6,
          }}
        >
          <span>{index} · CASE STUDY · ELVIS FERNANDES</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#c8ff00",
                display: "block",
              }}
            />
            <span>LIVE</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontFamily: "Fraunces, Georgia, serif",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 22,
              maxWidth: 900,
              opacity: 0.7,
              lineHeight: 1.45,
            }}
          >
            {thesis}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 1.4,
            opacity: 0.5,
          }}
        >
          <span>{study?.meta.role.toUpperCase() ?? ""}</span>
          <span>{study?.meta.year?.toUpperCase() ?? ""}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
