import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth';

import { useGetProfile } from './useGetProfile';

export const useAuthGate = () => {
  const { session, isLoading, profile, setProfile } = useAuthStore();
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
