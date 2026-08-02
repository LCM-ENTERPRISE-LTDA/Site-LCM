"use client";

import styles from "./AutoHistArts.module.css";

type Alive = { alive: boolean };

/** Cap. 1 — Fragmentos desconectados. */
export function ProblemScatterArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.scatter}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 640 400" fill="none">
        <g stroke="#3d8bfd" strokeOpacity="0.22" strokeWidth="1">
          <path d="M90 90 L200 160" strokeDasharray="3 7" className={styles.dash} />
          <path d="M320 70 L280 150" strokeDasharray="4 8" className={styles.dash} />
          <path d="M480 100 L360 180" strokeDasharray="3 6" className={styles.dash} />
          <path d="M140 260 L240 210" strokeDasharray="5 9" className={styles.dash} />
          <path d="M520 250 L400 220" strokeDasharray="4 7" className={styles.dash} />
        </g>
        <g className={styles.frag}>
          <rect x="50" y="55" width="88" height="52" rx="3" stroke="#3d8bfd" strokeOpacity="0.35" />
          <path d="M68 78 H120" stroke="#7dd3fc" strokeOpacity="0.25" strokeWidth="1.2" />
          <path d="M68 88 H108" stroke="#7dd3fc" strokeOpacity="0.18" strokeWidth="1" />
          <rect x="280" y="40" width="72" height="48" rx="3" stroke="#2b6cb0" strokeOpacity="0.4" />
          <circle cx="316" cy="64" r="10" stroke="#3d8bfd" strokeOpacity="0.3" />
          <rect x="470" y="60" width="96" height="58" rx="3" stroke="#3d8bfd" strokeOpacity="0.3" />
          <path d="M490 85 H540" stroke="#7dd3fc" strokeOpacity="0.2" />
          <path d="M490 95 H528" stroke="#7dd3fc" strokeOpacity="0.15" />
          <circle cx="110" cy="280" r="28" stroke="#3d8bfd" strokeOpacity="0.28" />
          <circle cx="110" cy="280" r="8" fill="#7dd3fc" fillOpacity="0.15" className={styles.pulse} />
          <rect x="300" y="250" width="80" height="70" rx="3" stroke="#2b6cb0" strokeOpacity="0.32" />
          <path d="M318 275 H362" stroke="#7dd3fc" strokeOpacity="0.2" />
          <path d="M318 288 H350" stroke="#7dd3fc" strokeOpacity="0.15" />
          <rect x="480" y="240" width="90" height="64" rx="3" stroke="#3d8bfd" strokeOpacity="0.28" />
        </g>
      </svg>
    </div>
  );
}

/** Cap. 2 — Convergência para um núcleo. */
export function ConvergeArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.converge}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 720 420" fill="none">
        <defs>
          <radialGradient id="ah-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(125,211,252,0.2)" />
            <stop offset="70%" stopColor="rgba(37,99,200,0.08)" />
            <stop offset="100%" stopColor="rgba(10,22,40,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="360" cy="210" rx="160" ry="110" fill="url(#ah-core)" className={styles.breathe} />
        <path
          d="M80 90 C180 140 260 180 330 200"
          stroke="#3d8bfd"
          strokeOpacity="0.35"
          strokeWidth="1.1"
          className={styles.link}
        />
        <path
          d="M640 80 C540 140 460 180 390 200"
          stroke="#3d8bfd"
          strokeOpacity="0.35"
          strokeWidth="1.1"
          className={styles.link}
        />
        <path
          d="M90 340 C190 290 270 240 330 220"
          stroke="#2b6cb0"
          strokeOpacity="0.32"
          strokeWidth="1.1"
          className={styles.link}
        />
        <path
          d="M630 350 C530 290 450 240 390 220"
          stroke="#2b6cb0"
          strokeOpacity="0.32"
          strokeWidth="1.1"
          className={styles.link}
        />
        {/* Plate core */}
        <rect
          x="290"
          y="178"
          width="140"
          height="52"
          rx="5"
          fill="rgba(8,18,36,0.9)"
          stroke="#3d8bfd"
          strokeOpacity="0.55"
          strokeWidth="1.3"
          className={styles.plate}
        />
        <path d="M310 204 H410" stroke="#7dd3fc" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="322" cy="204" r="2.5" fill="#7dd3fc" fillOpacity="0.7" className={styles.pulse} />
        {/* Outer nodes */}
        {[
          [80, 90],
          [640, 80],
          [90, 340],
          [630, 350],
        ].map(([x, y], i) => (
          <g key={i} className={styles.node} style={{ animationDelay: `${i * 1.4}s` }}>
            <circle cx={x} cy={y} r="7" fill="rgba(8,18,36,0.9)" stroke="#3d8bfd" strokeOpacity="0.45" />
            <circle cx={x} cy={y} r="2" fill="#7dd3fc" fillOpacity="0.6" />
          </g>
        ))}
        {alive ? (
          <>
            <path
              id="ah-converge-path"
              d="M80 90 C200 150 280 190 360 204 C440 190 520 150 640 80"
              fill="none"
            />
            <circle r="2.5" fill="#8fc3ff" className={styles.travel}>
              <animateMotion dur="18s" repeatCount="indefinite">
                <mpath href="#ah-converge-path" />
              </animateMotion>
            </circle>
          </>
        ) : null}
      </svg>
    </div>
  );
}

/** Cap. 3 — Device UI frames (premium system screens). */
export function FlowDeviceArt({
  alive,
  step,
}: Alive & { step: "cadastro" | "servico" | "fotos" | "historico" }) {
  return (
    <div className={`${styles.device} ${alive ? styles.alive : ""}`} aria-hidden="true">
      <div className={styles.bezel}>
        <div className={styles.screen}>
          <div className={styles.screenBar}>
            <span />
            <span />
            <span />
          </div>
          {step === "cadastro" && (
            <div className={styles.ui}>
              <div className={styles.uiLabel}>Veículo</div>
              <div className={styles.uiPlate}>LCM7H24</div>
              <div className={styles.uiRow} />
              <div className={styles.uiRow} style={{ width: "72%" }} />
              <div className={styles.uiRow} style={{ width: "58%" }} />
            </div>
          )}
          {step === "servico" && (
            <div className={styles.ui}>
              <div className={styles.uiLabel}>Serviço</div>
              <div className={styles.uiChip}>Diagnóstico</div>
              <div className={styles.uiRow} />
              <div className={styles.uiRow} style={{ width: "64%" }} />
              <div className={styles.uiKm}>41.200 km</div>
            </div>
          )}
          {step === "fotos" && (
            <div className={styles.ui}>
              <div className={styles.uiLabel}>Evidências</div>
              <div className={styles.uiGrid}>
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          )}
          {step === "historico" && (
            <div className={styles.ui}>
              <div className={styles.uiLabel}>Histórico</div>
              <div className={styles.uiTimeline}>
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className={styles.uiRow} style={{ width: "80%" }} />
              <div className={styles.uiRow} style={{ width: "66%" }} />
            </div>
          )}
          <div className={`${styles.scanLine} ${styles[`scan_${step}`]}`} />
        </div>
      </div>
    </div>
  );
}

/** Cap. 4 — Busca por placa. */
export function SearchRevealArt({ alive, plate }: Alive & { plate: string }) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.search}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 680 320" fill="none">
        <rect
          x="160"
          y="40"
          width="360"
          height="52"
          rx="8"
          fill="rgba(8,18,36,0.85)"
          stroke="#3d8bfd"
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
        <text x="185" y="72" fill="rgba(125,211,252,0.55)" fontSize="15" fontFamily="var(--font-body), sans-serif">
          {plate}
        </text>
        <path d="M480 66 H500" stroke="#7dd3fc" strokeOpacity="0.5" strokeWidth="1.5" className={styles.scan} />
        <path
          d="M340 92 V120"
          stroke="#3d8bfd"
          strokeOpacity="0.3"
          strokeWidth="1"
          className={styles.revealLine}
        />
        {[
          [120, 160, "Serviços"],
          [260, 160, "Fotos"],
          [400, 160, "Km"],
          [520, 160, "PDF"],
        ].map(([x, y, label], i) => (
          <g key={String(label)} className={styles.revealNode} style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
            <rect
              x={Number(x)}
              y={Number(y)}
              width="100"
              height="64"
              rx="5"
              fill="rgba(8,18,36,0.75)"
              stroke="#3d8bfd"
              strokeOpacity="0.35"
            />
            <text
              x={Number(x) + 16}
              y={Number(y) + 36}
              fill="rgba(158,201,255,0.7)"
              fontSize="11"
              fontFamily="var(--font-body), sans-serif"
            >
              {String(label)}
            </text>
          </g>
        ))}
        <path
          d="M200 224 H480"
          stroke="#3d8bfd"
          strokeOpacity="0.15"
          strokeWidth="1"
          strokeDasharray="4 8"
          className={styles.trail}
        />
      </svg>
    </div>
  );
}

/** Cap. 5 — Grande timeline horizontal. */
export function GrandTimelineArt({
  alive,
  events,
}: Alive & { events: ReadonlyArray<{ id: string; label: string; detail: string; km: string }> }) {
  const count = events.length;
  const start = 60;
  const end = 900;
  const step = (end - start) / Math.max(count - 1, 1);

  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.grand}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 960 280" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="ah-grand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3d8bfd" stopOpacity="0" />
            <stop offset="18%" stopColor="#3d8bfd" stopOpacity="0.45" />
            <stop offset="82%" stopColor="#7dd3fc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M${start} 130 H${end}`}
          stroke="url(#ah-grand)"
          strokeWidth="1.6"
          className={styles.spineLine}
        />
        {alive ? (
          <>
            <path id="ah-grand-path" d={`M${start} 130 H${end}`} fill="none" />
            <circle r="3" fill="#8fc3ff" className={styles.travel}>
              <animateMotion dur="16s" repeatCount="indefinite">
                <mpath href="#ah-grand-path" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#3d8bfd" className={styles.travel}>
              <animateMotion dur="22s" repeatCount="indefinite" begin="5s">
                <mpath href="#ah-grand-path" />
              </animateMotion>
            </circle>
          </>
        ) : null}
        {events.map((e, i) => {
          const x = start + step * i;
          const up = i % 2 === 0;
          return (
            <g key={e.id} className={styles.spineNode} style={{ animationDelay: `${i * 0.5}s` }}>
              <line
                x1={x}
                y1={130}
                x2={x}
                y2={up ? 78 : 182}
                stroke="#3d8bfd"
                strokeOpacity="0.28"
                strokeWidth="1"
              />
              <circle cx={x} cy={130} r="5.5" fill="rgba(8,18,36,0.95)" stroke="#3d8bfd" strokeOpacity="0.55" />
              <circle cx={x} cy={130} r="2" fill="#7dd3fc" fillOpacity="0.75" />
              <text
                x={x}
                y={up ? 58 : 208}
                textAnchor="middle"
                fill="rgba(232,240,250,0.78)"
                fontSize="12"
                fontFamily="var(--font-instrument), sans-serif"
              >
                {e.label}
              </text>
              <text
                x={x}
                y={up ? 74 : 224}
                textAnchor="middle"
                fill="rgba(125,211,252,0.4)"
                fontSize="9"
                fontFamily="var(--font-body), sans-serif"
              >
                {e.km}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Cap. 6 — Marcas técnicas de confiança. */
export function TrustMarksArt({ alive }: Alive) {
  return (
    <div className={`${styles.art} ${alive ? styles.alive : ""} ${styles.trust}`} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="46" stroke="#3d8bfd" strokeOpacity="0.2" strokeWidth="1" className={styles.breathe} />
        <circle cx="60" cy="60" r="28" stroke="#3d8bfd" strokeOpacity="0.28" strokeWidth="1" />
        <path
          d="M44 62 L54 72 L78 46"
          stroke="#7dd3fc"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.check}
        />
      </svg>
    </div>
  );
}
