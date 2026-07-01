import { StyleSheet, View } from 'react-native';
import { useSessionStore } from '@/entities/auth';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { FormField, ThemedText } from '@/shared/ui';

type ProfileFormSectionProps = {
  nickname: string;
  error: string;
  isPending: boolean;
  onChangeNickname: (value: string) => void;
  onClearError: () => void;
};

export const ProfileFormSection = ({
  nickname,
  error,
  isPending,
  onChangeNickname,
  onClearError,
}: ProfileFormSectionProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { session } = useSessionStore();

  return (
    <View style={styles.form}>
      <ThemedText style={styles.emailLabel}>이메일</ThemedText>
      <ThemedText style={[styles.email, { color: colors.icon }]}>
        {session?.user.email ?? '-'}
      </ThemedText>

      <FormField
        label="닉네임"
        value={nickname}
        onChangeText={(value) => {
          onChangeNickname(value);
          onClearError();
        }}
        placeholder="닉네임을 입력하세요"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        error={error}
        editable={!isPending}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  emailLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    marginTop: -12,
  },
});
