import { ThemedView } from '@/shared/ui';
import { Platform, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeroSection } from './ui/HeroSection';
import { HouseholdFormSection } from './ui/HouseholdFormSection';
import { StartButton } from './ui/StartButton';
import { useState } from 'react';
import { useCreateHousehold } from '@/features/household';

export const SetupHouseholdPage = () => {
  const [householdName, setHouseholdName] = useState('');
  const [error, setError] = useState('');
  const { mutate, isPending } = useCreateHousehold();

  const handleSubmit = () => {
    const trimmedName = householdName.trim();

    if (!trimmedName) {
      setError('가계부 이름을 입력해주세요.');
      return;
    }

    mutate({ name: trimmedName });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.content}
        >
          <HeroSection />

          <HouseholdFormSection
            householdName={householdName}
            error={error}
            isPending={isPending}
            onChange={setHouseholdName}
            onClearError={() => setError('')}
          />

          <View style={styles.actions}>
            <StartButton onSubmit={handleSubmit} isPending={isPending} />
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  actions: {
    gap: 14,
    paddingBottom: 12,
  },
});
