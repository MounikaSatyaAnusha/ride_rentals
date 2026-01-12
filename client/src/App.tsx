import { Router, Route, Switch, Redirect } from "wouter";
import { useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";

import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Vehicles from "@/pages/Vehicles";
import VehicleCategory from "@/pages/VehicleCategory";
import VehicleDetail from "@/pages/VehicleDetail";
import Account from "@/pages/Account";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function AppRouter() {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();
  const hideNavbar = location.startsWith("/auth");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && isAuthenticated && <Navbar />}

      <main className="flex-1">
        <Switch>
          {/* Auth is now the default entry point */}
          <Route path="/auth">
            <Auth />
          </Route>

          {/* Protected routes (only accessible after login) */}
          <Route path="/home">
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Route>

          <Route path="/vehicles">
            <ProtectedRoute>
              <Vehicles />
            </ProtectedRoute>
          </Route>

          <Route path="/vehicles/:category">
            <ProtectedRoute>
              <VehicleCategory />
            </ProtectedRoute>
          </Route>

          <Route path="/vehicle/:id">
            <ProtectedRoute>
              <VehicleDetail />
            </ProtectedRoute>
          </Route>

          <Route path="/account">
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          </Route>

          <Route path="/about">
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          </Route>

          <Route path="/contact">
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          </Route>

          {/* ✅ Always redirect / → /auth */}
          <Route path="/">
            <Redirect to="/auth" />
          </Route>

          {/* 404 */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <AppRouter />
              <Toaster />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
