import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { AnalysisResult } from "@/hooks/useNewsAnalysis";

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  type: "url" | "text";
  result?: AnalysisResult;
}

interface SearchHistoryContextType {
  history: SearchHistoryItem[];
  addToHistory: (query: string, result?: AnalysisResult) => string;
  updateHistoryResult: (id: string, result: AnalysisResult) => void;
  clearHistory: () => void;
  selectedHistoryItem: SearchHistoryItem | null;
  setSelectedHistoryItem: (item: SearchHistoryItem | null) => void;
  getHistoryItemById: (id: string) => SearchHistoryItem | undefined;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

// No mock history - start fresh
const initialHistory: SearchHistoryItem[] = [];

export const SearchHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>(initialHistory);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<SearchHistoryItem | null>(null);

  const addToHistory = useCallback((query: string, result?: AnalysisResult): string => {
    const isUrl = query.startsWith("http://") || query.startsWith("https://");
    const id = Date.now().toString();
    const newItem: SearchHistoryItem = {
      id,
      query,
      timestamp: new Date(),
      type: isUrl ? "url" : "text",
      result,
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 9)]); // Keep last 10 items
    return id;
  }, []);

  const updateHistoryResult = useCallback((id: string, result: AnalysisResult) => {
    setHistory((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, result } : item
      )
    );
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getHistoryItemById = useCallback((id: string) => {
    return history.find((item) => item.id === id);
  }, [history]);

  return (
    <SearchHistoryContext.Provider
      value={{ 
        history, 
        addToHistory, 
        updateHistoryResult,
        clearHistory, 
        selectedHistoryItem, 
        setSelectedHistoryItem,
        getHistoryItemById
      }}
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
