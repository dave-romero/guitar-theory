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
        explanation: "Diminished chords sound tense and unresolved. They are built with a Root, Minor 3rd, and Diminished 5th (flat 5).",
        tabs: [],
        strudelCode: "// Diminished Chord\nnote('c3 eb3 gb3').s('acoustic')",
        keyTerms: []
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
        explanation: "Instead of chord names (C, F, G), we use numbers (1, 4, 5). This allows us to play a song in any key instantly.",
        tabs: [],
        strudelCode: "// 1-4-5 Progression\nnote('c3 f3 g3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "diatonic-chords",
        title: "Diatonic Chords",
        concept: "Chords that belong to a key.",
        learningGoals: ["Build chords on every scale degree", "Know the Major Key pattern"],
        explanation: "In a Major key, the chords always follow this pattern: Major, Minor, Minor, Major, Major, Minor, Diminished.",
        tabs: [],
        strudelCode: "// Diatonic Chords in C\nnote('c3 d3 e3 f3 g3 a3 b3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "identifying-key",
        title: "Identifying the Key",
        concept: "Finding 'Home'.",
        learningGoals: ["Find the tonic center", "Analyze chord progressions"],
        explanation: "The Key is the gravitational center of a song. We'll learn how to listen for 'Home' and identify the key signature.",
        tabs: [],
        strudelCode: "// Resolving to C\nnote('g3 b3 c4').s('acoustic')",
        keyTerms: []
      },
      {
        id: "circle-of-fifths",
        title: "The Circle of Fifths",
        concept: "The map of all keys.",
        learningGoals: ["Navigate key signatures", "Predict chord changes"],
        explanation: "The Circle of Fifths organizes all 12 keys by the number of sharps or flats. It's the ultimate cheat sheet for music theory.",
        tabs: [],
        strudelCode: "// C -> G -> D -> A\nnote('c3 g3 d3 a3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "relative-minor",
        title: "Relative Minor",
        concept: "The sad twin of every major key.",
        learningGoals: ["Find the relative minor (6th degree)", "Switch between Major/Minor"],
        explanation: "Every Major key has a Relative Minor key that shares the exact same notes. For C Major, it's A Minor.",
        tabs: [],
        strudelCode: "// C Major vs A Minor\nnote('c3 e3 g3, a2 c3 e3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "transposing",
        title: "Transposing",
        concept: "Changing the key.",
        learningGoals: ["Move songs to better vocal ranges", "Use a capo effectively"],
        explanation: "Transposing means moving a song up or down in pitch while keeping the same relationships (intervals) between notes.",
        tabs: [],
        strudelCode: "// Transposition\nnote('c3 e3 g3').transpose(2).s('acoustic')",
        keyTerms: []
      },
      {
        id: "modulation",
        title: "Modulation",
        concept: "Changing key within a song.",
        learningGoals: ["Recognize key changes", "Pivot chords"],
        explanation: "Modulation is shifting the tonal center during a song to create a lift or emotional shift.",
        tabs: [],
        strudelCode: "// Key Change\nnote('c3 e3 g3, d3 fs3 a3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "secondary-dominants",
        title: "Secondary Dominants",
        concept: "Borrowing chords to pull to a new target.",
        learningGoals: ["Use V of V chords", "Add harmonic interest"],
        explanation: "A secondary dominant is a Major chord that resolves to a chord other than the Tonic, adding a strong pull.",
        tabs: [],
        strudelCode: "// C -> A7 -> Dm\nnote('c3 a3 d3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "borrowed-chords",
        title: "Borrowed Chords",
        concept: "Mixing Major and Minor keys.",
        learningGoals: ["Use chords from parallel minor", "Modal interchange"],
        explanation: "We can 'borrow' chords from the parallel minor key (like playing Fm in the key of C) to add emotional depth.",
        tabs: [],
        strudelCode: "// C -> Fm -> C\nnote('c3 f3 c3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "common-progressions",
        title: "Common Progressions",
        concept: "The DNA of hit songs.",
        learningGoals: ["Play I-V-vi-IV", "Play ii-V-I"],
        explanation: "Certain chord sequences appear in thousands of songs. We'll learn the most popular ones like the 'Axis of Awesome' progression.",
        tabs: [],
        strudelCode: "// I-V-vi-IV\nnote('c3 g3 a3 f3').s('acoustic')",
        keyTerms: []
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
        concept: "The pulse of music.",
        learningGoals: ["Understand 4/4 vs 3/4", "Feel the downbeat"],
        explanation: "Time signatures tell us how many beats are in a bar and which note gets the beat. 4/4 is the most common.",
        tabs: [],
        strudelCode: "// 4/4 Pulse\nnote('c3 c3 c3 c3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "subdivision",
        title: "Subdivision",
        concept: "Cutting time into smaller pieces.",
        learningGoals: ["Count 8th notes and 16th notes", "Improve timing accuracy"],
        explanation: "Subdivision is counting the spaces between the beats (1-and-2-and...). It's the secret to solid timing.",
        tabs: [],
        strudelCode: "// 8th Notes\nnote('c3 [c3 c3]').s('acoustic')",
        keyTerms: []
      },
      {
        id: "strumming-patterns",
        title: "Strumming Patterns",
        concept: "Right hand rhythm.",
        learningGoals: ["Down vs Up strokes", "Common patterns"],
        explanation: "Strumming is about keeping a constant motion with your hand. Down on the beat, Up on the 'and'.",
        tabs: [],
        strudelCode: "// D-D-U-U-D-U\nnote('c3 . c3 c3 . c3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "syncopation",
        title: "Syncopation",
        concept: "Playing off the beat.",
        learningGoals: ["Accent weak beats", "Create groove"],
        explanation: "Syncopation involves stressing the weak beats or off-beats, creating a rhythmic surprise and groove.",
        tabs: [],
        strudelCode: "// Syncopated Rhythm\nnote('c3 ~ c3 ~').s('acoustic')",
        keyTerms: []
      },
      {
        id: "swing-feel",
        title: "Swing Feel",
        concept: "The jazz bounce.",
        learningGoals: ["Straight vs Swing feel", "Triplet feel"],
        explanation: "Swing feel delays the second 8th note of every pair, creating a galloping or bouncing rhythm.",
        tabs: [],
        strudelCode: "// Swing Rhythm\nnote('c3 c3').s('acoustic').swing(0.5)",
        keyTerms: []
      },
      {
        id: "triplets",
        title: "Triplets",
        concept: "Three notes in the space of two.",
        learningGoals: ["Count 1-trip-let", "Polyrhythms"],
        explanation: "Triplets divide a beat into three equal parts. They are essential for blues and shuffle rhythms.",
        tabs: [],
        strudelCode: "// Triplets\nnote('c3 c3 c3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "odd-meters",
        title: "Odd Meters",
        concept: "Beyond 4/4.",
        learningGoals: ["Count 5/4 and 7/8", "Feel complex grooves"],
        explanation: "Odd meters like 5/4 or 7/8 have an uneven feel, often used in progressive rock and jazz.",
        tabs: [],
        strudelCode: "// 5/4 Time\nnote('c3 c3 c3 c3 c3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "tempo-dynamics",
        title: "Tempo & Dynamics",
        concept: "Speed and volume.",
        learningGoals: ["Control speed (BPM)", "Use volume for expression"],
        explanation: "Tempo is the speed of the music. Dynamics is the volume. Controlling both brings music to life.",
        tabs: [],
        strudelCode: "// Tempo Change\nnote('c3 c3').s('acoustic').cps(2)",
        keyTerms: []
      },
      {
        id: "groove",
        title: "Finding the Groove",
        concept: "Locking in.",
        learningGoals: ["Play in the pocket", "Listen to the drums"],
        explanation: "Groove is the feeling of notes locking together with the rhythm section. It's about feel, not just math.",
        tabs: [],
        strudelCode: "// Funky Groove\nnote('c3 ~ c3 c3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "percussive-guitar",
        title: "Percussive Guitar",
        concept: "The guitar as a drum.",
        learningGoals: ["Muted strums (chucks)", "Slap techniques"],
        explanation: "Using the guitar body or muted strings to create percussive sounds adds a rhythmic layer to your playing.",
        tabs: [],
        strudelCode: "// Percussive hits\nnote('x x x x').s('acoustic')",
        keyTerms: []
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
        explanation: "Most songs alternate between Verses (storytelling, lower energy) and Choruses (main message, higher energy).",
        tabs: [],
        strudelCode: "// Verse -> Chorus\nnote('c3 c3 g3 g3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "bridge",
        title: "The Bridge",
        concept: "Taking the listener somewhere new.",
        learningGoals: ["Write a contrasting section", "Build tension"],
        explanation: "The Bridge happens once, usually after the second chorus. It provides a break and builds tension for the final chorus.",
        tabs: [],
        strudelCode: "// Bridge Section\nnote('f3 f3 g3 g3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "intros-outros",
        title: "Intros & Outros",
        concept: "First and last impressions.",
        learningGoals: ["Create hooks", "End songs smoothly"],
        explanation: "The Intro sets the mood. The Outro brings the song to a close. Both are crucial for a complete arrangement.",
        tabs: [],
        strudelCode: "// Intro Riff\nnote('c3 e3 g3 c4').s('acoustic')",
        keyTerms: []
      },
      {
        id: "pre-chorus",
        title: "The Pre-Chorus",
        concept: "The ramp up.",
        learningGoals: ["Build anticipation", "Connect verse to chorus"],
        explanation: "The Pre-Chorus lifts the energy from the Verse and delivers the listener to the Chorus.",
        tabs: [],
        strudelCode: "// Pre-Chorus Build\nnote('d3 d3 g3 g3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "hooks-riffs",
        title: "Hooks & Riffs",
        concept: "The earworm.",
        learningGoals: ["Write memorable melodies", "Create signature riffs"],
        explanation: "A Hook is the catchy part of the song you can't stop singing. A Riff is a repeated instrumental pattern.",
        tabs: [],
        strudelCode: "// Catchy Riff\nnote('c3 d3 e3 c3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "arrangement",
        title: "Arrangement",
        concept: "Orchestrating the parts.",
        learningGoals: ["Layer instruments", "Manage density"],
        explanation: "Arrangement is deciding which instruments play what and when. It's about texture and dynamics.",
        tabs: [],
        strudelCode: "// Layered Arrangement\nstack(note('c3'), note('e3')).s('acoustic')",
        keyTerms: []
      },
      {
        id: "dynamics-contour",
        title: "Dynamics & Contour",
        concept: "The emotional journey.",
        learningGoals: ["Map energy levels", "Create peaks and valleys"],
        explanation: "A great song takes the listener on a journey with ups and downs in volume and intensity.",
        tabs: [],
        strudelCode: "// Dynamic Swell\nnote('c3').s('acoustic').gain(0.5)",
        keyTerms: []
      },
      {
        id: "genre-styles",
        title: "Genre Styles",
        concept: "Idioms of different music.",
        learningGoals: ["Identify genre characteristics", "Adapt playing style"],
        explanation: "Different genres (Blues, Rock, Jazz, Funk) have specific structural and rhythmic conventions.",
        tabs: [],
        strudelCode: "// Blues Shuffle\nnote('c3 e3 g3 a3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "improvisation",
        title: "Improvisation",
        concept: "Composing in real-time.",
        learningGoals: ["Solo over changes", "Use scales creatively"],
        explanation: "Improvisation is using your theory knowledge to create new melodies on the spot.",
        tabs: [],
        strudelCode: "// Solo Lick\nnote('c3 d3 e3 g3').s('acoustic')",
        keyTerms: []
      },
      {
        id: "song-analysis",
        title: "Song Analysis",
        concept: "Deconstructing hits.",
        learningGoals: ["Analyze full songs", "Apply all concepts"],
        explanation: "We'll take everything we've learned and apply it to analyze a complete song from start to finish.",
        tabs: [],
        strudelCode: "// Full Song Structure\nnote('c3 g3 a3 f3').s('acoustic')",
        keyTerms: []
      }
    ]
  }
];
