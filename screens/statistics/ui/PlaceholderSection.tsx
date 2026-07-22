import { StyleSheet } from 'react-native';
import { ThemedText } from '@/shared/ui';

export const PlaceholderSection = () => {
  return (
    <ThemedText style={styles.description}>
      커스텀 된 여러 통계를 확인할 수 있어요. 곧 제공됩니다.
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    opacity: 0.7,
    lineHeight: 22,
  },
});
