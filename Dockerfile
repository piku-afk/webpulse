FROM node:18.20.2-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# client dockerization has been commented out

FROM base AS init
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune @webpulse/server --docker --out-dir server
# RUN pnpm dlx turbo prune @webpulse/client --docker --out-dir client

FROM base AS build_server
WORKDIR /app
COPY --from=init /app/server/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=init /app/server/full/ .
RUN pnpm dlx turbo run build --filter=@webpulse/server

# FROM base AS build_client
# WORKDIR /app
# COPY --from=init /app/client/json/ .
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# COPY --from=init /app/client/full/ .
# RUN pnpm dlx turbo run build --filter=@webpulse/client

FROM base AS prod_server
WORKDIR /app
USER node
COPY --from=build_server /app/apps/server/build .
EXPOSE 4000
CMD [ "node", "index.mjs" ]

# FROM nginx:1.18.0-alpine AS prod_client
# COPY nginx.conf /etc/nginx/nginx.conf
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=build_client /app/apps/client/build .
# EXPOSE 3000
