import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';

const offices = [
  { en: 'Civil Registry', ar: 'الأحوال المدنية', distance: '1.2 km away' },
  { en: 'Passport Office', ar: 'مكتب الجوازات', distance: '2.3 km away' },
  { en: 'Traffic Department', ar: 'إدارة المرور', distance: '3.5 km away' },
  { en: 'Tax Authority', ar: 'مصلحة الضرائب', distance: '0.8 km away' },
  { en: 'Health Insurance Authority', ar: 'هيئة التأمين الصحي', distance: '4.1 km away' },
  { en: 'Social Insurance Authority', ar: 'هيئة التأمينات الاجتماعية', distance: '2.7 km away' },
  { en: 'Military Recruitment Office', ar: 'مكتب التجنيد', distance: '5.0 km away' },
  { en: 'Citizen Service Center', ar: 'مركز خدمة المواطن', distance: '1.5 km away' },
];

export default function NearbyOfficesScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Nearby Offices', 'المكاتب القريبة')}</Text>
      {offices.map((o, i) => (
        <View key={i} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.name, { color: colors.text }]}>{t(o.en, o.ar)}</Text>
            <View style={[styles.badge, { backgroundColor: colors.green + '20' }]}>
              <Text style={[styles.distance, { color: colors.green }]}>{o.distance}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: { borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontWeight: '600', fontSize: 15, flex: 1 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  distance: { fontSize: 12, fontWeight: '600' },
});
