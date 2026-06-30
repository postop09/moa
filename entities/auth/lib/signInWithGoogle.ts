import { createSession } from '../api/createSession';
import { getGoogleLoginUrl } from '../api/getGoogleLoginUrl';

export const signInWithGoogle = async () => {
  const callbackUrl = await getGoogleLoginUrl();
  const code = callbackUrl.split('code=')[1];

  if (!code) {
    throw new Error('인가 코드를 찾을 수 없습니다.');
  }

  return createSession(code);
};
