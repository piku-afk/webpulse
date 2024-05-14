# Base image for the application
FROM node:18.20.2-alpine AS base

# Define application name
ARG APP_NAME="webpulse"

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack for automatic package manager resolution
RUN corepack enable

# Working directory for the application
WORKDIR /${APP_NAME}

# Copy package definition and lock file
COPY package.json .
COPY pnpm-lock.yaml .

# Build stage
FROM base AS build

# Use cached pnpm store for faster installs
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy remaining project files
COPY . .

# Build the application using pnpm
RUN pnpm run build

# Production stage
# FROM base AS production

# Copy essential configuration files
# COPY package.json .
# COPY pnpm-lock.yaml .
# COPY vite.config.ts .

# Copy client source code
# ADD src /${APP_NAME}/src

# Install dependencies with production flag and use cached pnpm store
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy built production files from build stage
# COPY --from=build /${APP_NAME}/build /${APP_NAME}/build

RUN ls -la

EXPOSE 3000

# Start command to run the application
CMD [ "pnpm", "start" ]
