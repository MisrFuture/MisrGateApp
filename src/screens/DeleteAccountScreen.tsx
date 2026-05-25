import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function DeleteAccountScreen() {
  const { colors } = useTheme();
  const { logout } = useAuth();
  const [typed, setTyped] = useState('');

  const handleDelete = async () => {
    if (typed !== 'DELETE') { Alert.alert('Error', 'Type DELETE to confirm'); return; }
    try {
      await api.deleteAccount();
      await logout();
    } catch (e: any) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.accent }]}>Delete Account</Text>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>This action is permanent. Type DELETE to confirm.</Text>
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder="Type DELETE" placeholderTextColor={colors.textMuted} value={typed} onChangeText={setTyped} autoCapitalize="characters" />
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleDelete}>
          <Text style={styles.btnText}>Delete My Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { borderRadius: 16, padding: 24, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  desc: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  input: { borderRadius: 10, padding: 14, fontSize: 15, borderWidth: 1, marginBottom: 12, textAlign: 'center' },
  btn: { borderRadius: 10, padding: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
