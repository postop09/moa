import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { getSession, getSessionChange } from '@/entities/auth';
import { AppProviders, useColorScheme } from '@/shared/lib';
import { ThemedView } from '@/shared/ui';
import { useEffect } from 'react';
import { useGetProfile, useGetHouseholds, useAuthStore } from '@/shared/model';

export const unstable_settings = {
  anchor: '(tabs)',
};

const RootNavigator = () => {
  const colorScheme = useColorScheme();
  const { session, isLoading, profile, setProfile } = useAuthStore();
  const userId = session?.user.id ?? '';
  const { data } = useGetProfile(userId);
  const { data: households } = useGetHouseholds(userId);
  const hasProfile = !!profile;
  const hasHousehold = !!households;
  const needsProfileSetup = !!session && !profile;
  const needsHouseholdSetup = !!session && !households;

  useEffect(() => {
    if (profile) return;
    if (!data) return;
    setProfile(data);
  }, [data]);

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
          <Stack.Screen name="budget-management" />
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
  const { setSession, setIsLoading } = useAuthStore();

  const sessionInit = async () => {
    const { session } = await getSession();
    setSession(session);
    setIsLoading(false);
    const subscription = getSessionChange((event, session) => {
      console.log('session event: ', event);
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
};

export default RootLayout;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
