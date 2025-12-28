import React from "react";

export function TabLegend() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-card border border-border rounded-lg shadow-sm w-fit">
      <span className="text-sm font-serif font-medium text-muted-foreground">Key:</span>
      
      {/* Root Note */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-sm"></div>
        <span className="text-xs font-medium text-foreground">Root Note</span>
      </div>

      {/* Scale/Chord Note */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-secondary border-2 border-background shadow-sm"></div>
        <span className="text-xs font-medium text-foreground">Scale Note</span>
      </div>

      {/* Interval/Special Note */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-accent border-2 border-background shadow-sm"></div>
        <span className="text-xs font-medium text-foreground">Interval / Special</span>
      </div>
    </div>
  );
}
