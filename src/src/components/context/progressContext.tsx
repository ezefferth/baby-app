import { createContext, useContext, useState, ReactNode } from "react";

// Define o tipo do contexto
interface ProgressContextType {
  progress: number;
  updateProgress: (value: number | ((prev: number) => number)) => void;
}

// Criando o contexto
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Provider que gerencia o progresso global
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<number>(0);

  const updateProgress = (value: number | ((prev: number) => number)) => {
    setProgress((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;
      return Math.min(newValue, 100); // Garante que não ultrapasse 100%
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

// Hook personalizado para acessar o progresso
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress deve ser usado dentro de um ProgressProvider");
  }
  return context;
}
