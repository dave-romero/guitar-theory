export interface Marker {
  string: number;
  fret: number;
  label?: string;
  color?: "primary" | "secondary" | "accent" | "muted" | "blue";
}

export interface LegendItem {
  label: string;
  color: "primary" | "secondary" | "blue" | "muted" | "accent" | "destructive";
  outline?: boolean;
}

export interface TabData {
  title?: string;
  startFret: number;
  fretCount: number;
  markers: Marker[];
}

// Visualization Data Interfaces
export interface RhythmGridData {
  timeSignature: [number, number];
  notes: { start: number; duration: number; type: "note" | "rest" }[];
  activeBeat?: number;
}

export interface StrummingPatternData {
  pattern: ("D" | "U" | "x" | "-")[];
}

export interface SongStructureData {
  sections: {
    name: string;
    duration: number;
    intensity: number;
    color: "primary" | "secondary" | "accent" | "muted";
  }[];
}

export interface CircleOfFifthsData {
  activeKey: string;
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
  visualization?: "RhythmGrid" | "StrummingPattern" | "SongStructure" | "CircleOfFifths";
  // Visualization Props
  rhythmGridData?: RhythmGridData;
  strummingPatternData?: StrummingPatternData;
  songStructureData?: SongStructureData;
  circleOfFifthsData?: CircleOfFifthsData;
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
        explanation: "An octave is the same note, just higher or lower in pitch. On the guitar, there is a consistent shape to find the octave: **Down 2 strings, Up 2 frets**.\n\nThis works for the E and A strings. (Remember the B string shift? For the D and G strings, it's Down 2 strings, Up 3 frets!)",
        tabs: [
          {
            title: "Octave Shape (E & A Strings)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 4, fret: 5, label: "G", color: "primary" },
            ]
          },
          {
            title: "Octave Shape (D String - The Exception)",
            startFret: 3,
            fretCount: 5,
            markers: [
              { string: 4, fret: 3, label: "F", color: "primary" },
              { string: 2, fret: 6, label: "F", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Octaves
// Same note, different pitch (Low vs High)

cat(
  // Low G
  note("g2").s("acoustic"),
  
  // High G (Octave)
  note("g3").s("acoustic")
).slow(2)

// GLOSSARY:
// note("g2") -> Low G
// note("g3") -> High G (Octave up)
// They sound "the same" but one is higher`,
        keyTerms: [
          { term: "Octave", definition: "The interval between one musical pitch and another with double its frequency." },
          { term: "Shape", definition: "A visual pattern on the fretboard." }
        ]
      },
      {
        id: "intervals-intro",
        title: "Introduction to Intervals",
        concept: "The DNA of music.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Interval", color: "secondary" }
        ],
        explanation: "An interval is simply the distance between two notes. We name them by counting letters.\n\nG to A = 2nd (G, A)\nG to B = 3rd (G, A, B)\nG to C = 4th (G, A, B, C)\n\nEvery interval has a unique sound or 'feeling'.",
        tabs: [
          {
            title: "Major 3rd Interval (G to B)",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Intervals
// The building blocks of melody and harmony

cat(
  // Perfect 5th (Power Chord sound)
  note("g2 d3").s("acoustic"),
  
  // Major 3rd (Happy sound)
  note("g2 b2").s("acoustic")
).slow(2)

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
        explanation: "Music theory is useless if you can't hear it. Try to identify these intervals by ear before looking at the answer.\n\nIs it Happy (Major)? Sad (Minor)? Powerful (5th)?",
        tabs: [],
        strudelCode: `// Ear Training Challenge
// Can you guess the interval?

// Mystery Interval 1
note("c3 e3").s("acoustic").slow(2),

// Mystery Interval 2
note("c3 eb3").s("acoustic").slow(2)

// GLOSSARY:
// Listen closely to the "mood" of the two notes together.`,
        keyTerms: [
          { term: "Ear Training", definition: "The practice of identifying music concepts (intervals, chords, rhythms) solely by hearing them." }
        ]
      },
      {
        id: "triads-intro",
        title: "Introduction to Triads",
        concept: "The simplest chords.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "3rd", color: "secondary" },
          { label: "5th", color: "secondary" }
        ],
        explanation: "A triad is a 3-note chord. It contains a Root, a 3rd, and a 5th.\n\n*   **Major Triad:** Root + Major 3rd + Perfect 5th (Happy)\n*   **Minor Triad:** Root + Minor 3rd + Perfect 5th (Sad)",
        tabs: [
          {
            title: "G Major Triad",
            startFret: 3,
            fretCount: 4,
            markers: [
              { string: 6, fret: 3, label: "G", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 0, label: "D", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Triads
// 3 notes played together

// G Major Triad (G - B - D)
note("g2 b2 d3").s("acoustic").slow(2),

// G Minor Triad (G - Bb - D)
note("g2 bb2 d3").s("acoustic").slow(2)

// GLOSSARY:
// note("...") -> Playing notes simultaneously creates a chord
// Notice the change from B to Bb changes the mood completely`,
        keyTerms: [
          { term: "Triad", definition: "A chord made of three notes: Root, 3rd, and 5th." },
          { term: "Harmony", definition: "The sound of two or more notes heard simultaneously." }
        ]
      },
      {
        id: "caged-system-intro",
        title: "Intro to CAGED System",
        concept: "5 shapes to rule them all.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Chord Tone", color: "secondary" }
        ],
        explanation: "The CAGED system shows us that there are only 5 main open chord shapes: C, A, G, E, and D. These shapes can be moved up the neck to play ANY chord anywhere.\n\nWe start by mastering these 5 open chords perfectly.",
        tabs: [
          {
            title: "C Major Shape",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 1, label: "C", color: "primary" },
              { string: 1, fret: 0, label: "E", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// The C Major Chord
// One of the 5 CAGED shapes

note("c3 e3 g3 c4 e4")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// Arpeggio: Playing the notes of a chord one by one.`,
        keyTerms: [
          { term: "CAGED System", definition: "A method for visualizing the fretboard using 5 common open chord shapes." },
          { term: "Open Chord", definition: "A chord that includes one or more open strings." }
        ]
      },
      {
        id: "pentatonic-intro",
        title: "Intro to Pentatonic Scale",
        concept: "The 5-note scale of rock & blues.",
        learningGoals: ["Understand the core concept", "Apply it to the fretboard"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Scale Note", color: "secondary" }
        ],
        explanation: "The Pentatonic scale removes the 2 'tension' notes from the Major scale, leaving only 5 'safe' notes. It's almost impossible to hit a bad note with this scale, which is why it's the foundation of guitar solos.",
        tabs: [
          {
            title: "A Minor Pentatonic (Box 1)",
            startFret: 5,
            fretCount: 4,
            markers: [
              { string: 6, fret: 5, label: "A", color: "primary" },
              { string: 6, fret: 8, label: "C", color: "secondary" },
              { string: 5, fret: 5, label: "D", color: "secondary" },
              { string: 5, fret: 7, label: "E", color: "secondary" },
              { string: 4, fret: 5, label: "G", color: "secondary" },
              { string: 4, fret: 7, label: "A", color: "primary" },
            ]
          }
        ],
        strudelCode: `// A Minor Pentatonic
// The "Guitar Solo" Scale

note("a2 c3 d3 e3 g3 a3")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// Pentatonic: Penta (5) + Tonic (Tones). A 5-note scale.`,
        keyTerms: [
          { term: "Pentatonic", definition: "A musical scale with five notes per octave." },
          { term: "Box Shape", definition: "A common pattern for playing scales on the guitar that stays in one position." }
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
        concept: "Stacking 3rds.",
        learningGoals: ["Build Major triads", "Build Minor triads"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "3rd", color: "secondary" },
          { label: "5th", color: "secondary" }
        ],
        explanation: "Chords are built by stacking every other note from a scale (1-3-5). The distance between the 1 and 3 determines if it's Major or Minor.\n\n*   **Major 3rd** (4 semitones) = Happy\n*   **Minor 3rd** (3 semitones) = Sad",
        tabs: [
          {
            title: "C Major Triad (C-E-G)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
            ]
          },
          {
            title: "C Minor Triad (C-Eb-G)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 1, label: "Eb", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Major vs Minor Triad
// Listen to the 3rd change

// C Major (Happy)
note("c3 e3 g3").s("acoustic").slow(2),

// C Minor (Sad)
note("c3 eb3 g3").s("acoustic").slow(2)

// GLOSSARY:
// note("eb3") -> E flat (Minor 3rd of C)`,
        keyTerms: [
          { term: "Root", definition: "The foundation note of the chord." },
          { term: "Third", definition: "The note that determines the chord's quality (Major or Minor)." },
          { term: "Fifth", definition: "The stabilizing note of the chord." }
        ]
      },
      {
        id: "major-chords",
        title: "Major Chords",
        concept: "1 - 3 - 5",
        learningGoals: ["Construct Major chords", "Identify Major sound"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Major 3rd", color: "secondary" },
          { label: "Perfect 5th", color: "secondary" }
        ],
        explanation: "A Major chord is the most stable sound in music. It consists of a Root, a Major 3rd, and a Perfect 5th.\n\nFormula: **R + M3 + P5**",
        tabs: [
          {
            title: "E Major Shape",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "E", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 2, label: "E", color: "primary" },
              { string: 3, fret: 1, label: "G#", color: "secondary" },
              { string: 2, fret: 0, label: "B", color: "secondary" },
              { string: 1, fret: 0, label: "E", color: "primary" },
            ]
          }
        ],
        strudelCode: `// E Major Chord
// Bright, stable, happy

note("e2 b2 e3 gs3 b3 e4")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// gs3 -> G sharp (The Major 3rd of E)`,
        keyTerms: [
          { term: "Major 3rd", definition: "An interval of 4 semitones (2 whole steps)." },
          { term: "Consonance", definition: "A combination of notes that sounds stable and pleasant." }
        ]
      },
      {
        id: "minor-chords",
        title: "Minor Chords",
        concept: "1 - b3 - 5",
        learningGoals: ["Construct Minor chords", "Identify Minor sound"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Minor 3rd", color: "secondary" },
          { label: "Perfect 5th", color: "secondary" }
        ],
        explanation: "A Minor chord lowers the 3rd by one half step (flattened 3rd). This small change creates a darker, sadder, or more serious sound.\n\nFormula: **R + b3 + P5**",
        tabs: [
          {
            title: "E Minor Shape",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 6, fret: 0, label: "E", color: "primary" },
              { string: 5, fret: 2, label: "B", color: "secondary" },
              { string: 4, fret: 2, label: "E", color: "primary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 0, label: "B", color: "secondary" },
              { string: 1, fret: 0, label: "E", color: "primary" },
            ]
          }
        ],
        strudelCode: `// E Minor Chord
// Dark, sad, serious

note("e2 b2 e3 g3 b3 e4")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// g3 -> G Natural (The Minor 3rd of E)
// Compare to G# in E Major`,
        keyTerms: [
          { term: "Minor 3rd", definition: "An interval of 3 semitones (1.5 whole steps)." },
          { term: "Flat (b)", definition: "Lowering a note by one half step." }
        ]
      },
      {
        id: "diminished-chords",
        title: "Diminished Chords",
        concept: "1 - b3 - b5",
        learningGoals: ["Construct Diminished chords", "Identify tension"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Minor 3rd", color: "secondary" },
          { label: "Flat 5th", color: "accent" }
        ],
        explanation: "If we take a Minor chord and ALSO lower the 5th, we get a Diminished chord. This chord is very unstable and tense. It wants to resolve to a stable chord.\n\nFormula: **R + b3 + b5**",
        tabs: [
          {
            title: "B Diminished Triad",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 2, label: "B", color: "primary" },
              { string: 4, fret: 3, label: "D", color: "secondary" },
              { string: 3, fret: 4, label: "F", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Diminished Chord
// Tense, scary, unstable

note("b2 d3 f3")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// Triton: The interval of a flattened 5th, known as the "Devil's Interval" in history.`,
        keyTerms: [
          { term: "Diminished", definition: "Made smaller. Lowering both the 3rd and the 5th." },
          { term: "Dissonance", definition: "A combination of notes that sounds unstable and harsh." }
        ]
      },
      {
        id: "augmented-chords",
        title: "Augmented Chords",
        concept: "1 - 3 - #5",
        learningGoals: ["Construct Augmented chords", "Identify dreamlike sound"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Major 3rd", color: "secondary" },
          { label: "Sharp 5th", color: "accent" }
        ],
        explanation: "If we take a Major chord and RAISE the 5th, we get an Augmented chord. It sounds dreamy, floating, or unresolved.\n\nFormula: **R + M3 + #5**",
        tabs: [
          {
            title: "C Augmented",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 1, label: "G#", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Augmented Chord
// Dreamy, floating, spacey

note("c3 e3 gs3")
  .s("acoustic")
  .slow(2)

// GLOSSARY:
// Augmented: Made larger. Raising the 5th.`,
        keyTerms: [
          { term: "Augmented", definition: "Made larger. Raising the 5th by a half step." },
          { term: "Whole Tone", definition: "A scale made entirely of whole steps, related to augmented chords." }
        ]
      },
      {
        id: "sus-chords",
        title: "Sus Chords (Sus2, Sus4)",
        concept: "Replacing the 3rd.",
        learningGoals: ["Construct Sus2/Sus4", "Create movement"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "Suspended Note", color: "accent" },
          { label: "5th", color: "secondary" }
        ],
        explanation: "Sus (Suspended) chords replace the 3rd with either a 2nd (Sus2) or a 4th (Sus4). Because there is no 3rd, they are neither Major nor Minor. They sound open and airy.\n\n*   **Sus2:** 1 - 2 - 5\n*   **Sus4:** 1 - 4 - 5",
        tabs: [
          {
            title: "Dsus2",
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
            title: "Dsus4",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 0, label: "D", color: "primary" },
              { string: 3, fret: 2, label: "A", color: "secondary" },
              { string: 2, fret: 3, label: "D", color: "primary" },
              { string: 1, fret: 3, label: "G", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Suspended Chords
// Open, airy, unresolved

// D Major (Reference)
note("d3 a3 d4 fs4").s("acoustic").slow(2),

// Dsus2 (Replaces F# with E)
note("d3 a3 d4 e4").s("acoustic").slow(2),

// Dsus4 (Replaces F# with G)
note("d3 a3 d4 g4").s("acoustic").slow(2)

// GLOSSARY:
// Suspension: A note that creates tension by delaying a resolution.`,
        keyTerms: [
          { term: "Suspended", definition: "Replacing the 3rd of a chord with a 2nd or 4th." },
          { term: "Resolution", definition: "Moving from a tense or suspended note to a stable chord tone." }
        ]
      },
      {
        id: "7th-chords",
        title: "7th Chords",
        concept: "Adding a 4th note.",
        learningGoals: ["Construct Major 7", "Construct Dominant 7", "Construct Minor 7"],
        legend: [
          { label: "Root", color: "primary" },
          { label: "3rd", color: "secondary" },
          { label: "7th", color: "accent" }
        ],
        explanation: "7th chords add a 4th note to the triad (the 7th note of the scale). This adds richness and complexity.\n\n*   **Major 7:** Major Triad + Major 7th (Jazzy/Pretty)\n*   **Dominant 7:** Major Triad + Minor 7th (Bluesy/Tense)\n*   **Minor 7:** Minor Triad + Minor 7th (Smooth/Mellow)",
        tabs: [
          {
            title: "C Major 7",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 0, label: "G", color: "secondary" },
              { string: 2, fret: 0, label: "B", color: "accent" },
            ]
          },
          {
            title: "C Dominant 7",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "secondary" },
              { string: 3, fret: 3, label: "Bb", color: "accent" },
              { string: 2, fret: 1, label: "C", color: "primary" },
            ]
          }
        ],
        strudelCode: `// 7th Chords
// Adding richness

// C Major 7 (C-E-G-B)
note("c3 e3 g3 b3").s("acoustic").slow(2),

// C Dominant 7 (C-E-G-Bb)
note("c3 e3 g3 bb3").s("acoustic").slow(2),

// C Minor 7 (C-Eb-G-Bb)
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
        strudelCode: `// Slash Chords
// Creating a walking bassline

// G -> D/F# -> Em
// Bass: G -> F# -> E

cat(
  note("g2 b2 d3 g3").s("acoustic"), // G
  note("fs2 a2 d3 a3").s("acoustic"), // D/F#
  note("e2 g2 b2 e3").s("acoustic")  // Em
).slow(2)

// GLOSSARY:
// Walking Bass: A bass line that moves stepwise up or down the scale.`,
        keyTerms: [
          { term: "Slash Chord", definition: "A chord symbol indicating a specific bass note (Chord / Bass)." },
          { term: "Stepwise Motion", definition: "Moving from one note to the adjacent note in the scale." }
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
        ],
        visualization: "CircleOfFifths",
        circleOfFifthsData: { activeKey: "C" }
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
        strudelCode: `// Resolution
// Feeling the pull home
// G7 (Tension) -> C (Home)
note("g3 c4").s("acoustic").slow(2)
// GLOSSARY:
// Resolution: The move of a note or chord from dissonance (an unstable sound) to consonance (a more final or stable sounding one).`,
        keyTerms: [
          { term: "Key Center", definition: "The pitch class that establishes a tonality." },
          { term: "Resolution", definition: "The move of a note or chord from dissonance to consonance." }
        ]
      },
      {
        id: "transposing",
        title: "Transposing",
        concept: "Changing the key.",
        learningGoals: ["Shift keys mentally", "Use a capo"],
        legend: [
          { label: "Original Key", color: "primary" },
          { label: "New Key", color: "accent" }
        ],
        explanation: "Transposing is simply moving a song up or down in pitch. If you know the numbers (I-IV-V), you can move the song to G, D, or A instantly to fit a singer's voice.",
        tabs: [
          {
            title: "Capo 2 (Key of D -> E)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 0, label: "D", color: "primary" },
              { string: 4, fret: 2, label: "E", color: "accent" },
            ]
          }
        ],
        strudelCode: `// Transposing
// Same song, different key
// Key of C (I-V-vi-IV)
note("c3 g3 a3 f3").s("acoustic").slow(2),
// Key of G (I-V-vi-IV)
note("g3 d4 e4 c4").s("acoustic").slow(2)
// GLOSSARY:
// Capo: A device used to transpose the guitar without changing chord shapes.`,
        keyTerms: [
          { term: "Transpose", definition: "To change the key of a piece of music." },
          { term: "Capo", definition: "A clamp fastened across all the strings of a fretted musical instrument to raise their tuning." }
        ]
      },
      {
        id: "circle-of-fifths",
        title: "Circle of Fifths",
        concept: "The map of all keys.",
        learningGoals: ["Find related keys", "Understand sharps/flats"],
        legend: [
          { label: "Key", color: "primary" }
        ],
        explanation: "The Circle of Fifths organizes all 12 keys like a clock. Adjacent keys share 6 out of 7 notes, making them closely related. It's the ultimate cheat sheet for songwriting and modulation.",
        tabs: [],
        strudelCode: `// Circle of Fifths Motion
// Moving by 5ths is very strong
// C -> G -> D -> A -> E
note("c3 g3 d4 a4 e5").s("acoustic").slow(2)
// GLOSSARY:
// Modulation: Changing from one key to another within a piece of music.`,
        keyTerms: [
          { term: "Circle of Fifths", definition: "A visual representation of the relationships among the 12 tones of the chromatic scale." },
          { term: "Key Signature", definition: "The sharps or flats at the beginning of a staff indicating the key." }
        ],
        visualization: "CircleOfFifths",
        circleOfFifthsData: { activeKey: "C" }
      },
      {
        id: "relative-minor",
        title: "Relative Minor",
        concept: "The sad twin.",
        learningGoals: ["Find the vi chord", "Switch between Major/Minor"],
        legend: [
          { label: "Major Root", color: "primary" },
          { label: "Relative Minor", color: "secondary" }
        ],
        explanation: "Every Major key has a 'Relative Minor' key that shares the EXACT same notes. The Relative Minor is always the 6th note (vi) of the Major scale.\n\nC Major's relative minor is A Minor. They are two sides of the same coin.",
        tabs: [
          {
            title: "C Major vs A Minor",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 5, fret: 0, label: "A", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Relative Minor
// Same notes, different center
// C Major (Happy)
note("c3 e3 g3").s("acoustic").slow(2),
// A Minor (Sad)
note("a2 c3 e3").s("acoustic").slow(2)
// GLOSSARY:
// Aeolian Mode: Another name for the Natural Minor scale.`,
        keyTerms: [
          { term: "Relative Minor", definition: "The minor key that shares the same key signature as a major key." },
          { term: "Parallel Minor", definition: "A minor key that starts on the same root note as a major key (e.g., C Major vs C Minor)." }
        ]
      },
      {
        id: "secondary-dominants",
        title: "Secondary Dominants",
        concept: "Borrowing from other keys.",
        learningGoals: ["Create tension", "Lead to a specific chord"],
        legend: [
          { label: "Target Chord", color: "primary" },
          { label: "Secondary Dom", color: "accent" }
        ],
        explanation: "A Secondary Dominant is a Major chord that doesn't belong in the key, but is used to pull strongly to another chord. It's the 'V of V'.\n\nIn C Major, Dm is normal. But D Major (V of G) pulls strongly to G.",
        tabs: [
          {
            title: "D7 -> G (V/V -> V)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 0, label: "D", color: "accent" },
              { string: 6, fret: 3, label: "G", color: "primary" },
            ]
          }
        ],
        strudelCode: `// Secondary Dominant
// Adding flavor
// C -> A7 -> Dm -> G7 -> C
note("c3 a3 d3 g3 c3").s("acoustic").slow(2)
// GLOSSARY:
// Borrowed Chord: A chord borrowed from a parallel key.`,
        keyTerms: [
          { term: "Secondary Dominant", definition: "An altered chord having a dominant relationship to a chord in the key other than the tonic." },
          { term: "Tonicization", definition: "Treating a note other than the tonic as a temporary key center." }
        ]
      },
      {
        id: "borrowed-chords",
        title: "Borrowed Chords",
        concept: "Mixing Major and Minor.",
        learningGoals: ["Use the iv minor", "Add emotional depth"],
        legend: [
          { label: "Diatonic", color: "primary" },
          { label: "Borrowed", color: "accent" }
        ],
        explanation: "Borrowed chords are taken from the parallel minor key. The most famous one is the **Minor iv** in a Major key (e.g., Fm in the key of C).\n\nIt creates a bittersweet, nostalgic feeling often used by The Beatles and Radiohead.",
        tabs: [
          {
            title: "IV -> iv (F -> Fm)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 4, fret: 3, label: "F", color: "primary" },
              { string: 4, fret: 3, label: "Fm", color: "accent" },
            ]
          }
        ],
        strudelCode: `// The Minor 4 Chord
// Bittersweet resolution
// C -> F -> Fm -> C
note("c3 f3 f3 c3").s("acoustic").slow(2)
// GLOSSARY:
// Modal Interchange: Borrowing chords from parallel modes.`,
        keyTerms: [
          { term: "Borrowed Chord", definition: "A chord borrowed from the parallel minor or major key." },
          { term: "Picardy Third", definition: "Ending a minor key piece with a major chord." }
        ]
      },
      {
        id: "modulation",
        title: "Modulation",
        concept: "Changing key mid-song.",
        learningGoals: ["Shift energy", "Use pivot chords"],
        legend: [
          { label: "Old Key", color: "secondary" },
          { label: "New Key", color: "primary" }
        ],
        explanation: "Modulation is a permanent key change within a song. It often happens in the final chorus to boost energy (the 'Truck Driver's Gear Change').\n\nSmooth modulations use a **Pivot Chord** common to both keys.",
        tabs: [
          {
            title: "Key Change (C -> D)",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "secondary" },
              { string: 4, fret: 0, label: "D", color: "primary" },
            ]
          }
        ],
        strudelCode: `// The "Truck Driver" Modulation
// Moving up a whole step for the final chorus
// Key of C -> Key of D
note("c3 d3").s("acoustic").slow(2)
// GLOSSARY:
// Pivot Chord: A chord that is common to both the old and new keys, used to smooth the transition.`,
        keyTerms: [
          { term: "Modulation", definition: "The process of changing from one key to another." },
          { term: "Pivot Chord", definition: "A chord that belongs to both the original key and the new key." }
        ]
      },
      {
        id: "modes-intro",
        title: "Intro to Modes",
        concept: "Same notes, different mood.",
        learningGoals: ["Understand Ionian vs Aeolian", "Hear the difference"],
        legend: [
          { label: "Major (Ionian)", color: "primary" },
          { label: "Minor (Aeolian)", color: "secondary" }
        ],
        explanation: "Modes are just the Major Scale started from a different note. We already know two:\n\n1.  **Ionian** (starts on 1) = Major Scale\n2.  **Aeolian** (starts on 6) = Minor Scale\n\nThere are 7 modes in total, each with a unique flavor.",
        tabs: [
          {
            title: "C Ionian vs A Aeolian",
            startFret: 0,
            fretCount: 4,
            markers: [
              { string: 5, fret: 3, label: "C", color: "primary" },
              { string: 5, fret: 0, label: "A", color: "secondary" },
            ]
          }
        ],
        strudelCode: `// Modes
// Same notes (all white keys), different starting point
// C Ionian (Major)
note("c3 d3 e3 f3 g3 a3 b3 c4").s("acoustic").slow(2),
// A Aeolian (Minor)
note("a2 b2 c3 d3 e3 f3 g3 a3").s("acoustic").slow(2)
// GLOSSARY:
// Mode: A type of musical scale coupled with a set of characteristic melodic behaviors.`,
        keyTerms: [
          { term: "Mode", definition: "A scale derived from the major scale by starting on a different note." },
          { term: "Parent Scale", definition: "The major scale from which a mode is derived." }
        ]
      }
    ]
  },
  {
    id: "phrasing",
    title: "Phrasing (Rhythm)",
    lessons: [
      {
        id: "time-signatures",
        title: "Time Signatures",
        concept: "The heartbeat of music.",
        learningGoals: ["Feel 4/4 time", "Feel 3/4 time"],
        legend: [
          { label: "Beat", color: "primary" },
          { label: "Accent", color: "accent" }
        ],
        explanation: "The Time Signature tells you how many beats are in a bar. \n\n*   **4/4 (Common Time):** ONE-two-three-four. Used in 90% of rock/pop.\n*   **3/4 (Waltz):** ONE-two-three. Has a swaying feel.",
        tabs: [],
        strudelCode: `// Time Signatures
// Listen to the accent on the "1"
// 4/4 Time (Rock)
note("c3 c3 c3 c3").s("acoustic").velocity("1 0.5 0.8 0.5").slow(1),
// 3/4 Time (Waltz)
note("c3 c3 c3").s("acoustic").velocity("1 0.5 0.5").slow(1)
// GLOSSARY:
// Downbeat: The first beat of the measure.`,
        keyTerms: [
          { term: "Time Signature", definition: "A fraction that indicates the meter of a piece of music (top number = beats per bar)." },
          { term: "Tempo", definition: "The speed of the music (BPM)." }
        ],
        visualization: "RhythmGrid",
        rhythmGridData: {
          timeSignature: [4, 4],
          notes: [
            { start: 0, duration: 1, type: "note" },
            { start: 1, duration: 1, type: "note" },
            { start: 2, duration: 1, type: "note" },
            { start: 3, duration: 1, type: "note" }
          ]
        }
      },
      {
        id: "note-values",
        title: "Note Values",
        concept: "Whole, Half, Quarter, Eighth.",
        learningGoals: ["Count rhythms", "Subdivide the beat"],
        legend: [
          { label: "Note", color: "primary" },
          { label: "Rest", color: "muted" }
        ],
        explanation: "Rhythm is math. \n\n*   **Whole Note:** Lasts 4 beats.\n*   **Half Note:** Lasts 2 beats.\n*   **Quarter Note:** Lasts 1 beat.\n*   **Eighth Note:** Lasts 1/2 beat (counted '1 & 2 &').",
        tabs: [],
        strudelCode: `// Note Values
// Dividing time
// Quarter Notes (1, 2, 3, 4)
note("c3 c3 c3 c3").s("acoustic").slow(1),
// Eighth Notes (1 & 2 & 3 & 4 &)
note("c3 c3 c3 c3 c3 c3 c3 c3").s("acoustic").slow(1)
// GLOSSARY:
// Subdivision: Breaking the beat into smaller parts.`,
        keyTerms: [
          { term: "Note Value", definition: "The duration of a note relative to the tempo." },
          { term: "Rest", definition: "A period of silence in music." }
        ],
        visualization: "RhythmGrid",
        rhythmGridData: {
          timeSignature: [4, 4],
          notes: [
            { start: 0, duration: 4, type: "note" },
            { start: 0, duration: 2, type: "note" },
            { start: 2, duration: 2, type: "note" },
            { start: 0, duration: 1, type: "note" },
            { start: 1, duration: 1, type: "note" },
            { start: 2, duration: 1, type: "note" },
            { start: 3, duration: 1, type: "note" }
          ]
        }
      },
      {
        id: "strumming-patterns",
        title: "Strumming Patterns",
        concept: "Downs and Ups.",
        learningGoals: ["Master D-D-U-U-D-U", "Keep the hand moving"],
        legend: [
          { label: "Down", color: "primary" },
          { label: "Up", color: "accent" }
        ],
        explanation: "The golden rule of strumming: **Keep your hand moving like a pendulum.**\n\n*   Down strokes on the beat (1, 2, 3, 4)\n*   Up strokes on the 'and' (&)\n\nThe most famous pattern is the 'Island Strum': D - D U - U D U",
        tabs: [],
        strudelCode: `// Strumming Pattern
// Down - Down Up - Up Down Up
note("c3 [c3,e3] ~ [c3,e3] [c3,e3] [c3,e3]")
  .s("acoustic")
  .slow(1)
// GLOSSARY:
// Ghost Strum: Keeping the hand moving without hitting the strings.`,
        keyTerms: [
          { term: "Strumming", definition: "Sweeping the pick or fingers across the strings." },
          { term: "Syncopation", definition: "Accenting the weak beats or off-beats." }
        ],
        visualization: "StrummingPattern",
        strummingPatternData: {
          pattern: ["D", "-", "D", "U", "-", "U", "D", "U"]
        }
      },
      {
        id: "syncopation",
        title: "Syncopation",
        concept: "Playing off the beat.",
        learningGoals: ["Feel the 'and'", "Create groove"],
        legend: [
          { label: "On Beat", color: "secondary" },
          { label: "Off Beat", color: "primary" }
        ],
        explanation: "Syncopation means accenting the weak beats (the '&'s) instead of the strong beats. This creates a funky, groovy feel that makes people want to dance.",
        tabs: [],
        strudelCode: `// Syncopation
// Accenting the off-beats
note("~ c3 ~ c3").s("acoustic").slow(1)
// GLOSSARY:
// Groove: The rhythmic 'feel' or 'swing' of a piece.`,
        keyTerms: [
          { term: "Syncopation", definition: "A disturbance or interruption of the regular flow of rhythm." },
          { term: "Off-beat", definition: "The points between the main beats." }
        ],
        visualization: "RhythmGrid",
        rhythmGridData: {
          timeSignature: [4, 4],
          notes: [
            { start: 0.5, duration: 0.5, type: "note" },
            { start: 1.5, duration: 0.5, type: "note" },
            { start: 2.5, duration: 0.5, type: "note" },
            { start: 3.5, duration: 0.5, type: "note" }
          ]
        }
      },
      {
        id: "triplets-shuffle",
        title: "Triplets & Shuffle",
        concept: "The blues feel.",
        learningGoals: ["Count 1-trip-let", "Feel the swing"],
        legend: [
          { label: "Straight", color: "secondary" },
          { label: "Swing", color: "primary" }
        ],
        explanation: "A **Triplet** is fitting 3 notes into the space of 2. This creates a rolling, circular feel.\n\n**Shuffle** (or Swing) is based on triplets. It's the heartbeat of Blues and Jazz. Instead of '1 & 2 &', it's '1-let 2-let'.",
        tabs: [],
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
        ],
        visualization: "RhythmGrid",
        rhythmGridData: {
          timeSignature: [4, 4],
          notes: [
            { start: 0, duration: 0.33, type: "note" },
            { start: 0.33, duration: 0.33, type: "note" },
            { start: 0.66, duration: 0.33, type: "note" },
            { start: 1, duration: 0.33, type: "note" },
            { start: 1.33, duration: 0.33, type: "note" },
            { start: 1.66, duration: 0.33, type: "note" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "RhythmGrid",
        rhythmGridData: {
          timeSignature: [5, 4],
          notes: [
            { start: 0, duration: 1, type: "note" },
            { start: 1, duration: 1, type: "note" },
            { start: 2, duration: 1, type: "note" },
            { start: 3, duration: 1, type: "note" },
            { start: 4, duration: 1, type: "note" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "p", duration: 1, intensity: 0.2, color: "secondary" },
            { name: "mp", duration: 1, intensity: 0.4, color: "secondary" },
            { name: "mf", duration: 1, intensity: 0.7, color: "primary" },
            { name: "f", duration: 1, intensity: 1.0, color: "accent" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "RhythmGrid",
        rhythmGridData: {
          timeSignature: [4, 4],
          notes: [
            { start: 0, duration: 1, type: "note" },
            { start: 1, duration: 1, type: "note" },
            { start: 2, duration: 1, type: "note" },
            { start: 3, duration: 1, type: "note" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "StrummingPattern",
        strummingPatternData: {
          pattern: ["D", "x", "D", "x"]
        }
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
        tabs: [],
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
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "Slow", duration: 2, intensity: 0.3, color: "secondary" },
            { name: "Fast", duration: 1, intensity: 0.8, color: "accent" },
            { name: "Fast", duration: 1, intensity: 0.8, color: "accent" },
            { name: "Slow", duration: 2, intensity: 0.3, color: "secondary" }
          ]
        }
      }
    ]
  },
  {
    id: "song-architecture",
    title: "Song Architecture",
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
        tabs: [],
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
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "Verse", duration: 8, intensity: 0.4, color: "secondary" },
            { name: "Verse", duration: 8, intensity: 0.4, color: "secondary" },
            { name: "Chorus", duration: 8, intensity: 0.9, color: "primary" },
            { name: "Chorus", duration: 8, intensity: 0.9, color: "primary" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "Chorus", duration: 8, intensity: 0.8, color: "primary" },
            { name: "Bridge", duration: 8, intensity: 0.6, color: "accent" },
            { name: "Chorus", duration: 8, intensity: 1.0, color: "primary" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "Intro", duration: 4, intensity: 0.5, color: "primary" },
            { name: "Verse", duration: 8, intensity: 0.4, color: "secondary" },
            { name: "Outro", duration: 4, intensity: 0.3, color: "secondary" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "Verse", duration: 8, intensity: 0.4, color: "secondary" },
            { name: "Pre-Chorus", duration: 4, intensity: 0.7, color: "accent" },
            { name: "Chorus", duration: 8, intensity: 1.0, color: "primary" }
          ]
        }
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
        tabs: [],
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
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "Bass", duration: 4, intensity: 0.3, color: "primary" },
            { name: "Bass+Chords", duration: 4, intensity: 0.6, color: "secondary" },
            { name: "Full Band", duration: 4, intensity: 0.9, color: "accent" }
          ]
        }
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
        tabs: [],
        strudelCode: `// Dynamics (Volume)
// Controlling the intensity
note("c3 c3 c3 c3")
  .s("acoustic")
  .velocity("0.2 0.4 0.6 1") // Getting louder
  .slow(1)
// GLOSSARY:
// Crescendo: Gradually getting louder.`,
        keyTerms: [
          { term: "Dynamics", definition: "The variation in loudness between notes or phrases." },
          { term: "Crescendo", definition: "A gradual increase in loudness." }
        ],
        visualization: "SongStructure",
        songStructureData: {
          sections: [
            { name: "Intro", duration: 4, intensity: 0.2, color: "secondary" },
            { name: "Verse", duration: 8, intensity: 0.4, color: "secondary" },
            { name: "Pre", duration: 4, intensity: 0.7, color: "accent" },
            { name: "Chorus", duration: 8, intensity: 1.0, color: "primary" },
            { name: "Bridge", duration: 8, intensity: 0.5, color: "secondary" },
            { name: "Outro", duration: 4, intensity: 0.3, color: "secondary" }
          ]
        }
      },
      {
        id: "song-analysis",
        title: "Song Analysis",
        concept: "Learning from the greats.",
        learningGoals: ["Dissect a hit song", "Apply concepts"],
        legend: [
          { label: "Analysis", color: "primary" }
        ],
        explanation: "The best way to learn song structure is to analyze your favorite songs. Map out the sections (Verse, Chorus, Bridge) and count the bars. You'll start to see the same patterns appearing over and over again.",
        tabs: [],
        strudelCode: `// Song Analysis
// Listen for the sections
// Verse -> Chorus -> Verse -> Chorus -> Bridge -> Chorus
note("c3 e3 c3 e3 a2 e3").s("acoustic").slow(2)
// GLOSSARY:
// Form: The overall structure or plan of a piece of music.`,
        keyTerms: [
          { term: "Form", definition: "The constructive or organizing element in music." },
          { term: "Analysis", definition: "The study of musical structure or form." }
        ]
      },
      {
        id: "songwriting-tips",
        title: "Songwriting Tips",
        concept: "Breaking writer's block.",
        learningGoals: ["Start with a concept", "Keep it simple"],
        legend: [
          { label: "Idea", color: "accent" }
        ],
        explanation: "Songwriting is a muscle. The more you do it, the stronger it gets. Don't wait for inspiration—start with a small idea (a riff, a chord progression, a lyric) and build from there using the structures we've learned.",
        tabs: [],
        strudelCode: `// Creative Spark
// Just start playing!
note("c3 d3 e3 f3 g3").s("acoustic").slow(2)
// GLOSSARY:
// Writer's Block: The condition of being unable to think of what to write or how to proceed with writing.`,
        keyTerms: [
          { term: "Songwriting", definition: "The process of creating a new piece of music." },
          { term: "Inspiration", definition: "The process of being mentally stimulated to do or feel something, especially to do something creative." }
        ]
      },
      {
        id: "recording-basics",
        title: "Recording Basics",
        concept: "Capturing your ideas.",
        learningGoals: ["Use a DAW", "Layer tracks"],
        legend: [
          { label: "Record", color: "destructive" }
        ],
        explanation: "Recording allows you to hear your arrangement objectively. You don't need a fancy studio—just a phone or a laptop. Start by recording a rhythm track, then layer a melody over it.",
        tabs: [],
        strudelCode: `// Recording
// Layering tracks one by one
stack(
  note("c2").s("sawtooth"),
  note("e3").s("acoustic"),
  note("g4").s("piano")
).slow(1)
// GLOSSARY:
// DAW: Digital Audio Workstation. Software used for recording, editing, and producing audio.`,
        keyTerms: [
          { term: "DAW", definition: "Digital Audio Workstation." },
          { term: "Multitrack", definition: "A method of sound recording that allows for the separate recording of multiple sound sources." }
        ]
      }
    ]
  }
];
