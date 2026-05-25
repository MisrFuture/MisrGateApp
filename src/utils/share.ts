import { Share } from 'react-native';

export async function shareApp() {
  await Share.share({ message: 'Check out MisrGate - Your Egyptian E-Government Portal! Download now from misrgate.com', title: 'MisrGate App' });
}
