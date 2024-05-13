import type { FastifyInstance } from 'fastify';

import { HealthSchema } from '#shared/schema/health.type.js';

import { getHealth } from './health.controller.js';

export const healthRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: HealthSchema.response,
      },
    },
    handler: getHealth,
  });
};
