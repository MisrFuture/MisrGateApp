import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, FlatList, TextInput, Modal } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Application, Announcement, ServiceType, SERVICE_LABELS } from '../types';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [trackCode, setTrackCode] = useState('');

  useEffect(() => {
    api.getAnnouncements().then(r => setAnnouncements(r.announcements)).catch(() => {});
    if (user) api.getFavorites().then(r => setFavorites(r.favorites)).catch(() => {});
  }, [user]);

  const services: { key: ServiceType }[] = [
    { key: 'NATIONAL_ID' }, { key: 'MILITARY_EXEMPTION' }, { key: 'BIRTH_CERTIFICATE' }, { key: 'PASSPORT' },
    { key: 'TAX_PAYMENT' }, { key: 'TRAFFIC_FINE' }, { key: 'HEALTH_INSURANCE' }, { key: 'SOCIAL_INSURANCE' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Announcements */}
      {announcements.map(a => (
        <View key={a.id} style={[styles.announcement, { backgroundColor: colors.gold + '18', borderColor: colors.gold }]}>
          <Text style={[styles.announcementTitle, { color: colors.text }]}>{a.title}</Text>
          <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{a.message}</Text>
        </View>
      ))}

      {/* Favorites */}
      {favorites.length > 0 && (
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('Favorite Services', 'الخدمات المفضلة')}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {favorites.map(f => (
              <TouchableOpacity key={f} style={[styles.favChip, { backgroundColor: colors.gold + '20', borderColor: colors.gold }]}
                onPress={() => navigation.navigate('Apply', { serviceType: f })}>
                <Text style={{ fontSize: 13, color: colors.text }}>{SERVICE_LABELS[f as ServiceType]?.[t('en', 'ar') as 'en' | 'ar'] || f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Track Search */}
      <View style={[styles.trackCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('Track Application', 'تتبع معاملة')}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput style={[styles.input, { flex: 1, backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
            placeholder={t('Tracking Code', 'كود التتبع')} placeholderTextColor={colors.textMuted} value={trackCode} onChangeText={setTrackCode} />
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('Track', { code: trackCode })}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>{t('Track', 'تتبع')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Services Grid */}
      <Text style={[styles.sectionTitle, { color: colors.text, paddingHorizontal: 16 }]}>{t('Services', 'الخدمات')}</Text>
      <View style={styles.grid}>
        {services.map(s => {
          const label = SERVICE_LABELS[s.key];
          return (
            <TouchableOpacity key={s.key} style={[styles.serviceCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate('Apply', { serviceType: s.key })}>
              <View style={[styles.serviceDot, { backgroundColor: colors.accent + '15' }]} />
              <Text style={[styles.serviceName, { color: colors.text }]}>{label?.[t('en', 'ar') as 'en' | 'ar'] || s.key}</Text>
              <TouchableOpacity style={{ position: 'absolute', top: 8, right: 8 }} onPress={async () => {
                if (!user) return;
                try {
                  const res = await api.toggleFavorite(s.key);
                  setFavorites(prev => res.favorited ? [...prev, s.key] : prev.filter(f => f !== s.key));
                } catch {}
              }}>
                <Text style={{ fontSize: 18, color: favorites.includes(s.key) ? '#f59e0b' : colors.textMuted }}>★</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  announcement: { margin: 16, marginBottom: 0, padding: 12, borderRadius: 12, borderWidth: 1 },
  announcementTitle: { fontWeight: '600', marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  trackCard: { margin: 16, padding: 16, borderRadius: 16, borderWidth: 1, elevation: 2 },
  input: { borderRadius: 10, padding: 12, fontSize: 14, borderWidth: 1 },
  btn: { borderRadius: 10, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8, gap: 8 },
  serviceCard: { width: '47%', margin: '1.5%', padding: 16, borderRadius: 16, borderWidth: 1, elevation: 1 },
  serviceDot: { width: 40, height: 40, borderRadius: 12, marginBottom: 10 },
  serviceName: { fontSize: 14, fontWeight: '600' },
  favChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
});
