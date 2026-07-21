const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? '';

if (__DEV__) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '[env] EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY 가 비어 있습니다.',
    );
  }
}

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  googleClientId,
} as const;

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;
