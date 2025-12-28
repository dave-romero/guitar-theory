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
  const width = 600;
  const height = 150;
  const gap = 4;

  let currentX = 0;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl mx-auto">
      {sections.map((section, i) => {
        const sectionWidth = (section.duration / totalDuration) * width;
        const sectionHeight = section.intensity * (height - 30); // Leave room for labels
        const y = height - sectionHeight - 20; // Bottom aligned

        const rect = (
          <g key={i}>
            <rect
              x={currentX}
              y={y}
              width={sectionWidth - gap}
              height={sectionHeight}
              rx="4"
              fill={`hsl(var(--${section.color}))`}
            />
            <text
              x={currentX + (sectionWidth - gap) / 2}
              y={height - 5}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="hsl(var(--foreground))"
            >
              {section.name}
            </text>
          </g>
        );

        currentX += sectionWidth;
        return rect;
      })}
    </svg>
  );
}
