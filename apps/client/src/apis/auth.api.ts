import type { SignIn } from '@webpulse/schemas';

import { api } from '../store';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignIn['response'], SignIn['body']>({
      query: (body) => ({
        url: '/api/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
