import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Guitar, Music } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 lg:p-16 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm border border-white/20">
            <Music className="w-4 h-4" />
            <span>Interactive Music Theory</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
            Master the Fretboard, <br />
            <span className="text-amber-200">One Note at a Time.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-lg">
            A visual, interactive guide to guitar theory. Learn intervals, chords, and harmony with live code examples you can hear and touch.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/lesson/cat1/1">
              <Button size="lg" className="bg-white text-primary hover:bg-amber-50 font-semibold text-base h-12 px-8 shadow-lg hover:shadow-xl transition-all">
                Start Lesson 1
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10 h-12 px-8">
              Browse Categories
            </Button>
          </div>
        </div>
        
        {/* Abstract Background Art */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
           <img 
            src="/images/hero-guitar-art.jpg" 
            alt="Guitar Art" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/30 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <Guitar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold">Visual Learning</h3>
          <p className="text-muted-foreground leading-relaxed">
            Forget dry textbooks. See intervals and patterns directly on the fretboard with clear, interactive diagrams.
          </p>
        </Card>

        <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/30 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <Music className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold">Live Audio Examples</h3>
          <p className="text-muted-foreground leading-relaxed">
            Don't just read about harmony—hear it. Every lesson includes live, editable code examples powered by Strudel.
          </p>
        </Card>

        <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/30 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <ArrowRight className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold">Step-by-Step</h3>
          <p className="text-muted-foreground leading-relaxed">
            A structured path from finding your first note to understanding complex song architecture.
          </p>
        </Card>
      </section>

      {/* Category Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-3xl font-serif font-bold">Course Curriculum</h2>
          <span className="text-sm text-muted-foreground">5 Categories • 50 Lessons</span>
        </div>
        
        <div className="grid gap-4">
          {[
            { id: 1, title: "The Fretboard Map", desc: "Master navigation, intervals, and the geometry of the guitar.", active: true },
            { id: 2, title: "Building Chords", desc: "Construct major, minor, and extended chords from scratch.", active: false },
            { id: 3, title: "Keys & Numbers", desc: "Unlock the Nashville Number System and diatonic theory.", active: false },
            { id: 4, title: "Rhythm & Timing", desc: "Develop solid phrasing, subdivision, and groove.", active: false },
            { id: 5, title: "Song Structure", desc: "Analyze functional harmony and how songs are built.", active: false },
          ].map((cat) => (
            <div 
              key={cat.id} 
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                cat.active 
                  ? "bg-card border-primary/20 shadow-sm" 
                  : "bg-transparent border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                cat.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {cat.id}
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-bold text-lg">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </div>
              {cat.active ? (
                <Link href="/lesson/cat1/1">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                    Start
                  </Button>
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground italic px-3">Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
