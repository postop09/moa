import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import { env } from '@/shared/config';

import { authStorage } from './auth-storage';

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    storage: authStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
    flowType: 'pkce',
  },
});
