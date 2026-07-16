import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import type { Category } from '@/entities/category';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

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

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>카테고리</ThemedText>
      {isLoading ? (
        <ActivityIndicator color={colors.tint} />
      ) : categories.length === 0 ? (
        <ThemedText style={[styles.empty, { color: colors.icon }]}>
          등록된 카테고리가 없습니다.
        </ThemedText>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {categories.map((category) => {
            const isSelected = category.id === value;
            return (
              <Pressable
                key={category.id}
                onPress={() => onChange(category.id)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? colors.tint : colors.card,
                    borderColor: isSelected ? colors.tint : colors.border,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    { color: isSelected ? '#fff' : colors.text },
                  ]}
                >
                  {category.name}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      {error ? (
        <ThemedText style={[styles.error, { color: colors.expense }]}>
          {error}
        </ThemedText>
      ) : null}
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
  empty: {
    fontSize: 13,
  },
  chips: {
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    fontSize: 13,
  },
});
