import React from "react";

interface RhythmGridProps {
  timeSignature: [number, number]; // e.g., [4, 4] or [3, 4]
  notes: { start: number; duration: number; type: "note" | "rest" }[]; // start/duration in beats
  activeBeat?: number;
}

export function RhythmGrid({ timeSignature, notes, activeBeat }: RhythmGridProps) {
  const [beatsPerBar, beatUnit] = timeSignature;
  const totalBeats = beatsPerBar; // Show 1 bar for simplicity
  const gridWidth = 400;
  const beatWidth = gridWidth / totalBeats;
  const height = 100;

  return (
    <svg width="100%" viewBox={`0 0 ${gridWidth} ${height + 40}`} className="w-full max-w-md mx-auto">
      {/* Grid Background */}
      <rect x="0" y="20" width={gridWidth} height={height} fill="hsl(var(--muted))" rx="8" />

      {/* Beat Markers */}
      {Array.from({ length: totalBeats + 1 }).map((_, i) => (
        <line
          key={i}
          x1={i * beatWidth}
          y1="20"
          x2={i * beatWidth}
          y2={height + 20}
          stroke="hsl(var(--background))"
          strokeWidth="2"
          opacity="0.5"
        />
      ))}

      {/* Beat Numbers */}
      {Array.from({ length: totalBeats }).map((_, i) => (
        <text
          key={i}
          x={i * beatWidth + beatWidth / 2}
          y="15"
          textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="12"
          fontWeight="bold"
        >
          {i + 1}
        </text>
      ))}

      {/* Notes */}
      {notes.map((note, i) => (
        <rect
          key={i}
          x={note.start * beatWidth}
          y={note.type === "note" ? 40 : 60}
          width={note.duration * beatWidth - 2} // -2 for gap
          height={note.type === "note" ? 60 : 20}
          rx="4"
          fill={note.type === "note" ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
          opacity={note.type === "rest" ? 0.5 : 1}
        />
      ))}

      {/* Playhead (Optional) */}
      {activeBeat !== undefined && (
        <line
          x1={activeBeat * beatWidth}
          y1="10"
          x2={activeBeat * beatWidth}
          y2={height + 30}
          stroke="hsl(var(--accent))"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
