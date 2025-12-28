import React from "react";

export interface Marker {
  string: number; // 1 (High E) to 6 (Low E)
  fret: number;   // 0 for open, 1+ for frets
  label?: string; // Optional text inside the marker (e.g., "R", "3", "5")
  color?: "primary" | "secondary" | "accent" | "muted" | "blue"; // Theme colors
}

interface GuitarTabProps {
  startFret?: number;
  fretCount?: number;
  markers: Marker[];
  title?: string;
}

  export function GuitarTab({ 
  startFret = 1, 
  fretCount = 5, 
  markers,
  title 
}: GuitarTabProps) {
  // Dimensions
  const padding = { top: 25, right: 30, bottom: 35, left: 50 };
  const height = 200;
  
  // Dynamic width based on fret count (min 40px per fret)
  const fretWidth = 40;
  const width = padding.left + padding.right + (fretCount * fretWidth);
  
  const drawingWidth = width - padding.left - padding.right;
  const drawingHeight = height - padding.top - padding.bottom;
  
  const stringSpacing = drawingHeight / 5;
  const fretSpacing = drawingWidth / fretCount;

  // Helper to get Y coordinate for a string (1-6)
  // String 1 is top visually in standard tab, but let's stick to standard diagram view:
  // Usually diagrams show High E at top or bottom? 
  // Standard Chord Boxes: Vertical.
  // Standard Tabs: Horizontal, High E at top.
  // Let's do Horizontal Tab style since that's what we're replacing.
  // String 1 (High E) = Top (y = 0)
  const getStringY = (stringNum: number) => (stringNum - 1) * stringSpacing;

  // Helper to get X coordinate for a fret
  // Fret 0 is to the left of the nut (or start).
  // Fret 1 is in the middle of the first fret block.
  const getFretX = (fretNum: number) => {
    if (fretNum === 0) return -20; // Open string marker position (further left)
    const relativeFret = fretNum - startFret + 1;
    return (relativeFret * fretSpacing) - (fretSpacing / 2);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {title && <h4 className="font-serif text-lg text-foreground">{title}</h4>}
      
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible" // Allow labels to extend slightly if needed
      >
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Draw Frets (Vertical Lines) */}
          {Array.from({ length: fretCount + 1 }).map((_, i) => (
            <line
              key={`fret-${i}`}
              x1={i * fretSpacing}
              y1={0}
              x2={i * fretSpacing}
              y2={drawingHeight}
              stroke="currentColor"
              strokeWidth={i === 0 && startFret === 1 ? 4 : 1} // Nut is thicker
              className="text-muted-foreground"
            />
          ))}

          {/* Draw Strings (Horizontal Lines) */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`string-${i}`}
              x1={0}
              y1={i * stringSpacing}
              x2={drawingWidth}
              y2={i * stringSpacing}
              stroke="currentColor"
              strokeWidth={i + 1} // Thicker for lower strings
              className="text-foreground"
            />
          ))}

          {/* Fret Numbers (Bottom) */}
          {Array.from({ length: fretCount }).map((_, i) => (
            <text
              key={`fret-num-${i}`}
              x={(i * fretSpacing) + (fretSpacing / 2)}
              y={drawingHeight + 20}
              textAnchor="middle"
              className="text-xs fill-muted-foreground font-mono"
            >
              {startFret + i}
            </text>
          ))}

          {/* String Names (Left) */}
          {['e', 'B', 'G', 'D', 'A', 'E'].map((note, i) => (
            <text
              key={`string-name-${i}`}
              x={-35} // Moved further left to avoid overlap
              y={i * stringSpacing + 4}
              textAnchor="end"
              className="text-xs fill-muted-foreground font-mono font-bold"
            >
              {note}
            </text>
          ))}

          {/* Markers */}
          {markers.map((marker, i) => {
            // Filter out markers not in current view
            if (marker.fret !== 0 && (marker.fret < startFret || marker.fret >= startFret + fretCount)) return null;

            const cx = getFretX(marker.fret);
            const cy = getStringY(marker.string);
            
            // Color logic
            let fillClass = "fill-primary";
            let textClass = "fill-primary-foreground";
            let strokeClass = "stroke-background";
            
            if (marker.color === "secondary") { fillClass = "fill-secondary"; textClass = "fill-secondary-foreground"; }
            if (marker.color === "accent") { fillClass = "fill-accent"; textClass = "fill-accent-foreground"; }
            if (marker.color === "muted") { fillClass = "fill-muted"; textClass = "fill-muted-foreground"; }
            if (marker.color === "blue") { fillClass = "fill-[var(--color-blue)]"; textClass = "fill-[var(--color-blue-foreground)]"; }

            // Special styling for open strings (fret 0)
            if (marker.fret === 0) {
              fillClass = "fill-background"; // Use background color (cream) instead of transparent to hide line behind it
              // Dynamic border color: Primary (Orange), Blue, or Secondary (Gray)
              if (marker.color === "primary") strokeClass = "stroke-primary";
              else if (marker.color === "blue") strokeClass = "stroke-[var(--color-blue)]";
              else strokeClass = "stroke-secondary";
            }

            return (
              <g key={`marker-${i}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={marker.fret === 0 ? 7 : 10} 
                  className={`${fillClass} ${strokeClass} stroke-2`}
                />
                {marker.label && marker.fret !== 0 && (
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    className={`text-[10px] font-bold ${textClass}`}
                  >
                    {marker.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
