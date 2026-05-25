import { AccessibilityInfo } from 'react-native';

export function isScreenReaderEnabled() {
  return AccessibilityInfo.isScreenReaderEnabled();
}

export function announceForAccessibility(message: string) {
  AccessibilityInfo.announceForAccessibility(message);
}
