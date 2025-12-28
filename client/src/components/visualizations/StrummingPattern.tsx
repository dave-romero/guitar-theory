import React from "react";

interface StrummingPatternProps {
  pattern: ("D" | "U" | "x" | "-")[]; // Down, Up, Slap, Miss
}

export function StrummingPattern({ pattern }: StrummingPatternProps) {
  const width = 600;
  const step = width / pattern.length;
  const height = 150;

  // Generate counts (1 e & a) based on pattern length
  const getCountLabel = (index: number, total: number) => {
    if (total === 4) return (index + 1).toString();
    if (total === 8) return index % 2 === 0 ? (index / 2 + 1).toString() : "&";
    if (total === 16) {
      const beat = Math.floor(index / 4) + 1;
      const sub = index % 4;
      if (sub === 0) return beat.toString();
      if (sub === 1) return "e";
      if (sub === 2) return "&";
      if (sub === 3) return "a";
    }
    return "";
  };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl mx-auto drop-shadow-sm">
      {/* Background Track */}
      <rect x="0" y="50" width={width} height="50" fill="var(--muted)" fillOpacity="0.2" rx="25" />
      
      {/* Center Line */}
      <line x1="20" y1="75" x2={width - 20} y2="75" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 8" />

      {pattern.map((strum, i) => {
        const x = i * step + step / 2;
        const y = 75; // Center line
        
        if (strum === "-") {
            // Ghost Note (Miss)
            return (
                <g key={i} transform={`translate(${x}, ${y})`} opacity="0.3">
                    <circle r="4" fill="var(--muted-foreground)" />
                    <text y="50" textAnchor="middle" fill="var(--muted-foreground)" fontSize="18" fontWeight="bold">
                        {getCountLabel(i, pattern.length)}
                    </text>
                </g>
            )
        }

        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Strum Arrow */}
            {strum === "D" && (
              <path
                d="M -20 -35 L 20 -35 L 0 35 Z"
                fill="var(--primary)"
                stroke="var(--background)"
                strokeWidth="3"
                filter="drop-shadow(0px 4px 2px rgba(0,0,0,0.1))"
              />
            )}
            {strum === "U" && (
              <path
                d="M -20 35 L 20 35 L 0 -35 Z"
                fill="var(--accent)"
                stroke="var(--background)"
                strokeWidth="3"
                filter="drop-shadow(0px 4px 2px rgba(0,0,0,0.1))"
              />
            )}
            {strum === "x" && (
              <g>
                <circle r="25" fill="var(--destructive)" opacity="0.2" />
                <text
                    x="0"
                    y="10"
                    textAnchor="middle"
                    fontSize="30"
                    fontWeight="bold"
                    fill="var(--destructive)"
                >
                    ×
                </text>
              </g>
            )}

            {/* Label */}
            <text
              x="0"
              y="-45"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill="var(--foreground)"
              className="uppercase tracking-wider"
            >
              {strum === "x" ? "Slap" : strum === "D" ? "Down" : "Up"}
            </text>

            {/* Count (1 e & a) */}
            <text
              x="0"
              y="60"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill="var(--foreground)"
            >
              {getCountLabel(i, pattern.length)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
