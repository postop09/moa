import { Colors } from '@/shared/config';
import { ThemedText } from '@/shared/ui';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useColorScheme,
} from 'react-native';

type Props = {
  onSubmit: () => void;
  isPending: boolean;
};

export const StartButton = ({ onSubmit, isPending }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Pressable
      onPress={onSubmit}
      disabled={isPending}
      style={({ pressed }) => [
        styles.submitButton,
        {
          backgroundColor: colors.tint,
          opacity: pressed || isPending ? 0.85 : 1,
        },
      ]}
    >
      {isPending ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ThemedText style={styles.submitText}>시작하기</ThemedText>
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
