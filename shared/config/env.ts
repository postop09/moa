const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? '';

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  googleClientId,
} as const;

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;
