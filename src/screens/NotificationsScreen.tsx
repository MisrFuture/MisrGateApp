import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../utils/i18n';
import { api } from '../api/client';

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNotifications().then(r => { setNotifications(r.notifications); setUnread(r.unreadCount); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      {unread > 0 && (
        <TouchableOpacity style={{ padding: 16 }} onPress={async () => { await api.markAllAsRead(); setNotifications(prev => prev.map(n => ({ ...n, read: true }))); setUnread(0); }}>
          <Text style={{ color: colors.blue }}>{t('Mark all as read', 'تحديد الكل كمقروء')}</Text>
        </TouchableOpacity>
      )}
      {notifications.map(n => (
        <TouchableOpacity key={n.id} style={[styles.card, { backgroundColor: n.read ? colors.card : colors.accent + '08', borderColor: colors.border, opacity: n.read ? 0.7 : 1 }]}
          onPress={async () => { if (!n.read) { await api.markAsRead(n.id); setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x)); setUnread(prev => Math.max(0, prev - 1)); } }}>
          <Text style={[styles.title, { color: colors.text }]}>{n.title}</Text>
          <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{n.message}</Text>
          <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 4 }}>{new Date(n.createdAt).toLocaleDateString()}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { margin: 12, marginBottom: 0, padding: 16, borderRadius: 12, borderWidth: 1 },
  title: { fontWeight: '600', marginBottom: 4 },
});
