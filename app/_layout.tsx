import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { useAuthGate, useSessionBootstrap } from '@/features/auth';
import { useGetHouseholds } from '@/features/household';
import { queryClient, useColorScheme, useThemeStore } from '@/shared/lib';
import { ThemedView } from '@/shared/ui';

export const unstable_settings = {
  anchor: '(tabs)',
};

const RootNavigator = () => {
  const colorScheme = useColorScheme();
  const { session, isLoading, userId, hasProfile, needsProfileSetup } =
    useAuthGate();
  const { data: households } = useGetHouseholds(userId);
  const hasHousehold = !!households && households.length > 0;
  const needsHouseholdSetup = !!session && !hasHousehold;

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
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={needsProfileSetup}>
          <Stack.Screen name="setup-profile" />
        </Stack.Protected>

        <Stack.Protected guard={needsHouseholdSetup}>
          <Stack.Screen name="setup-household" />
        </Stack.Protected>

        <Stack.Protected guard={!!session && hasProfile && hasHousehold}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="create-household" />
          <Stack.Screen name="category-management" />
          <Stack.Screen name="member-management" />
          <Stack.Screen name="transactions" />
          <Stack.Screen name="transaction-form" />
        </Stack.Protected>
        <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
};

const RootLayout = () => {
  useSessionBootstrap();
  const hydrateTheme = useThemeStore((state) => state.hydrate);

  useEffect(() => {
    void hydrateTheme();
  }, [hydrateTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
