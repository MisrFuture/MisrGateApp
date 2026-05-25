import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';

const DEPARTMENTS = [
  { en: 'National ID & Civil Registry', ar: 'الأحوال المدنية', phone: '15999', hoursEn: 'Sun-Thu 8AM-3PM', hoursAr: 'الأحد-الخميس 8ص-3م' },
  { en: 'Passport Office', ar: 'مكتب الجوازات', phone: '15999', hoursEn: 'Sun-Thu 8AM-6PM', hoursAr: 'الأحد-الخميس 8ص-6م' },
  { en: 'Traffic Department', ar: 'إدارة المرور', phone: '136', hoursEn: 'Sun-Thu 7:30AM-2:30PM', hoursAr: 'الأحد-الخميس 7:30ص-2:30م' },
  { en: 'Tax Authority', ar: 'مصلحة الضرائب', phone: '16395', hoursEn: 'Sun-Thu 8AM-3PM', hoursAr: 'الأحد-الخميس 8ص-3م' },
  { en: 'Health Insurance Authority', ar: 'هيئة التأمين الصحي', phone: '16775', hoursEn: 'Sun-Thu 8AM-2PM', hoursAr: 'الأحد-الخميس 8ص-2م' },
  { en: 'Social Insurance Authority', ar: 'هيئة التأمينات الاجتماعية', phone: '16777', hoursEn: 'Sun-Thu 8AM-2PM', hoursAr: 'الأحد-الخميس 8ص-2م' },
  { en: 'Military Recruitment Office', ar: 'مكتب التجنيد', phone: '146', hoursEn: 'Sun-Thu 8AM-2PM', hoursAr: 'الأحد-الخميس 8ص-2م' },
  { en: 'Citizen Service Center', ar: 'مركز خدمة المواطن', phone: '15377', hoursEn: 'Sun-Thu 8AM-8PM', hoursAr: 'الأحد-الخميس 8ص-8م' },
];

export default function DirectoryScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Service Directory', 'دليل الخدمات')}</Text>
      {DEPARTMENTS.map((d, i) => (
        <View key={i} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.name, { color: colors.accent }]}>{t(d.en, d.ar)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}><Text style={{ fontSize: 16 }}>📞</Text><Text style={{ color: colors.text, fontSize: 14 }}>{d.phone}</Text></View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}><Text style={{ fontSize: 16 }}>🕐</Text><Text style={{ color: colors.textSecondary, fontSize: 13 }}>{t(d.hoursEn, d.hoursAr)}</Text></View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, title: { fontSize: 22, fontWeight: '700', marginBottom: 16 }, card: { borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 12 }, name: { fontWeight: '700', fontSize: 15 } });
