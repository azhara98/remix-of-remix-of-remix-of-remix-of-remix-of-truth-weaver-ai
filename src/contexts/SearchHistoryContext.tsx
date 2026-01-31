import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  type: "url" | "text";
}

interface SearchHistoryContextType {
  history: SearchHistoryItem[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  selectedQuery: string | null;
  setSelectedQuery: (query: string | null) => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

// Mock initial history
const initialHistory: SearchHistoryItem[] = [
  {
    id: "1",
    query: "https://news.example.com/breaking-story-2024",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "url",
  },
  {
    id: "2",
    query: "Government announces new climate policy measures for 2025",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "text",
  },
  {
    id: "3",
    query: "https://dailynews.com/tech-breakthrough",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: "url",
  },
  {
    id: "4",
    query: "Scientists discover high water content in Mars samples",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    type: "text",
  },
  {
    id: "5",
    query: "https://worldreport.org/economy-update",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    type: "url",
  },
];

export const SearchHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>(initialHistory);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const addToHistory = useCallback((query: string) => {
    const isUrl = query.startsWith("http://") || query.startsWith("https://");
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query,
      timestamp: new Date(),
      type: isUrl ? "url" : "text",
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 9)]); // Keep last 10 items
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <SearchHistoryContext.Provider
      value={{ history, addToHistory, clearHistory, selectedQuery, setSelectedQuery }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error("useSearchHistory must be used within a SearchHistoryProvider");
  }
  return context;
};
