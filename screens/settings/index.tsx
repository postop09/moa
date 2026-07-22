import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText, ThemedView } from '@/shared/ui';
import { AccountSection } from './ui/AccountSection';
import { SignOutButton } from './ui/SignOutButton';
import { ThemeSection } from './ui/ThemeSection';

export const SettingsPage = () => {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedText type="title" style={styles.title}>
          설정
        </ThemedText>

        <AccountSection />
        <ThemeSection />
        <SignOutButton />
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
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 28,
  },
});
