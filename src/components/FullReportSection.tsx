import { motion } from "framer-motion";
import { 
  CheckCircle, XCircle, AlertTriangle, HelpCircle, 
  Shield, Brain, TrendingUp, TrendingDown,
  FileText, AlertOctagon, Globe, Download, Share2,
  RefreshCw, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalysisResult, TrustedSource } from "@/hooks/useNewsAnalysis";

type FullReportSectionProps = {
  result: AnalysisResult;
  query: string;
  onClear: () => void;
  onRerun?: () => void;
};

const verdictConfig = {
  real: {
    icon: CheckCircle,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
    label: "Credible News",
    description: "This content appears to be authentic and from reliable sources.",
  },
  fake: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/50",
    borderColor: "border-red-200 dark:border-red-800",
    badgeBg: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
    label: "Fake News Detected",
    description: "This content shows significant credibility issues.",
  },
  misleading: {
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/50",
    borderColor: "border-amber-200 dark:border-amber-800",
    badgeBg: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
    label: "Potentially Misleading",
    description: "This content may contain inaccuracies or missing context.",
  },
  unverified: {
    icon: HelpCircle,
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-50 dark:bg-slate-900/50",
    borderColor: "border-slate-200 dark:border-slate-700",
    badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    label: "Unverified",
    description: "Unable to definitively verify this content.",
  },
};

const SourceItem = ({ source }: { source: TrustedSource }) => {
  const reportTypeConfig = {
    confirms: { icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-100 dark:bg-emerald-900/50", label: "Confirms" },
    disputes: { icon: XCircle, color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/50", label: "Disputes" },
    unrelated: { icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/50", label: "Related" },
    not_found: { icon: HelpCircle, color: "text-slate-500 dark:text-slate-400", bgColor: "bg-slate-100 dark:bg-slate-800", label: "Not Found" },
  };

  const config = reportTypeConfig[source.reportType];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${
        source.found ? "bg-secondary/20" : "bg-slate-200 dark:bg-slate-700"
      } flex items-center justify-center`}>
        <Globe className={`w-5 h-5 ${source.found ? "text-secondary" : "text-slate-400 dark:text-slate-500"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{source.name}</span>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
          {source.matchScore > 0 && (
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {source.matchScore}% match
            </span>
          )}
        </div>
        {source.snippet && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {source.snippet}
          </p>
        )}
      </div>
    </div>
  );
};

const ScoreCard = ({ 
  label, 
  score, 
  findings 
}: { 
  label: string; 
  score: number; 
  findings: string[] 
}) => {
  const getScoreColor = (s: number) => {
    if (s >= 70) return { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500" };
    if (s >= 50) return { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500" };
    return { text: "text-red-600 dark:text-red-400", bg: "bg-red-500" };
  };
  
  const colors = getScoreColor(score);
  
  return (
    <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-slate-900 dark:text-slate-100">{label}</span>
        <div className="flex items-center gap-2">
          {score >= 70 ? (
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          ) : score >= 50 ? (
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`font-bold text-lg ${colors.text}`}>
            {score}%
          </span>
        </div>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full ${colors.bg} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <ul className="space-y-2">
        {findings.map((finding, idx) => (
          <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
            <ChevronRight className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
            {finding}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FullReportSection = ({ result, query, onClear, onRerun }: FullReportSectionProps) => {
  const config = verdictConfig[result.verdict];
  const VerdictIcon = config.icon;

  const handleDownload = () => {
    const reportText = `
TruthLens Verification Report
=============================
Query: ${query}
Verdict: ${config.label}
Credibility Score: ${result.credibilityScore}%

Summary:
${result.summary}

Sources Checked: ${result.sourceVerification.totalSourcesChecked}
Confirming Sources: ${result.sourceVerification.confirmingSources}
Disputing Sources: ${result.sourceVerification.disputingSources}

Recommendations:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Generated by TruthLens AI Fact Checker
    `.trim();
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'truthlens-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `TruthLens Report: ${config.label} (${result.credibilityScore}% credibility) - ${query.substring(0, 100)}...`;
    if (navigator.share) {
      await navigator.share({ title: 'TruthLens Report', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Verdict Header with Actions */}
      <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-xl`}>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className={`w-16 h-16 rounded-2xl ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center flex-shrink-0`}
              >
                <VerdictIcon className={`w-9 h-9 ${config.color}`} />
              </motion.div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className={`font-display text-2xl lg:text-3xl font-bold ${config.color}`}>
                    {config.label}
                  </h2>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${config.badgeBg}`}>
                    {result.credibilityScore}% Credibility
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mt-1 text-sm lg:text-base">
                  {config.description}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="default" size="sm" onClick={onClear} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Check Another
              </Button>
              {onRerun && (
                <Button variant="ghost" size="sm" onClick={onRerun} className="gap-2 text-slate-600 dark:text-slate-300">
                  <RefreshCw className="w-4 h-4" />
                  Re-run
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
                {result.sourceVerification.totalSourcesChecked}
              </div>
              <div className="text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400">Sources Checked</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {result.sourceVerification.confirmingSources}
              </div>
              <div className="text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400">Confirming</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400">
                {result.sourceVerification.disputingSources}
              </div>
              <div className="text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400">Disputing</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <FileText className="w-5 h-5 text-secondary" />
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            {result.summary}
          </p>
        </CardContent>
      </Card>

      {/* Sources Checked Section */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Shield className="w-5 h-5 text-secondary" />
              Sources Checked
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Cross-Platform Consistency</span>
              <span className={`font-bold ${
                result.sourceVerification.crossPlatformConsistency >= 70 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : result.sourceVerification.crossPlatformConsistency >= 50 
                  ? "text-amber-600 dark:text-amber-400" 
                  : "text-red-600 dark:text-red-400"
              }`}>
                {result.sourceVerification.crossPlatformConsistency}%
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                result.sourceVerification.crossPlatformConsistency >= 70 
                  ? "bg-emerald-500" 
                  : result.sourceVerification.crossPlatformConsistency >= 50 
                  ? "bg-amber-500" 
                  : "bg-red-500"
              }`}
              style={{ width: `${result.sourceVerification.crossPlatformConsistency}%` }}
            />
          </div>
          <div className="space-y-3">
            {result.sourceVerification.trustedSources.map((source, idx) => (
              <SourceItem key={idx} source={source} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Section */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Brain className="w-5 h-5 text-secondary" />
            AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <ScoreCard 
              label="Language Patterns" 
              score={result.aiAnalysis.languagePatterns.score}
              findings={result.aiAnalysis.languagePatterns.findings}
            />
            <ScoreCard 
              label="Claim Consistency" 
              score={result.aiAnalysis.claimConsistency.score}
              findings={result.aiAnalysis.claimConsistency.findings}
            />
            <ScoreCard 
              label={`Emotional Tone (${result.aiAnalysis.emotionalTone.tone})`}
              score={result.aiAnalysis.emotionalTone.score}
              findings={result.aiAnalysis.emotionalTone.findings}
            />
            <ScoreCard 
              label="Credibility Indicators" 
              score={result.aiAnalysis.credibilityIndicators.score}
              findings={result.aiAnalysis.credibilityIndicators.findings}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <AlertOctagon className="w-5 h-5 text-secondary" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
                  {idx + 1}
                </span>
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex justify-center gap-4 pt-4 pb-8">
        <Button variant="outline" size="lg" onClick={onClear} className="gap-2 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600">
          <RefreshCw className="w-5 h-5" />
          Check Another Article
        </Button>
      </div>
    </motion.div>
  );
};

export default FullReportSection;
