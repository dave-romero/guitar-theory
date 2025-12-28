import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { GuitarTab } from "./GuitarTab";
import { TabLegend } from "./TabLegend";
import { LessonContent } from "@/lib/lessons";

interface LessonPageProps {
  lesson: LessonContent;
  categoryTitle: string;
  prevLessonUrl?: string;
  nextLessonUrl?: string;
}

export default function LessonPage({ lesson, categoryTitle, prevLessonUrl, nextLessonUrl }: LessonPageProps) {
  // Encode Strudel code for the iframe URL
  // We use the hash-based format which is more reliable for embedding
  const encodedCode = btoa(lesson.strudelCode);
  const strudelUrl = `https://strudel.cc/?embed=1#${encodedCode}`;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-sm text-primary font-medium uppercase tracking-wider">
          <span>{categoryTitle}</span>
          <span>•</span>
          <span>Lesson {lesson.id}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">{lesson.title}</h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl">{lesson.concept}</p>
      </div>

      <div className="space-y-12">
        {/* Main Content Area */}
        <div className="space-y-8 max-w-4xl mx-auto">
          
          {/* Learning Goals */}
          <Card className="bg-secondary/30 border-none shadow-none p-6 rounded-lg">
            <h3 className="font-serif font-bold text-lg -mb-2.5 flex items-center gap-2">
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

          {/* Guitar Tab */}
          <div className="space-y-6 pt-4 border-t border-border">
            <h3 className="font-serif font-bold text-xl">Fretboard Visualization</h3>
            <TabLegend items={lesson.legend} />
            <div className="flex flex-wrap gap-8 items-start">
              {lesson.tabs.map((tab, index) => (
                <div key={index} className="space-y-3">
                  {tab.title && (
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{tab.title}</h4>
                  )}
                  <div className="flex justify-center bg-card border border-border rounded-lg px-4 py-1.5 shadow-sm">
                    <GuitarTab 
                      markers={tab.markers} 
                      startFret={tab.startFret} 
                      fretCount={tab.fretCount} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Width Strudel Editor */}
          <div className="space-y-4 pt-8 border-t border-border">
            <h3 className="font-serif font-bold text-xl">Interactive Code</h3>
            <p className="text-muted-foreground mb-6">
              Click "Play" to hear the example. Edit the code to experiment with the sounds.
            </p>
            
            <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden w-full">
              <div className="bg-muted/50 p-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">Strudel Editor</span>
              </div>
              
              {/* 
                Zoom Hack: We make the container larger (125%) and scale the iframe down (80%)
                to effectively "zoom out" the content inside the iframe.
              */}
              <div className="relative w-full h-[600px] bg-black overflow-hidden">
                <iframe
                  key={lesson.id} // Force re-render when lesson changes
                  src={strudelUrl}
                  className="absolute inset-0 w-[125%] h-[125%] origin-top-left transform scale-80"
                  title="Strudel Live Code"
                  allow="autoplay; midi; clipboard-write"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-border">
            {prevLessonUrl ? (
              <Link href={prevLessonUrl}>
                <Button variant="outline" className="group">
                  <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Previous Lesson
                </Button>
              </Link>
            ) : (
              <div /> // Spacer
            )}
            
            {nextLessonUrl ? (
              <Link href={nextLessonUrl}>
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
      </div>
    </div>
  );
}
