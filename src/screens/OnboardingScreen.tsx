import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const pages = [
  { title: 'Welcome to MisrGate', subtitle: 'Your gateway to Egyptian government services', color: '#c51b29' },
  { title: 'All Services in One Place', subtitle: 'Access civil registry, passports, taxes and more', color: '#2563eb' },
  { title: 'Get Started', subtitle: 'Sign in to start using all features', color: '#16a34a' },
];

export default function OnboardingScreen({ onFinish }: { onFinish: () => void }) {
  const [page, setPage] = useState(0);
  const { colors } = useTheme();

  const handleNext = async () => {
    if (page < pages.length - 1) {
      setPage(page + 1);
    } else {
      await AsyncStorage.setItem('onboarding_complete', 'true');
      onFinish();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: pages[page].color }]}>
          <Text style={styles.pageTitle}>{pages[page].title}</Text>
          <Text style={styles.pageSub}>{pages[page].subtitle}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.dots}>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i === page ? colors.accent : colors.border }]} />
          ))}
        </View>
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleNext}>
          <Text style={styles.btnText}>{page < pages.length - 1 ? 'Next' : 'Get Started'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: width * 0.8, padding: 40, borderRadius: 24, alignItems: 'center' },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 12 },
  pageSub: { fontSize: 15, color: '#fff8', textAlign: 'center', lineHeight: 22 },
  footer: { paddingHorizontal: 24, paddingBottom: 48, alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  btn: { paddingHorizontal: 40, paddingVertical: 14, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
