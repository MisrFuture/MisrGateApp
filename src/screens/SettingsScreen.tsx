import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { promptRateApp } from '../utils/rate';
import { shareApp } from '../utils/share';

export default function SettingsScreen() {
  const { colors, dark, toggle } = useTheme();
  const { t, lang, toggle: toggleLang } = useI18n();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Settings', 'الإعدادات')}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.row}>
          <Text style={{ color: colors.text, fontSize: 15 }}>{t('Dark Mode', 'الوضع الليلي')}</Text>
          <TouchableOpacity onPress={toggle} style={[styles.switch, { backgroundColor: dark ? colors.accent : colors.border }]}>
            <View style={[styles.switchDot, { marginLeft: dark ? 22 : 2 }]} />
          </TouchableOpacity>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.row}>
          <Text style={{ color: colors.text, fontSize: 15 }}>{t('Language', 'اللغة')}</Text>
          <TouchableOpacity onPress={toggleLang} style={[styles.langBtn, { borderColor: colors.border }]}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{lang === 'en' ? '🇪🇬 العربية' : '🇬🇧 English'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.row}>
          <Text style={{ color: colors.text, fontSize: 15 }}>{t('Rate App', 'تقييم التطبيق')}</Text>
          <TouchableOpacity onPress={promptRateApp} style={[styles.langBtn, { borderColor: colors.border }]}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>⭐</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.row}>
          <Text style={{ color: colors.text, fontSize: 15 }}>{t('Share App', 'مشاركة التطبيق')}</Text>
          <TouchableOpacity onPress={shareApp} style={[styles.langBtn, { borderColor: colors.border }]}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 16 }]}>
        <Text style={[styles.version, { color: colors.textMuted }]}>MisrGate v1.0.0</Text>
        <Text style={{ color: colors.textMuted, fontSize: 12, textAlign: 'center' }}>{t('E-Government Mobile Portal', 'بوابة الخدمات الحكومية المتنقلة')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, title: { fontSize: 22, fontWeight: '700', marginBottom: 16 }, card: { borderRadius: 16, padding: 16, borderWidth: 1 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }, switch: { width: 46, height: 26, borderRadius: 13, justifyContent: 'center' }, switchDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' }, divider: { height: 1, marginVertical: 4 }, langBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1 }, version: { fontSize: 13, textAlign: 'center', marginBottom: 4 } });
