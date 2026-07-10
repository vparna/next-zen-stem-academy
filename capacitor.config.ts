import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nextzenstem.academy',
  appName: 'NextGen STEAM Academy',
  webDir: 'public', // Set to 'public' (which exists) to prevent Capacitor from throwing 'Could not find web assets directory'
  server: {
    // For local mobile testing, uncomment the line below and replace with your Mac's local IP address:
    // url: 'http://<YOUR_MAC_IP>:3000',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4F46E5",
      showSpinner: false,
    },
    Camera: {
      ios: {
        permissions: {
          camera: "This app needs camera access to scan QR codes.",
          photos: "This app needs photo library access for homework submission.",
        },
      },
    },
    Geolocation: {
      ios: {
        permissions: {
          location: "This app needs location access to verify check-ins.",
        },
      },
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
