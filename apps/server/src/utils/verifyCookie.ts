import type { FastifyRequest } from 'fastify';

import { getSessionData } from '@webpulse/utilities';

import { supabase } from './supabase.js';

export const verifyCookie = async (req: FastifyRequest) => {
  const cookie = req.headers.cookie;
  const { access_token } = await getSessionData(cookie);

  if (!access_token) {
    throw new Error('Access token not found');
  }

  const { data, error } = await supabase.auth.getUser(access_token);

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('User not found');
  }
};
