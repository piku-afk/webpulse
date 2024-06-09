import type { IncomingMessage, Server, ServerResponse } from 'node:http';
import type {
  FastifyBaseLogger,
  FastifySchema,
  FastifyTypeProviderDefault,
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify';

import type { verifyCookie } from '#utils/verifyCookie.ts';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COOKIE_SECRET: string;
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

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse,
  > {
    verifyCookie: typeof verifyCookie;
  }
}
