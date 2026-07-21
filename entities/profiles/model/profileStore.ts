import { create } from 'zustand';

import type { Profile } from './profile';

type ProfileState = {
  profile: Profile | null;
};

type ProfileActions = {
  setProfile: (profile: Profile | null) => void;
  clear: () => void;
};

type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>(() => ({
  profile: null,

  setProfile: (profile) => {
    useProfileStore.setState({ profile });
  },
  clear: () => {
    useProfileStore.setState({ profile: null });
  },
}));
