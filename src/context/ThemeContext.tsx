import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  dark: boolean;
  toggle: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  bg: '#f1f5f9', card: '#ffffff', text: '#0f172a', textSecondary: '#475569', textMuted: '#94a3b8',
  accent: '#c51b29', border: '#e2e8f0', input: '#f8fafc', gold: '#c5a059', green: '#16a34a', blue: '#2563eb',
};

const darkColors = {
  bg: '#0f172a', card: '#1e293b', text: '#f1f5f9', textSecondary: '#94a3b8', textMuted: '#64748b',
  accent: '#ef4444', border: '#334155', input: '#1e293b', gold: '#f59e0b', green: '#22c55e', blue: '#3b82f6',
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('misrgate_theme').then(saved => {
      if (saved) setDark(saved === 'dark');
      else setDark(system === 'dark');
    });
  }, []);

  const toggle = () => {
    setDark(prev => { AsyncStorage.setItem('misrgate_theme', !prev ? 'dark' : 'light'); return !prev; });
  };

  return <ThemeContext.Provider value={{ dark, toggle, colors: dark ? darkColors : lightColors }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
