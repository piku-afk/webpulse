import { pino } from 'pino';

export const logger = pino({
  transport: {
    target: '@fastify/one-line-logger',
  },
});
