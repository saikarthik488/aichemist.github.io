import React from "react";
import { Link, useLocation } from "wouter";
import { Wand2, LogOut } from "lucide-react";
import MobileNav from "./MobileNav";
import { isAuthenticated, getCurrentUser } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    setLocation("/");
  };

  // Define navigation links
  const links = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Wand2 className="h-6 w-6 text-primary mr-2" />
                <span className="font-semibold text-xl tracking-tight">
                  Text Alchemist
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <div
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}

            {authenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {user?.isAdmin ? "Admin" : user?.username}
                </span>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <div className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  location === "/auth" ? "text-primary" : "text-gray-600 hover:text-primary"
                }`}>
                  Login
                </div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
