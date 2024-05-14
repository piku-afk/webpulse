/// <reference types="vite/client" />

import type { IncomingMessage, Server, ServerResponse } from 'node:http';
import type {
  FastifyBaseLogger,
  FastifySchema,
  FastifyTypeProviderDefault,
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    }
  }

  type GenericRouteHandler<T extends RouteGenericInterface> = RouteHandlerMethod<
    Server,
    IncomingMessage,
    ServerResponse,
    T,
    unknown,
    FastifySchema,
    FastifyTypeProviderDefault,
    FastifyBaseLogger
  >;
}
