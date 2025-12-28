import { LessonContent } from "@/components/LessonPage";

export const lessons: Record<string, LessonContent> = {
  "cat1-1": {
    id: "1",
    category: "The Fretboard Map",
    title: "The Musical Alphabet",
    concept: "Understanding the 12-note chromatic scale and how it repeats on a single string.",
    learningGoals: [
      "Learn the note names (A, A#/Bb, B, C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab)",
      "Understand that each fret = one half step (semitone)",
      "See how the pattern repeats at the 12th fret (octave)"
    ],
    keyTerms: [
      { term: "Chromatic Scale", definition: "All 12 possible notes played in order, one fret at a time" },
      { term: "Half Step", definition: "Moving one fret up or down on the guitar" },
      { term: "Octave", definition: "When you reach the same note name again, but higher or lower in pitch" },
      { term: "Sharp (#)", definition: "The symbol that means 'one fret higher'" },
      { term: "Flat (♭)", definition: "The symbol that means 'one fret lower'" },
      { term: "Enharmonic", definition: "When two different note names refer to the same fret (like C# and Db)" }
    ],
    tabs: [
      {
        title: "Chromatic Scale (Low E)",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|--0--1--2--3--4--5--6--7--8--9--10--11--12--|
    E  F  F# G  G# A  A# B  C  C# D   D#  E`
      }
    ],
    explanation: `<p>The guitar fretboard is laid out in half steps. Starting from the open low E string, each fret you move up raises the pitch by one half step. After 12 frets, you reach the same note name again (E), but one octave higher. This pattern continues all the way up the neck.</p><p>Notice that there's no note between E-F and B-C (they're naturally a half step apart), which is why we don't have E# or B# in standard notation.</p>`,
    strudelCode: `// Play the chromatic scale on low E string
// Each note represents one fret (half step)
note("e2 f2 f#2 g2 g#2 a2 a#2 b2 c3 c#3 d3 d#3 e3")
  .s("acoustic") // Use a guitar sound
  .slow(2)     // Play slowly to hear each note

/* 
  STRUDEL GLOSSARY:
  - note("..."): Creates a sequence of notes from a string of note names
  - e2, f2: Note names followed by octave number (2 is low range, 3 is higher)
  - #: Sharp symbol (e.g., f#2 is F sharp in octave 2)
  - .s("acoustic"): Sets the synthesizer sound to 'guitar'
  - .slow(2): Slows down playback by a factor of 2 (higher number = slower)
*/`,
    nextLesson: "/lesson/cat1/2"
  },
  "cat1-2": {
    id: "2",
    category: "The Fretboard Map",
    title: "Same Note, Different String",
    concept: "The same pitch exists in multiple places on the fretboard.",
    learningGoals: [
      "Learn the '5th fret rule' (note on 5th fret = next open string, except G→B)",
      "Find the same note (e.g., middle C) on all six strings",
      "Understand why this matters for chord voicings and fingering choices"
    ],
    keyTerms: [
      { term: "Pitch", definition: "How high or low a sound is" },
      { term: "Open String", definition: "Playing a string without pressing down any fret" },
      { term: "Standard Tuning", definition: "The way most guitars are tuned: E-A-D-G-B-E from thickest to thinnest string" },
      { term: "Voicing", definition: "Playing the same notes in different positions on the fretboard" }
    ],
    tabs: [
      {
        title: "Note 'A' Locations",
        content: `e|--5---------------------------|
B|-----10-----------------------|
G|--------14--------------------|
D|-----------19-----------------|
A|--0---------------------------|
E|-----5------------------------|
    A (All these are the same pitch!)`
      }
    ],
    explanation: `<p>Because of how the guitar is tuned, the same note appears in multiple locations. The open A string can also be played on the 5th fret of the low E string, the 19th fret of the D string, and so on. This redundancy gives you options: you might choose a lower position for easier fingering, or a higher position for a brighter tone.</p><p>The "5th fret rule" helps you navigate: press the 5th fret of any string, and you get the same note as the next open string (except the G string, where you need the 4th fret to match the open B).</p>`,
    strudelCode: `// Play the note A in different octaves
// Simulating finding the same note on different strings
note("a2 a3 a4") 
  .s("acoustic")
  .slow(1.5)

/* 
  STRUDEL GLOSSARY:
  - note("..."): Creates a sequence of notes
  - a2, a3, a4: The same note name 'A' in different octaves
  - Octave numbers: 
    - 2: Low range (like open A string)
    - 3: Mid range (like 2nd fret G string)
    - 4: High range (like 5th fret high E string)
  - .s("acoustic"): Sets the instrument sound
*/`,
    prevLesson: "/lesson/cat1/1",
    nextLesson: "/lesson/cat1/3"
  },
  "cat1-3": {
    id: "3",
    category: "The Fretboard Map",
    title: "Half Steps & Whole Steps",
    concept: "The building blocks of all intervals and scales.",
    learningGoals: [
      "Half step = 1 fret (minor 2nd)",
      "Whole step = 2 frets (major 2nd)",
      "These are the 'atoms' of music theory"
    ],
    keyTerms: [
      { term: "Interval", definition: "The distance between two notes" },
      { term: "Whole Step", definition: "Moving two frets up or down on the guitar (same as two half steps)" },
      { term: "Minor 2nd", definition: "Another name for a half step" },
      { term: "Major 2nd", definition: "Another name for a whole step" }
    ],
    tabs: [
      {
        title: "Half vs Whole Step",
        content: `e|--8--9-----8--10-------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|------------------------------|
    C  C#    C  D
    (half    (whole
     step)    step)`
      }
    ],
    explanation: `<p>If intervals are the building blocks of music, then half steps and whole steps are the individual bricks. A half step is the smallest move you can make in Western music—just one fret. A whole step is two frets, or two half steps stacked together.</p><p>Every scale, chord, and melody is built from combinations of these two basic movements. Understanding this simple concept unlocks everything else in music theory.</p>`,
    strudelCode: `// Demonstrate half step vs whole step sequentially
cat(
  // 1. Half step: C to C# (1 fret distance)
  note("c4 c#4").s("acoustic"),
  
  // 2. Whole step: C to D (2 frets distance)
  note("c4 d4").s("acoustic")
)
.slow(2)

/* 
  STRUDEL GLOSSARY:
  - cat(a, b): Concatenates patterns 'a' and 'b' to play them sequentially
  - note("..."): Defines the note sequence
  - c#4: 'c' is the note, '#' is sharp, '4' is the octave
  - .s("acoustic"): Applied to each pattern individually or the whole sequence
*/`,
    prevLesson: "/lesson/cat1/2",
    nextLesson: "/lesson/cat1/4"
  },
  "cat1-4": {
    id: "4",
    category: "The Fretboard Map",
    title: "The Major Scale Pattern",
    concept: "The most important scale in Western music, built from a specific pattern of whole and half steps.",
    learningGoals: [
      "Formula: W-W-H-W-W-W-H (whole-whole-half-whole-whole-whole-half)",
      "Play a one-octave major scale on a single string",
      "Recognize the sound of 'do-re-mi-fa-sol-la-ti-do'"
    ],
    keyTerms: [
      { term: "Scale", definition: "A series of notes played in order from low to high (or high to low)" },
      { term: "Major Scale", definition: "A scale that follows the pattern W-W-H-W-W-W-H; sounds happy and bright" },
      { term: "Scale Degree", definition: "The position of a note in the scale (1st note, 2nd note, 3rd note, etc.)" },
      { term: "Diatonic", definition: "Belonging to a specific major or minor scale" }
    ],
    tabs: [
      {
        title: "C Major Scale (One String)",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|--8--10--12--13--15--17--19--20--|
    C  D   E   F   G   A   B   C
    W  W   H   W   W   W   H
    1  2   3   4   5   6   7   8`
      }
    ],
    explanation: `<p>The major scale is the foundation of Western music. It's the "do-re-mi" you've heard since childhood. What makes it major? The specific pattern of whole and half steps: W-W-H-W-W-W-H.</p><p>Notice that the half steps occur between the 3rd-4th notes (mi-fa) and the 7th-8th notes (ti-do). This pattern is the same in every key—if you start on any note and follow this formula, you'll create a major scale. The major scale sounds happy, bright, and resolved.</p>`,
    strudelCode: `// C Major Scale - "do re mi fa sol la ti do"
note("c3 d3 e3 f3 g3 a3 b3 c4") 
  .s("acoustic")
  .slow(2)

/* 
  STRUDEL GLOSSARY:
  - note("..."): Plays the notes in order from left to right
  - c3, d3, etc.: Notes in the 3rd octave
  - c4: The octave note (C in the 4th octave)
  - Spaces: Spaces between note names separate them in the sequence
*/`,
    prevLesson: "/lesson/cat1/3",
    nextLesson: "/lesson/cat1/5"
  },
  "cat1-5": {
    id: "5",
    category: "The Fretboard Map",
    title: "Octaves - The Perfect Interval",
    concept: "An octave is the same note, doubled in frequency.",
    learningGoals: [
      "Octave = 12 frets on same string",
      "Common octave shapes across strings (2-string octave shapes)",
      "Octaves sound 'consonant' and stable"
    ],
    keyTerms: [
      { term: "Consonant", definition: "When two notes sound pleasant and stable together" },
      { term: "Dissonant", definition: "When two notes sound tense or clash (opposite of consonant)" },
      { term: "Frequency", definition: "How fast the sound wave vibrates; higher frequency = higher pitch" },
      { term: "Shape", definition: "A finger pattern on the fretboard that you can move to any position" }
    ],
    tabs: [
      {
        title: "Octave Shape (2 Strings)",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|-----5------------------------|
A|------------------------------|
E|--3---------------------------|
    G  G (Skip string, +2 frets)`
      },
      {
        title: "Octave (Same String)",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|--3--------------15-----------|
    G             G (+12 frets)`
      }
    ],
    explanation: `<p>An octave is the most consonant interval besides playing the same note twice. When you play a note and its octave together, they blend so well they almost sound like one note. Physically, the higher note vibrates exactly twice as fast as the lower note.</p><p>On guitar, you can find octaves by moving 12 frets up on the same string, or by using efficient 2-string shapes: skip one string and move up 2 frets. These octave shapes are movable—learn the pattern once, and you can play octaves anywhere on the neck.</p>`,
    strudelCode: `// 1. Play root and octave separately (Melody)
// 2. Play them together (Harmony)
cat(
  note("c3 c4").s("acoustic"), // Separate
  stack(
    note("c3"), 
    note("c4")
  ).s("acoustic") // Together
).slow(2)

/* 
  STRUDEL GLOSSARY:
  - cat(a, b): Plays pattern 'a' then pattern 'b'
  - stack(a, b): Plays pattern 'a' and 'b' at the same time (harmony)
  - note("c3 c4"): A sequence of two notes
  - note("c3"): A single note pattern
*/`,
    prevLesson: "/lesson/cat1/4",
    nextLesson: "/lesson/cat1/6"
  },
  "cat1-6": {
    id: "6",
    category: "The Fretboard Map",
    title: "Perfect 5ths - The Power Chord",
    concept: "The perfect 5th is the foundation of power chords and strong harmony.",
    learningGoals: [
      "Perfect 5th = 7 frets (or 7 half steps)",
      "Common shapes: root on 6th string (5th on 5th string, same fret)",
      "This is the 'power chord' interval used in rock"
    ],
    keyTerms: [
      { term: "Perfect 5th", definition: "The distance of 7 frets between two notes; sounds strong and stable" },
      { term: "Power Chord", definition: "Two notes played together: the root and the note 7 frets higher" },
      { term: "Root", definition: "The main note that gives a chord its name" },
      { term: "Harmonic", definition: "Playing two or more notes at the same time" }
    ],
    tabs: [
      {
        title: "Basic Power Chord",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|--3---------------------------|
E|--3---------------------------|
    G  C (perfect 5th)`
      },
      {
        title: "Full Power Chord",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|--5---------------------------|
A|--3---------------------------|
E|--3---------------------------|
    Root-5th-Octave`
      }
    ],
    explanation: `<p>The perfect 5th is one of the most important intervals in music. It's called "perfect" because it's neither major nor minor—it's neutral and stable. Count up 7 half steps from any note, and you've found its perfect 5th.</p><p>On guitar, power chords use this interval: root on the 6th string, 5th on the 5th string at the same fret. This shape is movable and sounds huge with distortion, which is why it's everywhere in rock music. The perfect 5th is so consonant that it's been used in music for thousands of years.</p>`,
    strudelCode: `// Power Chord Demonstration
cat(
  // 1. Play Root then 5th separately
  note("c3 g3").s("acoustic"),
  
  // 2. Play them together (Power Chord)
  stack(
    note("c3"), // Root
    note("g3")  // Perfect 5th
  ).s("acoustic")
).slow(2)

/* 
  STRUDEL GLOSSARY:
  - cat(...): Sequences the melodic and harmonic parts
  - stack(...): Layers notes to create a chord
  - note("c3 g3"): Plays C then G
  - note("c3"): Plays C
  - note("g3"): Plays G
*/`,
    prevLesson: "/lesson/cat1/5",
    nextLesson: "/lesson/cat1/7"
  },
  "cat1-7": {
    id: "7",
    category: "The Fretboard Map",
    title: "Major & Minor 3rds",
    concept: "The 3rd determines if something sounds happy (major) or sad (minor).",
    learningGoals: [
      "Major 3rd = 4 half steps (2 whole steps)",
      "Minor 3rd = 3 half steps (1.5 whole steps)",
      "This ONE note difference changes the emotional quality"
    ],
    keyTerms: [
      { term: "Major 3rd", definition: "The distance of 4 frets between two notes; sounds bright and happy" },
      { term: "Minor 3rd", definition: "The distance of 3 frets between two notes; sounds dark and sad" },
      { term: "Quality", definition: "Whether an interval or chord is major, minor, or perfect" }
    ],
    tabs: [
      {
        title: "Major 3rd (4 frets)",
        content: `e|--8-----------12--------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|------------------------------|
    C           E`
      },
      {
        title: "Minor 3rd (3 frets)",
        content: `e|--8--------11-----------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|------------------------------|
    C        Eb`
      }
    ],
    explanation: `<p>The 3rd is the most emotionally powerful interval in music. It's what makes a chord sound happy or sad. A major 3rd (4 half steps) sounds bright, cheerful, and optimistic. A minor 3rd (3 half steps) sounds dark, melancholic, and introspective.</p><p>The difference is just ONE fret, but the emotional impact is huge. When you build chords in the next category, the 3rd will be the note that determines whether you're playing a major or minor chord. This is the "mood maker" of music.</p>`,
    strudelCode: `// Compare Major vs Minor 3rds
cat(
  // 1. Major 3rd (Happy)
  stack(
    note("c4"), 
    note("e4")
  ).s("acoustic"),
  
  // 2. Minor 3rd (Sad)
  stack(
    note("c4"), 
    note("eb4")
  ).s("acoustic")
).slow(2)

/* 
  STRUDEL GLOSSARY:
  - cat(...): Plays the first chord, then the second chord
  - stack(...): Combines notes into a chord
  - eb4: 'eb' stands for E flat (the 'b' is the flat symbol)
  - e4: E natural
*/`,
    prevLesson: "/lesson/cat1/6",
    nextLesson: "/lesson/cat1/8"
  },
  "cat1-8": {
    id: "8",
    category: "The Fretboard Map",
    title: "The Complete Interval Map",
    concept: "All the intervals within one octave, with their half-step distances.",
    learningGoals: [
      "Minor 2nd (1), Major 2nd (2), Minor 3rd (3), Major 3rd (4)",
      "Perfect 4th (5), Tritone (6), Perfect 5th (7)",
      "Minor 6th (8), Major 6th (9), Minor 7th (10), Major 7th (11), Octave (12)"
    ],
    keyTerms: [
      { term: "Perfect 4th", definition: "The distance of 5 frets; sounds open and stable" },
      { term: "Tritone", definition: "The distance of 6 frets; sounds very tense and unstable" },
      { term: "Major 6th", definition: "The distance of 9 frets; sounds sweet and pleasant" },
      { term: "Major 7th", definition: "The distance of 11 frets; sounds tense and wants to move up to the octave" }
    ],
    tabs: [
      {
        title: "Intervals from C",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|--8--9--10--11--12--13--14--15--16--17--18--19--20--|
    C  C# D   Eb  E   F   F#  G   G#  A   Bb  B   C
    R  m2 M2  m3  M3  P4  TT  P5  m6  M6  m7  M7  Oct`
      }
    ],
    explanation: `<p>Here's the complete map of intervals within one octave. Each interval has a unique sound and function in music. The "perfect" intervals (4th, 5th, octave) are stable and neutral. The major intervals sound bright; minor intervals sound dark.</p><p>The tritone (6 half steps) is the most dissonant interval—it sounds tense and unstable, which is why it's been called "the devil's interval" throughout history. Memorizing these distances will help you build chords, play melodies, and understand harmony.</p>`,
    strudelCode: `// Play all 12 intervals ascending from C
note("c4 c#4 d4 eb4 e4 f4 f#4 g4 g#4 a4 bb4 b4 c5")
  .s("acoustic")
  .slow(3)

/* 
  STRUDEL GLOSSARY:
  - note("..."): The string contains all 12 notes in sequence
  - # (sharp): Raises note by half step (e.g., c#4)
  - b (flat): Lowers note by half step (e.g., eb4, bb4)
  - Spaces: Separate each note in the sequence
*/`,
    prevLesson: "/lesson/cat1/7",
    nextLesson: "/lesson/cat1/9"
  },
  "cat1-9": {
    id: "9",
    category: "The Fretboard Map",
    title: "Interval Shapes",
    concept: "How to visualize and play intervals using efficient 2-string shapes.",
    learningGoals: [
      "Learn common interval shapes (3rds, 4ths, 5ths, 6ths) across adjacent string pairs",
      "These shapes are movable patterns (no open strings)",
      "Use these for chord construction and melody playing"
    ],
    keyTerms: [
      { term: "Adjacent Strings", definition: "Two strings that are next to each other" },
      { term: "Movable Shape", definition: "A finger pattern that works at any fret because it uses no open strings" },
      { term: "String Pair", definition: "Two strings played together" }
    ],
    tabs: [
      {
        title: "Perfect 5th & Major 3rd",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|--3-----7---------------------|
E|--3-----3---------------------|
    P5    M3
    (Same (Next
     fret) +4)`
      },
      {
        title: "Perfect 4th & Major 6th",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|--5-----8---------------------|
E|--3-----3---------------------|
    P4    M6
    (Next (Next
     +2)   +5)`
      }
    ],
    explanation: `<p>Instead of counting frets every time, you can learn visual shapes for common intervals. These shapes are movable—learn them once, and they work anywhere on the neck.</p><p>For example, a perfect 5th on the 6th and 5th strings is always "same fret on both strings." A major 3rd is "4 frets higher on the next string." There's one exception: the G-to-B string relationship is different because of how the guitar is tuned, so shapes need a one-fret adjustment there. Learning these shapes will make you faster at finding intervals and building chords.</p>`,
    strudelCode: `// Playing the same interval (Major 3rd) in different octaves
// This simulates moving the shape across string pairs
cat(
  // Low position
  stack(note("c3"), note("e3")).s("acoustic"),
  
  // Middle position
  stack(note("c4"), note("e4")).s("acoustic"),
  
  // High position
  stack(note("c5"), note("e5")).s("acoustic")
).slow(2)

/* 
  STRUDEL GLOSSARY:
  - cat(...): Sequences the three chords
  - stack(...): Plays the two notes of each interval together
  - c3, c4, c5: The same note C in different octaves
  - e3, e4, e5: The same note E in different octaves
*/`,
    prevLesson: "/lesson/cat1/8",
    nextLesson: "/lesson/cat1/10"
  },
  "cat1-10": {
    id: "10",
    category: "The Fretboard Map",
    title: "Ear Training",
    concept: "Putting it all together - recognizing intervals by sound.",
    learningGoals: [
      "Associate each interval with its unique sound quality",
      "Use reference songs (e.g., 'Here Comes the Bride' = perfect 4th)",
      "Practice identifying intervals in musical context"
    ],
    keyTerms: [
      { term: "Ear Training", definition: "Learning to recognize musical sounds without looking at the instrument" },
      { term: "Reference Song", definition: "A familiar song that starts with a specific interval, used to help remember that interval's sound" },
      { term: "Ascending", definition: "Going from a lower note to a higher note" },
      { term: "Descending", definition: "Going from a higher note to a lower note" }
    ],
    tabs: [
      {
        title: "Intervals from A",
        content: `e|------------------------------|
B|------------------------------|
G|------------------------------|
D|------------------------------|
A|------------------------------|
E|--5--6--7--8--9--10--11--12---|
    A  Bb B  C  C# D   Eb  E
    R  m2 M2 m3 M3 P4  TT  P5`
      }
    ],
    explanation: `<p>Now it's time to train your ear. Each interval has a unique sound that you can learn to recognize. Many musicians use reference songs: a perfect 4th sounds like "Here Comes the Bride," a perfect 5th sounds like "Star Wars," a major 3rd sounds like "When the Saints Go Marching In."</p><p>Practice playing intervals and singing them back. Try playing an interval and identifying it before looking at the fretboard. The Strudel example below plays various intervals in a musical context—listen actively and try to identify each interval by its sound quality. This skill takes time, but it's incredibly valuable for learning songs by ear and improvising.</p>`,
    strudelCode: `// Ear Training Challenge: Identify these intervals
cat(
  // 1. Perfect 5th
  stack(note("c4"), note("g4")).s("acoustic"),
  
  // 2. Major 3rd
  stack(note("c4"), note("e4")).s("acoustic"),
  
  // 3. Perfect 4th
  stack(note("c4"), note("f4")).s("acoustic"),
  
  // 4. Minor 3rd
  stack(note("c4"), note("eb4")).s("acoustic"),
  
  // 5. Tritone
  stack(note("c4"), note("f#4")).s("acoustic")
).slow(2)

/* 
  STRUDEL GLOSSARY:
  - cat(...): Plays the intervals one after another
  - stack(...): Plays the two notes together
  - note("..."): Defines the notes
  - s("guitar"): Sets the instrument sound
*/`,
    prevLesson: "/lesson/cat1/9"
  }
};
