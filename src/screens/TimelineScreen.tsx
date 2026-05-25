import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';

export default function TimelineScreen() {
  const { colors } = useTheme();
  const { t, isRtl } = useI18n();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.getTimeline().then(r => setEvents(r.events)).catch(() => {}).finally(() => setLoading(false)); }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('My Activity Timeline', 'النشاطات الحديثة')}</Text>
      {events.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={{ color: colors.textMuted, textAlign: 'center' }}>{t('No activity yet.', 'لا توجد نشاطات بعد.')}</Text>
        </View>
      ) : events.map((e, i) => (
        <View key={e.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row', marginBottom: 12 }}>
          <View style={[styles.dot, { backgroundColor: e.type === 'application' ? colors.blue : e.type === 'appointment' ? colors.green : e.type === 'complaint' ? colors.accent : '#f59e0b' }]} />
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, flex: 1, marginLeft: isRtl ? 0 : 12, marginRight: isRtl ? 12 : 0 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text style={[styles.eventTitle, { color: colors.text }]}>{e.title}</Text>
              <View style={[styles.badge, { backgroundColor: e.status === 'COMPLETED' || e.status === 'APPROVED' ? '#16a34a20' : '#f59e0b20' }]}>
                <Text style={{ fontSize: 10, color: e.status === 'COMPLETED' || e.status === 'APPROVED' ? '#16a34a' : '#f59e0b', fontWeight: '600' }}>{e.status}</Text>
              </View>
            </View>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{e.description}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 4 }}>{new Date(e.date).toLocaleDateString()}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, title: { fontSize: 22, fontWeight: '700', marginBottom: 16 }, emptyCard: { padding: 40, borderRadius: 16, borderWidth: 1 }, dot: { width: 12, height: 12, borderRadius: 6, marginTop: 16 }, card: { borderRadius: 12, padding: 14, borderWidth: 1 }, eventTitle: { fontWeight: '600', fontSize: 14, flex: 1 }, badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 } });
