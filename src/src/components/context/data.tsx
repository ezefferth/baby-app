import { createContext, useState, ReactNode } from "react";

// Define o tipo do contexto
interface DataContextType {
  name: string;
  surname: string;
  parentesco: string;
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setParentesco: (parentesco: string) => void;
}

// Cria o contexto com valor inicial indefinido
export const DataContext = createContext({} as DataContextType);

// Define as propriedades aceitas pelo Provider
interface DataProviderProps {
  children: ReactNode;
}

// Provider que gerencia os dados do usuário
export function DataProvider({ children }: DataProviderProps) {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [parentesco, setParentesco] = useState<string>("");

  return (
    <DataContext.Provider
      value={{ name, surname, parentesco, setName, setSurname, setParentesco }}
    >
      {children}
    </DataContext.Provider>
  );
}
