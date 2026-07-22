import { useColorScheme as useSystemColorScheme } from 'react-native';

import { useThemeStore } from './themeStore';

export const useColorScheme = () => {
  const systemScheme = useSystemColorScheme();
  const preference = useThemeStore((state) => state.preference);

  if (preference === 'system') {
    return systemScheme ?? 'light';
  }

  return preference;
};
