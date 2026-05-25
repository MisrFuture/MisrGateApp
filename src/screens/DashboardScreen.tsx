import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Application, SERVICE_LABELS, ServiceType } from '../types';

export default function DashboardScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { user } = useAuth();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async () => {
    try {
      const res = await api.getMyApplications();
      setApps(res.applications);
    } catch {} finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const quickActions = [
    { label: t('New Application', 'طلب جديد'), icon: '📄', onPress: () => navigation.navigate('Apply', {}) },
    { label: t('Track', 'تتبع'), icon: '🔍', onPress: () => navigation.navigate('Track', {}) },
    { label: t('Timeline', 'النشاطات'), icon: '📋', onPress: () => navigation.navigate('Timeline') },
    { label: t('Profile', 'الملف'), icon: '👤', onPress: () => navigation.navigate('Profile') },
  ];

  if (loading) return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetch(); }} />}>
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {quickActions.map(q => (
          <TouchableOpacity key={q.label} style={[styles.qaBtn, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={q.onPress}>
            <Text style={{ fontSize: 24 }}>{q.icon}</Text>
            <Text style={[styles.qaLabel, { color: colors.text }]}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('My Applications', 'طلباتي')}</Text>
        {apps.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>{t('No applications yet.', 'لا توجد طلبات بعد.')}</Text>
          </View>
        ) : apps.slice(0, 5).map(app => (
          <TouchableOpacity key={app.id} style={[styles.appCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate('Track', { code: app.trackingCode })}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.appCode, { color: colors.accent }]}>{app.trackingCode}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                {SERVICE_LABELS[app.serviceType as ServiceType]?.[t('en', 'ar') as 'en' | 'ar'] || app.serviceType}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: app.status === 'PENDING' ? '#f59e0b20' : app.status === 'COMPLETED' || app.status === 'APPROVED' ? '#16a34a20' : '#2563eb20' }]}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: app.status === 'PENDING' ? '#f59e0b' : app.status === 'COMPLETED' || app.status === 'APPROVED' ? '#16a34a' : '#2563eb' }}>{app.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 8 },
  qaBtn: { width: '47%', padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', gap: 8, elevation: 1 },
  qaLabel: { fontSize: 13, fontWeight: '600' },
  emptyCard: { padding: 40, borderRadius: 16, borderWidth: 1, alignItems: 'center' },
  appCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  appCode: { fontWeight: '700', fontSize: 14, marginBottom: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
});
