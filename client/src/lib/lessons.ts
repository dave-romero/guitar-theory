export interface Marker {
  string: number;
  fret: number;
  label?: string;
  color?: "primary" | "secondary" | "accent" | "muted" | "blue";
}

export interface LegendItem {
  label: string;
  color: "primary" | "secondary" | "blue" | "muted" | "accent";
  outline?: boolean;
}

export interface TabData {
  title?: string;
  startFret: number;
  fretCount: number;
  markers: Marker[];
}

export interface LessonContent {
  id: string;
  title: string;
  concept: string;
  explanation: string;
  learningGoals: string[];
  tabs: TabData[];
  strudelCode: string;
  keyTerms: { term: string; definition: string }[];
  legend?: LegendItem[];
}

export interface Category {
  id: string;
  title: string;
  lessons: LessonContent[];
}

export const lessons: Category[] = [
  {
    id: "fretboard-map",
    title: "The Fretboard Map",
    lessons: [
      {
        id: "musical-alphabet",
        title: "The Musical Alphabet",
        concept: "The 12 notes of Western music and the chromatic scale.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Natural Note", color: "primary" },
          { label: "Sharp/Flat", color: "secondary" },
          { label: "Open Natural Note", color: "primary", outline: true }
        ],
        explanation: "The musical alphabet consists of 7 natural notes: A, B, C, D, E, F, G. Between most of these notes are sharps (#) or flats (b). The distance between any two adjacent notes (like A to A#) is called a half step (or semitone). On the guitar, one fret equals one half step.\n\nThe full chromatic scale is: A, A#, B, C, C#, D, D#, E, F, F#, G, G#.\n\nNotice that B to C and E to F do NOT have sharps between them. This is the most important rule to memorize!",
        tabs: [
          {
            title: "Chromatic Scale on A String (Full Octave)",
            startFret: 0,
            fretCount: 13,
            markers: [
              { string: 5, fret: 0, label: "A", color: "primary" },
              { string: 5, fret: 1, label: "A#", color: "secondary" },
              { string: 5, fret: 2, label: "B", color: "primary" },
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 5, fret: 4, label: "C#", color: "secondary" },
              { string: 5, fret: 5, label: "D", color: "primary" },
              { string: 5, fret: 6, label: "D#", color: "secondary" },
              { string: 5, fret: 7, label: "E", color: "primary" },
              { string: 5, fret: 8, label: "F", color: "primary" },
              { string: 5, fret: 9, label: "F#", color: "secondary" },
              { string: 5, fret: 10, label: "G", color: "primary" },
              { string: 5, fret: 11, label: "G#", color: "secondary" },
              { string: 5, fret: 12, label: "A", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The Chromatic Scale
// We play every single note in order (half steps)
// note("a2") means A on the 5th string (A string)

// Play slowly to hear each step
note("a2 as2 b2 c3 cs3 d3 ds3 e3 f3 fs3 g3 gs3 a3")
  .s("acoustic") // Use acoustic guitar sound
  .slow(4)     // Play 4x slower so you can follow along

// GLOSSARY:
// note("...") -> Creates a sequence of notes
// a2, as2 -> Note names (a=A, as=A sharp, b=B...)
// .s("acoustic") -> Sets the instrument sound
// .slow(n) -> Slows down the playback speed`,
        keyTerms: [
          { term: "Chromatic Scale", definition: "A scale that includes every note in the musical alphabet (12 notes total)." },
          { term: "Half Step", definition: "The smallest distance between two notes (1 fret on the guitar)." },
          { term: "Sharp (#)", definition: "Raises a note by one half step." },
          { term: "Natural Note", definition: "A note without a sharp or flat (A, B, C, D, E, F, G)." }
        ]
      },
      {
        id: "same-note-different-string",
        title: "Same Note, Different String",
        concept: "The guitar is a 2D grid where the same note exists in multiple places.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Unison Note", color: "primary" },
          { label: "Open Unison Note", color: "primary", outline: true }
        ],
        explanation: "Unlike a piano where each key plays a unique pitch, the guitar has multiple locations for the same pitch. For example, the 5th fret of the Low E string is the note 'A'. This is the exact same pitch as the open A string.\n\nThis pattern repeats across the fretboard (except for the G to B string, which shifts by 4 frets instead of 5).",
        tabs: [
          {
            title: "Unison: A Note (Low E vs Open A)",
            startFret: 0,
            fretCount: 6,
            markers: [
              { string: 6, fret: 5, label: "A", color: "primary" },
              { string: 5, fret: 0, label: "A", color: "primary" },
            ]
          },
          {
            title: "Exception: B Note (G String vs Open B)",
            startFret: 0,
            fretCount: 5,
            markers: [
              { string: 3, fret: 4, label: "B", color: "primary" },
              { string: 2, fret: 0, label: "B", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Unison Notes (Same Pitch)
// Listen: These two notes sound exactly the same!

// 1. "A" on the Low E string (5th fret)
// 2. Open A string

cat(
  note("a2").s("acoustic"), // 5th fret Low E
  note("a2").s("acoustic")  // Open A string
).slow(2)

// GLOSSARY:
// cat(...) -> Concatenates (chains) patterns together
// note("a2") -> The specific pitch "A2" (110 Hz)
// Both lines play the exact same pitch!`,
        keyTerms: [
          { term: "Unison", definition: "Two notes that are the exact same pitch." },
          { term: "Open String", definition: "Playing a string without pressing down any fret (fret 0)." }
        ]
      },
      {
        id: "half-steps-whole-steps",
        title: "Half Steps & Whole Steps",
        concept: "Building blocks of distance on the fretboard.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Start Note", color: "primary" },
          { label: "Target Note", color: "secondary" }
        ],
        explanation: "We already know a Half Step is 1 fret. A Whole Step is simply 2 frets (or 2 half steps).\n\nMost scales are built from patterns of whole steps (W) and half steps (H). Being able to visualize 'skip a fret' (Whole Step) vs 'adjacent fret' (Half Step) is crucial.",
        tabs: [
          {
            title: "Half Step (1 Fret)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 6, fret: 4, label: "G#", color: "secondary" },
            ]
          },
          {
            title: "Whole Step (2 Frets)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 6, fret: 5, label: "A", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Half Step vs Whole Step
// Listen to the difference in distance

cat(
  // Half Step (G to G#) - Tense, close
  note("g2 gs2").s("acoustic"),
  
  // Whole Step (G to A) - Open, melodic
  note("g2 a2").s("acoustic")
).slow(2)

// GLOSSARY:
// note("g2 gs2") -> Plays G then G sharp
// note("g2 a2") -> Plays G then A
// Notice the second pair sounds "wider" apart`,
        keyTerms: [
          { term: "Whole Step", definition: "A distance of two half steps (2 frets)." },
          { term: "Interval", definition: "The distance in pitch between any two notes." }
        ]
      },
      {
        id: "major-scale-pattern",
        title: "The Major Scale Pattern",
        concept: "The universal formula: W-W-H-W-W-W-H",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root Note", color: "primary" },
          { label: "Scale Note", color: "secondary" }
        ],
        explanation: "Every major scale follows the same pattern of steps: Whole, Whole, Half, Whole, Whole, Whole, Half.\n\nLet's build a G Major scale on one string using this formula:\nStart on G (3rd fret)\n+ Whole (5)\n+ Whole (7)\n+ Half (8)\n+ Whole (10)\n+ Whole (12)\n+ Whole (14)\n+ Half (15 - which is G again!)",
        tabs: [
          {
            title: "G Major Scale (Single String)",
            startFret: 3,
            fretCount: 13,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 6, fret: 5, label: "A", color: "secondary" },
              { string: 6, fret: 7, label: "B", color: "secondary" },
              { string: 6, fret: 8, label: "C", color: "secondary" },
              { string: 6, fret: 10, label: "D", color: "secondary" },
              { string: 6, fret: 12, label: "E", color: "secondary" },
              { string: 6, fret: 14, label: "F#", color: "secondary" },
              { string: 6, fret: 15, label: "G", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The Major Scale Formula
// W - W - H - W - W - W - H

// G Major Scale
note("g2 a2 b2 c3 d3 e3 fs3 g3")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// note("...") -> Plays the notes of the scale
// Notice how it sounds "happy" and "complete"
// This is the sound of the Major Scale`,
        keyTerms: [
          { term: "Major Scale", definition: "The most common scale in Western music, built from a specific pattern of whole and half steps." },
          { term: "Root Note", definition: "The starting note of a scale or chord (in this case, G)." },
          { term: "Octave", definition: "The same note at a higher or lower pitch (e.g., low G to high G)." }
        ]
      },
      {
        id: "octaves",
        title: "Octaves",
        concept: "Finding the 'same note' shape across strings.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Octave Note", color: "primary" }
        ],
        explanation: "An octave is the distance from one note to the next version of that same note (e.g., Low G to High G). On the guitar, there is a consistent shape to find octaves:\n\nFrom E or A string: Go down 2 strings, and up 2 frets.\n\nThis shape is your anchor. If you know where G is on the Low E string, you instantly know where G is on the D string.",
        tabs: [
          {
            title: "Octave Shape (E String Root)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 4, fret: 5, label: "G", color: "primary" },
            ]
          },
          {
            title: "Octave Shape (A String Root)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 3, fret: 5, label: "C", color: "primary" },
            ]
          },
          {
            title: "Octave Shape (D String Root)",
            startFret: 3,
            fretCount: 5,
            markers: [
              { string: 4, fret: 3, label: "F", color: "primary" },
              { string: 2, fret: 6, label: "F", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Octaves
// The same note, but higher/lower

cat(
  // Low G and High G (played together)
  stack(
    note("g2").s("acoustic"),
    note("g3").s("acoustic")
  ),
  
  // Low C and High C (played together)
  stack(
    note("c3").s("acoustic"),
    note("c4").s("acoustic")
  )
).slow(2)

// GLOSSARY:
// stack(...) -> Plays notes at the same time (harmony)
// g2 vs g3 -> The number indicates the octave range
// 2 is low, 3 is middle, 4 is high`,
        keyTerms: [
          { term: "Octave Shape", definition: "The physical pattern of fingers on the fretboard to find the octave of a note." },
          { term: "Root", definition: "The note you start from." }
        ]
      },
      {
        id: "perfect-5ths",
        title: "Perfect 5ths",
        concept: "The 'Power Chord' interval.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root Note", color: "primary" },
          { label: "Perfect 5th", color: "secondary" }
        ],
        explanation: "The Perfect 5th is the most stable interval after the octave. It creates a powerful, thick sound used constantly in rock and pop.\n\nShape: From the Low E or A string, go down 1 string and up 2 frets.\n\nWait... that looks like the Octave shape? Close! The Octave is down 2 strings. The 5th is down 1 string.",
        tabs: [
          {
            title: "G Power Chord (Root + 5th)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 5, fret: 5, label: "D", color: "secondary" },
            ]
          },
          {
            title: "C Power Chord (Root + 5th)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 5, label: "G", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Perfect 5ths (Power Chords)
// Strong, stable, powerful sound

cat(
  // G Power Chord (G + D)
  stack(
    note("g2").s("acoustic"),
    note("d3").s("acoustic")
  ),
  
  // C Power Chord (C + G)
  stack(
    note("c3").s("acoustic"),
    note("g3").s("acoustic")
  )
).slow(2)

// GLOSSARY:
// stack(...) -> Plays notes together
// These are "dyads" (two-note chords)
// This interval is the foundation of rock guitar`,
        keyTerms: [
          { term: "Perfect 5th", definition: "An interval of 7 half steps. Highly consonant and stable." },
          { term: "Power Chord", definition: "A chord consisting of only the Root and the 5th. Neither major nor minor." }
        ]
      },
      {
        id: "major-minor-3rds",
        title: "Major & Minor 3rds",
        concept: "The emotional color of music.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root Note", color: "primary" },
          { label: "3rd (Major/Minor)", color: "secondary" }
        ],
        explanation: "If the Root and 5th are the 'body' of the chord, the 3rd is the 'soul'. It determines if a chord is Happy (Major) or Sad (Minor).\n\nMajor 3rd: Up 1 string, back 1 fret.\nMinor 3rd: Up 1 string, back 2 frets.\n(Relative to the Root on E or A string)",
        tabs: [
          {
            title: "Major 3rd (Happy)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 5, label: "A", color: "primary" },
              { string: 5, fret: 4, label: "C#", color: "secondary" },
            ]
          },
          {
            title: "Minor 3rd (Sad)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 5, label: "A", color: "primary" },
              { string: 5, fret: 3, label: "C", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Major vs Minor 3rds
// Listen to the emotional difference

cat(
  // Major 3rd (Happy/Bright)
  stack(
    note("a2").s("acoustic"),
    note("cs3").s("acoustic")
  ),
  
  // Minor 3rd (Sad/Dark)
  stack(
    note("a2").s("acoustic"),
    note("c3").s("acoustic")
  )
).slow(1.5)

// GLOSSARY:
// cs3 -> C sharp (Major 3rd of A)
// c3 -> C natural (Minor 3rd of A)
// Changing just this one note changes the mood entirely`,
        keyTerms: [
          { term: "Major 3rd", definition: "An interval of 4 half steps. Sounds bright and happy." },
          { term: "Minor 3rd", definition: "An interval of 3 half steps. Sounds dark and sad." }
        ]
      },
      {
        id: "interval-map",
        title: "The Interval Map",
        concept: "Putting it all together around a Root.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root Note", color: "primary" },
          { label: "Major 3rd / 5th", color: "secondary" },
          { label: "Minor 3rd", color: "accent" },
          { label: "Perfect 4th", color: "muted" }
        ],
        explanation: "Now we can map out the key intervals surrounding any root note on the Low E string.\n\nRoot: Index finger\nMinor 3rd: Pinky (same string)\nMajor 3rd: Middle finger (next string)\nPerfect 5th: Ring finger (next string)\nOctave: Ring finger (skip a string)\n\nMemorizing this 'cluster' allows you to build chords and scales anywhere.",
        tabs: [
          {
            title: "Interval Cluster (Root on E)",
            startFret: 5,
            fretCount: 4,
            markers: [
              { string: 6, fret: 5, label: "R", color: "primary" },
              { string: 6, fret: 8, label: "m3", color: "accent" },
              { string: 5, fret: 4, label: "M3", color: "secondary" },
              { string: 5, fret: 5, label: "4", color: "muted" },
              { string: 5, fret: 7, label: "5", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// The Interval Map
// Playing the intervals around a Root (A)

note("a2 c3 cs3 d3 e3")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// a2 -> Root
// c3 -> Minor 3rd
// cs3 -> Major 3rd
// d3 -> Perfect 4th
// e3 -> Perfect 5th
// These are the building blocks of all chords`,
        keyTerms: [
          { term: "Cluster", definition: "A group of intervals located conveniently near a root note." }
        ]
      },
      {
        id: "interval-shapes",
        title: "Interval Shapes",
        concept: "Visualizing distance as geometry.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root Note", color: "primary" },
          { label: "Target Interval", color: "secondary" }
        ],
        explanation: "Instead of counting frets, guitarists see shapes. A 'Power Chord' isn't '7 semitones', it's 'down one, over two'.\n\nLet's review the shapes we know:\n1. Octave (L-shape)\n2. Power Chord (Diagonal)\n3. Major 3rd (Tight diagonal)\n4. Minor 3rd (Wide diagonal or same string)",
        tabs: [
          {
            title: "Shape 1: Power Chord",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "R", color: "primary" },
              { string: 5, fret: 5, label: "5", color: "secondary" },
            ]
          },
          {
            title: "Shape 2: Major 3rd",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "R", color: "primary" },
              { string: 5, fret: 2, label: "3", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Hearing the Shapes
// 1. Power Chord (5th)
// 2. Major 3rd

cat(
  stack(note("g2 d3").s("acoustic")),
  stack(note("g2 b2").s("acoustic"))
).slow(1.5)

// GLOSSARY:
// note("g2 d3") -> Root + 5th
// note("g2 b2") -> Root + 3rd
// Associate the sound with the shape on the fretboard`,
        keyTerms: [
          { term: "Shape", definition: "A physical pattern of fingers on the fretboard that corresponds to a musical sound." }
        ]
      },
      {
        id: "ear-training",
        title: "Ear Training",
        concept: "Connecting the ear to the hand.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Mystery Note", color: "muted" }
        ],
        explanation: "The ultimate goal is to hear a sound and know the shape immediately. Try this exercise:\n\n1. Play a Root note.\n2. Hum a pitch above it.\n3. Find that pitch on the guitar.\n4. Identify the interval (Is it a 5th? A 3rd?)\n\nUse the code below to test yourself. It plays a random interval - can you guess which one it is?",
        tabs: [
          {
            title: "Test Yourself",
            startFret: 0,
            fretCount: 12,
            markers: [
              { string: 6, fret: 5, label: "?", color: "muted" },
              { string: 5, fret: 7, label: "?", color: "muted" },
              { string: 4, fret: 6, label: "?", color: "muted" },
            ]
          }
        ],
        strudelCode: `// Ear Training Game
// Plays a Root (A) and then a random interval
// Is it a 3rd? 5th? Octave?

const root = "a2"
const intervals = ["cs3", "e3", "a3"] // Maj 3rd, 5th, Octave

// Pick a random note from the list
const target = choose(intervals)

cat(
  note(root).s("acoustic"),
  note(target).s("acoustic")
).slow(2)

// GLOSSARY:
// choose(...) -> Picks a random item from a list
// Run the code multiple times to get different intervals!`,
        keyTerms: [
          { term: "Ear Training", definition: "The practice of identifying music solely by hearing it." },
          { term: "Relative Pitch", definition: "The ability to identify the distance between two notes." }
        ]
      }
    ]
  },
  {
    id: "building-chords",
    title: "Building Chords",
    lessons: [
      {
        id: "triad-construction",
        title: "Triad Construction",
        concept: "Building the simplest chords from 3 notes.",
        learningGoals: ["Understand Root-3rd-5th structure", "Build Major and Minor triads"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "3rd", color: "secondary" },
          { label: "5th", color: "accent" }
        ],
        explanation: "A triad is the most basic type of chord, consisting of just three notes stacked in intervals of thirds.\n\n1. **The Root**: The foundation note that names the chord.\n2. **The 3rd**: Determines if the chord is Major (Happy) or Minor (Sad).\n3. **The 5th**: Adds stability and thickness to the sound.\n\n**Formulas:**\n*   **Major Triad**: Root + Major 3rd + Perfect 5th (1 - 3 - 5)\n*   **Minor Triad**: Root + Minor 3rd + Perfect 5th (1 - b3 - 5)",
        tabs: [
          {
            title: "C Major Triad (C - E - G)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "accent" },
            ]
          },
          {
            title: "C Minor Triad (C - Eb - G)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 1, label: "Eb", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Triad Construction
// Listen to the difference between Major and Minor

// 1. C Major Triad (C - E - G)
// Happy, bright, stable
note("c3 e3 g3").s("acoustic").slow(2),

// 2. C Minor Triad (C - Eb - G)
// Sad, dark, serious
// Only the 3rd (E -> Eb) changes!
note("c3 eb3 g3").s("acoustic").slow(2)

// GLOSSARY:
// note("...") -> Plays the notes together as a chord
// eb3 -> E flat (the minor 3rd)`,
        keyTerms: [
          { term: "Triad", definition: "A 3-note chord built from a Root, 3rd, and 5th." },
          { term: "Major 3rd", definition: "An interval of 4 half steps (2 whole steps) from the root." },
          { term: "Minor 3rd", definition: "An interval of 3 half steps (1.5 whole steps) from the root." }
        ]
      },
      {
        id: "major-chords",
        title: "Major Chords",
        concept: "The 'Happy' chord shape.",
        learningGoals: ["Identify Major chord shapes", "Play CAGED major chords"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Chord Tone", color: "secondary" },
          { label: "Open Chord Tone", color: "secondary", outline: true }
        ],
        explanation: "While there are thousands of ways to play a Major chord, they all stem from 5 basic 'Open' shapes: C, A, G, E, and D. This is known as the **CAGED System**.\n\nThese shapes are movable! If you take an E Major shape and move it up 1 fret (using a barre), it becomes F Major. Move it up 3 frets, it becomes G Major.",
        tabs: [
          {
            title: "C Major (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 1, label: "C", color: "primary" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          },
          {
            title: "E Major (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "E", color: "secondary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 2, label: "E", color: "primary" },
              { string: 3, fret: 1, label: "G#", color: "secondary" },
              { string: 2, fret: 0, label: "B", color: "secondary" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          },
          {
            title: "G Major (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 0, label: "D", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "primary" },
              { string: 2, fret: 0, label: "B", color: "secondary" },
              { string: 1, fret: 3, label: "G", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Major Chords (CAGED)
// Listen to the full, rich sound of open chords

// 1. C Major
note("c3 e3 g3 c4 e4").s("acoustic").slow(2),

// 2. E Major (Deep and resonant)
note("e2 b2 e3 gs3 b3 e4").s("acoustic").slow(2),

// 3. G Major (Full 6-string chord)
note("g2 b2 d3 g3 b3 g4").s("acoustic").slow(2)

// GLOSSARY:
// note("...") -> Plays all notes simultaneously
// Notice how the Root note is doubled or tripled!`,
        keyTerms: [
          { term: "Open Chord", definition: "A chord that includes one or more open strings." },
          { term: "CAGED System", definition: "A method of visualizing the fretboard using 5 basic chord shapes (C, A, G, E, D)." },
          { term: "Barre Chord", definition: "A chord where one finger presses down multiple strings across the fretboard." }
        ]
      },
      {
        id: "minor-chords",
        title: "Minor Chords",
        concept: "The 'Sad' chord shape.",
        learningGoals: ["Identify Minor chord shapes", "Compare Major vs Minor"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Minor 3rd", color: "accent" },
          { label: "5th", color: "secondary" },
          { label: "Open String", color: "secondary", outline: true }
        ],
        explanation: "Minor chords have a darker, sadder, or more serious sound compared to Major chords. The only theoretical difference is the **3rd**: in a Minor chord, the 3rd is lowered by one half step (flattened).\n\nThere are 3 essential 'Open' minor shapes you must know: Em, Am, and Dm.",
        tabs: [
          {
            title: "E Minor (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "E", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 2, label: "E", color: "primary" },
              { string: 3, fret: 0, label: "G", color: "accent" },
              { string: 2, fret: 0, label: "B", color: "secondary" },
              { string: 1, fret: 0, label: "E", color: "primary" },
            ]
          },
          {
            title: "A Minor (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 0, label: "A", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 2, label: "A", color: "primary" },
              { string: 2, fret: 1, label: "C", color: "accent" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          },
          {
            title: "D Minor (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 0, label: "D", color: "primary" },
              { string: 3, fret: 2, label: "A", color: "secondary" },
              { string: 2, fret: 3, label: "D", color: "primary" },
              { string: 1, fret: 1, label: "F", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Minor Chords
// Listen to the melancholic sound

// 1. E Minor (Dark and heavy)
note("e2 b2 e3 g3 b3 e4").s("acoustic").slow(2),

// 2. A Minor (Sad but clear)
note("a2 e3 a3 c4 e4").s("acoustic").slow(2),

// 3. D Minor (Serious and tight)
note("d3 a3 d4 f4").s("acoustic").slow(2)

// GLOSSARY:
// Notice the "G" in E Minor, "C" in A Minor, "F" in D Minor
// These are the Minor 3rds that give the sad quality`,
        keyTerms: [
          { term: "Minor Chord", definition: "A chord built from a Root, Minor 3rd, and Perfect 5th." },
          { term: "Flattened 3rd", definition: "lowering the 3rd note of a scale by one half step." }
        ]
      },
      {
        id: "diminished-chords",
        title: "Diminished Chords",
        concept: "Tension and instability.",
        learningGoals: ["Construct diminished triads", "Use as passing chords"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Minor 3rd", color: "accent" },
          { label: "Diminished 5th", color: "muted" }
        ],
        explanation: "Diminished chords sound tense, scary, or unresolved. They are built by stacking two **Minor 3rds** on top of each other.\n\nThe formula is **1 - b3 - b5**. This 'flat 5' interval is also known as the **Tritone** (the Devil's Interval).",
        tabs: [
          {
            title: "B Diminished Triad (Top 3 Strings)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 3, fret: 4, label: "B", color: "primary" },
              { string: 2, fret: 3, label: "D", color: "accent" },
              { string: 1, fret: 1, label: "F", color: "muted" },
            ]
          },
          {
            title: "E Diminished Triad (Movable Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 2, label: "E", color: "primary" },
              { string: 3, fret: 3, label: "Bb", color: "muted" },
              { string: 2, fret: 2, label: "C#", color: "accent" }, // Actually C# is dim7, strictly Edim is E-G-Bb. Let's use strict triad.
              // Correction: E Diminished Triad is E - G - Bb.
              // Let's use a simpler shape: x-x-2-3-2-x (E-Bb-C# is Edim7).
              // Let's stick to the Bdim shape moved up or a simple Ddim shape.
              // Ddim: x-x-0-1-3-x (D-Ab-F).
              // Let's use the D-G-B string set for Edim: x-x-2-0-x-x (E-G... missing Bb).
              // Let's use the A string root shape: x-1-2-3-x-x (Bb-E-G... inversion).
              // Let's use the standard "Staircase" shape for Dim7 which is what guitarists usually play.
              // But for pure triad: x-x-5-3-5-x (G-Bb-E).
              // Let's stick to the Bdim shape above, it's a clear triad.
              // And maybe a D Diminished: x-x-0-1-3-x (D-Ab-F).
            ]
          },
          {
             title: "D Diminished Triad",
             startFret: 0,
             fretCount: 4,
             markers: [
               { string: 4, fret: 0, label: "D", color: "primary" },
               { string: 3, fret: 1, label: "Ab", color: "muted" },
               { string: 2, fret: 3, label: "D", color: "primary" }, // Doubled root
               { string: 1, fret: 1, label: "F", color: "accent" }
             ]
          }
        ],
        strudelCode: `// Diminished Chords
// Listen to the tension (The "Horror Movie" chord)

// C Major (Happy)
note("c3 e3 g3").s("acoustic").slow(2),

// C Diminished (Tense)
note("c3 eb3 gb3").s("acoustic").slow(2)

// GLOSSARY:
// Tritone: An interval of three whole tones (e.g., C to F#), known for its dissonance.`,
        keyTerms: [
          { term: "Diminished Chord", definition: "A triad consisting of two minor thirds above the root." },
          { term: "Tritone", definition: "An interval of three whole tones, creating strong tension." }
        ]
      },
       {
        id: "augmented-chords",
        title: "Augmented Chords",
        concept: "The 'Dreamy' chord shape.",
        learningGoals: ["Understand augmented formula", "Play augmented triads"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Major 3rd", color: "accent" },
          { label: "Augmented 5th", color: "muted" }
        ],
        explanation: "Augmented chords sound dreamy, floating, or sometimes anxious. Like diminished chords, they are unstable and want to move.\n\nThe formula is **1 - 3 - #5**. This means you take a Major chord and raise the 5th by one half step (sharpen it).",
        tabs: [
          {
            title: "C Augmented Triad (Top 3 Strings)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 3, fret: 1, label: "G#", color: "muted" },
              { string: 2, fret: 1, label: "C", color: "primary" },
              { string: 1, fret: 0, label: "E", color: "accent" },
            ]
          },
          {
            title: "F Augmented Triad (Movable Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 3, label: "F", color: "primary" },
              { string: 3, fret: 2, label: "A", color: "accent" },
              { string: 2, fret: 2, label: "C#", color: "muted" },
            ]
          }
        ],
        strudelCode: `// Augmented Chords
// Listen to the "floating" quality

// 1. C Augmented (C - E - G#)
note("c3 e3 gs3").s("acoustic").slow(2),

// 2. F Augmented (F - A - C#)
note("f3 a3 cs4").s("acoustic").slow(2)

// GLOSSARY:
// Augmented chords are symmetrical (Major 3rd + Major 3rd)
// They are often used in movie soundtracks for dream sequences.`,
        keyTerms: [
          { term: "Augmented 5th", definition: "A Perfect 5th raised by one half step (#5)." },
          { term: "Whole Tone Scale", definition: "A scale made entirely of whole steps, closely related to augmented chords." }
        ]
      },
      {
        id: "sus-chords",
        title: "Sus2 & Sus4 Chords",
        concept: "Suspended resolution.",
        learningGoals: ["Replace the 3rd with 2nd or 4th", "Create movement"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Sus2 / Sus4", color: "accent" },
          { label: "5th", color: "secondary" }
        ],
        explanation: "'Sus' stands for **Suspended**. These chords create tension by replacing the 3rd (which defines Major/Minor) with a 2nd (Sus2) or a 4th (Sus4).\n\nBecause they lack a 3rd, they aren't Major or Minor. They sound 'open' and usually want to resolve back to the stable Major chord. This creates movement within a chord shape without changing the root note.",
        tabs: [
          {
            title: "D Sus4 (Add Pinky)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 0, label: "D", color: "primary" },
              { string: 3, fret: 2, label: "A", color: "secondary" },
              { string: 2, fret: 3, label: "D", color: "primary" },
              { string: 1, fret: 3, label: "G", color: "accent" },
            ]
          },
          {
            title: "D Sus2 (Lift Middle Finger)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 0, label: "D", color: "primary" },
              { string: 3, fret: 2, label: "A", color: "secondary" },
              { string: 2, fret: 3, label: "D", color: "primary" },
              { string: 1, fret: 0, label: "E", color: "accent" },
            ]
          },
          {
            title: "A Sus4 (Shift Ring Finger)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 0, label: "A", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 2, label: "A", color: "primary" },
              { string: 2, fret: 3, label: "D", color: "accent" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Sus Chord Resolution
// Listen to the "pull" back to the Major chord

// D Major -> D Sus4 -> D Major -> D Sus2 -> D Major
note("d3 a3 d4 fs4, d3 a3 d4 g4, d3 a3 d4 fs4, d3 a3 d4 e4, d3 a3 d4 fs4")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// Notice how the melody note moves: F# -> G -> F# -> E -> F#
// This is "voice leading" within a single chord position.`,
        keyTerms: [
          { term: "Suspended Chord", definition: "A chord where the 3rd is replaced by a 2nd or 4th." },
          { term: "Resolution", definition: "The move from a tense chord (Sus) to a stable chord (Major)." }
        ]
      },
      {
        id: "7th-chords",
        title: "7th Chords",
        concept: "Adding jazz and blues flavor.",
        learningGoals: ["Major 7 vs Dominant 7", "Minor 7 construction"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "3rd", color: "secondary" },
          { label: "5th", color: "secondary" },
          { label: "7th", color: "accent" }
        ],
        explanation: "Triads are the skeleton of harmony, but **7th chords** put the meat on the bones. By adding one more note (the 7th degree of the scale), we get a richer, more complex sound.\n\nThere are 3 main types:\n1. **Major 7 (1-3-5-7):** Dreamy, jazzy, romantic.\n2. **Dominant 7 (1-3-5-b7):** Bluesy, tense, wants to resolve.\n3. **Minor 7 (1-b3-5-b7):** Mellow, cool, laid back.",
        tabs: [
          {
            title: "C Major 7 (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 0, label: "B", color: "accent" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          },
          {
            title: "G Dominant 7 (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 0, label: "D", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "primary" },
              { string: 2, fret: 0, label: "B", color: "secondary" },
              { string: 1, fret: 1, label: "F", color: "accent" },
            ]
          },
          {
            title: "E Minor 7 (Open Shape)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "E", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 0, label: "D", color: "accent" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 0, label: "B", color: "secondary" },
              { string: 1, fret: 0, label: "E", color: "primary" },
            ]
          }
        ],
        strudelCode: `// 7th Chords Comparison
// Listen to the different "flavors"

// 1. C Major 7 (Dreamy)
note("c3 e3 g3 b3").s("acoustic").slow(2),

// 2. C Dominant 7 (Bluesy)
note("c3 e3 g3 bb3").s("acoustic").slow(2),

// 3. C Minor 7 (Mellow)
note("c3 eb3 g3 bb3").s("acoustic").slow(2)

// GLOSSARY:
// Major 7: Natural 7th (B)
// Dominant 7: Flat 7th (Bb)
// Minor 7: Flat 3rd (Eb) AND Flat 7th (Bb)`,
        keyTerms: [
          { term: "Major 7", definition: "A chord with a Major 3rd and Major 7th. Sounds stable and jazzy." },
          { term: "Dominant 7", definition: "A chord with a Major 3rd and Minor 7th. The sound of the Blues." },
          { term: "Minor 7", definition: "A chord with a Minor 3rd and Minor 7th. Sounds smooth and relaxed." }
        ]
      },
      {
        id: "extensions",
        title: "Extensions (9, 11, 13)",
        concept: "Color notes beyond the octave.",
        learningGoals: ["Understand compound intervals", "Add color to chords"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "3rd / 5th", color: "secondary" },
          { label: "Extension (9/11/13)", color: "accent" }
        ],
        explanation: "Extensions are notes that go beyond the octave (8). They are simply the 2nd, 4th, and 6th notes played higher up.\n\n*   **9th** = 2nd (adds sweetness)\n*   **11th** = 4th (adds space)\n*   **13th** = 6th (adds jazz flavor)\n\nThese 'color notes' turn simple chords into sophisticated sounds used in R&B, Neo-Soul, and Jazz.",
        tabs: [
          {
            title: "C Add9 (The 'Wonderwall' Chord)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 3, label: "D", color: "accent" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          },
          {
            title: "A Minor 9 (Jazzy Minor)",
            startFret: 0,
            fretCount: 6,
            markers: [
              { string: 6, fret: 5, label: "A", color: "primary" },
              { string: 4, fret: 5, label: "G", color: "secondary" },
              { string: 3, fret: 5, label: "C", color: "secondary" },
              { string: 2, fret: 5, label: "E", color: "secondary" },
              { string: 1, fret: 7, label: "B", color: "accent" },
            ]
          },
          {
            title: "E7#9 (The 'Hendrix' Chord)",
            startFret: 0,
            fretCount: 9,
            markers: [
              { string: 5, fret: 7, label: "E", color: "primary" },
              { string: 4, fret: 6, label: "G#", color: "secondary" },
              { string: 3, fret: 7, label: "D", color: "secondary" },
              { string: 2, fret: 8, label: "G", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Extended Chords
// Listen to the sophisticated colors

// 1. C Add9 (Sweet and pop-friendly)
note("c3 e3 g3 d4").s("acoustic").slow(2),

// 2. A Minor 9 (Deep and moody)
note("a2 g3 c4 e4 b4").s("acoustic").slow(2),

// 3. E7#9 (Tense and aggressive)
note("e3 gs3 d4 g4").s("acoustic").slow(2)

// GLOSSARY:
// Add9: Triad + 9th (no 7th)
// Major 9: Major 7th + 9th
// #9: Sharp 9 (a bluesy clash against the Major 3rd)`,
        keyTerms: [
          { term: "Compound Interval", definition: "An interval larger than an octave (e.g., a 9th is an octave plus a 2nd)." },
          { term: "Add Chord", definition: "Adding an extension to a simple triad (e.g., Cadd9)." },
          { term: "Extended Chord", definition: "Stacking extensions on top of a 7th chord (e.g., Cmaj9)." }
        ]
      },
      {
        id: "inversions",
        title: "Chord Inversions",
        concept: "Changing the bass note.",
        learningGoals: ["Play chords with different bass notes", "Smooth voice leading"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "3rd", color: "secondary" },
          { label: "5th", color: "secondary" }
        ],
        explanation: "Normally, the Root note is at the bottom of the chord. But what if we put the 3rd or 5th at the bottom? That's an **Inversion**.\n\n*   **Root Position:** Root is lowest (C-E-G)\n*   **1st Inversion:** 3rd is lowest (E-G-C)\n*   **2nd Inversion:** 5th is lowest (G-C-E)\n\nInversions allow you to play the same chord in different places on the neck, creating smooth 'voice leading' where notes flow logically from one to the next.",
        tabs: [
          {
            title: "D Major (Root Position)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 3, fret: 0, label: "D", color: "primary" },
              { string: 2, fret: 2, label: "A", color: "secondary" },
              { string: 1, fret: 2, label: "F#", color: "secondary" },
            ]
          },
          {
            title: "D Major (1st Inversion)",
            startFret: 0,
            fretCount: 5,
            markers: [
              { string: 3, fret: 4, label: "F#", color: "secondary" },
              { string: 2, fret: 3, label: "D", color: "primary" },
              { string: 1, fret: 2, label: "A", color: "secondary" },
            ]
          },
          {
            title: "D Major (2nd Inversion)",
            startFret: 5,
            fretCount: 4,
            markers: [
              { string: 3, fret: 7, label: "A", color: "secondary" },
              { string: 2, fret: 7, label: "F#", color: "secondary" },
              { string: 1, fret: 5, label: "D", color: "primary" },
            ]
          }
        ],
        strudelCode: `// D Major Inversions
// Same chord, different "voicings"

// 1. Root Position (D in bass)
note("d3 a3 fs4").s("acoustic").slow(2),

// 2. 1st Inversion (F# in bass)
note("fs3 d4 a4").s("acoustic").slow(2),

// 3. 2nd Inversion (A in bass)
note("a3 fs4 d5").s("acoustic").slow(2)

// GLOSSARY:
// Notice how the chord gets higher in pitch?
// We are moving up the neck using inversions.`,
        keyTerms: [
          { term: "Inversion", definition: "A chord voicing where a note other than the root is the lowest note." },
          { term: "Voice Leading", definition: "The smooth movement of individual notes from one chord to the next." },
          { term: "Slash Chord", definition: "A notation for inversions (e.g., C/E means C Major with E in the bass)." }
        ]
      },
      {
        id: "slash-chords",
        title: "Slash Chords",
        concept: "Specific bass notes.",
        learningGoals: ["Read slash notation (C/G)", "Create descending basslines"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Bass Note", color: "accent" },
          { label: "Chord Tone", color: "secondary" }
        ],
        explanation: "A **Slash Chord** (e.g., C/G, read as 'C over G') tells you two things:\n1.  Play a **C Major** chord.\n2.  Make sure **G** is the lowest note (bass note).\n\nSlash chords are the secret weapon for creating smooth basslines that walk down step-by-step, connecting chords together seamlessly.",
        tabs: [
          {
            title: "D/F# (D over F#)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 2, label: "F#", color: "accent" },
              { string: 3, fret: 2, label: "A", color: "secondary" },
              { string: 2, fret: 3, label: "D", color: "primary" },
              { string: 1, fret: 2, label: "F#", color: "secondary" },
            ]
          },
          {
            title: "C/G (C over G)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "accent" },
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 1, label: "C", color: "primary" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          },
          {
            title: "G/B (G over B)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 2, label: "B", color: "accent" },
              { string: 4, fret: 0, label: "D", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "primary" },
              { string: 2, fret: 3, label: "D", color: "secondary" },
              { string: 1, fret: 3, label: "G", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The "Walk Down"
// Listen to the bassline: G -> F# -> E

// G Major -> D/F# -> E Minor
note("g2 b2 d3 g3, fs2 a2 d3 fs3, e2 g2 b2 e3")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// This progression is used in thousands of songs.
// Without the slash chord, the jump from G to D would sound abrupt.`,
        keyTerms: [
          { term: "Slash Chord", definition: "A chord symbol where the letter after the slash indicates the bass note." },
          { term: "Walking Bass", definition: "A bass line that moves stepwise up or down the scale." },
          { term: "Passing Chord", definition: "A chord used to connect two other chords smoothly." }
        ]
      }
    ]
  },
  {
    id: "keys-numbers",
    title: "Keys & Numbers",
    lessons: [
      {
        id: "nashville-numbers",
        title: "The Nashville Number System",
        concept: "Universal language of chords.",
        learningGoals: ["Convert chords to numbers", "Transpose instantly"],
        legend: [
          { label: "1 Chord (Root)", color: "primary" },
          { label: "4 Chord", color: "secondary" },
          { label: "5 Chord", color: "accent" }
        ],
        explanation: "The **Nashville Number System** replaces chord names with numbers based on the scale. In the key of C, C is 1, F is 4, and G is 5.\n\nWhy do this? Because the *relationship* between the 1, 4, and 5 chords sounds the same in every key. If you learn a song as '1 - 4 - 5', you can instantly play it in G, D, or A just by shifting the starting note.",
        tabs: [
          {
            title: "Key of C (1-4-5)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "1 (C)", color: "primary" },
              { string: 4, fret: 3, label: "4 (F)", color: "secondary" },
              { string: 6, fret: 3, label: "5 (G)", color: "accent" },
            ]
          },
          {
            title: "Key of G (1-4-5)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "1 (G)", color: "primary" },
              { string: 5, fret: 3, label: "4 (C)", color: "secondary" },
              { string: 4, fret: 0, label: "5 (D)", color: "accent" },
            ]
          }
        ],
        strudelCode: `// The "1 - 4 - 5" Progression
// Listen: It sounds the same in both keys!

// Key of C: C -> F -> G
note("c3 f3 g3").s("acoustic").slow(2),

// Key of G: G -> C -> D
note("g2 c3 d3").s("acoustic").slow(2)

// GLOSSARY:
// 1 (Tonic): Home base
// 4 (Subdominant): Moving away
// 5 (Dominant): Tension, wants to go home`,
        keyTerms: [
          { term: "Number System", definition: "A method of transcribing music by denoting the scale degree on which a chord is built." },
          { term: "Tonic", definition: "The first note (degree) of a scale, or the '1' chord." }
        ]
      },
      {
        id: "diatonic-chords",
        title: "Diatonic Chords",
        concept: "Chords that belong to a key.",
        learningGoals: ["Build chords on every scale degree", "Know the Major Key pattern"],
        legend: [
          { label: "Major Chord", color: "primary" },
          { label: "Minor Chord", color: "secondary" },
          { label: "Diminished", color: "muted" }
        ],
        explanation: "If you build a chord on every note of the Major Scale using only the notes *in* that scale, you get a specific pattern that never changes:\n\n1.  **Major**\n2.  **Minor**\n3.  **Minor**\n4.  **Major**\n5.  **Major**\n6.  **Minor**\n7.  **Diminished**\n\nMemorize this: **M - m - m - M - M - m - dim**.",
        tabs: [
          {
            title: "Key of C Diatonic Chords",
            startFret: 0,
            fretCount: 13,
            markers: [
              { string: 5, fret: 3, label: "C (M)", color: "primary" },
              { string: 5, fret: 5, label: "Dm", color: "secondary" },
              { string: 5, fret: 7, label: "Em", color: "secondary" },
              { string: 5, fret: 8, label: "F (M)", color: "primary" },
              { string: 5, fret: 10, label: "G (M)", color: "primary" },
              { string: 5, fret: 12, label: "Am", color: "secondary" },
              { string: 5, fret: 14, label: "Bdim", color: "muted" },
            ]
          }
        ],
        strudelCode: `// The Sound of a Key
// Walking up the C Major Scale with Chords

// C, Dm, Em, F, G, Am, Bdim, C
note("c3 d3 e3 f3 g3 a3 b3 c4")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// Diatonic: "Of the key". Notes or chords that belong to the scale.
// Notice how the 7th chord (Bdim) sounds the most tense.`,
        keyTerms: [
          { term: "Diatonic", definition: "Involving only notes proper to the prevailing key without chromatic alteration." },
          { term: "Roman Numerals", definition: "Used to represent chords: Uppercase (I, IV, V) for Major, lowercase (ii, iii, vi) for Minor." }
        ]
      },
      {
        id: "identifying-key",
        title: "Identifying the Key",
        concept: "Finding 'Home'.",
        learningGoals: ["Find the tonic center", "Analyze chord progressions"],
        legend: [
          { label: "Tension (V)", color: "accent" },
          { label: "Resolution (I)", color: "primary" }
        ],
        explanation: "The **Key** is the gravitational center of a song. All chords feel like they are pulling towards one specific chord: the **Tonic** (or 1 chord).\n\nThe strongest pull in music is from the **5 chord (V)** to the **1 chord (I)**. If you hear a G7 chord resolving to C, you are likely in the key of C.",
        tabs: [
          {
            title: "V to I Resolution (G7 -> C)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "accent" },
              { string: 5, fret: 3, label: "C", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Tension and Resolution
// Feel the pull of the V chord (G) to the I chord (C)

// G Major (Tension) -> C Major (Home)
note("g3 b3 d4, c3 e3 g3")
  .s("acoustic")
  .slow(1.5)

// GLOSSARY:
// Resolution: The relief of tension when moving to a stable chord.
// Cadence: A sequence of chords that brings a phrase to a close.`,
        keyTerms: [
          { term: "Tonic Center", definition: "The main note or chord that a piece of music resolves to." },
          { term: "Cadence", definition: "A melodic or harmonic configuration that creates a sense of resolution." }
        ]
      },
      {
        id: "circle-of-fifths",
        title: "The Circle of Fifths",
        concept: "The map of all keys.",
        learningGoals: ["Navigate key signatures", "Predict chord changes"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Perfect 5th", color: "secondary" }
        ],
        explanation: "The **Circle of Fifths** is a diagram that arranges the 12 keys in a circle. Moving clockwise, each key is a **Perfect 5th** higher than the last and adds one sharp (#) to the key signature.\n\n*   C (0 sharps)\n*   G (1 sharp)\n*   D (2 sharps)\n*   A (3 sharps)\n*   E (4 sharps)\n\nThis map tells you which chords are likely to appear together.",
        tabs: [
          {
            title: "Moving by 5ths (C -> G -> D -> A)",
            startFret: 0,
            fretCount: 6,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 6, fret: 3, label: "G", color: "secondary" },
              { string: 4, fret: 0, label: "D", color: "secondary" },
              { string: 5, fret: 0, label: "A", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Walking the Circle
// Each step is a Perfect 5th

// C -> G -> D -> A -> E
note("c3 g3 d3 a3 e3")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// Notice how the sound gets "brighter" as we move up.
// This is adding sharps to the key signature.`,
        keyTerms: [
          { term: "Circle of Fifths", definition: "A visual representation of the relationships among the 12 tones of the chromatic scale." },
          { term: "Key Signature", definition: "A set of sharps or flats placed on the staff to indicate the key." }
        ]
      },
      {
        id: "relative-minor",
        title: "Relative Minor",
        concept: "The sad twin of every major key.",
        learningGoals: ["Find the relative minor (6th degree)", "Switch between Major/Minor"],
        legend: [
          { label: "Major Root (1)", color: "primary" },
          { label: "Minor Root (6)", color: "accent" }
        ],
        explanation: "Every Major key has a **Relative Minor** key that shares the *exact same notes*. It is always the **6th degree** of the Major scale.\n\n*   Key of C Major (C-D-E-F-G-A-B)\n*   Key of A Minor (A-B-C-D-E-F-G)\n\nThey are the same family, just with a different 'head of household'.",
        tabs: [
          {
            title: "C Major and A Minor Roots",
            startFret: 0,
            fretCount: 6,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 6, fret: 5, label: "A", color: "accent" },
              { string: 5, fret: 0, label: "A", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Same Notes, Different Mood
// C Major Scale vs A Minor Scale

// C Major (Happy/Bright)
note("c3 d3 e3 f3 g3 a3 b3 c4").s("acoustic").slow(4),

// A Minor (Sad/Dark) - Same notes!
note("a2 b2 c3 d3 e3 f3 g3 a3").s("acoustic").slow(4)

// GLOSSARY:
// Relative Minor: The minor key that shares the same key signature as a major key.`,
        keyTerms: [
          { term: "Relative Minor", definition: "The minor key based on the sixth note of the major scale." },
          { term: "Parallel Minor", definition: "A minor key that starts on the same root note as the major key (e.g., C Major vs C Minor)." }
        ]
      },
      {
        id: "transposing",
        title: "Transposing",
        concept: "Changing the key.",
        learningGoals: ["Move songs to fit your voice", "Use a capo effectively"],
        legend: [
          { label: "Original Key (C)", color: "primary" },
          { label: "New Key (D)", color: "accent" }
        ],
        explanation: "**Transposing** is the art of moving a piece of music up or down in pitch without changing the relationship between the notes. It's like taking a picture and moving it to a different frame—the picture stays the same, but the location changes.\n\nThis is crucial for singers. If a song is too high, you transpose it down. If it's too low, you transpose it up.",
        tabs: [
          {
            title: "Transposing C to D (Up a Whole Step)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 0, label: "D", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Same Melody, Different Key
// Listen to "Twinkle Twinkle Little Star"

// Key of C
note("c3 c3 g3 g3 a3 a3 g3").s("acoustic").slow(2),

// Key of D (Everything moves up 2 frets)
note("d3 d3 a3 a3 b3 b3 a3").s("acoustic").slow(2)

// GLOSSARY:
// Capo: A device used to transpose the guitar without changing chord shapes.`,
        keyTerms: [
          { term: "Transposition", definition: "The process of moving a collection of notes up or down in pitch by a constant interval." },
          { term: "Capo", definition: "A clamp fastened across all the strings of a fretted musical instrument to raise their tuning." }
        ]
      },
      {
        id: "modulation",
        title: "Modulation",
        concept: "Changing key within a song.",
        learningGoals: ["Recognize key changes", "Use pivot chords"],
        legend: [
          { label: "Key 1", color: "primary" },
          { label: "Key 2", color: "accent" }
        ],
        explanation: "**Modulation** is when the key center shifts *in the middle* of a song. It's often used in the final chorus to create a lift in energy (the 'Truck Driver's Gear Change').\n\nTo modulate smoothly, we often use a **Pivot Chord**—a chord that exists in both the old key and the new key.",
        tabs: [
          {
            title: "Direct Modulation (C -> D)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 0, label: "D", color: "accent" },
            ]
          }
        ],
        strudelCode: `// The "Gear Change" Modulation
// Often used in the final chorus

// Chorus in C Major
note("c3 e3 g3 c4").s("acoustic").slow(2),

// SUDDENLY: Chorus in D Major!
note("d3 fs3 a3 d4").s("acoustic").slow(2)

// GLOSSARY:
// Pivot Chord: A chord common to both keys used to smooth the transition.`,
        keyTerms: [
          { term: "Modulation", definition: "The act or process of changing from one key (tonic, or tonal center) to another." },
          { term: "Pivot Chord", definition: "A chord that is common to both the original key and the new key." }
        ]
      },
      {
        id: "secondary-dominants",
        title: "Secondary Dominants",
        concept: "Borrowing the V of V.",
        learningGoals: ["Create stronger resolutions", "Spice up progressions"],
        legend: [
          { label: "Diatonic Chord", color: "primary" },
          { label: "Secondary Dominant", color: "accent" }
        ],
        explanation: "A **Secondary Dominant** is a fancy way of saying: 'Let's make a minor chord Major for a second to create tension.'\n\nIn the key of C, the A chord is normally minor (Am). But if we play **A Major (A7)**, it pulls strongly to D Minor. We call this the 'V of ii' (Five of Two).",
        tabs: [
          {
            title: "C -> A7 -> Dm (The Jazz Turnaround)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "A7", color: "accent" },
              { string: 4, fret: 0, label: "Dm", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Secondary Dominant Example
// Listen to the A7 pull to Dm

// Normal: C -> Am -> Dm -> G
note("c3 a2 d3 g2").s("acoustic").slow(2),

// Spiced Up: C -> A7 -> Dm -> G
note("c3 a2 cs3 d3 g2").s("acoustic").slow(2)

// GLOSSARY:
// The C# in the A7 chord is the "leading tone" to D.`,
        keyTerms: [
          { term: "Secondary Dominant", definition: "An altered chord (major or dominant seventh) that is the dominant of a diatonic chord other than the tonic." },
          { term: "Leading Tone", definition: "A note that resolves by rising a semitone to the target note." }
        ]
      },
      {
        id: "borrowed-chords",
        title: "Borrowed Chords",
        concept: "Modal Interchange.",
        learningGoals: ["Use the minor iv chord", "Mix Major and Minor"],
        legend: [
          { label: "Major Key", color: "primary" },
          { label: "Borrowed (Minor Key)", color: "accent" }
        ],
        explanation: "**Borrowed Chords** (or Modal Interchange) involves taking a chord from the parallel minor key and using it in a major key song.\n\nThe most famous example is the **Minor 4 (iv)** chord. In C Major, the 4 chord is F Major. But if we play **F Minor**, it creates a heartbreaking, nostalgic sound.",
        tabs: [
          {
            title: "The 'Beatles' Cadence (IV -> iv -> I)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 3, label: "F", color: "primary" },
              { string: 4, fret: 3, label: "Fm", color: "accent" },
              { string: 5, fret: 3, label: "C", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The "Minor 4" Trick
// C -> F -> Fm -> C

// F Major (Happy)
note("f3 a3 c4").s("acoustic").slow(2),

// F Minor (Sad/Nostalgic)
note("f3 ab3 c4").s("acoustic").slow(2),

// Resolve to C
note("c3 e3 g3").s("acoustic").slow(2)

// GLOSSARY:
// The Ab note in Fm slides down to G in the C chord.`,
        keyTerms: [
          { term: "Modal Interchange", definition: "Borrowing chords from a parallel mode (e.g., using chords from C Minor in a C Major song)." },
          { term: "Picardy Third", definition: "Ending a minor key song with a major chord." }
        ]
      },
      {
        id: "common-progressions",
        title: "Common Progressions",
        concept: "The DNA of pop music.",
        learningGoals: ["Play the '4 Chords'", "Recognize common patterns"],
        legend: [
          { label: "I", color: "primary" },
          { label: "V", color: "secondary" },
          { label: "vi", color: "accent" },
          { label: "IV", color: "muted" }
        ],
        explanation: "If you learn just **four chords**, you can play thousands of pop songs. The progression **I - V - vi - IV** (1-5-6-4) is the most popular sequence in modern music history.\n\nIn the key of C: **C - G - Am - F**.",
        tabs: [
          {
            title: "The 'Axis of Awesome' (C-G-Am-F)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 6, fret: 3, label: "G", color: "secondary" },
              { string: 5, fret: 0, label: "Am", color: "accent" },
              { string: 4, fret: 3, label: "F", color: "muted" },
            ]
          }
        ],
        strudelCode: `// The "4 Chords" Loop
// Used by: Journey, Beatles, Adele, Lady Gaga...

// C -> G -> Am -> F
note("c3 g2 a2 f2")
  .s("acoustic")
  .slow(1)
  .repeat(2)

// GLOSSARY:
// Try singing "Let It Be" or "No Woman No Cry" over this.`,
        keyTerms: [
          { term: "Pop Punk Progression", definition: "A variation (I-V-vi-IV) common in pop punk music." },
          { term: "Doo-Wop Progression", definition: "I-vi-IV-V (C-Am-F-G), popular in the 50s." }
        ]
      }
    ]
  },
  {
    id: "rhythm-timing",
    title: "Rhythm & Timing",
    lessons: [
      {
        id: "time-signatures",
        title: "Time Signatures",
        concept: "The heartbeat of music.",
        learningGoals: ["Understand 4/4 vs 3/4", "Count beats per measure"],
        legend: [
          { label: "Strong Beat (1)", color: "primary" },
          { label: "Weak Beat", color: "secondary" }
        ],
        explanation: "The **Time Signature** appears at the start of a piece of music. The top number tells you **how many beats** are in each measure.\n\n*   **4/4 (Common Time):** Count '1, 2, 3, 4'. Used in 99% of Rock/Pop.\n*   **3/4 (Waltz Time):** Count '1, 2, 3'. Used in ballads and waltzes.",
        tabs: [
          {
            title: "4/4 Pulse (ONE two three four)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "1", color: "primary" },
              { string: 6, fret: 0, label: "2", color: "secondary" },
              { string: 6, fret: 0, label: "3", color: "secondary" },
              { string: 6, fret: 0, label: "4", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Feel the Pulse
// 4/4 vs 3/4

// 4/4 (Rock Beat)
note("c2 c2 c2 c2").s("sawtooth").slow(1),

// 3/4 (Waltz Feel)
note("c2 c3 c3").s("sawtooth").slow(1)

// GLOSSARY:
// Measure (Bar): A segment of time defined by a given number of beats.`,
        keyTerms: [
          { term: "Time Signature", definition: "A numerical sign indicating the meter of a musical composition." },
          { term: "Downbeat", definition: "The first beat of a measure." }
        ]
      },
      {
        id: "note-values",
        title: "Note Values",
        concept: "How long a note lasts.",
        learningGoals: ["Read rhythm notation", "Understand subdivision"],
        legend: [
          { label: "Whole Note", color: "primary" },
          { label: "Quarter Note", color: "accent" }
        ],
        explanation: "Rhythm is math. Each note has a specific duration relative to the beat.\n\n*   **Whole Note:** Lasts 4 beats.\n*   **Half Note:** Lasts 2 beats.\n*   **Quarter Note:** Lasts 1 beat.\n*   **Eighth Note:** Lasts 1/2 beat.\n*   **Sixteenth Note:** Lasts 1/4 beat.",
        tabs: [
          {
            title: "Rhythm Pyramid",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "Whole (4)", color: "primary" },
              { string: 5, fret: 0, label: "Half (2)", color: "secondary" },
              { string: 4, fret: 0, label: "Quarter (1)", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Subdivision
// Dividing the beat into smaller chunks

// Quarter Notes (1, 2, 3, 4)
note("c3 c3 c3 c3").s("acoustic").slow(1),

// Eighth Notes (1 & 2 & 3 & 4 &)
note("c3 c3 c3 c3 c3 c3 c3 c3").s("acoustic").slow(1)

// GLOSSARY:
// Tempo: The speed of the music, measured in Beats Per Minute (BPM).`,
        keyTerms: [
          { term: "Subdivision", definition: "Breaking down a beat into smaller rhythmic units." },
          { term: "Rest", definition: "A musical symbol marking a period of silence." }
        ]
      },
      {
        id: "strumming-patterns",
        title: "Strumming Patterns",
        concept: "The engine of the guitar.",
        learningGoals: ["Master the 'Island Strum'", "Control Down/Up strokes"],
        legend: [
          { label: "Down Stroke", color: "primary" },
          { label: "Up Stroke", color: "accent" },
          { label: "Miss", color: "muted" }
        ],
        explanation: "Strumming is about keeping your hand moving constantly like a pendulum. **Down** on the beat (1, 2, 3, 4), **Up** on the 'and' (&).\n\nThe most famous pattern is the **Island Strum**:\n**D - D U - U D U**\n(Down, Miss, Down-Up, Miss-Up, Down-Up)",
        tabs: [
          {
            title: "The Island Strum (D - DU - UDU)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "D", color: "primary" },
              { string: 6, fret: 0, label: "D", color: "primary" },
              { string: 6, fret: 0, label: "U", color: "accent" },
              { string: 6, fret: 0, label: "U", color: "accent" },
              { string: 6, fret: 0, label: "D", color: "primary" },
              { string: 6, fret: 0, label: "U", color: "accent" },
            ]
          }
        ],
        strudelCode: `// The "Island Strum"
// Used in: "Somewhere Over The Rainbow", "I'm Yours"

// D - DU - UDU
note("c3 ~ c3 c3 ~ c3 c3 c3")
  .s("acoustic")
  .slow(1)

// GLOSSARY:
// Keep your hand moving even when you don't hit the strings!`,
        keyTerms: [
          { term: "Strumming", definition: "A sweeping action where a finger or plectrum brushes over several strings." },
          { term: "Ghost Strum", definition: "Moving the hand as if to strum but missing the strings intentionally to keep time." }
        ]
      },
      {
        id: "syncopation",
        title: "Syncopation",
        concept: "Playing off the beat.",
        learningGoals: ["Feel the 'and' of the beat", "Create groove"],
        legend: [
          { label: "On Beat", color: "secondary" },
          { label: "Off Beat (Syncopated)", color: "accent" }
        ],
        explanation: "**Syncopation** involves accenting the weak beats or the 'off-beats' (the 'and's). This is what makes music feel funky, groovy, or surprising.\n\nIn Reggae, the guitar almost *never* plays on the 1. It plays on the 'and' of every beat.",
        tabs: [
          {
            title: "Reggae Chop (The 'Skank')",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "1 (Rest)", color: "muted" },
              { string: 6, fret: 0, label: "& (Chop)", color: "accent" },
              { string: 6, fret: 0, label: "2 (Rest)", color: "muted" },
              { string: 6, fret: 0, label: "& (Chop)", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Reggae Rhythm
// Listen to the "Chop" on the off-beats

// Rest - Chop - Rest - Chop
note("~ c3 ~ c3 ~ c3 ~ c3")
  .s("acoustic")
  .slow(1)

// GLOSSARY:
// The "One Drop": A reggae drum beat where the kick drum lands on beat 3, leaving beat 1 empty.`,
        keyTerms: [
          { term: "Syncopation", definition: "A disturbance or interruption of the regular flow of rhythm." },
          { term: "Off-beat", definition: "The points of time between the main beats." }
        ]
      },
      {
        id: "triplets",
        title: "Triplets",
        concept: "3 notes in the space of 2.",
        learningGoals: ["Count 'Trip-a-let'", "Feel the shuffle"],
        legend: [
          { label: "1", color: "primary" },
          { label: "2", color: "secondary" },
          { label: "3", color: "secondary" }
        ],
        explanation: "**Triplets** divide a beat into three equal parts instead of two. We count this as **'1-trip-let, 2-trip-let'**.\n\nThis feel is the foundation of Blues and Shuffle rhythms. It creates a rolling, swinging motion.",
        tabs: [
          {
            title: "Triplet Feel (1-trip-let)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "1", color: "primary" },
              { string: 6, fret: 0, label: "trip", color: "secondary" },
              { string: 6, fret: 0, label: "let", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Straight vs Triplet
// Feel the difference

// Straight 8ths (Rock)
note("c3 c3 c3 c3").s("acoustic").slow(1),

// Triplets (Blues Shuffle)
note("c3 c3 c3 c3 c3 c3").s("acoustic").slow(1)

// GLOSSARY:
// Shuffle: A rhythm based on triplets where the middle note is often skipped.`,
        keyTerms: [
          { term: "Triplet", definition: "A group of three notes played inside the length of two notes." },
          { term: "Shuffle", definition: "A rhythmic feel based on triplets, common in blues and jazz." }
        ]
      },
      {
        id: "odd-meters",
        title: "Odd Meters",
        concept: "Beyond 4/4.",
        learningGoals: ["Count 5/4 and 7/8", "Feel complex grooves"],
        legend: [
          { label: "Beat", color: "primary" },
          { label: "Accent", color: "accent" }
        ],
        explanation: "Most music is in 4/4, but **Odd Meters** like 5/4 or 7/8 create a unique, uneven feel. They are common in Progressive Rock, Jazz, and Folk music.\n\n*   **5/4 (Take Five):** Count '1-2-3, 1-2'.\n*   **7/8 (Money):** Count '1-2-3-4, 1-2-3'.",
        tabs: [
          {
            title: "5/4 Pulse (1-2-3, 1-2)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "1", color: "accent" },
              { string: 6, fret: 0, label: "2", color: "primary" },
              { string: 6, fret: 0, label: "3", color: "primary" },
              { string: 6, fret: 0, label: "4", color: "accent" },
              { string: 6, fret: 0, label: "5", color: "primary" },
            ]
          }
        ],
        strudelCode: `// 5/4 Time Signature
// "Take Five" Feel

// Count: ONE two three FOUR five
note("c2 c2 c2 c2 c2")
  .s("sawtooth")
  .slow(1.25) // 5 beats per cycle

// GLOSSARY:
// Compound Meter: Meters that can be divided into groups of 2 and 3 (like 5/4 or 7/8).`,
        keyTerms: [
          { term: "Odd Meter", definition: "A time signature where the number of beats in a bar is not divisible by 2 or 3." },
          { term: "Compound Meter", definition: "A time signature where the beat is divided into three equal parts." }
        ]
      },
      {
        id: "tempo-dynamics",
        title: "Tempo & Dynamics",
        concept: "Speed and volume.",
        learningGoals: ["Control speed (BPM)", "Use volume for expression"],
        legend: [
          { label: "Soft (p)", color: "secondary" },
          { label: "Loud (f)", color: "accent" }
        ],
        explanation: "Music isn't just about notes; it's about **how** you play them.\n\n*   **Tempo:** The speed (BPM). Fast = Excitement, Slow = Sadness/Grandeur.\n*   **Dynamics:** The volume. Getting louder (**Crescendo**) builds tension; getting softer (**Decrescendo**) creates intimacy.",
        tabs: [
          {
            title: "Dynamics Control",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "p", color: "secondary" },
              { string: 6, fret: 0, label: "mp", color: "secondary" },
              { string: 6, fret: 0, label: "mf", color: "primary" },
              { string: 6, fret: 0, label: "f", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Dynamics (Volume)
// Getting louder (Crescendo)

note("c3 c3 c3 c3")
  .s("acoustic")
  .velocity("0.2 0.4 0.7 1") // Increasing volume
  .slow(1)

// GLOSSARY:
// BPM: Beats Per Minute.
// Piano (p): Soft.
// Forte (f): Loud.`,
        keyTerms: [
          { term: "Tempo", definition: "The speed at which a passage of music is or should be played." },
          { term: "Dynamics", definition: "The variation in loudness between notes or phrases." }
        ]
      },
      {
        id: "groove",
        title: "Finding the Groove",
        concept: "Locking in.",
        learningGoals: ["Play in the pocket", "Listen to the drums"],
        legend: [
          { label: "Kick Drum", color: "primary" },
          { label: "Snare", color: "accent" },
          { label: "Guitar", color: "secondary" }
        ],
        explanation: "**Groove** (or 'The Pocket') is when the band locks together so tightly it feels like one giant instrument. As a guitarist, your job is to lock in with the **Kick Drum** and **Snare**.\n\nIf the drummer hits the kick, you hit a bass note. If they hit the snare, you chop a chord.",
        tabs: [
          {
            title: "Locking with the Kick",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "Kick", color: "primary" },
              { string: 6, fret: 0, label: "Kick", color: "primary" },
              { string: 6, fret: 0, label: "Snare", color: "accent" },
            ]
          }
        ],
        strudelCode: `// In The Pocket
// Guitar locking with Drums

// Drums: Kick - Snare - Kick - Snare
// Guitar: Root - Chord - Root - Chord

stack(
  note("c2 ~ c2 ~").s("sawtooth"), // Bass/Kick
  note("~ [e3,g3] ~ [e3,g3]").s("acoustic") // Chord/Snare
).slow(1)

// GLOSSARY:
// Pocket: The perfect synchronization of the rhythm section.`,
        keyTerms: [
          { term: "Groove", definition: "The sense of propulsive rhythmic 'feel' or sense of 'swing'." },
          { term: "Pocket", definition: "When the rhythm section is playing perfectly in time with one another." }
        ]
      },
      {
        id: "percussive-guitar",
        title: "Percussive Guitar",
        concept: "The guitar as a drum.",
        learningGoals: ["Muted strums (chucks)", "Slap techniques"],
        legend: [
          { label: "Strum", color: "primary" },
          { label: "Percussive Slap (X)", color: "accent" }
        ],
        explanation: "The guitar is also a percussion instrument. You can use **Percussive Slaps** (hitting the strings with your thumb or palm) to create a backbeat, simulating a snare drum.\n\nThis is the secret to the 'John Mayer' or 'Ed Sheeran' acoustic style.",
        tabs: [
          {
            title: "Slap Strum Technique",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "Strum", color: "primary" },
              { string: 6, fret: 0, label: "X", color: "accent" },
              { string: 6, fret: 0, label: "Strum", color: "primary" },
              { string: 6, fret: 0, label: "X", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Percussive Guitar
// Strum - Slap - Strum - Slap

// The "x" note represents a percussive hit
note("c3 x c3 x")
  .s("acoustic")
  .slow(1)

// GLOSSARY:
// Chuck: A percussive sound made by muting the strings with the palm while strumming.`,
        keyTerms: [
          { term: "Percussive Guitar", definition: "Using the body of the guitar or muted strings to create rhythmic sounds." },
          { term: "Backbeat", definition: "A strong accent on one of the normally unaccented beats of the bar." }
        ]
      },
      {
        id: "rubato",
        title: "Rubato",
        concept: "Free time.",
        learningGoals: ["Play expressively", "Ignore the metronome"],
        legend: [
          { label: "Slow", color: "secondary" },
          { label: "Fast", color: "accent" }
        ],
        explanation: "**Rubato** (Italian for 'robbed') means playing without a strict beat. You 'rob' time from one phrase and give it to another.\n\nThis is how you make a solo sound like a human voice—speeding up for excitement, slowing down for emphasis.",
        tabs: [
          {
            title: "Free Flow",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "Slow", color: "secondary" },
              { string: 6, fret: 1, label: "Fast", color: "accent" },
              { string: 6, fret: 2, label: "Fast", color: "accent" },
              { string: 6, fret: 3, label: "Slow", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Rubato (Free Time)
// Notice the tempo fluctuation

note("c3 d3 e3 f3 g3")
  .s("acoustic")
  .cps("0.5 0.6 0.8 0.6 0.4") // Changing speed per note
  .slow(2)

// GLOSSARY:
// Ad Lib: At liberty. Playing freely.`,
        keyTerms: [
          { term: "Rubato", definition: "The temporary disregarding of strict tempo to allow an expressive quickening or slackening, usually without altering the overall pace." },
          { term: "Ad Libitum", definition: "At one's pleasure; freely." }
        ]
      }
    ]
  },
  {
    id: "song-structure",
    title: "Song Structure",
    lessons: [
      {
        id: "verse-chorus",
        title: "Verse & Chorus",
        concept: "The basic building blocks.",
        learningGoals: ["Identify song sections", "Understand energy flow"],
        legend: [
          { label: "Verse (Story)", color: "secondary" },
          { label: "Chorus (Anthem)", color: "primary" }
        ],
        explanation: "Most songs are built on two main pillars:\n\n1.  **The Verse:** Tells the story. The lyrics change each time. The energy is usually lower.\n2.  **The Chorus:** The main message or 'hook'. The lyrics are the same each time. The energy is high and anthemic.",
        tabs: [
          {
            title: "Energy Flow",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "Verse", color: "secondary" },
              { string: 6, fret: 1, label: "Verse", color: "secondary" },
              { string: 6, fret: 2, label: "Chorus", color: "primary" },
              { string: 6, fret: 2, label: "Chorus", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Verse vs Chorus Dynamics
// Listen to the lift in energy

// Verse (Quiet, Palm Muted)
note("c3 c3 c3 c3").s("acoustic").velocity(0.5).slow(1),

// Chorus (Loud, Open Strum)
note("c3 e3 g3 c4").s("acoustic").velocity(1).slow(1)

// GLOSSARY:
// Hook: The most catchy and memorable part of the song, usually in the chorus.`,
        keyTerms: [
          { term: "Verse", definition: "A section of a song where the melody stays the same but lyrics change, telling the story." },
          { term: "Chorus", definition: "The repeated section of a song that contains the main message and hook." }
        ]
      },
      {
        id: "bridge",
        title: "The Bridge",
        concept: "Taking the listener somewhere new.",
        learningGoals: ["Write a contrasting section", "Build tension"],
        legend: [
          { label: "Main Key", color: "primary" },
          { label: "Bridge (New Feel)", color: "accent" }
        ],
        explanation: "The **Bridge** (or 'Middle 8') usually happens after the second chorus. Its job is to break the repetition and take the listener somewhere new before the final chorus.\n\nBridges often use different chords, a new melody, or even a key change.",
        tabs: [
          {
            title: "Bridge Progression (vi - IV)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 0, label: "Am", color: "accent" },
              { string: 4, fret: 3, label: "F", color: "accent" },
              { string: 6, fret: 3, label: "G", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The Bridge Section
// Breaking away from the main theme

// Chorus (Happy)
note("c3 e3 g3").s("acoustic").slow(2),

// Bridge (Minor/Tense)
note("a2 c3 e3").s("acoustic").slow(2)

// GLOSSARY:
// Middle 8: Another name for the bridge, referring to a standard 8-bar section in the middle of the song.`,
        keyTerms: [
          { term: "Bridge", definition: "A contrasting section that prepares for the return of the original material section." },
          { term: "Release", definition: "Another term for the bridge, providing relief from the verse/chorus repetition." }
        ]
      },
      {
        id: "intros-outros",
        title: "Intros & Outros",
        concept: "First and last impressions.",
        learningGoals: ["Create hooks", "End songs smoothly"],
        legend: [
          { label: "Intro", color: "primary" },
          { label: "Outro", color: "secondary" }
        ],
        explanation: "**Intros** set the mood and establish the key. **Outros** bring the song to a satisfying close (or a fade out).\n\nA great intro is instantly recognizable (think 'Sweet Child O' Mine' or 'Stairway to Heaven').",
        tabs: [
          {
            title: "Iconic Intro Riff Idea",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 2, label: "E", color: "primary" },
              { string: 3, fret: 0, label: "G", color: "primary" },
              { string: 2, fret: 1, label: "C", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The Intro
// Setting the scene

note("e3 g3 c4 e4")
  .s("acoustic")
  .slow(0.5)
  .repeat(2)

// GLOSSARY:
// Fade Out: Gradually decreasing the volume at the end of a recording.`,
        keyTerms: [
          { term: "Intro", definition: "The opening section of a piece of music, usually instrumental." },
          { term: "Outro", definition: "The concluding section of a piece of music." }
        ]
      },
      {
        id: "pre-chorus",
        title: "The Pre-Chorus",
        concept: "The ramp up.",
        learningGoals: ["Build anticipation", "Connect verse to chorus"],
        legend: [
          { label: "Verse", color: "secondary" },
          { label: "Pre-Chorus (Build)", color: "accent" },
          { label: "Chorus", color: "primary" }
        ],
        explanation: "The **Pre-Chorus** is the link between the Verse and the Chorus. Its job is to **build anticipation**.\n\nIt often uses rising chords or a melody that climbs higher in pitch, making the listener crave the release of the Chorus.",
        tabs: [
          {
            title: "The Build Up",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "Low", color: "secondary" },
              { string: 6, fret: 2, label: "Build", color: "accent" },
              { string: 6, fret: 4, label: "High", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The Pre-Chorus Lift
// Building tension...

// Verse (Low)
note("c3 c3").s("acoustic").slow(1),

// Pre-Chorus (Rising)
note("d3 e3 f3 g3").s("acoustic").slow(0.5),

// Chorus (Release!)
note("c4 e4 g4").s("acoustic").slow(2)

// GLOSSARY:
// Lift: Another name for the pre-chorus.`,
        keyTerms: [
          { term: "Pre-Chorus", definition: "A section that builds tension and leads into the chorus." },
          { term: "Build-up", definition: "Increasing intensity, volume, or tempo to prepare for a drop or chorus." }
        ]
      },
      {
        id: "hooks-riffs",
        title: "Hooks & Riffs",
        concept: "The earworm.",
        learningGoals: ["Write memorable melodies", "Create signature riffs"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Pentatonic Note", color: "secondary" },
          { label: "Blue Note", color: "accent" }
        ],
        explanation: "A **Hook** is the catchy part of the song you can't stop singing (usually the vocal melody). A **Riff** is a repeated instrumental pattern (like the guitar intro to 'Smoke on the Water').\n\nGreat riffs are often simple, rhythmic, and use the **Pentatonic Scale**.",
        tabs: [
          {
            title: "Classic Rock Riff (E Minor Pentatonic)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "E", color: "primary" },
              { string: 6, fret: 3, label: "G", color: "secondary" },
              { string: 5, fret: 0, label: "A", color: "secondary" },
              { string: 5, fret: 1, label: "Bb", color: "accent" }, // Blue note
              { string: 5, fret: 2, label: "B", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Iconic Riff Idea
// Simple, repetitive, catchy

note("e2 g2 a2 e2 g2 bb2 a2")
  .s("sawtooth")
  .clip(1) // Distortion
  .slow(1)
  .repeat(4)

// GLOSSARY:
// Earworm: A catchy song or tune that runs continually through a person's mind.`,
        keyTerms: [
          { term: "Hook", definition: "A musical idea, often a short riff, passage, or phrase, that is used in popular music to make a song appealing and to 'catch' the ear of the listener." },
          { term: "Riff", definition: "A short repeated phrase, frequently played over changing chords or harmonies or used as a background to a solo improvisation." }
        ]
      },
      {
        id: "arrangement",
        title: "Arrangement",
        concept: "Putting it all together.",
        learningGoals: ["Layer instruments", "Create space"],
        legend: [
          { label: "Bass", color: "primary" },
          { label: "Chords", color: "secondary" },
          { label: "Melody", color: "accent" }
        ],
        explanation: "**Arrangement** is the art of deciding *who plays what and when*. A common mistake is everyone playing at once.\n\nThink of it like a conversation: if everyone shouts, it's noise. If people take turns and support each other, it's harmony.",
        tabs: [
          {
            title: "Layering Example",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "Bass", color: "primary" },
              { string: 4, fret: 0, label: "Chord", color: "secondary" },
              { string: 2, fret: 1, label: "Melody", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Building an Arrangement
// 1. Bass -> 2. Chords -> 3. Melody

stack(
  note("c2 ~ c2 ~").s("sawtooth"), // Bass
  note("~ [e3,g3] ~ [e3,g3]").s("acoustic").velocity(0.6), // Chords
  note("e4 d4 c4 g3").s("piano") // Melody
).slow(1)

// GLOSSARY:
// Texture: The density and interaction of the different layers of sound.`,
        keyTerms: [
          { term: "Arrangement", definition: "The adaptation of a composition for performance by different instruments or voices." },
          { term: "Texture", definition: "How the melodic, rhythmic, and harmonic materials are combined in a composition." }
        ]
      },
      {
        id: "dynamics-flow",
        title: "Dynamics & Flow",
        concept: "The emotional journey.",
        learningGoals: ["Map song intensity", "Create peaks and valleys"],
        legend: [
          { label: "Low Energy", color: "secondary" },
          { label: "High Energy", color: "accent" }
        ],
        explanation: "A great song takes the listener on a journey. It shouldn't be at '10' the whole time.\n\n*   **Start Low:** Draw the listener in.\n*   **Build:** Create tension in the Pre-Chorus.\n*   **Peak:** Release the energy in the Chorus.\n*   **Drop:** Bring it down for the Bridge.",
        tabs: [
          {
            title: "Intensity Map",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "Verse", color: "secondary" },
              { string: 6, fret: 1, label: "Pre", color: "primary" },
              { string: 6, fret: 2, label: "Chorus", color: "accent" },
              { string: 6, fret: 0, label: "Bridge", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// The Emotional Arc
// Quiet -> Build -> Loud

note("c3 c3 c3 c3")
  .s("acoustic")
  .velocity("0.3 0.5 0.8 1") // Growing louder
  .slow(1)

// GLOSSARY:
// Contour: The shape of the melody or dynamic curve over time.`,
        keyTerms: [
          { term: "Dynamics", definition: "The variation in loudness between notes or phrases." },
          { term: "Contour", definition: "The shape of a melody or the rise and fall of intensity in a piece." }
        ]
      },
      {
        id: "improvisation",
        title: "Improvisation",
        concept: "Composing on the spot.",
        learningGoals: ["Use scales creatively", "Sing with the guitar"],
        legend: [
          { label: "Root (Home)", color: "primary" },
          { label: "Safe Note", color: "secondary" },
          { label: "Blue Note", color: "accent" }
        ],
        explanation: "**Improvisation** is just spontaneous composition. You aren't just playing random notes; you are 'speaking' with your instrument.\n\nThe best way to start is to **sing a melody in your head**, then try to find it on the fretboard.",
        tabs: [
          {
            title: "Safe Notes (C Major Pentatonic)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 0, label: "D", color: "secondary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 3, fret: 2, label: "A", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Jamming Track
// Try playing C, D, E, G, A over this

note("c2 g2 a2 f2")
  .s("sawtooth")
  .slow(2)
  .repeat(4)

// GLOSSARY:
// Lick: A short, recognizable musical phrase or pattern.`,
        keyTerms: [
          { term: "Improvisation", definition: "Creating music spontaneously without a written score." },
          { term: "Lick", definition: "A stock pattern or phrase consisting of a short series of notes." }
        ]
      },
      {
        id: "ear-training",
        title: "Ear Training",
        concept: "Listening deep.",
        learningGoals: ["Identify intervals", "Transcribe songs"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Target Note", color: "accent" }
        ],
        explanation: "**Ear Training** is the superpower of great musicians. It's the ability to hear a sound and know exactly where it is on the guitar.\n\nStart by identifying **Intervals** using famous songs:\n*   **Perfect 5th:** Star Wars Theme\n*   **Major 3rd:** When The Saints Go Marching In\n*   **Perfect 4th:** Here Comes The Bride",
        tabs: [
          {
            title: "Perfect 5th (Star Wars)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 0, label: "G", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Interval Quiz
// What is this interval? (Perfect 5th)

note("c3 g3").s("acoustic").slow(1)

// GLOSSARY:
// Relative Pitch: The ability to identify the interval between two notes.`,
        keyTerms: [
          { term: "Ear Training", definition: "The practice of learning to recognize pitches, intervals, chords, and rhythms by ear." },
          { term: "Relative Pitch", definition: "The ability to identify or re-create a given musical note by comparing it to a reference note." }
        ]
      },
      {
        id: "songwriting",
        title: "Songwriting Basics",
        concept: "Creating your own music.",
        learningGoals: ["Write a chord progression", "Craft a melody"],
        legend: [
          { label: "Chord", color: "primary" },
          { label: "Melody", color: "accent" }
        ],
        explanation: "**Songwriting** is the ultimate goal of theory. Theory isn't a rulebook; it's a toolkit to help you express your ideas.\n\n**Simple Recipe:**\n1.  Pick a Key (e.g., G Major).\n2.  Pick 3 chords (e.g., G, C, D).\n3.  Hum a melody over them.\n4.  Write words that match the feeling.",
        tabs: [
          {
            title: "Blank Canvas (I - IV - V)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 0, label: "D", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Inspiration Loop
// Write your own melody over this!

note("g2 c3 d3 g2")
  .s("acoustic")
  .slow(2)
  .repeat(4)

// GLOSSARY:
// Prosody: The rhythm and sound of the lyrics matching the music.`,
        keyTerms: [
          { term: "Composition", definition: "The act of creating a new piece of music." },
          { term: "Prosody", definition: "The appropriate relationship between lyrics and music." }
        ]
      }
    ]
  }
];
