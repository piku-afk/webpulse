import type { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';

import { supabase } from '#utils/supabase.js';

/**
 * Signs in a user with email and password.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<AuthTokenResponsePassword>} A promise that resolves to an authentication token response.
 */
export const signIn = async (
  email: string,
  password: string,
): Promise<AuthTokenResponsePassword> => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

/**
 * Refreshes the user's authentication session using a refresh token.
 * @param {string} refresh_token The user's refresh token.
 * @returns {Promise<AuthResponse>} A promise that resolves to an authentication response.
 */
export const refreshToken = async (refresh_token: string): Promise<AuthResponse> => {
  return await supabase.auth.refreshSession({ refresh_token });
};
