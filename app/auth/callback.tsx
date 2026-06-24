import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { createSessionFromUrl } from '@/entities/session';
import { ThemedView } from '@/shared/ui';

export default function AuthCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const query = new URLSearchParams(
          Object.entries(params).flatMap(([key, value]) =>
            value === undefined
              ? []
              : [[key, Array.isArray(value) ? value[0] : String(value)]],
          ),
        );

        const callbackUrl = `moa://auth/callback?${query.toString()}`;

        if (query.toString()) {
          await createSessionFromUrl(callbackUrl);
        }

        router.replace('/');
      } catch {
        router.replace('/');
      }
    };

    void handleCallback();
  }, [params, router]);

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
