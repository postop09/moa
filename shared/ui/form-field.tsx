import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme, useThemeColor } from '@/shared/lib';
import { ThemedText } from './themed-text';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function FormField({ label, error, style, ...props }: FormFieldProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        placeholderTextColor={colors.icon}
        style={[
          styles.input,
          {
            color: textColor,
            borderColor: error ? colors.expense : colors.border,
            backgroundColor: colors.card,
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <ThemedText style={[styles.error, { color: colors.expense }]}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
  },
});
