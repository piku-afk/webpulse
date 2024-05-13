import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import closeWithGrace from 'close-with-grace';

import { logger } from '#shared/logger.js';

import { buildServer } from './utils/buildServer.js';
import { db } from './utils/db.js';

const host = '0.0.0.0';
const port = 3000;
const path = fileURLToPath(import.meta.url);
const root = resolve(dirname(path), '..', '..');

const server = await buildServer({ viteConfigPath: root });

const shutDown = async () => {
  logger.info('Shutting down gracefully...');
  await server.close();
  await db.destroy();
  logger.info('Server has been shut down');
};

try {
  await server.listen({ host, port });
} catch (error) {
  logger.error(error);
  process.exit(1);
} finally {
  closeWithGrace({ delay: 20000 }, shutDown);
}
