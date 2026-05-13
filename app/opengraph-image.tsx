import { ImageResponse } from "next/og";

export const alt =
  "Elvis Fernandes — Senior Product Designer building intelligent systems at the intersection of design, engineering, and AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          <span>ELVIS FERNANDES · PORTFOLIO 2026</span>
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
            <span>OPEN TO ROLES</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontFamily: "Fraunces, Georgia, serif",
            }}
          >
            I design systems,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontFamily: "Fraunces, Georgia, serif",
              fontStyle: "italic",
              color: "#8c8a83",
            }}
          >
            not screens.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 22,
              maxWidth: 820,
              opacity: 0.7,
              lineHeight: 1.4,
            }}
          >
            A Senior Product Designer building intelligent systems at the
            intersection of design, engineering, and AI.
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
          <span>ELVISFERNANDES.COM</span>
          <span>SR. PRODUCT DESIGNER · MODULATE</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
