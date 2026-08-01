"use client";

type Props = {
  uid: string;
  alive: boolean;
};

const NODES: Array<{ x: number; y: number; r: number; w: number }> = [
  { x: 95, y: 140, r: 5, w: 0.35 },
  { x: 150, y: 95, r: 4, w: 0.4 },
  { x: 210, y: 160, r: 6, w: 0.7 },
  { x: 175, y: 250, r: 4.5, w: 0.45 },
  { x: 120, y: 300, r: 3.5, w: 0.3 },
  { x: 250, y: 320, r: 5, w: 0.55 },
  { x: 380, y: 100, r: 4, w: 0.4 },
  { x: 430, y: 165, r: 5.5, w: 0.65 },
  { x: 455, y: 250, r: 4, w: 0.4 },
  { x: 400, y: 330, r: 5, w: 0.5 },
  { x: 340, y: 370, r: 3.5, w: 0.3 },
  { x: 310, y: 120, r: 4.5, w: 0.5 },
];

/** IA — entry → relations → inference → output (organic, not orbital cliché) */
export function AIArchitecture({ uid, alive }: Props) {
  const id = (n: string) => `${n}-${uid}`;

  return (
    <g className="scene">
      {/* Influence field — irregular layers */}
      <g className="depthFar">
        <ellipse cx="280" cy="235" rx="210" ry="160" stroke="#8b7cf0" strokeOpacity="0.12" strokeWidth="1" fill="rgba(139,124,240,0.03)" />
        <ellipse cx="295" cy="245" rx="165" ry="125" stroke="#8b7cf0" strokeOpacity="0.18" strokeWidth="1" fill="none" transform="rotate(-8 295 245)" />
        <ellipse
          cx="270"
          cy="230"
          rx="120"
          ry="95"
          stroke="#8b7cf0"
          strokeOpacity="0.28"
          strokeWidth="1.1"
          fill="none"
          transform="rotate(6 270 230)"
          className="orbit"
        />
      </g>

      {/* Relational web */}
      <g className="depthMid">
        {NODES.map((n, i) => (
          <path
            key={`l${i}`}
            d={`M${n.x} ${n.y} Q${(n.x + 280) / 2 + (i % 2 ? 22 : -22)} ${(n.y + 235) / 2} 280 235`}
            stroke="#8b7cf0"
            strokeOpacity={0.12 + n.w * 0.25}
            strokeWidth={0.8 + n.w}
            fill="none"
            className="pulsePath"
          />
        ))}
        {/* Cross relations */}
        <path d="M210 160 Q240 200 250 320" stroke="#c4b8ff" strokeOpacity="0.22" strokeWidth="1" className="pulsePath" />
        <path d="M430 165 Q380 220 400 330" stroke="#c4b8ff" strokeOpacity="0.2" strokeWidth="1" className="pulsePath" />
        <path d="M150 95 Q220 140 310 120" stroke="#8b7cf0" strokeOpacity="0.18" strokeWidth="1" />
      </g>

      {/* Inference nucleus + attention fields */}
      <g className="depthNear">
        <circle cx="280" cy="235" r="72" fill={`url(#${id("core")})`} className="core" />
        <ellipse cx="280" cy="235" rx="42" ry="38" fill="rgba(10,16,24,0.55)" stroke="#8b7cf0" strokeOpacity="0.5" strokeWidth="1.3" transform="rotate(-12 280 235)" />
        <ellipse cx="280" cy="235" rx="24" ry="20" fill="none" stroke="#c4b8ff" strokeOpacity="0.45" strokeWidth="1" className="orbitRev" />
        <circle cx="280" cy="235" r="8" fill="#8b7cf0" />
        <circle cx="280" cy="235" r="3" fill="#fff" opacity="0.9" />

        {/* Input cluster (left) */}
        <path d="M55 200 C90 210 130 220 175 250" stroke={`url(#${id("flow")})`} strokeWidth="1.5" fill="none" className="pulsePath" />
        <path d="M60 280 C100 270 140 260 175 250" stroke="#4d9be8" strokeOpacity="0.3" strokeWidth="1.1" fill="none" />
        <circle cx="55" cy="200" r="4" fill="#0a1018" stroke="#25b4e8" strokeWidth="1.2" />
        <circle cx="60" cy="280" r="3.5" fill="#0a1018" stroke="#25b4e8" strokeWidth="1.1" />

        {/* Output (right) — distinct */}
        <path d="M385 235 C430 230 470 210 510 190" stroke={`url(#${id("flow")})`} strokeWidth="1.7" fill="none" className="pulsePath" />
        <path d="M385 235 C430 250 475 270 515 295" stroke="#c4b8ff" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
        <circle cx="510" cy="190" r="5" fill="#8b7cf0" fillOpacity="0.7" />
        <circle cx="515" cy="295" r="4" fill="#c4b8ff" fillOpacity="0.55" />
      </g>

      <g className="depthFg">
        {NODES.map((n, i) => (
          <circle
            key={i}
            className="node"
            style={{ ["--i" as string]: i }}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="#0a1018"
            stroke={n.w > 0.5 ? "#c4b8ff" : "#8b7cf0"}
            strokeWidth={1 + n.w * 0.4}
            opacity={0.55 + n.w * 0.4}
          />
        ))}
        {alive ? (
          <>
            <circle r="2.2" fill="#25b4e8" opacity="0.8">
              <animateMotion dur="6.5s" repeatCount="indefinite" path="M55 200 C90 210 130 220 175 250 Q230 245 280 235" />
            </circle>
            <circle r="2.4" fill="#c4b8ff" opacity="0.85">
              <animateMotion dur="7.5s" begin="0.8s" repeatCount="indefinite" path="M280 235 C340 230 400 220 510 190" />
            </circle>
          </>
        ) : null}
      </g>
    </g>
  );
}
