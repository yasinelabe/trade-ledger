# Stage 1: build
FROM node:22-bullseye AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js app
RUN pnpm build

# Stage 2: production image
FROM node:22-bullseye

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install only production deps
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/lib ./lib

# Expose port
EXPOSE 80

# Set environment variables
ENV NODE_ENV=production

# Start Next.js
CMD ["pnpm", "start"]
