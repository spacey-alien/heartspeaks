import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Note from "@/pages/Note";
import Login from "@/pages/Login";
import FloatingHearts from "@/components/FloatingHearts";
import { useEffect } from "react";

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [setLocation]);
  
  return <Component />;
};

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/note" component={Note} />
      <Route path="/" component={() => <ProtectedRoute component={Home} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <FloatingHearts />
      <Router />
    </TooltipProvider>
  );
}

export default App;
