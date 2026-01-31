import { useState } from "react";
import { Plus, Clock, History, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  type: "url" | "text";
}

// Mock history data - in production this would come from localStorage or backend
const mockHistory: SearchHistoryItem[] = [
  {
    id: "1",
    query: "https://news.example.com/breaking-story-2024",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    type: "url",
  },
  {
    id: "2",
    query: "Government announces new climate policy measures for 2025",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    type: "text",
  },
  {
    id: "3",
    query: "https://dailynews.com/tech-breakthrough",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "url",
  },
  {
    id: "4",
    query: "Scientists discover high water content in Mars samples",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "text",
  },
  {
    id: "5",
    query: "https://worldreport.org/economy-update",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    type: "url",
  },
];

interface RecentSearchesPanelProps {
  onSelectHistory?: (query: string) => void;
  onNewProject?: () => void;
}

const RecentSearchesPanel = ({ onSelectHistory, onNewProject }: RecentSearchesPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [history] = useState<SearchHistoryItem[]>(mockHistory);

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  const shortenQuery = (query: string, maxLength: number = 35): string => {
    if (query.length <= maxLength) return query;
    
    // For URLs, try to extract the domain and path
    if (query.startsWith("http")) {
      try {
        const url = new URL(query);
        const shortPath = url.pathname.length > 20 
          ? url.pathname.substring(0, 20) + "..." 
          : url.pathname;
        return `${url.hostname}${shortPath}`;
      } catch {
        return query.substring(0, maxLength) + "...";
      }
    }
    
    return query.substring(0, maxLength) + "...";
  };

  const handleSelectItem = (item: SearchHistoryItem) => {
    onSelectHistory?.(item.query);
    setIsOpen(false);
  };

  const handleNewProject = () => {
    onNewProject?.();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <History className="w-5 h-5" />
          {history.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {history.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-80 p-0 bg-card/95 backdrop-blur-xl border-border/50"
        sideOffset={8}
      >
        <div className="p-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">Recent Searches</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewProject}
              className="h-8 gap-1.5 text-xs hover:bg-secondary/20"
            >
              <Plus className="w-4 h-4" />
              New Analysis
            </Button>
          </div>
        </div>

        <ScrollArea className="max-h-[320px]">
          <AnimatePresence>
            {history.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent searches</p>
                <p className="text-xs mt-1">Your analysis history will appear here</p>
              </div>
            ) : (
              <div className="p-2">
                {history.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectItem(item)}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {item.type === "url" ? (
                          <ExternalLink className="w-4 h-4 text-secondary" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-secondary transition-colors">
                          {shortenQuery(item.query)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatTimestamp(item.timestamp)}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>

        {history.length > 0 && (
          <div className="p-2 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-foreground"
            >
              Clear History
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default RecentSearchesPanel;
