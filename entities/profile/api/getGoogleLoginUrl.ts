import { supabase } from '@/shared/api';
import * as WebBrowser from 'expo-web-browser';
import { REDIRECT_URL } from '../config/redirectURL';
import { getSession } from './getSession';

WebBrowser.maybeCompleteAuthSession();

export const getGoogleLoginUrl = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: REDIRECT_URL,
    },
  });

  if (error) {
    throw error;
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_URL);

  if (result.type === 'cancel' || result.type === 'dismiss') {
    throw new Error('로그인이 취소되었습니다.');
  }

  if (result.type !== 'success') {
    throw new Error('로그인에 실패했습니다.');
  }

  const session = await getSession(result.url);
  console.log('session: ', session);
  return result.url;
};
