import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

type SessionState = {
  session: Session | null;
  isLoading: boolean;
};

type SessionActions = {
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

type SessionStore = SessionState & SessionActions;

export const useSessionStore = create<SessionStore>(() => ({
  session: null,
  isLoading: true,

  setSession: (session) => {
    useSessionStore.setState({ session });
  },
  setIsLoading: (isLoading) => {
    useSessionStore.setState({ isLoading });
  },
}));
