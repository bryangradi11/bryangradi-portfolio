import { ImageResponse } from "next/og";

export const alt = "Bryan Gradi — Founder & Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0e1a",
          backgroundImage:
            "radial-gradient(circle at 75% 0%, rgba(59,130,246,0.30) 0%, transparent 55%), radial-gradient(circle at 0% 100%, rgba(59,130,246,0.12) 0%, transparent 55%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#6b7785",
            fontSize: 22,
            fontFamily: "monospace",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 32,
              fontFamily: "sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            B
          </div>
          <span>Founder · Full-Stack Engineer</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 300,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              display: "flex",
              gap: 18,
            }}
          >
            <span>Bryan</span>
            <span style={{ fontWeight: 700 }}>Gradi</span>
          </div>
          <div
            style={{
              width: 80,
              height: 4,
              background: "#3b82f6",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 32,
              color: "#cbd5e1",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Building AI-powered software, automation and digital products for businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6b7785",
            fontSize: 22,
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>bryangradi-portfolio.vercel.app</span>
          <span>Londrina, Brazil</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
