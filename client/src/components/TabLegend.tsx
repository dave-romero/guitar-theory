import { LegendItem } from "../lib/lessons";

interface TabLegendProps {
  items?: LegendItem[];
}

export function TabLegend({ items }: TabLegendProps) {
  // Default items if none provided (backward compatibility)
  const displayItems = items || [
    { label: "Root Note", color: "primary" },
    { label: "Regular Note", color: "secondary" },
    { label: "Open String", color: "secondary", outline: true }
  ];

  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-card border border-border rounded-lg shadow-sm w-fit">
      <span className="text-sm font-serif font-medium text-muted-foreground">Key:</span>
      
      {displayItems.map((item, index) => {
        let bgClass = "";
        let borderClass = "";

        if (item.outline) {
          bgClass = "bg-background";
          if (item.color === "primary") borderClass = "border-primary";
          else if (item.color === "blue") borderClass = "border-[var(--color-blue)]";
          else borderClass = "border-secondary";
        } else {
          borderClass = "border-background";
          if (item.color === "primary") bgClass = "bg-primary";
          else if (item.color === "blue") bgClass = "bg-[var(--color-blue)]";
          else if (item.color === "secondary") bgClass = "bg-secondary";
          else bgClass = "bg-muted";
        }

        return (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full border-2 shadow-sm ${bgClass} ${borderClass}`}></div>
            <span className="text-xs font-medium text-foreground">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}