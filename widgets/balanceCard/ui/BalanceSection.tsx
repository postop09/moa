import { Pressable } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

import { useGetBalance } from '../model/useGetBalance';
import { BalanceSummary } from './BalanceSummary';

export const BalanceSection = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { income, expense, balance, isLoading } = useGetBalance();

  return (
    <BalanceSummary
      label="이번 달 잔액"
      balance={balance}
      income={income}
      expense={expense}
      isLoading={isLoading}
      headerRight={
        <Pressable
          onPress={() => router.push('/transactions')}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <ThemedText lightColor={colors.accent} darkColor={colors.accent}>
            자세히 보기
          </ThemedText>
        </Pressable>
      }
    />
  );
};
