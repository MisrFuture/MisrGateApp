import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function TermsScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>Terms of Service</Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        By using MisrGate, you agree to the following terms and conditions. MisrGate provides an electronic platform
        for accessing government services. All information provided must be accurate and truthful. MisrGate reserves
        the right to suspend or terminate access for violations of these terms. We are not liable for any damages
        arising from the use of this application. These terms may be updated at any time without prior notice.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  text: { fontSize: 14, lineHeight: 22 },
});
