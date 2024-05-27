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

FROM base AS server
USER node
WORKDIR /app
COPY --from=build /prod/server .
EXPOSE 4000
CMD [ "pnpm", "start" ]
# EXPOSE 3000
