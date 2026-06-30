import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/shared/ui';

import { useSetupProfile } from './model/useSetupProfile';
import { HeroSection } from './ui/HeroSection';
import { ProfileActionsSection } from './ui/ProfileActionsSection';
import { ProfileFormSection } from './ui/ProfileFormSection';

export function SetupProfilePage() {
  const {
    nickname,
    setNickname,
    error,
    setError,
    isPending,
    handleSubmit,
    handleSignOut,
  } = useSetupProfile();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.content}
        >
          <View style={styles.hero}>
            <HeroSection />
          </View>

          <ProfileFormSection
            nickname={nickname}
            error={error}
            isPending={isPending}
            onChangeNickname={setNickname}
            onClearError={() => setError('')}
          />

          <ProfileActionsSection
            isPending={isPending}
            onSubmit={handleSubmit}
            onSignOut={handleSignOut}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

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
  hero: {
    gap: 12,
  },
});
