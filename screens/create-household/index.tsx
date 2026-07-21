import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HOUSEHOLD_NAME_MAX_LENGTH } from '@/entities/household';
import { useCreateHousehold, useHouseholdNameForm } from '@/features/household';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { useHouseholdStore } from '@/shared/model';
import { FormField, PrimaryButton, ThemedText, ThemedView } from '@/shared/ui';

export const CreateHouseholdPage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { setSelectedHouseholdId } = useHouseholdStore();
  const { mutate, isPending } = useCreateHousehold();
  const { householdName, setHouseholdName, error, clearError, validate } =
    useHouseholdNameForm();

  const handleSubmit = () => {
    const name = validate();
    if (!name) {
      return;
    }

    mutate(
      { name },
      {
        onSuccess: (household) => {
          setSelectedHouseholdId(household.id);
          router.back();
        },
      },
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            새 가계부 생성
          </ThemedText>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.content}
        >
          <FormField
            label="가계부 이름"
            value={householdName}
            onChangeText={(value) => {
              setHouseholdName(value);
              clearError();
            }}
            placeholder="가계부 이름을 입력하세요"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={HOUSEHOLD_NAME_MAX_LENGTH}
            error={error}
            editable={!isPending}
          />

          <PrimaryButton
            label="생성하기"
            onPress={handleSubmit}
            isPending={isPending}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
});
