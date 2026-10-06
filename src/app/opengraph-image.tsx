import { ImageResponse } from "next/og";

export const alt = "Sanjai KP — Full Stack Developer. Python, Django, React.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f1ec",
          color: "#0b0b0b",
          padding: 56,
          border: "16px solid #0b0b0b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4 }}>
          <span>PORTFOLIO / 2026</span>
          <span>NILAMBUR, KERALA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 200, fontWeight: 700, lineHeight: 0.85, letterSpacing: -10 }}>
            SANJAI <span style={{ color: "#ff2b20", marginLeft: 36 }}>KP</span>
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 28,
              padding: "10px 18px",
              background: "#0b0b0b",
              color: "#f3f1ec",
              fontSize: 52,
              fontWeight: 700,
            }}
          >
            FULL STACK DEVELOPER
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 3 }}>PYTHON / DJANGO / REACT / JAVASCRIPT</div>
      </div>
    ),
    size,
  );
}
