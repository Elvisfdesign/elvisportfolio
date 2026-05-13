import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Single-layer mark for ImageResponse constraint (OG renderer allows one decorated child).
 * Dark canvas + hairline square + radial dot (defaults site theme preview on iOS).
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0b0c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 10,
            border: "3px solid rgba(237, 234, 227, 0.2)",
            backgroundImage:
              "radial-gradient(circle at 74% 74%, #c8ff00 0, #c8ff00 14px, transparent 15px)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
