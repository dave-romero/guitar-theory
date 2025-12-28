import React from "react";

interface TabLegendProps {
  primaryLabel?: string;
  secondaryLabel?: string;
}

export function TabLegend({ 
  primaryLabel = "Root Note", 
  secondaryLabel = "Regular Note" 
}: TabLegendProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-card border border-border rounded-lg shadow-sm w-fit">
      <span className="text-sm font-serif font-medium text-muted-foreground">Key:</span>
      
      {/* Primary Note */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-sm"></div>
        <span className="text-xs font-medium text-foreground">{primaryLabel}</span>
      </div>

      {/* Secondary Note */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-secondary border-2 border-background shadow-sm"></div>
        <span className="text-xs font-medium text-foreground">{secondaryLabel}</span>
      </div>

      {/* Open String */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-background border-2 border-muted-foreground shadow-sm"></div>
        <span className="text-xs font-medium text-foreground">Open String</span>
      </div>
    </div>
  );
}
