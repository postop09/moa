import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

type AuthState = {
  session: Session | null;
  isLoading: boolean;
};

type AuthActions = {
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  clear: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>(() => ({
  session: null,
  isLoading: true,

  setSession: (session) => {
    useAuthStore.setState({ session });
  },
  setIsLoading: (isLoading) => {
    useAuthStore.setState({ isLoading });
  },
  clear: () => {
    useAuthStore.setState({ session: null });
  },
}));
