export interface Marker {
  string: number;
  fret: number;
  label?: string;
  color?: "primary" | "secondary" | "accent" | "muted";
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
  text: string;
  tabs: TabData[];
  strudelCode: string;
  keyTerms: { term: string; definition: string }[];
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
        text: "The musical alphabet consists of 7 natural notes: A, B, C, D, E, F, G. Between most of these notes are sharps (#) or flats (b). The distance between any two adjacent notes (like A to A#) is called a half step (or semitone). On the guitar, one fret equals one half step.\n\nThe full chromatic scale is: A, A#, B, C, C#, D, D#, E, F, F#, G, G#.\n\nNotice that B to C and E to F do NOT have sharps between them. This is the most important rule to memorize!",
        tabs: [
          {
            title: "Chromatic Scale on A String",
            startFret: 0,
            fretCount: 5,
            markers: [
              { string: 5, fret: 0, label: "A", color: "primary" },
              { string: 5, fret: 1, label: "A#", color: "secondary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 5, fret: 4, label: "C#", color: "secondary" },
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
        text: "Unlike a piano where each key plays a unique pitch, the guitar has multiple locations for the same pitch. For example, the 5th fret of the Low E string is the note 'A'. This is the exact same pitch as the open A string.\n\nThis pattern repeats across the fretboard (except for the G to B string, which shifts by 4 frets instead of 5).",
        tabs: [
          {
            title: "Unison: A Note (Low E vs Open A)",
            startFret: 0,
            fretCount: 6,
            markers: [
              { string: 6, fret: 5, label: "A", color: "primary" },
              { string: 5, fret: 0, label: "A", color: "primary" },
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
        text: "We already know a Half Step is 1 fret. A Whole Step is simply 2 frets (or 2 half steps).\n\nMost scales are built from patterns of whole steps (W) and half steps (H). Being able to visualize 'skip a fret' (Whole Step) vs 'adjacent fret' (Half Step) is crucial.",
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
        text: "Every major scale follows the same pattern of steps: Whole, Whole, Half, Whole, Whole, Whole, Half.\n\nLet's build a G Major scale on one string using this formula:\nStart on G (3rd fret)\n+ Whole (5)\n+ Whole (7)\n+ Half (8)\n+ Whole (10)\n+ Whole (12)\n+ Whole (14)\n+ Half (15 - which is G again!)",
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
        text: "An octave is the distance from one note to the next version of that same note (e.g., Low G to High G). On the guitar, there is a consistent shape to find octaves:\n\nFrom E or A string: Go down 2 strings, and up 2 frets.\n\nThis shape is your anchor. If you know where G is on the Low E string, you instantly know where G is on the D string.",
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
        text: "The Perfect 5th is the most stable interval after the octave. It creates a powerful, thick sound used constantly in rock and pop.\n\nShape: From the Low E or A string, go down 1 string and up 2 frets.\n\nWait... that looks like the Octave shape? Close! The Octave is down 2 strings. The 5th is down 1 string.",
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
        text: "If the Root and 5th are the 'body' of the chord, the 3rd is the 'soul'. It determines if a chord is Happy (Major) or Sad (Minor).\n\nMajor 3rd: Up 1 string, back 1 fret.\nMinor 3rd: Up 1 string, back 2 frets.\n(Relative to the Root on E or A string)",
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
        text: "Now we can map out the key intervals surrounding any root note on the Low E string.\n\nRoot: Index finger\nMinor 3rd: Pinky (same string)\nMajor 3rd: Middle finger (next string)\nPerfect 5th: Ring finger (next string)\nOctave: Ring finger (skip a string)\n\nMemorizing this 'cluster' allows you to build chords and scales anywhere.",
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
        text: "Instead of counting frets, guitarists see shapes. A 'Power Chord' isn't '7 semitones', it's 'down one, over two'.\n\nLet's review the shapes we know:\n1. Octave (L-shape)\n2. Power Chord (Diagonal)\n3. Major 3rd (Tight diagonal)\n4. Minor 3rd (Wide diagonal or same string)",
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
        text: "The ultimate goal is to hear a sound and know the shape immediately. Try this exercise:\n\n1. Play a Root note.\n2. Hum a pitch above it.\n3. Find that pitch on the guitar.\n4. Identify the interval (Is it a 5th? A 3rd?)\n\nUse the code below to test yourself. It plays a random interval - can you guess which one it is?",
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
  }
];
