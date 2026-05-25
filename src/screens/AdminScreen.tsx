import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, TextInput, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';

export default function AdminScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [tab, setTab] = useState<'overview' | 'apps' | 'announcements'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [annForm, setAnnForm] = useState({ title: '', message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.adminGetStats(), api.adminGetApplications(), api.adminGetAnnouncements()])
      .then(([s, a, an]) => { setStats(s.stats); setApps(a.applications); setAnnouncements(an.announcements); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={{ flexDirection: 'row', padding: 12, gap: 8 }}>
        {(['overview', 'apps', 'announcements'] as const).map(t => (
          <TouchableOpacity key={t} style={[styles.tab, { backgroundColor: tab === t ? colors.accent : colors.card, borderColor: colors.border }]} onPress={() => setTab(t)}>
            <Text style={{ color: tab === t ? '#fff' : colors.text, fontWeight: '600', fontSize: 13 }}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'overview' && stats && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 12 }}>
          {[['📊', t('Total Apps', 'الطلبات'), stats.totalApplications], ['👥', t('Users', 'المستخدمون'), stats.totalUsers]].map(([icon, label, val]) => (
            <View key={label as string} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={{ fontSize: 24 }}>{icon as string}</Text>
              <Text style={[styles.statVal, { color: colors.text }]}>{val as number}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{label as string}</Text>
            </View>
          ))}
          {Object.entries(stats.byStatus || {}).map(([k, v]) => (
            <View key={k} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statVal, { color: colors.text, fontSize: 18 }]}>{v as number}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{k}</Text>
            </View>
          ))}
        </View>
      )}

      {tab === 'apps' && apps.map(a => (
        <View key={a.id} style={[styles.appCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.appCode, { color: colors.accent }]}>{a.trackingCode}</Text>
          <Text style={{ color: colors.textSecondary }}>{a.serviceType} - {a.status}</Text>
        </View>
      ))}

      {tab === 'announcements' && (
        <View style={{ padding: 12 }}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('Title', 'العنوان')} placeholderTextColor={colors.textMuted} value={annForm.title} onChangeText={v => setAnnForm(p => ({ ...p, title: v }))} />
            <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border, minHeight: 80 }]} placeholder={t('Message', 'الرسالة')} placeholderTextColor={colors.textMuted} value={annForm.message} onChangeText={v => setAnnForm(p => ({ ...p, message: v }))} multiline />
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={async () => {
              if (!annForm.title || !annForm.message) { Alert.alert('Error', 'Fill all fields'); return; }
              await api.adminCreateAnnouncement(annForm);
              setAnnForm({ title: '', message: '' });
              const an = await api.adminGetAnnouncements();
              setAnnouncements(an.announcements);
            }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>{t('Publish', 'نشر')}</Text>
            </TouchableOpacity>
          </View>
          {announcements.map(a => (
            <View key={a.id} style={[styles.card, { backgroundColor: a.active ? colors.card : colors.input, borderColor: colors.border, marginTop: 8 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '600', color: colors.text, flex: 1 }}>{a.title}</Text>
                <TouchableOpacity onPress={async () => { await api.adminDeleteAnnouncement(a.id); setAnnouncements(prev => prev.filter(x => x.id !== a.id)); }}>
                  <Text style={{ color: colors.accent }}>🗑</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{a.message}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, tab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1 }, statCard: { width: '46%', padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', gap: 4 }, statVal: { fontSize: 24, fontWeight: '700' }, appCard: { margin: 12, marginBottom: 0, padding: 14, borderRadius: 12, borderWidth: 1 }, appCode: { fontWeight: '700' }, card: { borderRadius: 16, padding: 16, borderWidth: 1 }, input: { borderRadius: 10, padding: 12, fontSize: 14, borderWidth: 1, marginBottom: 8 }, btn: { borderRadius: 10, padding: 14, alignItems: 'center' } });
