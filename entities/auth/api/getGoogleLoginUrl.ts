import { supabase } from '@/shared/api';
import * as WebBrowser from 'expo-web-browser';
import { REDIRECT_URL } from '../config/redirectURL';

WebBrowser.maybeCompleteAuthSession();

export const getGoogleLoginUrl = async (): Promise<string> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: REDIRECT_URL,
    },
  });

  if (error) {
    throw error;
  }

  if (!data.url) {
    throw new Error('Google 로그인 URL을 가져오지 못했습니다.');
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_URL);

  if (result.type === 'cancel' || result.type === 'dismiss') {
    throw new Error('로그인이 취소되었습니다.');
  }

  if (result.type !== 'success') {
    throw new Error('로그인에 실패했습니다.');
  }

  return result.url;
};
