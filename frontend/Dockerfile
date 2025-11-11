# ---------------------------
# 1️⃣ Base builder image
# ---------------------------
FROM node:22-alpine AS builder

# Enable pnpm via corepack
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Get the backend api url
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the Next.js app (generates .next folder)
RUN pnpm run build

# ---------------------------
# 2️⃣ Production image
# ---------------------------
FROM node:22-alpine AS production

RUN corepack enable
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3000 

# Run the Next.js server
CMD ["pnpm", "start"]
