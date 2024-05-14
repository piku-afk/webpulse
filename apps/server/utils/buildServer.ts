import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyVite from '@fastify/vite';
import Fastify, { type FastifyInstance } from 'fastify';

import { logger } from '#shared/logger.js';

import { authRouter } from '../modules/auth/auth.route.js';
import { healthRouter } from '../modules/health/health.route.js';

interface ServerParams {
  viteConfigPath: string;
}

export const buildServer = async (params: ServerParams): Promise<FastifyInstance> => {
  const { viteConfigPath } = params;
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
        },
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(fastifyVite, {
    root: viteConfigPath,
    spa: true,
  });

  // register routes
  await fastify.register(
    async () => {
      await fastify.register(healthRouter, { prefix: '/health' });
      await fastify.register(authRouter, { prefix: '/auth' });
    },
    { prefix: '/api' },
  );

  fastify.get('/', (_req, reply) => {
    return reply.html();
  });

  logger.info('Setup fastify-vite');
  await fastify.vite.ready();

  return fastify;
};
