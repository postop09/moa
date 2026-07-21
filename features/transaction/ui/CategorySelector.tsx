import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import type { Category } from '@/entities/categories';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

import { CategoryPickerSheet } from './CategoryPickerSheet';

type Props = {
  categories: Category[];
  value?: number;
  onChange: (categoryId: number) => void;
  isLoading?: boolean;
  error?: string;
};

export const CategorySelector = ({
  categories,
  value,
  onChange,
  isLoading,
  error,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isOpen, setIsOpen] = useState(false);
  const selected = categories.find((category) => category.id === value);

  const handleSelect = (categoryId: number) => {
    onChange(categoryId);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>카테고리</ThemedText>
      {isLoading ? (
        <ActivityIndicator color={colors.tint} />
      ) : (
        <Pressable
          onPress={() => setIsOpen(true)}
          disabled={categories.length === 0}
          style={({ pressed }) => [
            styles.field,
            {
              borderColor: error ? colors.expense : colors.border,
              backgroundColor: colors.card,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <ThemedText
            style={[
              styles.fieldText,
              { color: selected ? colors.text : colors.icon },
            ]}
            numberOfLines={1}
          >
            {selected?.name ??
              (categories.length === 0
                ? '등록된 카테고리가 없습니다'
                : '카테고리를 선택하세요')}
          </ThemedText>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={22}
            color={colors.icon}
          />
        </Pressable>
      )}

      {error ? (
        <ThemedText style={[styles.error, { color: colors.expense }]}>
          {error}
        </ThemedText>
      ) : null}

      <CategoryPickerSheet
        visible={isOpen}
        categories={categories}
        value={value}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  field: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldText: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
  },
});
