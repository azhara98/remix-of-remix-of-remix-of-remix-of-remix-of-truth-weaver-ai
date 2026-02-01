import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecentSearchesPanel from "./RecentSearchesPanel";
import { useSearchHistory } from "@/contexts/SearchHistoryContext";
import type { SearchHistoryItem } from "@/contexts/SearchHistoryContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setSelectedHistoryItem } = useSearchHistory();
  
  // Simulate logged in state - in production this would come from auth context
  const [isLoggedIn] = useState(false);

  const handleHistorySelect = (item: SearchHistoryItem) => {
    // Navigate to home and set the selected history item (with stored result)
    if (location.pathname !== "/") {
      navigate("/");
    }
    setSelectedHistoryItem(item);
  };

  const handleNewProject = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setSelectedHistoryItem(null);
  };

  const navLinks = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
  ];

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 gradient-glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <RecentSearchesPanel 
              onSelectHistory={handleHistorySelect}
              onNewProject={handleNewProject}
            />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/settings")}
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-5 h-5" />
            </Button>
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/settings")}
              >
                My Account
              </Button>
            ) : (
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <RecentSearchesPanel 
              onSelectHistory={handleHistorySelect}
              onNewProject={handleNewProject}
            />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/settings")}
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden gradient-glass border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                {isLoggedIn ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      navigate("/settings");
                      setMobileMenuOpen(false);
                    }}
                  >
                    My Account
                  </Button>
                ) : (
                  <Button 
                    variant="hero" 
                    size="sm"
                    onClick={() => {
                      navigate("/auth");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
