import { Alert, Linking, Platform } from 'react-native';

export function promptRateApp() {
  Alert.alert('Love MisrGate?', 'Rate us 5 stars!', [
    { text: 'Not Now', style: 'cancel' },
    { text: 'Rate Now', onPress: () => { const url = Platform.OS === 'ios' ? 'https://apps.apple.com' : 'https://play.google.com/store'; Linking.openURL(url); } },
  ]);
}
