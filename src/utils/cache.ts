import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'cache_';
const CACHE_TTL = 5 * 60 * 1000;

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { await AsyncStorage.removeItem(CACHE_PREFIX + key); return null; }
    return data as T;
  } catch { return null; }
}

export async function setCache(key: string, data: unknown): Promise<void> {
  await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
}

export async function clearCache(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const cacheKeys = keys.filter(k => k.startsWith(CACHE_PREFIX));
  if (cacheKeys.length) await AsyncStorage.multiRemove(cacheKeys);
}
