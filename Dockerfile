# Use Node base image
FROM node:18

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy pnpm-related files
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the project
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server with host binding
CMD ["pnpm", "run", "dev", "--", "--host"]
