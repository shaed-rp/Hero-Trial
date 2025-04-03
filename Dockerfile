FROM node:18-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
COPY tsconfig*.json ./
COPY next.config.ts ./

RUN --mount=type=cache,target=/root/.npm \
  --mount=type=cache,target=/root/.cache/yarn \
  npm ci --prefer-offline --no-audit --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NODE_OPTIONS='--max_old_space_size=4096'

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/tsconfig*.json ./
COPY --from=deps /app/next.config.ts ./

COPY src ./src
COPY public ./public

RUN --mount=type=cache,target=/app/.next/cache \
  --mount=type=cache,target=/root/.npm/.cache/turbo \
  npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs && \
  mkdir -p /app/.next/static /app/public /app/src/data && \
  chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/src/data ./src/data

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]