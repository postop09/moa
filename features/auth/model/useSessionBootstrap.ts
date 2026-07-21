import { useEffect } from 'react';

import { getSession, getSessionChange, useAuthStore } from '@/entities/auth';
import { useProfileStore } from '@/entities/profiles';

export const useSessionBootstrap = () => {
  const { setSession, setIsLoading } = useAuthStore();
  const { clear: clearProfile } = useProfileStore();

  useEffect(() => {
    let cancelled = false;
    let subscription: { unsubscribe: () => void } | undefined;

    const syncSession = (
      session: Awaited<ReturnType<typeof getSession>>['session'],
    ) => {
      setSession(session);
      setIsLoading(false);
      if (!session) {
        clearProfile();
      }
    };

    const init = async () => {
      const { session } = await getSession();
      if (cancelled) {
        return;
      }

      syncSession(session);

      subscription = getSessionChange((_event, nextSession) => {
        syncSession(nextSession);
      });

      if (cancelled) {
        subscription.unsubscribe();
      }
    };

    void init();

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, [setSession, setIsLoading, clearProfile]);
};
