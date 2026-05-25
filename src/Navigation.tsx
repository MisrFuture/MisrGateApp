import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useI18n } from './utils/i18n';

import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import ApplyScreen from './screens/ApplyScreen';
import TrackScreen from './screens/TrackScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ComplaintsScreen from './screens/ComplaintsScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import ProfileScreen from './screens/ProfileScreen';
import TimelineScreen from './screens/TimelineScreen';
import FAQScreen from './screens/FAQScreen';
import DirectoryScreen from './screens/DirectoryScreen';
import AdminScreen from './screens/AdminScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ name, focused, color }: { name: string; focused: boolean; color: string }) {
  const icons: Record<string, string> = { Home: '🏠', Dashboard: '📊', Notifications: '🔔', Settings: '⚙️', Faq: '❓', Directory: '📍' };
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icons[name] || '📄'}</Text>;
}

function MainTabs() {
  const { colors, dark } = useTheme();
  const { t } = useI18n();
  const { user } = useAuth();

  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text, tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border }, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.textMuted }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('Home', 'الرئيسية'), tabBarIcon: (p: any) => <TabIcon name="Home" {...p} /> }} />
      {user && <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: t('Dashboard', 'لوحتي'), tabBarIcon: (p: any) => <TabIcon name="Dashboard" {...p} /> }} />}
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: t('Notifications', 'الإشعارات'), tabBarIcon: (p: any) => <TabIcon name="Notifications" {...p} /> }} />
      <Tab.Screen name="Faq" component={FAQScreen} options={{ title: t('FAQ', 'الأسئلة'), tabBarIcon: (p: any) => <TabIcon name="Faq" {...p} /> }} />
      <Tab.Screen name="Directory" component={DirectoryScreen} options={{ title: t('Directory', 'الدليل'), tabBarIcon: (p: any) => <TabIcon name="Directory" {...p} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('Settings', 'الإعدادات'), tabBarIcon: (p: any) => <TabIcon name="Settings" {...p} /> }} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { user, loading } = useAuth();
  const { colors } = useTheme();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('onboarding_complete').then(val => setOnboarded(val === 'true'));
  }, []);

  if (loading || onboarded === null) return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
  if (!onboarded) return <OnboardingScreen onFinish={() => setOnboarded(true)} />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.card }, headerTintColor: colors.text }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Apply" component={ApplyScreen} options={{ title: 'Apply' }} />
            <Stack.Screen name="Track" component={TrackScreen} options={{ title: 'Track' }} />
            <Stack.Screen name="Complaints" component={ComplaintsScreen} options={{ title: 'Feedback' }} />
            <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{ title: 'Appointments' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
            <Stack.Screen name="Timeline" component={TimelineScreen} options={{ title: 'Timeline' }} />
            {user.role === 'ADMIN' && <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin' }} />}
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
