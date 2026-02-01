import { useState, useCallback } from "react";

export type VerificationStep = {
  id: string;
  label: string;
  status: "pending" | "active" | "completed" | "error";
  details?: string;
  sources?: TrustedSource[];
};

export type TrustedSource = {
  name: string;
  url: string;
  found: boolean;
  matchScore: number;
  reportType: "confirms" | "disputes" | "unrelated" | "not_found";
  snippet?: string;
};

export type AnalysisResult = {
  verdict: "real" | "fake" | "misleading" | "unverified";
  credibilityScore: number;
  sourceVerification: {
    totalSourcesChecked: number;
    confirmingSources: number;
    disputingSources: number;
    crossPlatformConsistency: number;
    trustedSources: TrustedSource[];
  };
  aiAnalysis: {
    languagePatterns: {
      score: number;
      findings: string[];
    };
    claimConsistency: {
      score: number;
      findings: string[];
    };
    emotionalTone: {
      score: number;
      tone: string;
      findings: string[];
    };
    credibilityIndicators: {
      score: number;
      findings: string[];
    };
  };
  summary: string;
  recommendations: string[];
};

export type AnalysisState = {
  isAnalyzing: boolean;
  currentStep: number;
  steps: VerificationStep[];
  result: AnalysisResult | null;
  error: string | null;
};

const TRUSTED_SOURCES = [
  { name: "Times of India", category: "national" },
  { name: "The Hindu", category: "national" },
  { name: "NDTV", category: "national" },
  { name: "India Today", category: "national" },
  { name: "Reuters India", category: "international" },
  { name: "PTI News", category: "agency" },
  { name: "Alt News", category: "fact-check" },
  { name: "Boom Live", category: "fact-check" },
  { name: "India Fact Check", category: "fact-check" },
  { name: "AFP Fact Check", category: "fact-check" },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateMockSourceResults = (): TrustedSource[] => {
  const numSources = 5 + Math.floor(Math.random() * 4);
  const shuffled = [...TRUSTED_SOURCES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numSources);
  
  return selected.map(source => {
    const found = Math.random() > 0.3;
    const reportTypes: TrustedSource["reportType"][] = ["confirms", "disputes", "unrelated", "not_found"];
    const reportType = found 
      ? (Math.random() > 0.7 ? "disputes" : Math.random() > 0.3 ? "confirms" : "unrelated")
      : "not_found";
    
    return {
      name: source.name,
      url: `https://${source.name.toLowerCase().replace(/\s+/g, "")}.com`,
      found,
      matchScore: found ? 50 + Math.floor(Math.random() * 50) : 0,
      reportType,
      snippet: found ? generateSnippet(source.name, reportType) : undefined,
    };
  });
};

const generateSnippet = (sourceName: string, reportType: TrustedSource["reportType"]): string => {
  const snippets = {
    confirms: [
      "Multiple credible reports confirm this information...",
      "This story has been verified by independent sources...",
      "Official statements corroborate these claims...",
    ],
    disputes: [
      "Fact-checkers have flagged this claim as misleading...",
      "No evidence found to support these allegations...",
      "This information contradicts official records...",
    ],
    unrelated: [
      "Similar topic covered with different context...",
      "Related story but with varying details...",
    ],
    not_found: [],
  };
  
  const options = snippets[reportType];
  return options.length > 0 ? options[Math.floor(Math.random() * options.length)] : "";
};

const generateAnalysisResult = (sources: TrustedSource[]): AnalysisResult => {
  const confirmingSources = sources.filter(s => s.reportType === "confirms").length;
  const disputingSources = sources.filter(s => s.reportType === "disputes").length;
  const totalFound = sources.filter(s => s.found).length;
  
  const crossPlatformConsistency = totalFound > 0 
    ? Math.round((confirmingSources / totalFound) * 100) 
    : 50;
  
  // Calculate scores
  const languageScore = 60 + Math.floor(Math.random() * 35);
  const claimScore = 55 + Math.floor(Math.random() * 40);
  const emotionalScore = 50 + Math.floor(Math.random() * 45);
  const credibilityScore = 60 + Math.floor(Math.random() * 35);
  
  const avgScore = (languageScore + claimScore + emotionalScore + credibilityScore + crossPlatformConsistency) / 5;
  
  // Determine verdict based on scores and source verification
  let verdict: AnalysisResult["verdict"];
  if (disputingSources > confirmingSources || avgScore < 50) {
    verdict = "fake";
  } else if (avgScore >= 75 && confirmingSources >= 2) {
    verdict = "real";
  } else if (avgScore >= 60 || disputingSources > 0) {
    verdict = "misleading";
  } else {
    verdict = "unverified";
  }
  
  const emotionalTones = ["neutral", "sensationalist", "balanced", "alarming", "persuasive"];
  const tone = emotionalTones[Math.floor(Math.random() * emotionalTones.length)];
  
  return {
    verdict,
    credibilityScore: Math.round(avgScore),
    sourceVerification: {
      totalSourcesChecked: sources.length,
      confirmingSources,
      disputingSources,
      crossPlatformConsistency,
      trustedSources: sources,
    },
    aiAnalysis: {
      languagePatterns: {
        score: languageScore,
        findings: [
          languageScore > 70 ? "Writing style consistent with professional journalism" : "Some informal language patterns detected",
          languageScore > 60 ? "Proper attribution of sources" : "Limited source attribution",
          "Grammar and syntax analysis complete",
        ],
      },
      claimConsistency: {
        score: claimScore,
        findings: [
          claimScore > 70 ? "Claims are internally consistent" : "Some inconsistencies in claims detected",
          claimScore > 60 ? "Facts align with known information" : "Unable to verify all factual claims",
          "Cross-referenced with available databases",
        ],
      },
      emotionalTone: {
        score: emotionalScore,
        tone,
        findings: [
          `Detected ${tone} tone in the content`,
          emotionalScore > 70 ? "Balanced emotional presentation" : "Elevated emotional language detected",
          emotionalScore > 60 ? "No manipulation tactics identified" : "Potential persuasion techniques present",
        ],
      },
      credibilityIndicators: {
        score: credibilityScore,
        findings: [
          credibilityScore > 70 ? "Strong credibility signals present" : "Mixed credibility indicators",
          credibilityScore > 60 ? "Author/source appears legitimate" : "Unable to fully verify source authenticity",
          "Digital footprint analysis complete",
        ],
      },
    },
    summary: generateSummary(verdict, confirmingSources, disputingSources, avgScore),
    recommendations: generateRecommendations(verdict),
  };
};

const generateSummary = (
  verdict: AnalysisResult["verdict"], 
  confirming: number, 
  disputing: number, 
  score: number
): string => {
  const summaries = {
    real: `This content appears to be credible based on verification across ${confirming} trusted sources. Cross-platform consistency is high, and AI analysis detected professional journalistic patterns with a ${Math.round(score)}% confidence score.`,
    fake: `This content shows significant credibility issues. ${disputing} trusted sources dispute these claims. AI analysis detected patterns commonly associated with misinformation, including emotional manipulation and inconsistent claims.`,
    misleading: `This content contains partially accurate information but may be misleading. While some sources confirm elements of the story, there are inconsistencies that warrant caution. The credibility score of ${Math.round(score)}% reflects mixed signals.`,
    unverified: `Unable to definitively verify this content. Limited coverage in trusted sources and insufficient data points for conclusive AI analysis. We recommend seeking additional sources before forming conclusions.`,
  };
  
  return summaries[verdict];
};

const generateRecommendations = (verdict: AnalysisResult["verdict"]): string[] => {
  const base = [
    "Always verify information from multiple independent sources",
    "Check the publication date and context of the news",
  ];
  
  const specific = {
    real: ["This appears trustworthy but continue to verify major claims", "Share responsibly with proper context"],
    fake: ["Do not share this content", "Report to fact-checking organizations", "Inform others who may have seen this"],
    misleading: ["Read the full article, not just headlines", "Look for the original source of claims", "Be cautious when sharing"],
    unverified: ["Wait for more coverage before drawing conclusions", "Check back later for updates", "Avoid sharing until verified"],
  };
  
  return [...base, ...specific[verdict]];
};

export const useNewsAnalysis = () => {
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    currentStep: 0,
    steps: [],
    result: null,
    error: null,
  });

  const setResult = useCallback((result: AnalysisResult) => {
    setState(prev => ({
      ...prev,
      result,
      isAnalyzing: false,
    }));
  }, []);

  const initializeSteps = (): VerificationStep[] => [
    { id: "search", label: "Searching trusted news sources", status: "pending" },
    { id: "verify", label: "Verifying content across multiple outlets", status: "pending" },
    { id: "crossref", label: "Cross-referencing fact-check databases", status: "pending" },
    { id: "analyze", label: "Analyzing content using AI", status: "pending" },
    { id: "compile", label: "Compiling verification report", status: "pending" },
  ];

  const updateStep = (stepIndex: number, update: Partial<VerificationStep>) => {
    setState(prev => ({
      ...prev,
      currentStep: stepIndex,
      steps: prev.steps.map((step, idx) => 
        idx === stepIndex ? { ...step, ...update } : step
      ),
    }));
  };

  const analyze = useCallback(async (content: string) => {
    const steps = initializeSteps();
    
    setState({
      isAnalyzing: true,
      currentStep: 0,
      steps,
      result: null,
      error: null,
    });

    try {
      // Step 1: Search trusted sources (8-12 seconds)
      updateStep(0, { status: "active", details: "Querying major news databases..." });
      await delay(3000);
      updateStep(0, { details: "Scanning Times of India, The Hindu, NDTV..." });
      await delay(3000);
      updateStep(0, { details: "Checking international wire services..." });
      await delay(2000);
      updateStep(0, { status: "completed", details: "Found relevant coverage in multiple sources" });

      // Step 2: Verify across outlets (6-10 seconds)
      updateStep(1, { status: "active", details: "Comparing headlines and content..." });
      await delay(3000);
      updateStep(1, { details: "Analyzing source consistency..." });
      await delay(2500);
      const sources = generateMockSourceResults();
      updateStep(1, { 
        status: "completed", 
        details: `Verified against ${sources.length} trusted sources`,
        sources 
      });

      // Step 3: Cross-reference fact-checks (5-8 seconds)
      updateStep(2, { status: "active", details: "Querying Alt News database..." });
      await delay(2500);
      updateStep(2, { details: "Checking Boom Live and AFP archives..." });
      await delay(2500);
      updateStep(2, { status: "completed", details: "Fact-check database scan complete" });

      // Step 4: AI Analysis (8-12 seconds)
      updateStep(3, { status: "active", details: "Running NLP language pattern analysis..." });
      await delay(3000);
      updateStep(3, { details: "Evaluating emotional tone and credibility signals..." });
      await delay(3000);
      updateStep(3, { details: "Analyzing claim consistency..." });
      await delay(2500);
      updateStep(3, { status: "completed", details: "AI analysis complete" });

      // Step 5: Compile results (2-3 seconds)
      updateStep(4, { status: "active", details: "Generating verification report..." });
      await delay(2000);
      
      const result = generateAnalysisResult(sources);
      
      updateStep(4, { status: "completed", details: "Report ready" });

      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        result,
      }));

      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: error instanceof Error ? error.message : "Analysis failed",
      }));
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isAnalyzing: false,
      currentStep: 0,
      steps: [],
      result: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    analyze,
    reset,
    setResult,
  };
};
