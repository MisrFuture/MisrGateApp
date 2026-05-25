import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api/client';
import { User } from '../types';
import { registerForPushNotifications } from '../utils/notifications';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string; nationalId: string; phone: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getToken().then(async (token) => {
      if (token) {
        try {
          const res = await api.getProfile();
          setUser(res.user);
        } catch { await api.clearToken(); }
      }
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    await api.setToken(res.token);
    setUser(res.user);
    registerForPushNotifications();
  };

  const register = async (data: { email: string; password: string; name: string; nationalId: string; phone: string }) => {
    const res = await api.register(data);
    await api.setToken(res.token);
    setUser(res.user);
    registerForPushNotifications();
  };

  const logout = async () => {
    try { await api.logout(); } catch {}
    await api.clearToken();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
