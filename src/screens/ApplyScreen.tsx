import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';
import { ServiceType, SERVICE_LABELS } from '../types';

const SERVICES: ServiceType[] = ['NATIONAL_ID', 'MILITARY_EXEMPTION', 'BIRTH_CERTIFICATE', 'PASSPORT', 'TAX_PAYMENT', 'TRAFFIC_FINE', 'HEALTH_INSURANCE', 'SOCIAL_INSURANCE'];

export default function ApplyScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [selected, setSelected] = useState<ServiceType>(route.params?.serviceType || 'NATIONAL_ID');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const fields: Record<ServiceType, { key: string; label: string }[]> = {
    NATIONAL_ID: [{ key: 'fullNameAr', label: t('Full Name (Arabic)', 'الاسم بالعربية') }, { key: 'birthDate', label: t('Birth Date', 'تاريخ الميلاد') }, { key: 'address', label: t('Address', 'العنوان') }, { key: 'motherName', label: t('Mother Name', 'اسم الأم') }, { key: 'reason', label: t('Reason', 'السبب') }],
    MILITARY_EXEMPTION: [{ key: 'fullNameAr', label: t('Full Name', 'الاسم') }, { key: 'reason', label: t('Reason', 'السبب') }],
    BIRTH_CERTIFICATE: [{ key: 'fullNameAr', label: t('Full Name', 'الاسم') }, { key: 'motherNameAr', label: t('Mother Name', 'اسم الأم') }, { key: 'fatherNameAr', label: t('Father Name', 'اسم الأب') }],
    PASSPORT: [{ key: 'fullNameAr', label: t('Full Name', 'الاسم') }, { key: 'birthDate', label: t('Birth Date', 'تاريخ الميلاد') }],
    TAX_PAYMENT: [{ key: 'taxId', label: t('Tax ID', 'الرقم الضريبي') }, { key: 'amount', label: t('Amount', 'المبلغ') }],
    TRAFFIC_FINE: [{ key: 'plateNumber', label: t('Plate Number', 'رقم اللوحة') }],
    HEALTH_INSURANCE: [{ key: 'fullNameAr', label: t('Full Name', 'الاسم') }, { key: 'dependents', label: t('Number of Dependents', 'عدد المعالين') }],
    SOCIAL_INSURANCE: [{ key: 'employer', label: t('Employer', 'جهة العمل') }, { key: 'salary', label: t('Salary', 'الراتب') }],
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.createApplication({ serviceType: selected, data: formData as any });
      Alert.alert(t('Success', 'تم'), `${t('Application created. Code:', 'تم إنشاء الطلب. الكود:')} ${res.trackingCode}`);
      navigation.navigate('Dashboard');
    } catch (e: any) { Alert.alert('Error', e.message); } finally { setSubmitting(false); }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Select Service', 'اختر الخدمة')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {SERVICES.map(s => (
          <TouchableOpacity key={s} style={[styles.chip, { backgroundColor: selected === s ? colors.accent : colors.card, borderColor: colors.border }]} onPress={() => setSelected(s)}>
            <Text style={{ color: selected === s ? '#fff' : colors.text, fontSize: 13, fontWeight: '600' }}>{SERVICE_LABELS[s][t('en', 'ar') as 'en' | 'ar']}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{SERVICE_LABELS[selected][t('en', 'ar') as 'en' | 'ar']}</Text>
        {(fields[selected] || []).map(f => (
          <TextInput key={f.key} style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]}
            placeholder={f.label} placeholderTextColor={colors.textMuted}
            value={formData[f.key] || ''} onChangeText={v => setFormData(p => ({ ...p, [f.key]: v }))} />
        ))}
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleSubmit} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('Submit', 'تقديم')}</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 8, borderWidth: 1 },
  card: { borderRadius: 16, padding: 20, borderWidth: 1, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  input: { borderRadius: 10, padding: 14, fontSize: 14, marginBottom: 12, borderWidth: 1 },
  btn: { borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
