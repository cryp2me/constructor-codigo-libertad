import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    try {
      setUser(await base44.auth.me());
    } catch {
      setUser(null);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  const logout = () => {
    setUser(null);
    base44.auth.logout("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoadingAuth, checkUserAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
