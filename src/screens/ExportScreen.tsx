import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { exportUserData } from '../utils/export';
import { api } from '../api/client';

export default function ExportScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const profile = await api.getProfile();
      await exportUserData({ user: profile.user, exportedAt: new Date().toISOString() });
    } catch (e: any) { Alert.alert('Error', e.message); }
    finally { setLoading(false); }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Export My Data</Text>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>Download a copy of your MisrGate data as JSON.</Text>
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleExport} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Export Data</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { borderRadius: 16, padding: 24, borderWidth: 1, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  desc: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  btn: { borderRadius: 10, paddingHorizontal: 32, paddingVertical: 14, minWidth: 160, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
