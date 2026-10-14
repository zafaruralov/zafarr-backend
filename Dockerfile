FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable                 # turns on pnpm inside the image
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build                 # compiles TS → dist/

# ---------- run ----------
FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile   # only runtime deps, smaller image
COPY --from=build /app/dist/ ./dist
EXPOSE 3000
CMD ["node", "dist/main"]