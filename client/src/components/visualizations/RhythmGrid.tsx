import React from "react";

interface RhythmGridProps {
  timeSignature: [number, number]; // e.g., [4, 4] or [3, 4]
  notes: { start: number; duration: number; type: "note" | "rest" }[]; // start/duration in beats
  activeBeat?: number;
}

export function RhythmGrid({ timeSignature, notes, activeBeat }: RhythmGridProps) {
  const [beatsPerBar, beatUnit] = timeSignature;
  const totalBeats = beatsPerBar;
  const gridWidth = 600;
  const beatWidth = gridWidth / totalBeats;
  const height = 120;

  return (
    <svg width="100%" viewBox={`0 0 ${gridWidth} ${height + 40}`} className="w-full max-w-2xl mx-auto drop-shadow-sm">
      {/* Background Container */}
      <rect x="0" y="0" width={gridWidth} height={height + 40} fill="hsl(var(--card))" rx="12" stroke="hsl(var(--border))" strokeWidth="1" />

      {/* Beat Backgrounds (Alternating) */}
      {Array.from({ length: totalBeats }).map((_, i) => (
        <rect
          key={i}
          x={i * beatWidth}
          y="40"
          width={beatWidth}
          height={height}
          fill={i % 2 === 0 ? "hsl(var(--muted)/0.3)" : "transparent"}
        />
      ))}

      {/* Subdivision Grid Lines (Eighth Notes) */}
      {Array.from({ length: totalBeats * 2 }).map((_, i) => (
        <line
          key={i}
          x1={i * (beatWidth / 2)}
          y1="40"
          x2={i * (beatWidth / 2)}
          y2={height + 40}
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        />
      ))}

      {/* Beat Numbers */}
      {Array.from({ length: totalBeats }).map((_, i) => (
        <g key={i}>
          <text
            x={i * beatWidth + 10}
            y="30"
            textAnchor="start"
            fill="hsl(var(--foreground))"
            fontSize="16"
            fontWeight="bold"
          >
            {i + 1}
          </text>
          {/* "and" label for subdivision */}
          <text
            x={i * beatWidth + beatWidth / 2 + 5}
            y="30"
            textAnchor="start"
            fill="hsl(var(--muted-foreground))"
            fontSize="12"
          >
            &
          </text>
        </g>
      ))}

      {/* Notes */}
      {notes.map((note, i) => (
        <g key={i}>
          <rect
            x={note.start * beatWidth}
            y={note.type === "note" ? 60 : 80}
            width={note.duration * beatWidth - 4} // Gap
            height={note.type === "note" ? 60 : 20}
            rx="6"
            fill={note.type === "note" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
            stroke={note.type === "note" ? "hsl(var(--primary-foreground))" : "none"}
            strokeWidth="2"
            opacity={note.type === "rest" ? 0.5 : 1}
          />
          {/* Note Label */}
          {note.type === "note" && (
            <text
              x={note.start * beatWidth + (note.duration * beatWidth) / 2}
              y="95"
              textAnchor="middle"
              fill="hsl(var(--primary-foreground))"
              fontSize="12"
              fontWeight="bold"
            >
              {note.duration >= 1 ? "Whole" : note.duration >= 0.5 ? "Half" : "Hit"}
            </text>
          )}
        </g>
      ))}

      {/* Playhead */}
      {activeBeat !== undefined && (
        <line
          x1={activeBeat * beatWidth}
          y1="20"
          x2={activeBeat * beatWidth}
          y2={height + 40}
          stroke="hsl(var(--accent))"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
