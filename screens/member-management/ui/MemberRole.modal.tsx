import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import type { HouseholdMemberRole } from '@/entities/household-member';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

type Props = {
  visible: boolean;
  currentRole?: HouseholdMemberRole;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (role: HouseholdMemberRole) => void;
};

const ROLE_OPTIONS: { value: HouseholdMemberRole; label: string }[] = [
  { value: 'owner', label: '소유자' },
  { value: 'member', label: '멤버' },
];

export const MemberRoleModal = ({
  visible,
  currentRole,
  isLoading,
  onClose,
  onSubmit,
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
          <ThemedText type="subtitle" style={styles.title}>
            권한 설정
          </ThemedText>
          <View style={styles.options}>
            {ROLE_OPTIONS.map((option) => {
              const isSelected = currentRole === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => onSubmit(option.value)}
                  disabled={isLoading || isSelected}
                  style={[
                    styles.option,
                    {
                      backgroundColor: isSelected ? colors.tint : colors.card,
                      borderColor: isSelected ? colors.tint : colors.border,
                      opacity: isLoading ? 0.7 : 1,
                    },
                  ]}
                >
                  <ThemedText
                    style={{
                      color: isSelected ? '#fff' : colors.text,
                      fontWeight: '600',
                    }}
                  >
                    {option.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
          {isLoading ? (
            <ActivityIndicator color={colors.tint} />
          ) : (
            <Pressable
              onPress={onClose}
              style={[styles.cancelButton, { borderColor: colors.border }]}
            >
              <ThemedText>취소</ThemedText>
            </Pressable>
          )}
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
  options: {
    gap: 10,
  },
  option: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
