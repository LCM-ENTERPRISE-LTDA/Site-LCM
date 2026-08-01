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
          background: "#F5F7FA",
          borderRadius: 8,
          border: "1px solid #E6EBF2",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
          <path d="M32 6.5 L42.2 18.8 L32 31.1 L21.8 18.8 Z" stroke="#2F6BFF" strokeWidth="4" strokeLinejoin="round" />
          <path d="M8.5 55.5 L29.2 55.5 L18.85 36.2 Z" stroke="#2F6BFF" strokeWidth="4" strokeLinejoin="round" />
          <path d="M35.8 55.5 L56.5 55.5 L45.15 36.2 Z" stroke="#2F6BFF" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
