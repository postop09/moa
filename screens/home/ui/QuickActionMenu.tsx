import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { useDeleteHousehold } from '@/features/household';
import {
  useGetHouseholdMembers,
  useLeaveHousehold,
} from '@/features/household-member';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { useAuthStore } from '@/entities/auth';
import { ThemedText } from '@/shared/ui';

import { useHouseholdSelector } from '../model/useHouseholdSelector';

export const QuickActionMenu = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuthStore();
  const { selectedHousehold, selectedHouseholdId } = useHouseholdSelector();
  const { data: members } = useGetHouseholdMembers(
    selectedHouseholdId ?? undefined,
  );
  const { handleDelete } = useDeleteHousehold();
  const { handleLeave } = useLeaveHousehold();

  const currentMember = members?.find(
    (member) => member.userId === session?.user.id,
  );
  const isOwner = currentMember?.role === 'owner';

  const handleAddCategory = () => {
    setIsOpen(false);
    router.push('/category-management');
  };

  const handleAddMember = () => {
    setIsOpen(false);
    router.push('/member-management');
  };

  const handleDeleteOrLeave = () => {
    if (!selectedHouseholdId || !selectedHousehold) {
      return;
    }

    setIsOpen(false);

    if (isOwner) {
      handleDelete(selectedHouseholdId, selectedHousehold.name);
      return;
    }

    handleLeave(selectedHouseholdId, selectedHousehold.name);
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

            {selectedHousehold && currentMember ? (
              <>
                <View
                  style={[styles.divider, { backgroundColor: colors.border }]}
                />

                <Pressable
                  onPress={handleDeleteOrLeave}
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <MaterialIcons
                    name={isOwner ? 'delete' : 'logout'}
                    size={20}
                    color={colors.expense}
                  />
                  <ThemedText
                    style={[styles.menuItemText, { color: colors.expense }]}
                  >
                    {isOwner ? '가계부 삭제' : '가계부 나가기'}
                  </ThemedText>
                </Pressable>
              </>
            ) : null}
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
