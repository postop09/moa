import { useAuthStore } from '@/entities/auth';
import { useDeleteHousehold } from '@/features/household';
import {
  useGetHouseholdMembers,
  useLeaveHousehold,
} from '@/features/household-member';
import { useRouter } from 'expo-router';

import { useHouseholdSelector } from './useHouseholdSelector';

export const useQuickActions = () => {
  const router = useRouter();
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
  const canDeleteOrLeave = !!selectedHousehold && !!currentMember;

  const openCategoryManagement = () => {
    router.push('/category-management');
  };

  const openMemberManagement = () => {
    router.push('/member-management');
  };

  const deleteOrLeaveHousehold = () => {
    if (!selectedHouseholdId || !selectedHousehold) {
      return;
    }

    if (isOwner) {
      handleDelete(selectedHouseholdId, selectedHousehold.name);
      return;
    }

    handleLeave(selectedHouseholdId, selectedHousehold.name);
  };

  return {
    isOwner,
    canDeleteOrLeave,
    openCategoryManagement,
    openMemberManagement,
    deleteOrLeaveHousehold,
  };
};
