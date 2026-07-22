import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import {
  type ThemePreference,
  useColorScheme,
  useThemeStore,
} from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: '시스템 설정' },
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
];

export const ThemeSection = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);

  return (
    <View style={styles.section}>
      <ThemedText type="subtitle">테마</ThemedText>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {THEME_OPTIONS.map((option, index) => {
          const isSelected = preference === option.value;

          return (
            <View key={option.value}>
              {index > 0 && (
                <View
                  style={[styles.divider, { backgroundColor: colors.border }]}
                />
              )}
              <Pressable
                onPress={() => setPreference(option.value)}
                style={({ pressed }) => [
                  styles.row,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <ThemedText style={styles.label}>{option.label}</ThemedText>
                {isSelected && (
                  <MaterialIcons name="check" size={22} color={colors.accent} />
                )}
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
  },
});
