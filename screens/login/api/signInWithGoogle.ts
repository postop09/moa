import * as QueryParams from 'expo-auth-session/build/QueryParams';

import { createSession, getGoogleLoginUrl } from '@/entities/auth';

export const signInWithGoogle = async () => {
  const callbackUrl = await getGoogleLoginUrl();
  const { params, errorCode } = QueryParams.getQueryParams(callbackUrl);

  if (errorCode) {
    throw new Error(errorCode);
  }

  const code = params.code;

  if (!code) {
    throw new Error('인가 코드를 찾을 수 없습니다.');
  }

  return createSession(code);
};
