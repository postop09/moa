import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { QueryClientProvider } from '@tanstack/react-query';

import { useAuthGate, useSessionBootstrap } from '@/features/auth';
import { useGetHouseholds } from '@/features/household';
import { queryClient, useColorScheme } from '@/shared/lib';
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
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />
        </Stack.Protected>
        <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

const RootLayout = () => {
  useSessionBootstrap();

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
