import type { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';

import { supabase } from '../../utils/supabase.js';

export const signIn = async (
  email: string,
  password: string,
): Promise<AuthTokenResponsePassword> => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const refreshToken = async (refresh_token: string): Promise<AuthResponse> => {
  return await supabase.auth.refreshSession({ refresh_token });
};
