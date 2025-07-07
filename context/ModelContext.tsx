"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModelContextType = {
  selectedModel: string;
  setSelectedModel: (value: string) => void;
};

const ModelContext = createContext<ModelContextType | null>(null);

export function useModel() {
  const context = useContext(ModelContext);
  if (!context) throw new Error("useModel must be used within a ModelProvider");
  return context;
}

export function ModelProvider({ children }: { children: ReactNode }) {
  const [selectedModel, setSelectedModel] = useState("");

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
}
