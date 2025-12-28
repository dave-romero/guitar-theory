import React from "react";
import { RhythmGrid } from "../components/visualizations/RhythmGrid";
import { RhythmLegend } from "../components/RhythmLegend";
import { StrummingPattern } from "../components/visualizations/StrummingPattern";
import { SongStructure } from "../components/visualizations/SongStructure";
import { CircleOfFifths } from "../components/visualizations/CircleOfFifths";

export default function DesignLab() {
  return (
    <div className="container py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Visualization Design Lab</h1>
        <p className="text-xl text-muted-foreground">
          Prototyping new SVG components for abstract theory concepts.
        </p>
      </div>

      {/* RhythmGrid Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold">1. RhythmGrid</h2>
          <p className="text-muted-foreground">Intended for: Time Signatures, Note Values, Syncopation</p>
        </div>
        
        {/* Global Legend for RhythmGrid */}
        <div className="flex justify-center">
          <RhythmLegend />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="font-medium">4/4 Time (Standard)</h3>
            <div className="p-6 border rounded-lg bg-card">
              <RhythmGrid
                timeSignature={[4, 4]}
                notes={[
                  { start: 0, duration: 1, type: "note" },
                  { start: 1, duration: 1, type: "note" },
                  { start: 2, duration: 0.5, type: "note" },
                  { start: 2.5, duration: 0.5, type: "note" },
                  { start: 3, duration: 1, type: "rest" },
                ]}
                activeBeat={2}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">3/4 Time (Waltz)</h3>
            <div className="p-6 border rounded-lg bg-card">
              <RhythmGrid
                timeSignature={[3, 4]}
                notes={[
                  { start: 0, duration: 1, type: "note" },
                  { start: 1, duration: 1, type: "note" },
                  { start: 2, duration: 1, type: "note" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* StrummingPattern Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold">2. StrummingPattern</h2>
          <p className="text-muted-foreground">Intended for: Strumming Patterns, Groove, Percussive Guitar</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="font-medium">Island Strum (D - D U - U D U)</h3>
            <div className="p-6 border rounded-lg bg-card">
              <StrummingPattern
                pattern={["D", "-", "D", "U", "-", "U", "D", "U"]}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Percussive Slap</h3>
            <div className="p-6 border rounded-lg bg-card">
              <StrummingPattern
                pattern={["D", "x", "D", "U", "x", "U", "D", "x"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SongStructure Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold">3. SongStructure</h2>
          <p className="text-muted-foreground">Intended for: Verse/Chorus, Dynamics, Arrangement</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Standard Pop Structure</h3>
          <div className="p-6 border rounded-lg bg-card">
            <SongStructure
              sections={[
                { name: "Intro", duration: 4, intensity: 0.4, color: "muted" },
                { name: "Verse 1", duration: 8, intensity: 0.3, color: "secondary" },
                { name: "Pre-Chorus", duration: 4, intensity: 0.6, color: "primary" },
                { name: "Chorus", duration: 8, intensity: 0.9, color: "accent" },
                { name: "Verse 2", duration: 8, intensity: 0.3, color: "secondary" },
                { name: "Chorus", duration: 8, intensity: 0.9, color: "accent" },
                { name: "Bridge", duration: 8, intensity: 0.5, color: "muted" },
                { name: "Chorus", duration: 8, intensity: 1.0, color: "accent" },
                { name: "Outro", duration: 4, intensity: 0.2, color: "muted" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CircleOfFifths Section */}
      <section className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-2xl font-semibold">4. CircleOfFifths</h2>
          <p className="text-muted-foreground">Intended for: Key Signatures, Modulation, Borrowed Chords</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="font-medium">Key of C Major</h3>
            <div className="p-6 border rounded-lg bg-card">
              <CircleOfFifths activeKey="C" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Key of E Major</h3>
            <div className="p-6 border rounded-lg bg-card">
              <CircleOfFifths activeKey="E" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
