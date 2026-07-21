import { HOUSEHOLD_NAME_MAX_LENGTH } from '@/entities/households';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { useProfileStore } from '@/entities/profiles';
import { FormField, ThemedText } from '@/shared/ui';
import { StyleSheet, View } from 'react-native';

type Props = {
  householdName: string;
  error: string;
  isPending: boolean;
  onChange: (value: string) => void;
  onClearError: () => void;
};

export const HouseholdFormSection = ({
  householdName,
  error,
  isPending,
  onChange,
  onClearError,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { profile } = useProfileStore();

  return (
    <View style={styles.form}>
      <ThemedText style={styles.nicknameLabel}>닉네임</ThemedText>
      <ThemedText style={[styles.nickname, { color: colors.icon }]}>
        {profile?.nickname ?? '-'}
      </ThemedText>

      <FormField
        label="가계부 이름"
        value={householdName}
        onChangeText={(value) => {
          onChange(value);
          onClearError();
        }}
        placeholder="가계부 이름을 입력하세요"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={HOUSEHOLD_NAME_MAX_LENGTH}
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
  nicknameLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  nickname: {
    fontSize: 16,
    marginTop: -12,
  },
});
