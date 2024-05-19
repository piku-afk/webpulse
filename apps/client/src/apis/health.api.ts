import type { Health } from '@webpulse/schemas';

import { api } from '../store';

const healthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHealth: builder.query<Health['response'], void>({
      query: () => ({
        url: '/api/health',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetHealthQuery } = healthApi;
