import { Link, useLocation } from "wouter";
import { Car, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/vehicles", label: "Vehicles" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  const handleLogout = () => {
    logout();
    setLocation("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3" data-testid="link-home">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Ride Rent
              </span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a>
                  <Button
                    variant={location === link.path ? "secondary" : "ghost"}
                    className={location === link.path ? "font-medium" : ""}
                    data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Button>
                </a>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-account-menu">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <a className="flex items-center gap-2 w-full" data-testid="link-account">
                      <User className="h-4 w-4" />
                      My Account
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="md:hidden flex gap-1 pb-2 overflow-x-auto">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <a>
                <Button
                  variant={location === link.path ? "secondary" : "ghost"}
                  size="sm"
                  className={location === link.path ? "font-medium" : ""}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
