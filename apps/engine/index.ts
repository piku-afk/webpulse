import closeWithGrace from 'close-with-grace';

import { db } from './utils/db.js';
import { buildServer } from './utils/server.js';

const port = 5000;

export const server = buildServer({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
      },
    },
  },
});

const shutDown = async () => {
  server.log.info('Shutting down gracefully...');
  await server.close();
  await db.destroy();
  server.log.info('Server has been shut down');
};

try {
  await server.listen({ port });
} catch (error) {
  server.log.error(error);
  process.exit(1);
} finally {
  closeWithGrace({ delay: 20000 }, shutDown);
}
