import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyVite from '@fastify/vite';
import Fastify, { type FastifyInstance } from 'fastify';

import { authRouter } from './modules/auth/auth.route.js';
import { healthRouter } from './modules/health/health.route.js';

interface ServerParams {
  viteConfigPath: string;
}

export const buildServer = async (params: ServerParams): Promise<FastifyInstance> => {
  const { viteConfigPath } = params;

  const fastify = Fastify({
    logger: {
      transport: {
        target: '@fastify/one-line-logger',
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // setup react ssr
  await fastify.register(fastifyVite, {
    root: viteConfigPath,
    // spa: true,
    renderer: '@fastify/react',
  });

  // register routes
  await fastify.register(
    async () => {
      await fastify.register(healthRouter, { prefix: '/health' });
      await fastify.register(authRouter, { prefix: '/auth' });
    },
    { prefix: '/api' },
  );

  return fastify;
};
