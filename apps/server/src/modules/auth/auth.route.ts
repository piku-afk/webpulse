import type { FastifyInstance } from 'fastify';

import { RefreshTokenSchema, SignInSchema } from '@webpulse/schemas';

import { handleRefreshToken, handleSignIn } from './auth.controller.js';

export const authRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/sign-in',
    schema: {
      body: SignInSchema.body,
      response: {
        200: SignInSchema.response,
        400: SignInSchema.error,
      },
    },
    handler: handleSignIn,
  });

  fastify.route({
    method: 'POST',
    url: '/refresh-token',
    schema: {
      body: RefreshTokenSchema.body,
      response: {
        200: RefreshTokenSchema.response,
        500: RefreshTokenSchema.error,
      },
    },
    handler: handleRefreshToken,
  });
};
