import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { Colors } from '@/shared/config';

import { ThemedText } from './ThemedText';

type Props = {
  label: string;
  onPress: () => void;
  isPending?: boolean;
  disabled?: boolean;
};

export const PrimaryButton = ({
  label,
  onPress,
  isPending = false,
  disabled = false,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDisabled = disabled || isPending;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.submitButton,
        {
          backgroundColor: colors.tint,
          opacity: pressed || isDisabled ? 0.85 : 1,
        },
      ]}
    >
      {isPending ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ThemedText style={[styles.submitText, { color: colors.tintText }]}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
