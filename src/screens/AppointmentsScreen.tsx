import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';
import { DEPARTMENTS } from '../types';

export default function AppointmentsScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [dept, setDept] = useState('GENERAL_INQUIRY');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchSlots = async () => {
    setLoading(true);
    try { const res = await api.getAvailableSlots(date, dept); setSlots(res.available); }
    catch (e: any) { Alert.alert('Error', e.message); } finally { setLoading(false); }
  };

  const handleBook = async () => {
    if (!selectedSlot) { Alert.alert('Error', 'Select a time slot'); return; }
    setSubmitting(true);
    try { await api.bookAppointment({ department: dept, date, timeSlot: selectedSlot }); Alert.alert(t('Success', 'تم'), t('Appointment booked!', 'تم حجز الموعد!')); setSelectedSlot(''); }
    catch (e: any) { Alert.alert('Error', e.message); } finally { setSubmitting(false); }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Book Appointment', 'حجز موعد')}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={{ color: colors.textSecondary, marginBottom: 8 }}>{t('Department', 'القسم')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {DEPARTMENTS.map(d => (
            <TouchableOpacity key={d.key} style={[styles.chip, { backgroundColor: dept === d.key ? colors.accent : colors.input, borderColor: colors.border }]} onPress={() => setDept(d.key)}>
              <Text style={{ color: dept === d.key ? '#fff' : colors.text, fontSize: 12 }}>{t(d.en, d.ar)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.blue }]} onPress={fetchSlots}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('Check Available Slots', 'عرض المواعيد المتاحة')}</Text>}
        </TouchableOpacity>
        {slots.length > 0 && (
          <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {slots.map(s => (
                <TouchableOpacity key={s} style={[styles.slotBtn, { backgroundColor: selectedSlot === s ? colors.accent : colors.input, borderColor: colors.border }]} onPress={() => setSelectedSlot(s)}>
                  <Text style={{ color: selectedSlot === s ? '#fff' : colors.text, fontSize: 13 }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.green, marginTop: 16 }]} onPress={handleBook} disabled={submitting}>
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('Confirm Booking', 'تأكيد الحجز')}</Text>}
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, title: { fontSize: 22, fontWeight: '700', marginBottom: 16 }, card: { borderRadius: 16, padding: 20, borderWidth: 1 }, chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, marginRight: 8, borderWidth: 1 }, btn: { borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8 }, btnText: { color: '#fff', fontWeight: '600' }, slotBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1 } });
