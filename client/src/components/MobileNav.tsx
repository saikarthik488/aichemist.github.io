import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { isAuthenticated, getCurrentUser } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setOpen(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    setLocation("/");
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] flex flex-col">
        <nav className="flex flex-col gap-4 mt-6 flex-grow">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link href={link.href}>
                <div
                  className={`block px-2 py-3 text-lg hover:bg-gray-100 rounded-md cursor-pointer ${
                    location === link.href
                      ? "bg-gray-100 font-medium text-primary"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            </SheetClose>
          ))}

          {/* Conditionally render login or logout */}
          {authenticated ? (
            <div className="mt-4">
              <div className="px-2 py-2 text-sm font-medium text-gray-500">
                Signed in as: <span className="text-primary">{user?.isAdmin ? "Admin" : user?.username}</span>
              </div>
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                className="w-full justify-start px-2 py-3 text-lg text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-5 w-5 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <SheetClose asChild>
              <Link href="/auth">
                <div
                  className={`block px-2 py-3 text-lg hover:bg-gray-100 rounded-md cursor-pointer ${
                    location === "/auth"
                      ? "bg-gray-100 font-medium text-primary"
                      : "text-gray-700"
                  }`}
                >
                  Login
                </div>
              </Link>
            </SheetClose>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
