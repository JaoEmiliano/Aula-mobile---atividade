import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import asyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState <{ email: string; name: string } | null >(null);
  const [isLoading, setIsLoading] = useState(true); // Vital para UX!

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await asyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }; 
    loadUser();
  }, []); // executa uma unica vez ao montar o componente para carregar o usuário do AsyncStorage
  const login = async (email: string, name: string) => { 
    const newUser = { email, name};
    setUser(newUser);
    await asyncStorage.setItem("user", JSON.stringify(newUser));
  } //alteracao realizada para armazenar o usuario logado no asyncStorage para persistencia dos dados, alem de receber o nome do usuario para armazenar junto com o email
  const logout = async () => {
    setUser(null); // remove o user do react state
    await asyncStorage.removeItem("user"); // remove o user do AsyncStorage para garantir que ele não seja carregado novamente
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}




