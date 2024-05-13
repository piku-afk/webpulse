import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyVite from '@fastify/vite';
import Fastify, { type FastifyInstance } from 'fastify';

import { logger } from '@shared/logger.js';

import { healthRouter } from '../modules/health/health.route.js';

const path = fileURLToPath(import.meta.url);
const root = resolve(dirname(path), '..', '..', '..');

export const buildServer = async (): Promise<FastifyInstance> => {
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
    root,
    dev: true,
    spa: true,
  });

  // register routes
  await fastify.register(
    async () => {
      await fastify.register(healthRouter, { prefix: '/health' });
    },
    { prefix: '/api' },
  );

  fastify.get('/', (_req, reply) => {
    return reply.html();
  });

  logger.info('Setup Fastify Vite');
  await fastify.vite.ready();

  return fastify;
};
