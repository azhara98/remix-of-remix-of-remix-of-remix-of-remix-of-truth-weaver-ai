import { Button } from "@/components/ui/button";
import { Search, BrainCircuit, Sparkles, ArrowRight, CheckCircle, XCircle, AlertTriangle, Eye, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalyzeOptionsPopover from "./AnalyzeOptionsPopover";

type AnalysisResult = {
  status: "real" | "fake" | "uncertain";
  confidence: number;
  message: string;
} | null;

const HeroSection = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(null);

  const handleAnalyze = () => {
    if (inputValue.trim()) {
      setIsAnalyzing(true);
      setResult(null);
      // Simulate analysis - in real app this would call an API
      setTimeout(() => {
        setIsAnalyzing(false);
        // For demo, show as "real" news with green indicator
        setResult({
          status: "real",
          confidence: 94.7,
          message: "This content appears to be credible and from reliable sources."
        });
      }, 2000);
    }
  };

  const handleOptionSelect = (type: string, data?: string) => {
    if (data) {
      setInputValue(`[${type.toUpperCase()}]: ${data}`);
    }
    // Optionally auto-start analysis
    // handleAnalyze();
  };

  const handleClear = () => {
    setInputValue("");
    setResult(null);
  };

  return (
<section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Modern Gradient Background with AI Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,50%,12%)] via-[hsl(200,60%,18%)] to-[hsl(260,40%,20%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[hsl(175,70%,40%)] rounded-full opacity-10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(220,70%,50%)] rounded-full opacity-15 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[hsl(260,50%,40%)] rounded-full opacity-10 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(175,70%,50%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(175,70%,50%) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Neural network dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-secondary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Bottom fade to content */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 left-[10%] w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <BrainCircuit className="w-8 h-8 text-secondary" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-[15%] w-16 h-16 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="w-6 h-6 text-accent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Powered by Advanced NLP Technology
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
            Detect{" "}
            <span className="bg-gradient-to-r from-[hsl(175,70%,50%)] to-[hsl(200,80%,60%)] bg-clip-text text-transparent">Fake News</span>
            <br />
            Before It Spreads
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Our AI-powered platform uses Natural Language Processing to analyze news articles,
            social media posts, and claims in real-time. Get instant credibility scores
            and detailed fact-checks.
          </p>

          {/* Search Input with Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              {/* Glow effect behind input */}
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary/40 via-accent/30 to-secondary/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative bg-white/95 dark:bg-[hsl(222,47%,11%)]/95 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-white/20 dark:border-white/10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Paste a news article URL or enter text to analyze..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-muted/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 text-base transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <AnalyzeOptionsPopover onOptionSelect={handleOptionSelect} />
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !inputValue.trim()}
                      className="flex-1 sm:flex-none h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Now
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Quick analysis time indicator */}
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Average analysis time: 20-30 seconds</span>
                </div>
              </div>

              {/* Scanning Animation */}
              {isAnalyzing && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan" />
                </div>
              )}
            </div>

            {/* Analysis Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 p-4 rounded-xl border ${
                    result.status === "real"
                      ? "bg-success/10 border-success/30"
                      : result.status === "fake"
                      ? "bg-destructive/10 border-destructive/30"
                      : "bg-warning/10 border-warning/30"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {result.status === "real" ? (
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/20 flex-shrink-0">
                        <CheckCircle className="w-7 h-7 text-success" />
                      </div>
                    ) : result.status === "fake" ? (
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20 flex-shrink-0">
                        <XCircle className="w-7 h-7 text-destructive" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning/20 flex-shrink-0">
                        <AlertTriangle className="w-7 h-7 text-warning" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-semibold text-lg ${
                          result.status === "real"
                            ? "text-success"
                            : result.status === "fake"
                            ? "text-destructive"
                            : "text-warning"
                        }`}>
                          {result.status === "real" ? "Credible News" : result.status === "fake" ? "Fake News Detected" : "Uncertain"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {result.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {result.message}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate("/results")}
                        className="gap-1 flex-1 sm:flex-none"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: "99.2%", label: "Detection Accuracy" },
              { value: "10M+", label: "Articles Analyzed" },
              { value: "<30s", label: "Analysis Time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
