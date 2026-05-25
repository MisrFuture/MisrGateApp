import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { I18nProvider } from './src/utils/i18n';
import Navigation from './src/Navigation';
import SplashScreen from './src/screens/SplashScreen';

function AppContent() {
  const { dark } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

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
