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
      {/* Background Container Removed */}\n      <rect x="0" y="0" width={gridWidth} height={height + 40} fill="transparent" />

      {/* Beat Backgrounds (Alternating) */}
      {Array.from({ length: totalBeats }).map((_, i) => (
        <rect
          key={i}
          x={i * beatWidth}
          y="40"
          width={beatWidth}
          height={height}
          fill={i % 2 === 0 ? "var(--muted)" : "transparent"}
          fillOpacity={i % 2 === 0 ? 0.5 : 0}
        />
      ))}

      {/* Subdivision Grid Lines (Eighth Notes) */}
      {Array.from({ length: totalBeats }).map((_, i) => (
        <line
          key={i}
          x1={i * beatWidth + (beatWidth / 2)}
          y1="40"
          x2={i * beatWidth + (beatWidth / 2)}
          y2={height + 40}
          stroke="var(--border)"
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
            fill="var(--foreground)"
            fontSize="24"
            fontWeight="bold"
          >
            {i + 1}
          </text>
          {/* "and" label for subdivision */}
          <text
            x={i * beatWidth + beatWidth / 2 + 5}
            y="30"
            textAnchor="start"
            fill="var(--muted-foreground)"
            fontSize="16"
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
            rx={note.type === "note" ? "6" : "2"}
            fill={note.type === "note" ? "var(--primary)" : "var(--secondary)"}
            stroke={note.type === "note" ? "var(--primary-foreground)" : "none"}
            strokeWidth="2"
            opacity={note.type === "rest" ? 0.8 : 1}
          />
          {/* Note Label */}
          {note.type === "note" && (
            <text
              x={note.start * beatWidth + (note.duration * beatWidth) / 2}
              y="98"
              textAnchor="middle"
              fill="var(--primary-foreground)"
              fontSize="16"
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
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
