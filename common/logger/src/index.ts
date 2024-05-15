import oneLineLogger from '@fastify/one-line-logger';
import { pino } from 'pino';

export const logger = pino(oneLineLogger());
