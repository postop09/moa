import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

export const QuickActionMenu = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = () => {
    setIsOpen(false);
    router.push('/category-management');
  };

  const handleAddMember = () => {
    setIsOpen(false);
    // TODO: 멤버 추가 페이지로 이동
  };

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        style={({ pressed }) => [
          { alignSelf: 'flex-start' },
          pressed && { opacity: 0.7 },
        ]}
      >
        <MaterialIcons name="add" size={28} color={colors.text} />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <Pressable
            style={[
              styles.dropdown,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
            onPress={(event) => event.stopPropagation()}
          >
            <Pressable
              onPress={handleAddCategory}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { opacity: 0.7 },
              ]}
            >
              <MaterialIcons name="category" size={20} color={colors.text} />
              <ThemedText style={styles.menuItemText}>카테고리 관리</ThemedText>
            </Pressable>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <Pressable
              onPress={handleAddMember}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { opacity: 0.7 },
              ]}
            >
              <MaterialIcons name="person" size={20} color={colors.text} />
              <ThemedText style={styles.menuItemText}>멤버 관리</ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  dropdown: {
    minWidth: 180,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
  },
});
