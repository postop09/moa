import { supabase } from '@/shared/api';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const signInWithGoogle = async () => {
    const redirectTo = 'exp://192.168.10.153:8081/auth/callback';

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo,
        },
    });

    if (error) {
        throw error;
    }
    console.log('data: ', data);
    return data;

    // if (Platform.OS === 'web') {
    //   return;
    // }

    // if (!data.url) {
    //   throw new Error('Google 로그인 URL을 가져오지 못했습니다.');
    // }

    // const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    // if (result.type === 'cancel' || result.type === 'dismiss') {
    //   throw new Error('로그인이 취소되었습니다.');
    // }

    // if (result.type !== 'success') {
    //   throw new Error('로그인에 실패했습니다.');
    // }

    // await createSessionFromUrl(result.url);
};
