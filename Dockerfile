FROM node:18.20.2-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm deploy --filter=@webpulse/server --prod /prod/server
RUN pnpm deploy --filter=@webpulse/client --prod /prod/client

FROM base AS server
USER node
WORKDIR /app
COPY --from=build /prod/server .
EXPOSE 4000
CMD [ "pnpm", "start" ]

FROM base AS client
WORKDIR /app
COPY --from=build /prod/client   .
COPY --from=build /app/apps/client/build ./build
EXPOSE 3000
CMD [ "pnpm", "start" ]
