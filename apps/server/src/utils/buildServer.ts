import fastifyAuth from '@fastify/auth';
import fastifyCors from '@fastify/cors';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify, { type FastifyInstance, type FastifyLoggerOptions } from 'fastify';

import { logger } from '@webpulse/logger';

import { authRouter } from '../modules/auth/auth.route.js';
import { healthRouter } from '../modules/health/health.route.js';
import { websiteRouter } from '../modules/website/websites.route.js';
import { verifyCookie } from './verifyCookie.js';

export const buildServer = async (): Promise<FastifyInstance> => {
  const fastify = Fastify({
    logger: logger as FastifyLoggerOptions,
  }).withTypeProvider<TypeBoxTypeProvider>();

  fastify.decorate('verifyCookie', verifyCookie);

  await fastify.register(fastifyCors, {
    origin: ['*'],
  });

  // register routes
  fastify.register(fastifyAuth).after(async () => {
    await fastify.register(
      async () => {
        await fastify.register(authRouter, { prefix: '/auth' });
        await fastify.register(healthRouter, { prefix: '/health' });
        await fastify.register(websiteRouter, { prefix: '/websites' });
      },
      { prefix: '/api' },
    );
  });

  return fastify;
};
