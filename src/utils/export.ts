import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system';

export async function exportUserData(data: Record<string, unknown>) {
  const json = JSON.stringify(data, null, 2);
  const file = new File(Paths.document, 'misrgate-export.json');
  file.write(json);
  if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(file.uri);
}
