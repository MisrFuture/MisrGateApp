import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try { /* await api.updateProfile({ name, phone }); */ Alert.alert(t('Success', 'تم'), t('Profile updated!', 'تم التحديث!')); }
    catch (e: any) { Alert.alert('Error', e.message); } finally { setSaving(false); }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.avatar, { backgroundColor: colors.accent }]}><Text style={{ color: '#fff', fontSize: 32, fontWeight: '700' }}>{user?.name?.charAt(0)?.toUpperCase()}</Text></View>
      <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
      <Text style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 24 }}>{user?.email}</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('Name', 'الاسم')}</Text>
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} value={name} onChangeText={setName} />
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('Phone', 'الهاتف')}</Text>
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('Save', 'حفظ')}</Text>}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.logoutBtn, { borderColor: colors.accent }]} onPress={logout}>
        <Text style={{ color: colors.accent, fontWeight: '600' }}>{t('Logout', 'تسجيل خروج')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, avatar: { width: 80, height: 80, borderRadius: 40, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }, name: { fontSize: 22, fontWeight: '700', textAlign: 'center' }, card: { borderRadius: 16, padding: 20, borderWidth: 1, elevation: 2 }, label: { fontSize: 13, marginBottom: 4, marginTop: 8 }, input: { borderRadius: 10, padding: 14, fontSize: 14, marginBottom: 12, borderWidth: 1 }, btn: { borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 8 }, btnText: { color: '#fff', fontSize: 16, fontWeight: '600' }, logoutBtn: { marginTop: 24, padding: 16, borderRadius: 12, borderWidth: 1.5, alignItems: 'center' } });
