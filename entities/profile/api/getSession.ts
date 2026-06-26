import { supabase } from '@/shared/api';
import * as QueryParams from 'expo-auth-session/build/QueryParams';

export const getSession = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    throw new Error(errorCode);
  }

  if (params.code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(
      params.code,
    );

    if (error) {
      throw error;
    }

    return data;
  }

  // const accessToken = params.access_token;
  // const refreshToken = params.refresh_token;

  // if (accessToken && refreshToken) {
  //   const { error } = await supabase.auth.setSession({
  //     access_token: accessToken,
  //     refresh_token: refreshToken,
  //   });

  //   if (error) {
  //     throw error;
  //   }
  // }
};
