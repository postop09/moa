import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { useProfile } from '@/entities/profile';
import { SessionProvider, useSession } from '@/entities/session';
import { AppProviders, useColorScheme } from '@/shared/lib';
import { ThemedView } from '@/shared/ui';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { session, isLoading: isSessionLoading } = useSession();
  const { data: profile, isLoading: isProfileLoading } = useProfile();

  const isLoading = isSessionLoading || (!!session && isProfileLoading);
  const hasProfile = !!profile;
  const needsProfileSetup = !!session && !hasProfile && !isProfileLoading;

  if (isLoading) {
    return (
      <ThemedView style={styles.loading}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!session && hasProfile}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="budget-management" />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />
        </Stack.Protected>

        <Stack.Protected guard={needsProfileSetup}>
          <Stack.Screen name="setup-profile" />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <SessionProvider>
        <RootNavigator />
      </SessionProvider>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
