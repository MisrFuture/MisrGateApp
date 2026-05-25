import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => { const t = setTimeout(onFinish, 2000); return () => clearTimeout(t); }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MisrGate</Text>
      <Text style={styles.sub}>E-Government Portal</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#c51b29', alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 42, fontWeight: '800', color: '#fff' }, sub: { fontSize: 16, color: '#fff8', marginTop: 8 } });
