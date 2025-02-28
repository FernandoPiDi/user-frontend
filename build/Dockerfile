# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 server && \
    addgroup server nodejs

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Set correct ownership
RUN chown -R server:nodejs /app

# Switch to non-root user
USER server

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY --chown=server:nodejs . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Create the same non-root user and set up permissions
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 server && \
    addgroup server nodejs && \
    mkdir -p /app/.pnpm-store && \
    chown -R server:nodejs /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder --chown=server:nodejs /app/package.json .
COPY --from=builder --chown=server:nodejs /app/pnpm-lock.yaml .
COPY --from=builder --chown=server:nodejs /app/.next ./.next
COPY --from=builder --chown=server:nodejs /app/public ./public
COPY --from=builder --chown=server:nodejs /app/next.config.ts ./next.config.ts

# Switch to non-root user
USER server

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
