import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { SERVICE_LABELS, ServiceType } from '../types';

const FAQS: { service: ServiceType; q: { en: string; ar: string }; a: { en: string; ar: string } }[] = [
  { service: 'NATIONAL_ID', q: { en: 'How long does it take to renew?', ar: 'كم يستغرق التجديد؟' }, a: { en: '7-14 business days.', ar: 'من 7-14 يوم عمل.' } },
  { service: 'NATIONAL_ID', q: { en: 'What documents are needed for lost card?', ar: 'مستندات بدل فاقد؟' }, a: { en: 'Police report, birth certificate, photos.', ar: 'محضر شرطة، شهادة ميلاد، صور شخصية.' } },
  { service: 'PASSPORT', q: { en: 'How long is passport valid?', ar: 'مدة صلاحية الجواز؟' }, a: { en: '7 years for adults, 5 for minors.', ar: '7 سنوات للبالغين، 5 للأطفال.' } },
  { service: 'PASSPORT', q: { en: 'Can I renew online?', ar: 'هل يمكن التجديد عبر الإنترنت؟' }, a: { en: 'Yes, through this app.', ar: 'نعم، عبر هذا التطبيق.' } },
  { service: 'BIRTH_CERTIFICATE', q: { en: 'How to get certified copy?', ar: 'كيف أحصل على نسخة معتمدة؟' }, a: { en: 'Submit request, delivery in 3-5 days.', ar: 'قدم طلباً، التسليم خلال 3-5 أيام.' } },
  { service: 'HEALTH_INSURANCE', q: { en: 'How to register?', ar: 'كيف أسجل؟' }, a: { en: 'Fill the form with personal details.', ar: 'املأ النموذج بالبيانات الشخصية.' } },
];

export default function FAQScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();

  const grouped: Record<string, typeof FAQS> = {};
  FAQS.forEach(faq => { if (!grouped[faq.service]) grouped[faq.service] = []; grouped[faq.service].push(faq); });

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('FAQ', 'الأسئلة الشائعة')}</Text>
      {Object.entries(grouped).map(([svc, faqs]) => (
        <View key={svc} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.svcTitle, { color: colors.accent }]}>{SERVICE_LABELS[svc as ServiceType]?.[t('en', 'ar') as 'en' | 'ar'] || svc}</Text>
          {faqs.map((faq, i) => (
            <View key={i} style={{ paddingVertical: 8, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: colors.border }}>
              <Text style={{ fontWeight: '600', color: colors.text, fontSize: 14 }}>{t(faq.q.en, faq.q.ar)}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>{t(faq.a.en, faq.a.ar)}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, title: { fontSize: 22, fontWeight: '700', marginBottom: 16 }, card: { borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 12 }, svcTitle: { fontWeight: '700', fontSize: 15, marginBottom: 4 } });
