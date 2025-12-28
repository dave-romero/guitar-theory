import React from "react";

interface Section {
  name: string;
  duration: number; // Relative width
  intensity: number; // 0.0 to 1.0 (Height)
  color: "primary" | "secondary" | "accent" | "muted";
}

interface SongStructureProps {
  sections: Section[];
}

export function SongStructure({ sections }: SongStructureProps) {
  const totalDuration = sections.reduce((sum, s) => sum + s.duration, 0);
  const width = 800;
  const height = 200;
  const gap = 6;

  let currentX = 0;

  // Generate path for the energy curve
  const curvePoints = sections.map((s, i) => {
    const sectionWidth = (s.duration / totalDuration) * width;
    const x = currentX + sectionWidth / 2;
    const y = height - (s.intensity * (height - 40)) - 20;
    currentX += sectionWidth;
    return `${x},${y}`;
  });
  
  // Reset X for rendering blocks
  currentX = 0;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="w-full max-w-3xl mx-auto drop-shadow-sm">
      {/* Background Grid */}
      <line x1="0" y1={height - 20} x2={width} y2={height - 20} stroke="hsl(var(--border))" strokeWidth="2" />
      
      {/* Energy Curve (Behind blocks) */}
      <path
        d={`M 0,${height-20} L ${curvePoints.join(" L ")} L ${width},${height-20}`}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.2"
      />

      {sections.map((section, i) => {
        const sectionWidth = (section.duration / totalDuration) * width;
        const sectionHeight = section.intensity * (height - 50); 
        const y = height - sectionHeight - 30; // Bottom aligned

        const rect = (
          <g key={i}>
            {/* Block */}
            <rect
              x={currentX}
              y={y}
              width={sectionWidth - gap}
              height={sectionHeight}
              rx="8"
              fill={`hsl(var(--${section.color}))`}
              stroke="hsl(var(--background))"
              strokeWidth="2"
              opacity="0.9"
            />
            
            {/* Top Label (Name) */}
            <text
              x={currentX + (sectionWidth - gap) / 2}
              y={y - 10}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="hsl(var(--foreground))"
            >
              {section.name}
            </text>

            {/* Inner Label (Bars) */}
            <text
              x={currentX + (sectionWidth - gap) / 2}
              y={height - 40}
              textAnchor="middle"
              fontSize="12"
              fill="hsl(var(--primary-foreground))"
              opacity="0.8"
            >
              {section.duration} Bars
            </text>
          </g>
        );

        currentX += sectionWidth;
        return rect;
      })}
    </svg>
  );
}
