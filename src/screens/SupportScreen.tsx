import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';

export default function SupportScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    Alert.alert('Support request sent');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Contact Support', 'اتصل بالدعم')}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('Name', 'الاسم')} placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder="Email" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('Subject', 'الموضوع')} placeholderTextColor={colors.textMuted} value={subject} onChangeText={setSubject} />
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border, minHeight: 100 }]} placeholder={t('Message', 'الرسالة')} placeholderTextColor={colors.textMuted} value={message} onChangeText={setMessage} multiline />
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleSubmit}>
          <Text style={styles.btnText}>{t('Send', 'إرسال')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: { borderRadius: 16, padding: 16, borderWidth: 1 },
  input: { borderRadius: 10, padding: 12, fontSize: 14, borderWidth: 1, marginBottom: 8 },
  btn: { borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
