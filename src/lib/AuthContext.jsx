import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, supabase } from "@/api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const checkUserAuth = useCallback(async () => {
    try {
      setUser(await api.auth.me());
    } catch {
      setUser(null);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkUserAuth();
    const { data } = supabase.auth.onAuthStateChange(() => checkUserAuth());
    return () => data.subscription.unsubscribe();
  }, [checkUserAuth]);

  const logout = () => {
    setUser(null);
    api.auth.logout("/login");
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
