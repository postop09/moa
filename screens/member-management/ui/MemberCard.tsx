import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View } from 'react-native';

import type { GetHouseholdMembersRes } from '@/entities/household-member';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { useRemoveHouseholdMember } from '../model/useRemoveHouseholdMember';

type Member = GetHouseholdMembersRes[number];

type Props = {
  member: Member;
  canManage: boolean;
  onEditRole: () => void;
};

const formatJoinedAt = (joinedAt: string) => {
  const date = new Date(joinedAt);
  if (Number.isNaN(date.getTime())) {
    return joinedAt;
  }
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const roleLabel = (role: Member['role']) => {
  return role === 'owner' ? '소유자' : '멤버';
};

export const MemberCard = ({ member, canManage, onEditRole }: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { handleRemove, isPending: isRemoving } = useRemoveHouseholdMember();

  return (
    <ThemedView
      style={[styles.container, { borderColor: colors.border }]}
      lightColor={colors.card}
      darkColor={colors.card}
    >
      <View style={styles.header}>
        <View style={styles.info}>
          <ThemedText style={styles.nickname}>{member.nickname}</ThemedText>
          <View
            style={[
              styles.roleBadge,
              {
                backgroundColor:
                  member.role === 'owner' ? colors.tint : colors.border,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.roleText,
                { color: member.role === 'owner' ? '#fff' : colors.text },
              ]}
            >
              {roleLabel(member.role)}
            </ThemedText>
          </View>
        </View>
        {canManage ? (
          <View style={styles.actions}>
            <Pressable
              onPress={onEditRole}
              accessibilityLabel="권한 설정"
              hitSlop={8}
              style={({ pressed }) => [
                styles.actionButton,
                { borderColor: colors.border },
                pressed && { opacity: 0.7 },
              ]}
            >
              <MaterialIcons name="admin-panel-settings" size={20} color={colors.text} />
            </Pressable>
            <Pressable
              onPress={() => handleRemove(member.id, member.nickname)}
              disabled={isRemoving}
              accessibilityLabel="삭제하기"
              hitSlop={8}
              style={({ pressed }) => [
                styles.actionButton,
                {
                  borderColor: colors.expense,
                  opacity: isRemoving ? 0.6 : pressed ? 0.7 : 1,
                },
              ]}
            >
              <MaterialIcons
                name="delete-outline"
                size={20}
                color={colors.expense}
              />
            </Pressable>
          </View>
        ) : null}
      </View>
      <ThemedText style={[styles.joinedAt, { color: colors.icon }]}>
        가입일 {formatJoinedAt(member.joinedAt)}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nickname: {
    fontSize: 17,
    fontWeight: '600',
  },
  roleBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  joinedAt: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
