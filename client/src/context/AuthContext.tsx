import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest, setAuthToken, removeAuthToken, getAuthToken } from "../utils/api";

export interface User {
  id: string;
  name: string;
  nameAm?: string;
  email: string;
  phone: string;
  role: "buyer" | "seller" | "admin";
  city?: string;
  subCity?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await apiRequest("/auth/me");
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        removeAuthToken();
        setUser(null);
      }
    } catch {
      removeAuthToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password: pass })
    });
    if (res.success && res.token) {
      setAuthToken(res.token);
      setUser(res.user);
    }
  };

  const register = async (data: any) => {
    const res = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (res.success && res.token) {
      setAuthToken(res.token);
      setUser(res.user);
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
