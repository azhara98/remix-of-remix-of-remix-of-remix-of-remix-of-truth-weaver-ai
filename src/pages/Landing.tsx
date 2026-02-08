import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import RealTimeNews from "@/components/RealTimeNews";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to main app if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 gradient-glass border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </button>
              <button
                onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
            </nav>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center pt-16"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(var(--background)/0.85), hsl(var(--background)/0.95)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">AI-Powered Fact Checking</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Detect Fake News
              <br />
              <span className="text-gradient">Before It Spreads</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              TruthLens uses advanced AI to analyze news articles, social media posts, and claims 
              in real-time. Get instant credibility scores and detailed verification reports.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
                onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { icon: CheckCircle, label: "98% Accuracy", desc: "Verified results" },
                { icon: Zap, label: "Real-Time", desc: "Instant analysis" },
                { icon: Globe, label: "100+ Sources", desc: "Cross-referenced" },
                { icon: Shield, label: "AI Powered", desc: "Advanced detection" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-card/50 border border-border/50"
                >
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <div className="font-semibold text-foreground">{feature.label}</div>
                  <div className="text-sm text-muted-foreground">{feature.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Sections */}
      <RealTimeNews />
      <HowItWorks />
      <Features />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Landing;

