import type { Server } from 'node:http';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify, {
  type FastifyBaseLogger,
  type FastifyHttpOptions,
  type FastifyInstance,
} from 'fastify';

import { healthRouter } from '../modules/health/health.route.js';

type ServerOptions = FastifyHttpOptions<Server, FastifyBaseLogger>;

export const buildServer = (serverOptions: ServerOptions): FastifyInstance => {
  const fastify = Fastify(serverOptions).withTypeProvider<TypeBoxTypeProvider>();

  // registering routes
  fastify.register(
    async () => {
      fastify.register(healthRouter, { prefix: '/health' });
    },
    { prefix: '/api' },
  );

  return fastify;
};
