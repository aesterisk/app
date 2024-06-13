FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i

FROM base AS dev
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=development

EXPOSE 3000
ENV PORT 3000
RUN corepack enable pnpm
CMD pnpm dev
