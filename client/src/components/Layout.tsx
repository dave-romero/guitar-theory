import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BookOpen, ChevronRight, Guitar, Menu, Music, Settings } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { lessons } from "@/lib/lessons";

interface LayoutProps {
  children: React.ReactNode;
}

// Map icons to category IDs
const categoryIcons: Record<string, any> = {
  "fretboard-map": Guitar,
  "building-chords": Music,
  "keys-numbers": BookOpen,
  "rhythm-timing": Settings,
  "song-structure": BookOpen,
};

function SidebarContent({ location, setOpen }: { location: string; setOpen: (open: boolean) => void }) {
  return (
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

      <ScrollArea className="flex-1 min-h-0 py-4">
        <div className="px-4 space-y-6">
          {lessons.map((category) => {
            const Icon = categoryIcons[category.id];
            return (
              <div key={category.id}>
                <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  {Icon && <Icon className="w-3 h-3" />}
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.lessons.length > 0 ? (
                    category.lessons.map((lesson, index) => {
                      const path = `/${category.id}/${lesson.id}`;
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
                            <span className="mr-2 text-xs opacity-50">{index + 1}.</span>
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
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
        <div className="text-xs text-muted-foreground text-center font-serif italic">
          "Learn the rules so you can break them."
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 fixed inset-y-0 z-30">
        <SidebarContent location={location} setOpen={setOpen} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40 bg-background/80 backdrop-blur-sm border border-border shadow-sm">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 border-r border-sidebar-border">
          <SidebarContent location={location} setOpen={setOpen} />
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
