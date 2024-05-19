import cors from '@fastify/cors';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify, { type FastifyInstance, type FastifyLoggerOptions } from 'fastify';

import { logger } from '@webpulse/logger';

import { authRouter } from '../modules/auth/auth.route.js';
import { healthRouter } from '../modules/health/health.route.js';

export const buildServer = async (): Promise<FastifyInstance> => {
  const fastify = Fastify({
    logger: logger as FastifyLoggerOptions,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(cors, {
    origin: ['*'],
  });

  // register routes
  await fastify.register(
    async () => {
      await fastify.register(authRouter, { prefix: '/auth' });
      await fastify.register(healthRouter, { prefix: '/health' });
    },
    { prefix: '/api' },
  );

  return fastify;
};
