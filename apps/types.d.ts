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
