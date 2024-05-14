import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import closeWithGrace from 'close-with-grace';

import { buildServer } from '#server/index.js';
import { db } from '#server/utils/db.js';

import { logger } from '#shared/logger.js';

const host = '0.0.0.0';
const port = 3000;
const path = fileURLToPath(import.meta.url);
const root = resolve(dirname(path), '..');

logger.info('Starting server...');
const server = await buildServer({ viteConfigPath: root });

const shutDown = async () => {
  logger.info('Initiating graceful shutdown...');
  await server.close();
  await db.destroy();
  logger.info('Server has been shut down successfully');
};

try {
  await server.vite.ready();
  await server.listen({ host, port });
} catch (error) {
  logger.error(error);
  process.exit(1);
} finally {
  closeWithGrace({ delay: 20000 }, shutDown);
}
