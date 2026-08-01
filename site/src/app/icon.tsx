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
          background: "#F6F7F9",
          color: "#1A56F0",
          fontSize: 15,
          fontWeight: 700,
          borderRadius: 8,
          border: "1px solid #E8EBF0",
        }}
      >
        L
      </div>
    ),
    size,
  );
}
