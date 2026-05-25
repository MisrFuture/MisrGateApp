import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const numbers = [
  { label: 'Police', number: '122', color: '#2563eb' },
  { label: 'Ambulance', number: '123', color: '#16a34a' },
  { label: 'Fire', number: '180', color: '#dc2626' },
  { label: 'Traffic Police', number: '136', color: '#d97706' },
  { label: 'Tourist Police', number: '126', color: '#7c3aed' },
  { label: 'Civil Defense', number: '180', color: '#dc2626' },
];

export default function EmergencyScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>Emergency Numbers</Text>
      {numbers.map((n, i) => (
        <TouchableOpacity key={i} style={[styles.card, { backgroundColor: n.color }]} onPress={() => Linking.openURL(`tel:${n.number}`)}>
          <Text style={styles.label}>{n.label}</Text>
          <Text style={styles.number}>{n.number}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: { borderRadius: 16, padding: 24, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3 },
  label: { fontSize: 20, fontWeight: '700', color: '#fff' },
  number: { fontSize: 28, fontWeight: '800', color: '#fff' },
});
