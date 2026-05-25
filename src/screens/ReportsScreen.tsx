import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';

export default function ReportsScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminGetReport().then(r => setReport(r.report)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Reports', 'التقارير')}</Text>
      {report && (
        <>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statVal, { color: colors.accent }]}>{report.totalApplications}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('Total Apps', 'الطلبات')}</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statVal, { color: colors.blue }]}>{report.totalUsers}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t('Total Users', 'المستخدمون')}</Text>
            </View>
          </View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('By Status', 'حسب الحالة')}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            {Object.entries(report.byStatus || {}).map(([k, v]) => (
              <View key={k} style={[styles.smallCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.smallVal, { color: colors.text }]}>{v as number}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 11 }}>{k}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('By Service', 'حسب الخدمة')}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {Object.entries(report.byService || {}).map(([k, v]) => (
              <View key={k} style={[styles.smallCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.smallVal, { color: colors.text }]}>{v as number}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 11 }}>{k}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  statCard: { width: '46%', padding: 20, borderRadius: 16, borderWidth: 1, alignItems: 'center' },
  statVal: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 13, marginTop: 4 },
  smallCard: { padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', minWidth: 80 },
  smallVal: { fontSize: 18, fontWeight: '700' },
});
