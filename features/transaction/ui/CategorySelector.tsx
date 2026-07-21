import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
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

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <Pressable
            style={[styles.sheet, { backgroundColor: colors.background }]}
            onPress={(event) => event.stopPropagation()}
          >
            <ThemedText type="subtitle" style={styles.sheetTitle}>
              카테고리 선택
            </ThemedText>
            <FlatList
              data={categories}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => (
                <View
                  style={[styles.separator, { backgroundColor: colors.border }]}
                />
              )}
              renderItem={({ item }) => {
                const isSelected = item.id === value;

                return (
                  <Pressable
                    onPress={() => handleSelect(item.id)}
                    style={({ pressed }) => [
                      styles.option,
                      pressed && { opacity: 0.7 },
                      isSelected && { backgroundColor: colors.card },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.optionText,
                        isSelected && { fontWeight: '700' },
                      ]}
                    >
                      {item.name}
                    </ThemedText>
                    {isSelected ? (
                      <MaterialIcons
                        name="check"
                        size={20}
                        color={colors.accent}
                      />
                    ) : null}
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <ThemedText style={[styles.empty, { color: colors.icon }]}>
                  등록된 카테고리가 없습니다.
                </ThemedText>
              }
            />
          </Pressable>
        </Pressable>
      </Modal>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 8,
    maxHeight: '60%',
  },
  sheetTitle: {
    fontSize: 18,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  optionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  empty: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },
});
