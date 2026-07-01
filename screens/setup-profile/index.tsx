import { useSetupProfile } from './model';
import {
  ChangeAccountButton,
  HeroSection,
  ProfileFormSection,
  StartButton,
} from './ui';
import { ThemedView } from '@/shared/ui';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SetupProfilePage = () => {
  const { nickname, setNickname, error, setError, isPending, handleSubmit } =
    useSetupProfile();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.content}
        >
          <HeroSection />

          <ProfileFormSection
            nickname={nickname}
            error={error}
            isPending={isPending}
            onChangeNickname={setNickname}
            onClearError={() => setError('')}
          />

          <View style={styles.actions}>
            <StartButton onSubmit={handleSubmit} isPending={isPending} />
            <ChangeAccountButton disabled={isPending} />
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
