import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from '@/shared/ui';

const AuthCallbackScreen = () => {
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
