"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Car,
  ChevronDown,
  ChevronUp,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CarDealerLayoutProps {
  children: React.ReactNode;
}

export default function DealerLayout({ children }: CarDealerLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(window.scrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
        setShowScrollButton(true);
      } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setScrollDirection("up");
        setShowScrollButton(true);
      } else if (currentScrollY <= 100) {
        setShowScrollButton(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header>
        <nav
          className={`fixed w-full z-50 h-[80px] transition-all duration-300 ${isScrolled ? "bg-primary/90 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"}`}
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-full">
                  <Car className="h-6 w-6 text-slate-900" />
                </div>
                <span className="text-xl font-bold font-mono tracking-wider text-foreground justify-items-start mx-auto">
                  AUTOCUBA
                </span>
              </div>

              {/* Navigation Menu - centered */}
              <NavBar />

              {/* Search and Theme Toggle */}
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center">
                  <div className="relative">
                    <Input
                      placeholder="Buscar..."
                      className="w-48 h-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-400 rounded-full pr-10 text-sm"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-white hover:bg-slate-800 h-9 w-9 "
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:bg-slate-800 h-9 w-9"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {showScrollButton && (
        <button
          onClick={scrollDirection === "down" ? scrollToTop : scrollToBottom}
          className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          {scrollDirection === "down" ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      )}
      <main className="flex w-full flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
