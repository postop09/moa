import { useEffect } from 'react';

import { getSession, getSessionChange, useAuthStore } from '@/entities/auth';

export const useSessionBootstrap = () => {
  const { setSession, setIsLoading } = useAuthStore();

  useEffect(() => {
    let cancelled = false;
    let subscription: { unsubscribe: () => void } | undefined;

    const init = async () => {
      const { session } = await getSession();
      if (cancelled) {
        return;
      }

      setSession(session);
      setIsLoading(false);

      subscription = getSessionChange((_event, nextSession) => {
        setSession(nextSession);
        setIsLoading(false);
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
  }, [setSession, setIsLoading]);
};
