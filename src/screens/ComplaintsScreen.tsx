import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';
import { COMPLAINT_CATEGORIES } from '../types';

export default function ComplaintsScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [category, setCategory] = useState('SERVICE_QUALITY');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !message) { Alert.alert('Error', 'Please fill all fields'); return; }
    setSubmitting(true);
    try { await api.createComplaint({ category, subject, message }); setSuccess(true); setSubject(''); setMessage(''); }
    catch (e: any) { Alert.alert('Error', e.message); } finally { setSubmitting(false); }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Submit Feedback', 'تقديم شكوى أو اقتراح')}</Text>
      {success && <View style={{ padding: 12, backgroundColor: '#16a34a20', borderRadius: 10, marginBottom: 12 }}><Text style={{ color: '#16a34a', fontWeight: '600' }}>{t('Submitted successfully!', 'تم الإرسال بنجاح!')}</Text></View>}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={{ color: colors.textSecondary, marginBottom: 8, fontSize: 13 }}>{t('Category', 'التصنيف')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {COMPLAINT_CATEGORIES.map(c => (
            <TouchableOpacity key={c.key} style={[styles.chip, { backgroundColor: category === c.key ? colors.accent : colors.input, borderColor: colors.border }]} onPress={() => setCategory(c.key)}>
              <Text style={{ color: category === c.key ? '#fff' : colors.text, fontSize: 12 }}>{t(c.en, c.ar)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('Subject', 'الموضوع')} placeholderTextColor={colors.textMuted} value={subject} onChangeText={setSubject} />
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border, minHeight: 100, textAlignVertical: 'top' }]} placeholder={t('Message', 'الرسالة')} placeholderTextColor={colors.textMuted} value={message} onChangeText={setMessage} multiline />
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleSubmit} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('Submit', 'إرسال')}</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, title: { fontSize: 22, fontWeight: '700', marginBottom: 16 }, card: { borderRadius: 16, padding: 20, borderWidth: 1 }, chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, marginRight: 8, borderWidth: 1 }, input: { borderRadius: 10, padding: 14, fontSize: 14, marginBottom: 12, borderWidth: 1 }, btn: { borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 8 }, btnText: { color: '#fff', fontSize: 16, fontWeight: '600' } });
