"use client";

type Props = {
  uid: string;
  alive: boolean;
};

/** Experiência — journey: entry → interaction → response → conclusion */
export function ExperienceArchitecture({ uid, alive }: Props) {
  const id = (n: string) => `${n}-${uid}`;

  return (
    <g className="scene">
      <g className="depthFar" opacity="0.4">
        <rect x="24" y="36" width="240" height="150" rx="12" fill="rgba(47,107,255,0.05)" stroke="#4d9be8" strokeOpacity="0.22" strokeWidth="1" />
        <rect x="300" y="28" width="236" height="130" rx="12" fill="rgba(47,107,255,0.04)" stroke="#4d9be8" strokeOpacity="0.16" strokeWidth="1" />
        <rect x="250" y="310" width="280" height="140" rx="12" fill="rgba(37,180,232,0.04)" stroke="#25b4e8" strokeOpacity="0.14" strokeWidth="1" />
      </g>

      <g className="depthMid">
        <rect className="surface" style={{ ["--i" as string]: 0 }} x="40" y="58" width="220" height="145" rx="11" fill="rgba(13,22,38,0.78)" stroke="#4d9be8" strokeOpacity="0.5" strokeWidth="1.4" />
        <rect x="62" y="86" width="110" height="10" rx="2" fill="#4d9be8" fillOpacity="0.42" />
        <rect x="62" y="108" width="150" height="7" rx="2" fill="#4d9be8" fillOpacity="0.2" />
        <rect x="62" y="128" width="88" height="7" rx="2" fill="#4d9be8" fillOpacity="0.15" />
        <rect x="62" y="156" width="56" height="24" rx="5" fill="rgba(47,107,255,0.22)" stroke="#4d9be8" strokeOpacity="0.45" strokeWidth="1" />
        <circle cx="230" cy="168" r="6" fill="#25b4e8" fillOpacity="0.6" className="focusDot" />

        <rect className="surface" style={{ ["--i" as string]: 1 }} x="250" y="130" width="260" height="170" rx="11" fill="rgba(13,22,38,0.82)" stroke="#4d9be8" strokeOpacity="0.6" strokeWidth="1.5" />
        <rect x="278" y="162" width="130" height="11" rx="2" fill="#4d9be8" fillOpacity="0.45" />
        <rect x="278" y="188" width="180" height="8" rx="2" fill="#4d9be8" fillOpacity="0.22" />
        <rect x="278" y="210" width="120" height="8" rx="2" fill="#4d9be8" fillOpacity="0.16" />
        <rect x="278" y="242" width="58" height="28" rx="5" fill="rgba(47,107,255,0.25)" stroke="#4d9be8" strokeOpacity="0.55" strokeWidth="1" />
        <rect x="348" y="242" width="58" height="28" rx="5" fill="rgba(37,180,232,0.14)" stroke="#25b4e8" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="470" cy="256" r="5" fill="#4d9be8" fillOpacity="0.5" className="focusDot" />

        <rect className="surface" style={{ ["--i" as string]: 2 }} x="70" y="300" width="240" height="150" rx="11" fill="rgba(13,22,38,0.8)" stroke="#25b4e8" strokeOpacity="0.48" strokeWidth="1.35" />
        <rect x="96" y="332" width="120" height="10" rx="2" fill="#25b4e8" fillOpacity="0.4" />
        <rect x="96" y="356" width="160" height="7" rx="2" fill="#4d9be8" fillOpacity="0.18" />
        <rect x="96" y="376" width="100" height="7" rx="2" fill="#4d9be8" fillOpacity="0.12" />
        <path d="M100 418 H250" stroke="#25b4e8" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" className="feedback" />
        <circle cx="272" cy="418" r="5" fill="#25b4e8" fillOpacity="0.75" className="focusDot" />
      </g>

      <g className="depthNear">
        <path
          d="M150 200 C220 235 250 245 310 200 C370 155 420 185 460 240 C490 285 420 340 300 380"
          stroke="#4d9be8"
          strokeOpacity="0.18"
          strokeWidth="8"
          fill="none"
        />
        <path
          id={id("route")}
          d="M150 200 C220 235 250 245 310 200 C370 155 420 185 460 240 C490 285 420 340 300 380"
          stroke={`url(#${id("flow")})`}
          strokeWidth="1.8"
          fill="none"
          className="pulsePath"
        />
        {[
          [150, 200],
          [310, 200],
          [460, 240],
          [300, 380],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="8" fill="#0a1018" stroke="#4d9be8" strokeWidth="1.5" className="node" style={{ ["--i" as string]: i }} />
            <circle cx={x} cy={y} r="3" fill="#25b4e8" opacity="0.9" />
          </g>
        ))}
      </g>

      <g className="depthFg">
        {alive ? (
          <circle r="3.5" fill="#fff" opacity="0.92">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M150 200 C220 235 250 245 310 200 C370 155 420 185 460 240 C490 285 420 340 300 380"
            />
          </circle>
        ) : (
          <circle cx="310" cy="200" r="3.5" fill="#fff" opacity="0.7" />
        )}
        <circle className="core" cx="300" cy="250" r="58" fill={`url(#${id("core")})`} opacity="0.5" />
      </g>
    </g>
  );
}
