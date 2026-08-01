"use client";

type Props = {
  uid: string;
  alive: boolean;
};

type Module = {
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: boolean;
};

const MODULES: Module[] = [
  { x: 42, y: 58, w: 128, h: 78 },
  { x: 210, y: 42, w: 150, h: 88, accent: true },
  { x: 400, y: 68, w: 118, h: 72 },
  { x: 58, y: 180, w: 138, h: 92 },
  { x: 230, y: 175, w: 165, h: 100, accent: true },
  { x: 430, y: 195, w: 100, h: 70 },
  { x: 95, y: 320, w: 155, h: 88 },
  { x: 300, y: 310, w: 170, h: 95, accent: true },
];

/** Sistemas — applications → APIs → data → automation → infra */
export function SystemsArchitecture({ uid, alive }: Props) {
  const id = (n: string) => `${n}-${uid}`;

  return (
    <g className="scene">
      {/* Distant grid structure */}
      <g className="depthFar" opacity="0.25">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="40" y1={90 + i * 70} x2="520" y2={90 + i * 70} stroke="#4d9be8" strokeOpacity="0.2" strokeWidth="0.6" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={70 + i * 85} y1="50" x2={70 + i * 85} y2="430" stroke="#4d9be8" strokeOpacity="0.15" strokeWidth="0.6" />
        ))}
      </g>

      {/* Modules with internal detail */}
      <g className="depthMid">
        {MODULES.map((m, i) => (
          <g key={i} className="module" style={{ ["--i" as string]: i }}>
            <rect
              x={m.x}
              y={m.y}
              width={m.w}
              height={m.h}
              rx="5"
              fill="rgba(47,107,255,0.06)"
              stroke={m.accent ? "#f0a040" : "#4d9be8"}
              strokeOpacity={m.accent ? 0.55 : 0.42}
              strokeWidth="1.2"
            />
            {/* Internal state lines */}
            <rect x={m.x + 14} y={m.y + 16} width={m.w * 0.42} height="4" rx="1" fill={m.accent ? "#f0a040" : "#4d9be8"} fillOpacity="0.4" />
            <rect x={m.x + 14} y={m.y + 28} width={m.w * 0.58} height="3" rx="1" fill="#4d9be8" fillOpacity="0.2" />
            <rect x={m.x + 14} y={m.y + 38} width={m.w * 0.32} height="3" rx="1" fill="#4d9be8" fillOpacity="0.14" />
            {/* Ports */}
            <circle cx={m.x + m.w / 2} cy={m.y} r="2.5" fill="#0a1018" stroke={m.accent ? "#f0a040" : "#4d9be8"} strokeWidth="1" />
            <circle cx={m.x + m.w / 2} cy={m.y + m.h} r="2.5" fill="#0a1018" stroke={m.accent ? "#f0a040" : "#4d9be8"} strokeWidth="1" />
            {/* Mini nodes */}
            <circle cx={m.x + m.w - 22} cy={m.y + m.h - 20} r="3" fill="#0a1018" stroke="#4d9be8" strokeOpacity="0.5" strokeWidth="1" />
            <rect x={m.x + 14} y={m.y + m.h - 22} width={18} height="8" rx="2" fill="rgba(47,107,255,0.18)" />
          </g>
        ))}
      </g>

      {/* Orchestration nucleus */}
      <g className="depthNear">
        <circle cx="312" cy="225" r="36" fill={`url(#${id("core")})`} className="core" />
        <circle cx="312" cy="225" r="14" fill="#0a1018" stroke="#f0a040" strokeWidth="1.4" strokeOpacity="0.7" />
        <circle cx="312" cy="225" r="4" fill="#f0a040" />
        {/* Routes */}
        <path
          d="M106 136 V180 M285 130 V175 M459 140 V195 M127 272 V320 M385 275 V310 M312 261 V310"
          stroke={`url(#${id("flow")})`}
          strokeWidth="1.35"
          className="pulsePath"
        />
        <path
          d="M196 226 H230 M395 230 H430 M172 364 H300"
          stroke="#f0a040"
          strokeOpacity="0.4"
          strokeWidth="1.15"
          className="pulsePath"
        />
      </g>

      <g className="depthFg">
        {[
          [106, 136],
          [285, 130],
          [459, 140],
          [385, 275],
          [172, 364],
        ].map(([x, y], i) => (
          <circle key={i} className="node" style={{ ["--i" as string]: i }} cx={x} cy={y} r="3.5" fill="#0a1018" stroke="#f0a040" strokeWidth="1.15" />
        ))}
        {alive ? (
          <>
            <circle r="2.2" fill="#f0a040" opacity="0.85">
              <animateMotion dur="7.5s" repeatCount="indefinite" path="M106 136 L106 180 L196 226 L230 226 L285 175" />
            </circle>
            <circle r="1.8" fill="#4d9be8" opacity="0.75">
              <animateMotion dur="9s" begin="1.2s" repeatCount="indefinite" path="M459 140 L459 195 L430 230 L395 230 L312 225" />
            </circle>
          </>
        ) : null}
      </g>
    </g>
  );
}
