import React from "react";

interface CircleOfFifthsProps {
  activeKey?: string; // e.g., "C"
}

export function CircleOfFifths({ activeKey }: CircleOfFifthsProps) {
  const majorKeys = [
    "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"
  ];
  
  const minorKeys = [
    "Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "Bbm", "Fm", "Cm", "Gm", "Dm"
  ];
  
  const radius = 195;
  const center = 200;
  const sliceAngle = 360 / 12;

  return (
    <svg width="100%" viewBox="0 0 400 400" className="w-full max-w-md mx-auto drop-shadow-md">
      {/* Outer Ring (Major) */}
      <circle cx={center} cy={center} r={radius} fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
      
      {/* Inner Ring (Minor) */}
      <circle cx={center} cy={center} r={radius * 0.65} fill="var(--muted)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />

      {majorKeys.map((key, i) => {
        const angleDeg = i * sliceAngle - 90;
        const angleRad = angleDeg * (Math.PI / 180);
        
        // Major Key Position
        const xMaj = center + Math.cos(angleRad) * (radius * 0.82);
        const yMaj = center + Math.sin(angleRad) * (radius * 0.82);
        
        // Minor Key Position
        const xMin = center + Math.cos(angleRad) * (radius * 0.5);
        const yMin = center + Math.sin(angleRad) * (radius * 0.5);
        
        const isActive = key === activeKey;
        const isSharp = ["G", "D", "A", "E", "B", "F#"].includes(key);
        const isFlat = ["F", "Bb", "Eb", "Ab", "Db"].includes(key);

        return (
          <g key={key}>
            {/* Slice Highlight (if active) */}
            {isActive && (
              <path
                d={`M ${center} ${center} 
                   L ${center + Math.cos((angleDeg - 15) * Math.PI / 180) * radius} ${center + Math.sin((angleDeg - 15) * Math.PI / 180) * radius} 
                   A ${radius} ${radius} 0 0 1 ${center + Math.cos((angleDeg + 15) * Math.PI / 180) * radius} ${center + Math.sin((angleDeg + 15) * Math.PI / 180) * radius} 
                   Z`}
                fill="var(--primary)"
                opacity="0.2"
              />
            )}
            
            {/* Major Key Label */}
            <text
              x={xMaj}
              y={yMaj}
              dy="5"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="22"
              fill={isActive ? "var(--primary)" : "var(--foreground)"}
            >
              {key}
            </text>

            {/* Minor Key Label */}
            <text
              x={xMin}
              y={yMin}
              dy="4"
              textAnchor="middle"
              fontSize="16"
              fontWeight="500"
              fill={isActive ? "var(--primary)" : "var(--foreground)"}
            >
              {minorKeys[i]}
            </text>
            
            {/* Divider Lines */}
            <line
                x1={center + Math.cos((angleDeg + 15) * Math.PI / 180) * (radius * 0.65)}
                y1={center + Math.sin((angleDeg + 15) * Math.PI / 180) * (radius * 0.65)}
                x2={center + Math.cos((angleDeg + 15) * Math.PI / 180) * radius}
                y2={center + Math.sin((angleDeg + 15) * Math.PI / 180) * radius}
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.5"
            />
          </g>
        );
      })}
      
      {/* Center Label */}
      <circle cx={center} cy={center} r={radius * 0.25} fill="var(--background)" stroke="var(--border)" />
      <text x={center} y={center} dy="6" textAnchor="middle" fontSize="14" fontWeight="bold" fill="var(--foreground)">
        KEY
      </text>
    </svg>
  );
}
