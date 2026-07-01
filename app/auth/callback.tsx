import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from '@/shared/ui';
const AuthCallbackScreen = () => {
  const params = useLocalSearchParams();
  useEffect(() => {
    console.log('params: ', params.code);
  }, [params]);
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" />
    </ThemedView>
  );
};
export default AuthCallbackScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
