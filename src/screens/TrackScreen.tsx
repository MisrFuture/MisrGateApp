import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';

export default function TrackScreen({ route }: any) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [code, setCode] = useState(route.params?.code || '');
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!code) return;
    setLoading(true);
    try { const res = await api.trackApplication(code); setApp(res); }
    catch (e: any) { setApp(null); alert(e.message); } finally { setLoading(false); }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Track Application', 'تتبع معاملة')}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput style={[styles.input, { flex: 1, backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
            placeholder={t('Enter tracking code', 'أدخل كود التتبع')} placeholderTextColor={colors.textMuted} value={code} onChangeText={setCode} />
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleTrack} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '600' }}>{t('Track', 'تتبع')}</Text>}
          </TouchableOpacity>
        </View>
      </View>

      {app && (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 16 }]}>
          <Text style={[styles.code, { color: colors.accent }]}>{app.trackingCode}</Text>
          <View style={[styles.statusBadge, { backgroundColor: app.status === 'PENDING' ? '#f59e0b20' : '#16a34a20', alignSelf: 'flex-start' }]}>
            <Text style={{ color: app.status === 'PENDING' ? '#f59e0b' : '#16a34a', fontWeight: '600' }}>{app.status}</Text>
          </View>
          <Text style={{ color: colors.textSecondary, marginTop: 8 }}>{t('Service:', 'الخدمة:')} {app.serviceType}</Text>
          <Text style={{ color: colors.textSecondary }}>{t('Date:', 'التاريخ:')} {new Date(app.createdAt).toLocaleDateString()}</Text>
          {app.statusHistory?.map((h: any) => (
            <View key={h.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: colors.accent }}>
              <View><Text style={{ fontWeight: '600', fontSize: 13 }}>{h.status}</Text><Text style={{ fontSize: 11, color: colors.textMuted }}>{new Date(h.createdAt).toLocaleDateString()}</Text></View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: { borderRadius: 16, padding: 16, borderWidth: 1, elevation: 2 },
  input: { borderRadius: 10, padding: 12, fontSize: 14, borderWidth: 1 },
  btn: { borderRadius: 10, paddingHorizontal: 20, justifyContent: 'center' },
  code: { fontWeight: '700', fontSize: 18, marginBottom: 8 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
});
