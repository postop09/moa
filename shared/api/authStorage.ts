import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupportedStorage } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const webStorage: SupportedStorage = {
  getItem: (key) => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(key);
  },
  setItem: (key, value) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem(key);
  },
};

export const authStorage: SupportedStorage =
  Platform.OS === 'web' ? webStorage : AsyncStorage;
