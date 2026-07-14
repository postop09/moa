import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { formatCurrency, getTransaction } from '@/entities/transaction';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { AmountView } from './AmountView';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useHouseholdStore } from '@/shared/model';
import { useEffect } from 'react';

export const BalanceCard = () => {
  const { selectedHouseholdId } = useHouseholdStore();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const balance = 0;
  const income = 0;
  const expense = 0;
  const isLoading = false;

  const { data } = useQuery({
    queryKey: ['balance'],
    queryFn: () => getTransaction(selectedHouseholdId ?? ''),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <ThemedView
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <ThemedText
            style={styles.label}
            lightColor={colors.text}
            darkColor={colors.text}
          >
            이번 달 잔액
          </ThemedText>
          {isLoading ? (
            <ActivityIndicator color="#fff" style={styles.loader} />
          ) : (
            <ThemedText
              style={styles.balance}
              lightColor={colors.text}
              darkColor={colors.text}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {formatCurrency(balance)}
            </ThemedText>
          )}
        </View>
        <Pressable
          onPress={() => router.push('/transactions')}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <ThemedText lightColor={colors.accent} darkColor={colors.accent}>
            자세히 보기
          </ThemedText>
        </Pressable>
      </View>
      {!isLoading && (
        <View style={styles.hint}>
          <AmountView amount={income} color={colors.income} />
          <AmountView amount={expense} color={colors.expense} />
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loader: {
    alignSelf: 'flex-start',
    marginVertical: 12,
  },
  balance: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },
});
