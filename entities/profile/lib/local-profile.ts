import type { Profile } from '../model/profile';

let localProfile: Profile | null = null;

export function getLocalProfile(userId: string): Profile | null {
  if (!localProfile || localProfile.id !== userId) {
    return null;
  }

  return { ...localProfile };
}

export function setLocalProfile(profile: Profile) {
  localProfile = { ...profile };
}
