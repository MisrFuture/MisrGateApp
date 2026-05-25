import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { I18nProvider } from './src/utils/i18n';
import Navigation from './src/Navigation';

function AppContent() {
  const { dark } = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
