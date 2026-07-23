import { StyleSheet, View } from 'react-native';

import type { GetHouseholdMembersRes } from '@/entities/household-members';
import { ThemedText } from '@/shared/ui';
import { MemberCard } from './MemberCard';

type Props = {
  members: GetHouseholdMembersRes;
  canManage: boolean;
  currentUserId: string;
  onEditRole: (memberId: number) => void;
};

export const MemberList = ({
  members,
  canManage,
  currentUserId,
  onEditRole,
}: Props) => {
  if (members.length === 0) {
    return (
      <ThemedText style={styles.empty}>등록된 멤버가 없습니다.</ThemedText>
    );
  }

  return (
    <View style={styles.list}>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          canManage={canManage}
          isSelf={member.userId === currentUserId}
          onEditRole={() => onEditRole(member.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  empty: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 8,
  },
});
