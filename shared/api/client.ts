import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://frmypwkwwucaitcnyplt.supabase.co';
const supabaseAnonKey = 'sb_publishable_CAL38ezFyhNXJ4NkC8muYQ_p71CE7oV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
