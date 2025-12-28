import React from "react";

interface CircleOfFifthsProps {
  activeKey?: string; // e.g., "C"
}

export function CircleOfFifths({ activeKey }: CircleOfFifthsProps) {
  const keys = [
    "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"
  ];
  
  const radius = 150;
  const center = 200;
  const sliceAngle = 360 / 12;

  return (
    <svg width="100%" viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
      {/* Background Circle */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />

      {keys.map((key, i) => {
        const angle = (i * sliceAngle - 90) * (Math.PI / 180);
        const x = center + Math.cos(angle) * (radius - 30);
        const y = center + Math.sin(angle) * (radius - 30);
        
        const isActive = key === activeKey;

        return (
          <g key={key}>
            {/* Slice Highlight (if active) */}
            {isActive && (
              <path
                d={`M ${center} ${center} L ${center + Math.cos(angle - 0.26) * radius} ${center + Math.sin(angle - 0.26) * radius} A ${radius} ${radius} 0 0 1 ${center + Math.cos(angle + 0.26) * radius} ${center + Math.sin(angle + 0.26) * radius} Z`}
                fill="hsl(var(--primary))"
                opacity="0.2"
              />
            )}
            
            {/* Key Label */}
            <circle cx={x} cy={y} r="20" fill={isActive ? "hsl(var(--primary))" : "hsl(var(--card))"} stroke="hsl(var(--border))" />
            <text
              x={x}
              y={y}
              dy="5"
              textAnchor="middle"
              fontWeight="bold"
              fill={isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
            >
              {key}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
