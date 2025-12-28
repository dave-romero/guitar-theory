import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "wouter";

export interface LessonContent {
  id: string;
  title: string;
  category: string;
  concept: string;
  learningGoals: string[];
  keyTerms: { term: string; definition: string }[];
  tab: string;
  explanation: string;
  strudelCode: string;
  prevLesson?: string;
  nextLesson?: string;
}

interface LessonPageProps {
  lesson: LessonContent;
}

export default function LessonPage({ lesson }: LessonPageProps) {
  // Encode Strudel code for the iframe URL
  // We use the official Strudel REPL embed URL format
  const encodedCode = btoa(lesson.strudelCode);
  const strudelUrl = `https://strudel.cc/?embed=1&code=${encodedCode}`;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm text-primary font-medium uppercase tracking-wider">
          <span>{lesson.category}</span>
          <span>•</span>
          <span>Lesson {lesson.id}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">{lesson.title}</h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl">{lesson.concept}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Content (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Learning Goals */}
          <Card className="bg-secondary/30 border-none shadow-none p-6 rounded-lg">
            <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">✓</span>
              Learning Goals
            </h3>
            <ul className="space-y-2">
              {lesson.learningGoals.map((goal, i) => (
                <li key={i} className="text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Main Explanation */}
          <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-semibold">
            <div dangerouslySetInnerHTML={{ __html: lesson.explanation }} />
          </div>

          {/* Guitar Tab */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl">Fretboard Visualization</h3>
            <div className="guitar-tab text-xs md:text-sm overflow-x-auto">
              {lesson.tab}
            </div>
            <p className="text-xs text-muted-foreground italic text-center mt-2">
              Standard Tuning: E A D G B E
            </p>
          </div>

          {/* Key Terms */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-serif font-bold text-xl">Key Terms</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {lesson.keyTerms.map((term, i) => (
                <div key={i} className="bg-card border border-border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <dt className="font-bold text-primary mb-1">{term.term}</dt>
                  <dd className="text-sm text-muted-foreground leading-snug">{term.definition}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-border">
            {lesson.prevLesson ? (
              <Link href={lesson.prevLesson}>
                <Button variant="outline" className="group">
                  <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Previous Lesson
                </Button>
              </Link>
            ) : (
              <div /> // Spacer
            )}
            
            {lesson.nextLesson ? (
              <Link href={lesson.nextLesson}>
                <Button className="group bg-primary text-primary-foreground hover:bg-primary/90">
                  Next Lesson
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <div /> // Spacer
            )}
          </div>
        </div>

        {/* Right Column: Strudel (5 cols) - Sticky */}
        <div className="lg:col-span-5">
          <div className="sticky top-8 space-y-4">
            <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
              <div className="bg-muted/50 p-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">Interactive Example</span>
              </div>
              
              <div className="relative aspect-[4/5] w-full bg-black">
                <iframe
                  src={strudelUrl}
                  className="absolute inset-0 w-full h-full"
                  title="Strudel Live Code"
                  allow="midi"
                />
              </div>
              
              <div className="p-4 bg-secondary/20 border-t border-border">
                <div className="flex items-start gap-3">
                  <PlayCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Try it:</strong> Click the "Play" button in the code editor above to hear the example. You can even edit the code to experiment!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
