import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth';
import { useProfileStore } from '@/entities/profiles';

import { useGetProfile } from './useGetProfile';

export const useAuthGate = () => {
  const { session, isLoading } = useAuthStore();
  const { profile, setProfile } = useProfileStore();
  const userId = session?.user.id ?? '';
  const { data: profileData } = useGetProfile(userId);

  useEffect(() => {
    if (profile || !profileData) {
      return;
    }
    setProfile(profileData);
  }, [profile, profileData, setProfile]);

  return {
    session,
    isLoading,
    profile,
    userId,
    hasProfile: !!profile,
    needsProfileSetup: !!session && !profile,
  };
};
