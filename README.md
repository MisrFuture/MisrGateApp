# MisrGate Mobile App

A cross-platform mobile application for Egyptian e-government services, built with React Native (Expo).

## Overview

MisrGate provides citizens with digital access to 8 government services, appointment booking, application tracking, and direct communication with government authorities — all from a mobile device.

## Features

- **8 Government Services**: National ID, Military & Recruitment, Civil Registry, Passport, Tax Payment, Traffic Fines, Health Insurance, Social Insurance
- **Secure Authentication**: JWT-based login/register with biometric support
- **Application Management**: Submit, track, and review service applications
- **Appointment Booking**: Book and manage appointments across 8 departments
- **Real-time Notifications**: Push notifications for status updates
- **Complaints & Feedback**: Submit categorized feedback with tracking
- **Service Ratings**: Rate completed applications with star scores
- **Activity Timeline**: Unified history of all user interactions
- **Favorites**: Bookmark frequently used services
- **Announcements**: System-wide announcements from administrators
- **FAQ Section**: Per-service frequently asked questions
- **Service Directory**: Contact info and hours for government departments
- **Admin Panel**: Dashboard with stats, applications, and announcement management
- **Dark Mode**: System-aware dark/light theme toggle
- **Bilingual**: Full English/Arabic support with RTL layout
- **Offline Cache**: Basic offline data availability
- **Splash Screen**: Branded animated launch screen

## Tech Stack

- **Framework**: React Native (Expo SDK 56)
- **Navigation**: React Navigation (native-stack + bottom-tabs)
- **State Management**: React Context API
- **Storage**: AsyncStorage + Expo SecureStore
- **API**: REST backend at `http://10.0.2.2:5000/api`
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npx expo`)
- Android Studio (for Android emulator) or Xcode (for iOS)
- Physical device with Expo Go app

### Installation

```bash
cd MisrGateApp
npm install
```

### Running

```bash
# Android
npm run android

# iOS (requires macOS)
npm run ios

# Web
npm run web
```

### Backend Configuration

The app connects to the MisrGate API at `http://10.0.2.2:5000/api`. For physical devices, update the API URL in `src/api/client.ts` to your machine's local IP.

## Project Structure

```
MisrGateApp/
├── App.tsx                 # App entry with providers
├── src/
│   ├── api/client.ts       # API service layer
│   ├── context/            # React contexts (auth, theme)
│   ├── screens/            # Screen components
│   ├── types/index.ts      # TypeScript definitions
│   ├── utils/i18n.tsx      # Internationalization
│   └── Navigation.tsx      # Navigation configuration
├── assets/                 # Images, icons, splash
├── app.json                # Expo configuration
└── package.json
```

## Security

- JWT tokens stored in secure device storage
- Biometric authentication support
- Input validation on all forms
- Encrypted local storage for sensitive data
- Automatic token refresh handling

## License

MIT
