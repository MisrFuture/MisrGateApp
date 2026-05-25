import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';

export default function FeedbackScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) { Alert.alert('Error', 'Please select a rating'); return; }
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setRating(0);
    setFeedback('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Feedback', 'التقييم')}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{t('Rate your experience', 'قيم تجربتك')}</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map(n => (
            <TouchableOpacity key={n} onPress={() => setRating(n)}>
              <Text style={[styles.star, { color: n <= rating ? '#f59e0b' : colors.border }]}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border, minHeight: 120 }]} placeholder={t('Tell us more...', 'أخبرنا المزيد...')} placeholderTextColor={colors.textMuted} value={feedback} onChangeText={setFeedback} multiline />
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handleSubmit}>
          <Text style={styles.btnText}>{t('Submit', 'إرسال')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: { borderRadius: 16, padding: 20, borderWidth: 1 },
  label: { fontSize: 15, marginBottom: 12, textAlign: 'center' },
  stars: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
  star: { fontSize: 40 },
  input: { borderRadius: 10, padding: 14, fontSize: 14, borderWidth: 1, marginBottom: 12 },
  btn: { borderRadius: 10, padding: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
