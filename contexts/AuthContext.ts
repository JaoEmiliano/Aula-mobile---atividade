// src/contexts/AuthContext.js
import { createContext } from "react";

// Criamos o contexto vazio (será preenchido pelo Provider)
export const AuthContext = createContext({});

interface AuthContextType {
  user: { email: string; name: string } | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}