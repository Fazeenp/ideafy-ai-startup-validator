# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy built app
COPY --from=builder /app/dist ./dist

# Expose frontend port
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]