import { Colors } from '@/shared/config';
import { useSignOut } from '@/shared/model';
import { ThemedText } from '@/shared/ui';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

type Props = {
  disabled?: boolean;
};

export const ChangeAccountButton = ({ disabled }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { mutate, isPending } = useSignOut();
  const isDisabled = disabled || isPending;

  return (
    <Pressable
      onPress={() => mutate()}
      disabled={isDisabled}
      style={styles.signOutButton}
    >
      <ThemedText style={[styles.signOutText, { color: colors.icon }]}>
        다른 계정으로 로그인
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  signOutText: {
    fontSize: 14,
  },
});
