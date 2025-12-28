import React from "react";
import { GuitarTab } from "@/components/GuitarTab";
import { TabLegend } from "@/components/TabLegend";

export default function TestTabs() {
  return (
    <div className="container py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif text-primary">SVG Tab Prototype</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Comparing the new SVG rendering system against the traditional ASCII tabs.
          SVGs allow for better scaling, color coding, and semantic labeling.
        </p>
        
        <div className="pt-4">
          <TabLegend />
        </div>
      </div>

      {/* Example 1: C Major Chord */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif">Example 1: C Major Chord</h3>
          <div className="p-6 bg-card border border-border rounded-lg font-mono text-sm whitespace-pre overflow-x-auto">
{`e|---0---|
B|---1---|
G|---0---|
D|---2---|
A|---3---|
E|-------|`}
          </div>
          <p className="text-sm text-muted-foreground">Current ASCII Style</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-transparent select-none">.</h3>
          <GuitarTab 
            title="C Major (Open Position)"
            startFret={1}
            fretCount={4}
            markers={[
              { string: 1, fret: 0 }, // Open E
              { string: 2, fret: 1, label: "C", color: "primary" },
              { string: 3, fret: 0 }, // Open G
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 5, fret: 3, label: "C", color: "primary" },
            ]}
          />
          <p className="text-sm text-muted-foreground">New SVG Style (Color Coded: Root=Orange, 3rd=Gray)</p>
        </div>
      </div>

      {/* Example 2: A Minor Pentatonic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif">Example 2: A Minor Pentatonic</h3>
          <div className="p-6 bg-card border border-border rounded-lg font-mono text-sm whitespace-pre overflow-x-auto">
{`e|-----------------5--8--|
B|-----------5--8--------|
G|-----5--7--------------|
D|--5--7-----------------|
A|-----------------------|
E|-----------------------|`}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-transparent select-none">.</h3>
          <GuitarTab 
            title="A Minor Pentatonic (Position 1)"
            startFret={5}
            fretCount={5}
            markers={[
              { string: 4, fret: 5, label: "G", color: "secondary" },
              { string: 4, fret: 7, label: "A", color: "primary" },
              { string: 3, fret: 5, label: "C", color: "secondary" },
              { string: 3, fret: 7, label: "D", color: "secondary" },
              { string: 2, fret: 5, label: "E", color: "secondary" },
              { string: 2, fret: 8, label: "G", color: "secondary" },
              { string: 1, fret: 5, label: "A", color: "primary" },
              { string: 1, fret: 8, label: "C", color: "secondary" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
