import { makeRedirectUri } from 'expo-auth-session';

export const REDIRECT_URL = makeRedirectUri({
  path: 'auth/callback',
});
