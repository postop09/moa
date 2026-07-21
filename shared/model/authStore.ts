import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { Profile } from '../../entities/auth/model/profile';

type AuthState = {
  session: Session | null;
  isLoading: boolean;
  profile: Profile | null;
};

type AuthActions = {
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
  clear: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>(() => ({
  session: null,
  isLoading: true,
  profile: null,

  setSession: (session) => {
    useAuthStore.setState({ session });
  },
  setIsLoading: (isLoading) => {
    useAuthStore.setState({ isLoading });
  },
  setProfile: (profile) => {
    useAuthStore.setState({ profile });
  },
  clear: () => {
    useAuthStore.setState({ session: null, profile: null });
  },
}));
