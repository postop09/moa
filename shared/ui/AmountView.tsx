import { formatCurrency } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';
import { StyleSheet, View } from 'react-native';

type Props = {
  amount: number;
  color: string;
};

export const AmountView = ({ amount, color }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <ThemedText style={[styles.amount, { color }]} numberOfLines={1}>
        {formatCurrency(amount)}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
