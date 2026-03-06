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
  }, []);
  const login = async (email: string) => { 
    const newUser = { email, name: "Allan Silva" };
    setUser(newUser);
    await asyncStorage.setItem("user", JSON.stringify(newUser));
  }

  const logout = async () => {
    setUser(null);
    await asyncStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}




