import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import {
  getProfile,
  getSession,
  getSessionChange,
  useSessionStore,
} from '@/entities/auth';
import { AppProviders, useColorScheme } from '@/shared/lib';
import { ThemedView } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { session, isLoading: isSessionLoading } = useSessionStore();
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', session?.user.id],
    queryFn: () => getProfile(session?.user.id ?? ''),
    enabled: !!session?.user.id,
  });

  console.log('profile: ', profile);

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
  const { setSession, setIsLoading } = useSessionStore();

  const sessionInit = async () => {
    const { session } = await getSession();
    setSession(session);
    setIsLoading(false);

    const subscription = getSessionChange((event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    sessionInit();
  }, []);

  return (
    <AppProviders>
      <RootNavigator />
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
