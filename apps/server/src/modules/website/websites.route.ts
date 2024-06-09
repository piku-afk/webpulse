import type { FastifyInstance } from 'fastify';

import { getWebsites } from './websites.controller.js';

export const websiteRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: fastify.auth([fastify.verifyCookie]),
    handler: getWebsites,
  });
};
