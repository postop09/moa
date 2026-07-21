import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetHouseholdMembers } from '@/features/household-member';
import { Colors } from '@/shared/config';
import { useColorScheme } from '@/shared/lib';
import { useAuthStore } from '@/entities/auth';
import { useHouseholdStore } from '@/shared/model';
import { ThemedText, ThemedView } from '@/shared/ui';
import { useAddHouseholdMember } from './model/useAddHouseholdMember';
import { useUpdateHouseholdMemberRole } from './model/useUpdateHouseholdMemberRole';
import { MemberAddModal } from './ui/MemberAdd.modal';
import { MemberList } from './ui/MemberList';
import { MemberRoleModal } from './ui/MemberRole.modal';

export const MemberManagementPage = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { session } = useAuthStore();
  const { selectedHouseholdId } = useHouseholdStore();
  const {
    data: members = [],
    isLoading,
    isRefetching,
  } = useGetHouseholdMembers(selectedHouseholdId ?? '');
  const {
    mutate: addMember,
    isPending: isAdding,
    isAddOpen,
    setIsAddOpen,
  } = useAddHouseholdMember();
  const {
    isPending: isUpdatingRole,
    isRoleOpen,
    selectedMemberId,
    openRoleModal,
    closeRoleModal,
    submitRole,
  } = useUpdateHouseholdMemberRole();

  const currentUserId = session?.user.id ?? '';
  const currentMember = members.find(
    (member) => member.userId === currentUserId,
  );
  const canManage = currentMember?.role === 'owner';
  const selectedMember = members.find(
    (member) => member.id === selectedMemberId,
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            멤버 관리
          </ThemedText>
          {canManage ? (
            <Pressable
              onPress={() => setIsAddOpen(true)}
              style={styles.addButton}
            >
              <MaterialIcons name="person-add" size={24} color={colors.tint} />
            </Pressable>
          ) : (
            <View style={styles.addButton} />
          )}
        </View>

        {isLoading ? (
          <ActivityIndicator style={styles.loader} color={colors.tint} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <MemberList
              members={members}
              canManage={canManage}
              onEditRole={openRoleModal}
            />
          </ScrollView>
        )}

        {isRefetching ? (
          <ActivityIndicator style={styles.refetch} color={colors.tint} />
        ) : null}
      </SafeAreaView>

      <MemberAddModal
        visible={isAddOpen}
        isLoading={isAdding}
        onClose={() => setIsAddOpen(false)}
        onSubmit={(email) =>
          addMember({
            householdId: selectedHouseholdId ?? '',
            email,
          })
        }
      />

      <MemberRoleModal
        visible={isRoleOpen}
        currentRole={selectedMember?.role}
        isLoading={isUpdatingRole}
        onClose={closeRoleModal}
        onSubmit={submitRole}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 22,
  },
  addButton: {
    padding: 4,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 40,
  },
  refetch: {
    marginBottom: 8,
  },
  content: {
    padding: 20,
    gap: 24,
    paddingBottom: 32,
  },
});
