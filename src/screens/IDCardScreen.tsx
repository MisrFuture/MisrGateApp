import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function IDCardScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MisrGate</Text>
          <Text style={styles.headerSub}>Digital ID Card</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={[styles.value, { color: colors.text }]}>{user.name}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <Text style={styles.label}>National ID</Text>
            <Text style={[styles.value, { color: colors.text }]}>{user.nationalId}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={[styles.value, { color: colors.text }]}>{user.email}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={[styles.value, { color: colors.text }]}>{user.phone}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', borderRadius: 20, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12 },
  header: { backgroundColor: '#c51b29', padding: 24, alignItems: 'center' },
  headerText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: '#fff8', marginTop: 4 },
  body: { backgroundColor: '#fff', padding: 20 },
  row: { paddingVertical: 10 },
  label: { fontSize: 12, color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  value: { fontSize: 16, fontWeight: '600' },
  divider: { height: 1 },
});
