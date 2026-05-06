import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          borderRadius: 7,
        }}
      >
        B
      </div>
    ),
    { ...size }
  );
}
