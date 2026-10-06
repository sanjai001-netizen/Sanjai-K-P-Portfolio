import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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
          background: "#0b0b0b",
          color: "#f3f1ec",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -2,
          borderBottom: "10px solid #ff2b20",
        }}
      >
        KP
      </div>
    ),
    size,
  );
}
