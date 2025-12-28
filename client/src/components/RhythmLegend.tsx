import React from "react";

interface RhythmLegendItem {
  label: string;
  type: "note" | "rest" | "beat" | "subdivision";
}

interface RhythmLegendProps {
  items?: RhythmLegendItem[];
}

export function RhythmLegend({ items }: RhythmLegendProps) {
  const displayItems: RhythmLegendItem[] = items || [
    { label: "Note (Sound)", type: "note" },
    { label: "Rest (Silence)", type: "rest" },
    { label: "Main Beat", type: "beat" },
    { label: "Subdivision (&)", type: "subdivision" }
  ];

  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-card border border-border rounded-lg shadow-sm w-fit">
      <span className="text-sm font-serif font-medium text-muted-foreground">Key:</span>
      
      {displayItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Icon/Symbol */}
          <div className="flex items-center justify-center w-6 h-6">
            {item.type === "note" && (
              <div className="w-4 h-4 rounded bg-primary border border-primary-foreground shadow-sm"></div>
            )}
            {item.type === "rest" && (
              <div className="w-4 h-1 rounded bg-secondary opacity-80"></div>
            )}
            {item.type === "beat" && (
              <div className="w-4 h-6 bg-muted opacity-50 border border-border"></div>
            )}
            {item.type === "subdivision" && (
              <div className="h-6 border-l border-dashed border-border"></div>
            )}
          </div>
          
          {/* Label */}
          <span className="text-xs font-medium text-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
