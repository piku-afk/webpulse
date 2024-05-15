import closeWithGrace from 'close-with-grace';
import type { FastifyInstance } from 'fastify';

import { logger } from '@webpulse/logger';

import { buildServer } from '#utils/buildServer.js';
import { db } from '#utils/db.js';

const host = '0.0.0.0';
const port = 4000;

let server: FastifyInstance | undefined;

try {
  logger.info('Starting server');
  server = await buildServer();
  await server.listen({ host, port });
} catch (error) {
  logger.error(error);
  process.exit(1);
} finally {
  closeWithGrace({ delay: 10000 }, async () => {
    if (server) {
      logger.info('Initiating graceful shutdown');
      await server.close();
      await db.destroy();
      logger.info('Server has been shut down successfully');
    }
  });
}
