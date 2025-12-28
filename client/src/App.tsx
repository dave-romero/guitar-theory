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
import TestTabs from "./pages/TestTabs";

function Router() {
  return (
    <Layout>
      <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/test-tabs"} component={TestTabs} />
        
        {/* Dynamic Lesson Route */}
        <Route path="/lesson/:catId/:lessonId">
          {(params) => {
            const lessonKey = `${params.catId}-${params.lessonId}`;
            const lesson = lessons[lessonKey];
            
            if (!lesson) {
              return <NotFound />;
            }
            
            return <LessonPage lesson={lesson} />;
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
