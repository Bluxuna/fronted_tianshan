# Build stage
FROM node:20-alpine AS build

# Install build dependencies for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies for build
RUN npm ci

# Copy the rest of the project
COPY . .

# Build Vite frontend
RUN npm run build

# Final stage
FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production
WORKDIR /app

# Install build dependencies again for production native module install
RUN apk add --no-cache python3 make g++

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy backend files and built frontend
COPY server.cjs .
COPY --from=build /app/dist ./dist

# Set ownership to non-root user
RUN chown -R node:node /app

# Use non-root user for security
USER node

# Expose port
EXPOSE 3001

# Healthcheck to ensure server is responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3001/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Start the server
CMD ["node", "server.cjs"]
