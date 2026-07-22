import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeState = {
  preference: ThemePreference;
  isHydrated: boolean;
};

type ThemeActions = {
  setPreference: (preference: ThemePreference) => void;
  hydrate: () => Promise<void>;
};

type ThemeStore = ThemeState & ThemeActions;

const STORAGE_KEY = 'theme-preference';

const isThemePreference = (value: string | null): value is ThemePreference =>
  value === 'light' || value === 'dark' || value === 'system';

export const useThemeStore = create<ThemeStore>((set) => ({
  preference: 'system',
  isHydrated: false,

  setPreference: (preference) => {
    set({ preference });
    void AsyncStorage.setItem(STORAGE_KEY, preference);
  },

  hydrate: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (isThemePreference(stored)) {
      set({ preference: stored, isHydrated: true });
      return;
    }

    set({ isHydrated: true });
  },
}));
