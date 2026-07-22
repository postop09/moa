import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { FormField, ThemedText } from '@/shared/ui';

type Props = {
  visible: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
};

export const MemberAddModal = ({
  visible,
  isLoading,
  onClose,
  onSubmit,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!visible) {
      return;
    }
    setEmail('');
    setError('');
  }, [visible]);

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError('이메일을 입력해주세요.');
      return;
    }
    if (!trimmed.includes('@')) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <Pressable
          style={[styles.sheet, { backgroundColor: colors.background }]}
          onPress={Keyboard.dismiss}
        >
          <ThemedText type="subtitle" style={styles.title}>
            멤버 추가
          </ThemedText>
          <ThemedText style={[styles.description, { color: colors.icon }]}>
            가입된 사용자의 이메일로 멤버를 초대합니다.
          </ThemedText>
          <FormField
            label="이메일"
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={error}
            autoFocus
          />
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
                <ThemedText style={styles.primaryText}>추가</ThemedText>
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
  description: {
    fontSize: 14,
    lineHeight: 20,
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
