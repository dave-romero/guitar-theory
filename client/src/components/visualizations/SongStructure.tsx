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
  const width = 860;
  const height = 200;
  const gap = 6;

  let currentX = 60;

  // Generate path for the energy curve
  const curvePoints = sections.map((s, i) => {
    const sectionWidth = (s.duration / totalDuration) * (width - 60);
    const x = currentX + sectionWidth / 2;
    const y = height - (s.intensity * (height - 40)) - 20;
    currentX += sectionWidth;
    return `${x},${y}`;
  });
  
  // Reset X for rendering blocks
  currentX = 60;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="w-full max-w-3xl mx-auto drop-shadow-sm">
      {/* Energy Axis */}
      <line x1="50" y1="40" x2="50" y2={height - 40} stroke="var(--border)" strokeWidth="2" />
      <text x="40" y="50" textAnchor="end" fontSize="12" fill="var(--muted-foreground)">High</text>
      <text x="40" y={height - 40} textAnchor="end" fontSize="12" fill="var(--muted-foreground)">Low</text>
      <text x="20" y={height / 2} textAnchor="middle" transform={`rotate(-90, 20, ${height / 2})`} fontSize="14" fontWeight="bold" fill="var(--muted-foreground)">Energy</text>

      {/* Background Grid */}
      <line x1="0" y1={height - 20} x2={width} y2={height - 20} stroke="var(--border)" strokeWidth="2" />
      
      {/* Energy Curve (Behind blocks) */}
      <path
        d={`M 0,${height-20} L ${curvePoints.join(" L ")} L ${width},${height-20}`}
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.2"
      />

      {sections.map((section, i) => {
        const sectionWidth = (section.duration / totalDuration) * (width - 60);
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
              fill={`var(--${section.color})`}
              stroke="var(--background)"
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
              fill="var(--foreground)"
            >
              {section.name.split("-").map((part, i) => (
                <tspan key={i} x={currentX + (sectionWidth - gap) / 2} dy={i === 0 ? 0 : 16}>
                  {part}{i < section.name.split("-").length - 1 ? "-" : ""}
                </tspan>
              ))}
            </text>

            {/* Inner Label (Bars) */}
            <text
              x={currentX + (sectionWidth - gap) / 2}
              y={height - 40}
              textAnchor="middle"
              fontSize="12"
              fill={section.color === "primary" ? "var(--primary-foreground)" : "var(--foreground)"}
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
