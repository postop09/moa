import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import type { Transaction, UpdateTransactionReq } from '@/entities/transaction';
import type { TransactionType } from '@/shared/model';
import {
  formatAmountInput,
  parseAmountInput,
  useColorScheme,
} from '@/shared/lib';
import { Colors } from '@/shared/config';
import { FormField, ThemedText } from '@/shared/ui';

import { formatDisplayDate } from '../lib/date';

type Props = {
  visible: boolean;
  transaction: Transaction | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (payload: UpdateTransactionReq) => void;
};

export const TransactionEditModal = ({
  visible,
  transaction,
  isLoading,
  onClose,
  onSubmit,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!visible || !transaction) {
      return;
    }

    setName(transaction.name ?? '');
    setAmount(
      transaction.amount != null
        ? formatAmountInput(String(transaction.amount))
        : '',
    );
    setType(transaction.type ?? 'expense');
    setTransactionDate(transaction.transactionDt ?? new Date());
    setShowPicker(false);
    setError('');
  }, [visible, transaction]);

  const handleDateChange = (
    _event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setTransactionDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    if (!transaction) {
      return;
    }
    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }
    if (!amount) {
      setError('금액을 입력해주세요.');
      return;
    }

    onSubmit({
      id: transaction.id,
      name: name.trim(),
      amount: parseAmountInput(amount),
      type,
      transactionDt: transactionDate,
      categoryId: transaction.categoryId,
      memo: transaction.memo,
      isRecurring: transaction.isRecurring,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { backgroundColor: colors.background }]}
          onPress={(event) => event.stopPropagation()}
        >
          <ThemedText type="subtitle" style={styles.title}>
            거래 수정
          </ThemedText>

          <View style={styles.typeRow}>
            <ThemedText style={styles.typeLabel}>유형</ThemedText>
            <View style={styles.typeButtons}>
              {(['expense', 'income'] as const).map((option) => {
                const isSelected = type === option;
                const accent =
                  option === 'expense' ? colors.expense : colors.income;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setType(option)}
                    style={[
                      styles.typeButton,
                      {
                        borderColor: isSelected ? accent : colors.border,
                        backgroundColor: isSelected ? accent : 'transparent',
                      },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.typeButtonText,
                        { color: isSelected ? '#fff' : colors.text },
                      ]}
                    >
                      {option === 'expense' ? '지출' : '수입'}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <FormField
            label="이름"
            value={name}
            onChangeText={setName}
            placeholder="예: 점심 식사"
          />

          <FormField
            label="금액"
            value={amount}
            onChangeText={(value) => setAmount(formatAmountInput(value))}
            placeholder="0"
            keyboardType="number-pad"
          />

          <View style={styles.dateBlock}>
            <ThemedText style={styles.typeLabel}>날짜</ThemedText>
            <Pressable
              onPress={() => setShowPicker(true)}
              style={[
                styles.dateField,
                { borderColor: colors.border, backgroundColor: colors.card },
              ]}
            >
              <ThemedText>{formatDisplayDate(transactionDate)}</ThemedText>
            </Pressable>
            {showPicker ? (
              <DateTimePicker
                value={transactionDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                locale="ko-KR"
              />
            ) : null}
            {Platform.OS === 'ios' && showPicker ? (
              <Pressable
                onPress={() => setShowPicker(false)}
                style={[styles.doneButton, { backgroundColor: colors.tint }]}
              >
                <ThemedText style={styles.doneText}>완료</ThemedText>
              </Pressable>
            ) : null}
          </View>

          {error ? (
            <ThemedText style={[styles.error, { color: colors.expense }]}>
              {error}
            </ThemedText>
          ) : null}

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={[styles.actionButton, { borderColor: colors.border }]}
            >
              <ThemedText>취소</ThemedText>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              disabled={isLoading}
              style={[
                styles.actionButton,
                styles.submitButton,
                {
                  backgroundColor:
                    type === 'expense' ? colors.expense : colors.income,
                  opacity: isLoading ? 0.7 : 1,
                },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.submitText}>저장</ThemedText>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 20,
  },
  typeRow: {
    gap: 8,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  typeButtonText: {
    fontWeight: '600',
  },
  dateBlock: {
    gap: 8,
  },
  dateField: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  doneButton: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  doneText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    borderWidth: 0,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
  },
});
