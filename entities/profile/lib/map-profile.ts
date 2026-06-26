import type { Profile } from '../model/profile';

type ProfileRow = {
  id: string;
  email: string;
  nickname: string;
};

export function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    email: row.email,
    nickname: row.nickname,
  };
}
