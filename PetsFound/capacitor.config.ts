import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flmc.petsfound',
  appName: 'PetsFound',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
