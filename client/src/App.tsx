import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import pages
import Home from "@/pages/Home";
import Upload from "@/pages/Upload";
import Analysis from "@/pages/Analysis";
import Reports from "@/pages/Reports";
import NotFound from "@/pages/not-found";

// Import components
import Navigation from "@/components/Navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/upload" component={Upload} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/reports" component={Reports} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background" data-testid="app">
          {/* Navigation */}
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Navigation />
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;