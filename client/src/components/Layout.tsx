import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BookOpen, ChevronRight, Guitar, Menu, Music, Settings } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

const categories = [
  {
    id: "cat1",
    title: "1. The Fretboard Map",
    icon: Guitar,
    lessons: [
      { id: "1", title: "The Musical Alphabet" },
      { id: "2", title: "Same Note, Different String" },
      { id: "3", title: "Half Steps & Whole Steps" },
      { id: "4", title: "The Major Scale Pattern" },
      { id: "5", title: "Octaves" },
      { id: "6", title: "Perfect 5ths" },
      { id: "7", title: "Major & Minor 3rds" },
      { id: "8", title: "The Interval Map" },
      { id: "9", title: "Interval Shapes" },
      { id: "10", title: "Ear Training" },
    ],
  },
  {
    id: "cat2",
    title: "2. Building Chords",
    icon: Music,
    lessons: [], // Placeholder
  },
  {
    id: "cat3",
    title: "3. Keys & Numbers",
    icon: BookOpen,
    lessons: [], // Placeholder
  },
  {
    id: "cat4",
    title: "4. Rhythm & Timing",
    icon: Settings, // Placeholder icon
    lessons: [], // Placeholder
  },
  {
    id: "cat5",
    title: "5. Song Structure",
    icon: BookOpen, // Placeholder icon
    lessons: [], // Placeholder
  },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-105 transition-transform">
              <Guitar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg leading-tight">Guitar Theory</h1>
              <p className="text-xs text-muted-foreground font-sans">Interactive Lessons</p>
            </div>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className="px-4 space-y-6">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {category.title}
              </h3>
              <div className="space-y-1">
                {category.lessons.length > 0 ? (
                  category.lessons.map((lesson) => {
                    const path = `/lesson/${category.id}/${lesson.id}`;
                    const isActive = location === path;
                    return (
                      <Link key={lesson.id} href={path}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start font-sans text-sm h-9",
                            isActive 
                              ? "bg-primary/10 text-primary font-medium hover:bg-primary/15" 
                              : "text-muted-foreground hover:text-foreground"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <span className="mr-2 text-xs opacity-50">{lesson.id}.</span>
                          <span className="truncate">{lesson.title}</span>
                          {isActive && <ChevronRight className="ml-auto w-3 h-3 opacity-50" />}
                        </Button>
                      </Link>
                    );
                  })
                ) : (
                  <div className="px-2 py-1 text-xs text-muted-foreground/50 italic">
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
        <div className="text-xs text-muted-foreground text-center font-serif italic">
          "Learn the rules so you can break them."
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 fixed inset-y-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40 bg-background/80 backdrop-blur-sm border border-border shadow-sm">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 border-r border-sidebar-border">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 min-h-screen transition-all duration-300 ease-in-out">
        <div className="container py-8 md:py-12 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
