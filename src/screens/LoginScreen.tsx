import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';

export default function LoginScreen() {
  const { login, register } = useAuth();
  const { colors, dark } = useTheme();
  const { t } = useI18n();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('zeyad@gmail.com');
  const [password, setPassword] = useState('demo123456');
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isRegister) await register({ email, password, name, nationalId, phone });
      else await login(email, password);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.bg }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { color: colors.accent }]}>MisrGate</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('E-Government Portal', 'بوابة الخدمات الحكومية')}</Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {isRegister && (
            <>
              <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('Full Name', 'الاسم الكامل')} placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
              <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('National ID', 'الرقم القومي')} placeholderTextColor={colors.textMuted} value={nationalId} onChangeText={setNationalId} keyboardType="numeric" />
              <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('Phone', 'رقم الهاتف')} placeholderTextColor={colors.textMuted} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </>
          )}
          <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder="Email" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} placeholder={t('Password', 'كلمة المرور')} placeholderTextColor={colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isRegister ? t('Register', 'تسجيل') : t('Login', 'دخول')}</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={{ marginTop: 12 }}>
            <Text style={{ color: colors.blue, textAlign: 'center', fontSize: 14 }}>
              {isRegister ? t('Already have an account? Login', 'لديك حساب؟ دخول') : t('No account? Register', 'ليس لديك حساب؟ تسجيل')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 36, fontWeight: '800', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 32 },
  card: { borderRadius: 16, padding: 20, borderWidth: 1, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  input: { borderRadius: 10, padding: 14, fontSize: 15, marginBottom: 12, borderWidth: 1 },
  button: { borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
