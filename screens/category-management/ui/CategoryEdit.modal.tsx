import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import type { Category, CategoryType } from '@/entities/category';
import {
  formatAmountInput,
  parseAmountInput,
  useColorScheme,
} from '@/shared/lib';
import { Colors } from '@/shared/config';
import { FormField, ThemedText } from '@/shared/ui';

type SubmitPayload = {
  id?: number;
  name: string;
  budget?: number;
  type: CategoryType;
};

type Props = {
  visible: boolean;
  category?: Category | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (payload: SubmitPayload) => void;
};

export const CategoryEditModal = ({
  visible,
  category,
  isLoading,
  onClose,
  onSubmit,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isEditing = !!category;
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [type, setType] = useState<CategoryType>('expense');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!visible) {
      return;
    }
    setName(category?.name ?? '');
    setBudget(
      category?.budget ? formatAmountInput(String(category.budget)) : '',
    );
    setType(category?.type ?? 'expense');
    setError('');
  }, [visible, category]);

  const handleSubmit = () => {
    if (!name) {
      setError('이름을 입력해주세요.');
      return;
    }

    const submitPayload: SubmitPayload = {
      id: category?.id,
      name: name,
      budget: budget ? parseAmountInput(budget) : undefined,
      type: type,
    };
    onSubmit(submitPayload);
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
            {isEditing ? '카테고리 수정' : '카테고리 추가'}
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
                        backgroundColor: isSelected ? accent : colors.card,
                        borderColor: isSelected ? accent : colors.border,
                      },
                    ]}
                  >
                    <ThemedText
                      style={{ color: isSelected ? '#fff' : colors.text }}
                    >
                      {option === 'expense' ? '지출' : '수입'}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
            <FormField
              label="이름"
              value={name}
              onChangeText={setName}
              placeholder="예) 교통비"
              error={error}
              autoFocus
            />
            <FormField
              label="예산 (선택)"
              value={budget}
              onChangeText={(value) => setBudget(formatAmountInput(value))}
              placeholder="0"
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={[styles.button, { borderColor: colors.border }]}
            >
              <ThemedText>취소</ThemedText>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              disabled={isLoading}
              style={[
                styles.button,
                styles.primaryButton,
                {
                  backgroundColor: colors.tint,
                  opacity: isLoading ? 0.7 : 1,
                },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.primaryText}>
                  {isEditing ? '저장' : '추가'}
                </ThemedText>
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
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
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
    gap: 10,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    borderWidth: 0,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
