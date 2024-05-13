FROM node:18.20.2-alpine

# setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /track-web-vitals-2

# setup app
COPY . .
RUN pnpm install

# build app
RUN pnpm build

EXPOSE 3000

# start app
CMD [ "pnpm", "start" ]
