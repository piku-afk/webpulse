import closeWithGrace from 'close-with-grace';

import { logger } from '@shared/logger.js';

import { buildServer } from './utils/buildServer.js';
import { db } from './utils/db.js';

const port = 3000;

const server = await buildServer();

const shutDown = async () => {
  logger.info('Shutting down gracefully...');
  await server.close();
  await db.destroy();
  logger.info('Server has been shut down');
};
try {
  await server.listen({ port });
} catch (error) {
  logger.error(error);
  process.exit(1);
} finally {
  closeWithGrace({ delay: 20000 }, shutDown);
}
