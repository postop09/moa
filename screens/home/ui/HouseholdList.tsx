import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText } from '@/shared/ui';

import { useHouseholdSelector } from '../model';

export const HouseholdList = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isOpen, setIsOpen] = useState(false);
  const {
    households,
    selectedHousehold,
    selectedHouseholdId,
    setSelectedHouseholdId,
    isLoading,
  } = useHouseholdSelector();

  const handleSelect = (householdId: string) => {
    setSelectedHouseholdId(householdId);
    setIsOpen(false);
  };

  const handleCreateHousehold = () => {
    setIsOpen(false);
    // TODO: 새 가계부 생성 페이지로 이동
    // router.push('/create-household');
  };

  if (isLoading) {
    return (
      <View style={styles.trigger}>
        <ActivityIndicator size="small" color={colors.tint} />
      </View>
    );
  }

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        style={({ pressed }) => [styles.trigger, pressed && { opacity: 0.7 }]}
      >
        <ThemedText type="title" style={styles.title}>
          {selectedHousehold?.name ?? '가계부 선택'}
        </ThemedText>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={28}
          color={colors.text}
        />
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
            {households.map((household) => {
              const isSelected = household.id === selectedHouseholdId;

              return (
                <Pressable
                  key={household.id}
                  onPress={() => handleSelect(household.id)}
                  style={({ pressed }) => [
                    styles.option,
                    isSelected && { backgroundColor: colors.card },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {household.name}
                  </ThemedText>
                  {isSelected && (
                    <MaterialIcons name="check" size={20} color={colors.tint} />
                  )}
                </Pressable>
              );
            })}

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <Pressable
              onPress={handleCreateHousehold}
              style={({ pressed }) => [
                styles.createButton,
                pressed && { opacity: 0.7 },
              ]}
            >
              <MaterialIcons name="add" size={20} color={colors.tint} />
              <ThemedText
                style={[styles.createButtonText, { color: colors.tint }]}
              >
                새 가계부 생성
              </ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  dropdown: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
