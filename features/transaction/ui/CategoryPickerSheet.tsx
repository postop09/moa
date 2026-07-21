import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';

import type { Category } from '@/entities/categories';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

type Props = {
  visible: boolean;
  categories: Category[];
  value?: number;
  onClose: () => void;
  onSelect: (categoryId: number) => void;
};

export const CategoryPickerSheet = ({
  visible,
  categories,
  value,
  onClose,
  onSelect,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

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
                  onPress={() => onSelect(item.id)}
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
  );
};

const styles = StyleSheet.create({
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
