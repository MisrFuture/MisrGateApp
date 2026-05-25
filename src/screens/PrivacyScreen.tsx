import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Your privacy is important to us. MisrGate collects only the information necessary to provide government
        services, including your name, email, national ID, and phone number. Your data is encrypted and stored
        securely. We do not share your personal information with third parties except as required by law. You
        may request deletion of your account and associated data at any time. For questions, contact our support team.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  text: { fontSize: 14, lineHeight: 22 },
});
