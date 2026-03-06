// src/contexts/AuthContext.js
import { createContext } from "react";

// Criamos o contexto vazio (será preenchido pelo Provider)
export const AuthContext = createContext({});

interface AuthContextType {
  user: { email: string; name: string } | null;
  login: (email: string, name: string) => Promise<void>; // foi add promise para refletir a natureza assíncrona do login
  logout: () => void;
  isLoading: boolean;
}