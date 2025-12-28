import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import LessonPage from "./components/LessonPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lessons } from "./lib/lessons";
import Home from "./pages/Home";
import DesignLab from "./pages/DesignLab";
import TestTabs from "./pages/TestTabs";

function Router() {
  return (
    <Layout>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/design-lab" component={DesignLab} />
      <Route path={"/test-tabs"} component={TestTabs} />
        
        {/* Dynamic Lesson Route */}
        <Route path="/:categoryId/:lessonId">
          {(params) => {
            // Find the category index
            const catIndex = lessons.findIndex(c => c.id === params.categoryId);
            if (catIndex === -1) return <NotFound />;
            const category = lessons[catIndex];

            // Find the lesson index within the category
            const lessonIndex = category.lessons.findIndex(l => l.id === params.lessonId);
            if (lessonIndex === -1) return <NotFound />;
            const lesson = category.lessons[lessonIndex];
            
            // Calculate Previous Lesson URL
            let prevLessonUrl: string | undefined;
            if (lessonIndex > 0) {
              prevLessonUrl = `/${category.id}/${category.lessons[lessonIndex - 1].id}`;
            } else if (catIndex > 0) {
              const prevCategory = lessons[catIndex - 1];
              if (prevCategory.lessons.length > 0) {
                const lastLessonOfPrev = prevCategory.lessons[prevCategory.lessons.length - 1];
                prevLessonUrl = `/${prevCategory.id}/${lastLessonOfPrev.id}`;
              }
            }

            // Calculate Next Lesson URL
            let nextLessonUrl: string | undefined;
            if (lessonIndex < category.lessons.length - 1) {
              nextLessonUrl = `/${category.id}/${category.lessons[lessonIndex + 1].id}`;
            } else if (catIndex < lessons.length - 1) {
              const nextCategory = lessons[catIndex + 1];
              if (nextCategory.lessons.length > 0) {
                const firstLessonOfNext = nextCategory.lessons[0];
                nextLessonUrl = `/${nextCategory.id}/${firstLessonOfNext.id}`;
              }
            }

            return (
              <LessonPage 
                lesson={lesson} 
                categoryTitle={category.title}
                prevLessonUrl={prevLessonUrl}
                nextLessonUrl={nextLessonUrl}
              />
            );
          }}
        </Route>

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
