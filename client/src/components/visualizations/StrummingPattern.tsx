import React from "react";

interface StrummingPatternProps {
  pattern: ("D" | "U" | "x" | "-")[]; // Down, Up, Slap, Miss
}

export function StrummingPattern({ pattern }: StrummingPatternProps) {
  const width = 400;
  const step = width / pattern.length;
  const height = 100;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md mx-auto">
      {pattern.map((strum, i) => {
        const x = i * step + step / 2;
        const y = height / 2;
        
        if (strum === "-") return null;

        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {strum === "D" && (
              <path
                d="M -10 -20 L 10 -20 L 0 20 Z"
                fill="hsl(var(--primary))"
              />
            )}
            {strum === "U" && (
              <path
                d="M -10 20 L 10 20 L 0 -20 Z"
                fill="hsl(var(--accent))"
              />
            )}
            {strum === "x" && (
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fontSize="40"
                fontWeight="bold"
                fill="hsl(var(--muted))"
              >
                ×
              </text>
            )}
            <text
              x="0"
              y="40"
              textAnchor="middle"
              fontSize="12"
              fill="hsl(var(--foreground))"
              className="uppercase"
            >
              {strum === "x" ? "Slap" : strum === "D" ? "Down" : "Up"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
