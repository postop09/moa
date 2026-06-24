import type { Session } from '@supabase/supabase-js';

import { supabase } from '@/shared/api';
import { isSupabaseConfigured } from '@/shared/config';
import { createProfile as createProfileApi } from './createProfile';

import { getLocalProfile, setLocalProfile } from '../lib/local-profile';
import type {
  CreateProfileInput,
  Profile,
  UpdateProfileInput,
} from '../model/types';
import { getProfile } from './getProfile';

type ProfileRow = {
  id: string;
  email: string;
  nickname: string;
};

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    email: row.email,
    nickname: row.nickname,
  };
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!isSupabaseConfigured) {
    return getLocalProfile(userId);
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nickname')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapProfile(data as ProfileRow) : null;
}

export async function createProfile(
  session: Session,
  input: CreateProfileInput,
) {
  const profileResult = await getProfile(session.user.id);

  console.log('profileResult', profileResult);
  const nickname = input.nickname.trim();

  const email = session.user.email ?? '';

  const profile: Profile = {
    id: session.user.id,
    email,
    nickname,
  };

  await createProfileApi(profile);
  return console.log('profile created!!');
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput,
): Promise<Profile> {
  const nickname = input.nickname.trim();

  if (!nickname) {
    throw new Error('닉네임을 입력해주세요.');
  }

  if (!isSupabaseConfigured) {
    const existing = getLocalProfile(userId);

    if (!existing) {
      throw new Error('프로필을 찾을 수 없습니다.');
    }

    const profile: Profile = {
      ...existing,
      nickname,
    };

    setLocalProfile(profile);
    return profile;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ nickname })
    .eq('id', userId)
    .select('id, email, nickname')
    .single();

  if (error) {
    throw error;
  }

  return mapProfile(data as ProfileRow);
}
